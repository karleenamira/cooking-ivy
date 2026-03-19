param(
  [int]$Port = 8000,
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"
$endpoint = "http://localhost:$Port/"
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)

$contentTypes = @{
  ".css" = "text/css; charset=utf-8"
  ".html" = "text/html; charset=utf-8"
  ".ico" = "image/x-icon"
  ".js" = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg" = "image/svg+xml"
  ".txt" = "text/plain; charset=utf-8"
  ".webp" = "image/webp"
}

function Get-ContentType {
  param([string]$Path)

  $extension = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
  if ($contentTypes.ContainsKey($extension)) {
    return $contentTypes[$extension]
  }

  return "application/octet-stream"
}

function Get-RequestedPath {
  param([string]$RequestPath)

  $cleanPath = ($RequestPath -split "\?")[0]
  $relativePath = [System.Uri]::UnescapeDataString($cleanPath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($relativePath)) {
    $relativePath = "index.html"
  }

  return Join-Path $Root $relativePath
}

function Write-HttpResponse {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $headers = @(
    "HTTP/1.1 $StatusCode $StatusText",
    "Content-Type: $ContentType",
    "Content-Length: $($Body.Length)",
    "Connection: close",
    ""
    ""
  ) -join "`r`n"

  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headers)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  $Stream.Write($Body, 0, $Body.Length)
}

try {
  $listener.Start()
  Write-Host "Cooking Ivy dev server running at $endpoint"
  Write-Host "Serving files from $Root"
  Write-Host "Press Ctrl+C to stop."

  while ($true) {
    $client = $listener.AcceptTcpClient()
    $stream = $client.GetStream()
    $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)

    try {
      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        continue
      }

      while (($headerLine = $reader.ReadLine()) -ne "") {
        if ($null -eq $headerLine) {
          break
        }
      }

      $parts = $requestLine.Split(" ")
      if ($parts.Length -lt 2) {
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("Bad Request")
        Write-HttpResponse -Stream $stream -StatusCode 400 -StatusText "Bad Request" -Body $buffer
        continue
      }

      $filePath = Get-RequestedPath -RequestPath $parts[1]
      $resolvedRoot = [System.IO.Path]::GetFullPath($Root)
      $resolvedPath = [System.IO.Path]::GetFullPath($filePath)

      if (-not $resolvedPath.StartsWith($resolvedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
        Write-HttpResponse -Stream $stream -StatusCode 403 -StatusText "Forbidden" -Body $buffer
      } elseif (-not (Test-Path $resolvedPath -PathType Leaf)) {
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        Write-HttpResponse -Stream $stream -StatusCode 404 -StatusText "Not Found" -Body $buffer
      } else {
        $buffer = [System.IO.File]::ReadAllBytes($resolvedPath)
        Write-HttpResponse -Stream $stream -StatusCode 200 -StatusText "OK" -Body $buffer -ContentType (Get-ContentType -Path $resolvedPath)
      }
    } catch {
      $buffer = [System.Text.Encoding]::UTF8.GetBytes("Server Error")
      Write-HttpResponse -Stream $stream -StatusCode 500 -StatusText "Server Error" -Body $buffer
      Write-Warning $_
    } finally {
      $reader.Dispose()
      $stream.Dispose()
      $client.Dispose()
    }
  }
} finally {
  if ($listener.Server.IsBound) {
    $listener.Stop()
  }
}
