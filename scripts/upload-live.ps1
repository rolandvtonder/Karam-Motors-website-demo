# Builds the site for karammotors.co.za and uploads it to the xneelo web
# server over FTP from this PC. (GitHub's servers are refused by the host's
# firewall, so the upload runs from here.) Run it from the project folder:
#
#   powershell -ExecutionPolicy Bypass -File scripts\upload-live.ps1
#
# It asks for the FTP password at a hidden prompt and never stores it.
# The first run also downloads the old WordPress .htaccess to
# "..\Karam Motors old-site-backup\" before it is replaced.

param(
  [string]$Server = 'ftp.karammotors.co.za',
  [string]$User = 'karamqcvea',
  [string]$RemoteDir = 'public_html'
)

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

# curl config-file string: quote it and escape \ and "
function Q([string]$s) { '"' + ($s -replace '\\', '\\' -replace '"', '\"') + '"' }

Write-Host ''
Write-Host 'Building the site for karammotors.co.za...' -ForegroundColor Cyan
$env:BASE_PATH = '/'
npm run build
$built = $LASTEXITCODE
Remove-Item Env:BASE_PATH
if ($built -ne 0) { throw 'Build failed - nothing was uploaded.' }

$dist = Join-Path $root 'dist'
$files = @(Get-ChildItem $dist -Recurse -File -Force)

Write-Host ''
$secure = Read-Host "FTP password for $User" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try { $pw = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
$auth = 'user = ' + (Q "${User}:${pw}")
Remove-Variable pw

# one-time safety net: keep the old site's .htaccess before it is replaced
$backupDir = Join-Path (Split-Path $root -Parent) 'Karam Motors old-site-backup'
$backup = Join-Path $backupDir 'wordpress.htaccess'
if (-not (Test-Path $backup)) {
  New-Item -ItemType Directory -Force $backupDir | Out-Null
  Write-Host 'Backing up the old .htaccess...' -ForegroundColor Cyan
  @(
    $auth
    'url = ' + (Q "ftp://$Server/$RemoteDir/.htaccess")
    'output = ' + (Q ($backup -replace '\\', '/'))
  ) -join "`n" | curl.exe -sS --fail -K -
  if ($LASTEXITCODE -ne 0) {
    if (Test-Path $backup) { Remove-Item $backup }
    throw "Could not reach the server or log in (curl exit $LASTEXITCODE). Nothing was uploaded."
  }
  Write-Host "  saved to $backup"
}

Write-Host "Uploading $($files.Count) files to $Server/$RemoteDir ..." -ForegroundColor Cyan
$cfg = New-Object System.Collections.Generic.List[string]
$cfg.Add($auth)
$cfg.Add('ftp-create-dirs')
foreach ($f in $files) {
  $rel = $f.FullName.Substring($dist.Length + 1) -replace '\\', '/'
  $cfg.Add('upload-file = ' + (Q ($f.FullName -replace '\\', '/')))
  $cfg.Add('url = ' + (Q "ftp://$Server/$RemoteDir/$rel"))
}
($cfg -join "`n") | curl.exe -sS --fail -K -
$sent = $LASTEXITCODE
Remove-Variable auth, cfg

if ($sent -ne 0) { throw "Upload stopped with curl exit $sent - run the script again to retry." }
Write-Host ''
Write-Host 'Done. Open https://www.karammotors.co.za and press Ctrl+F5.' -ForegroundColor Green
