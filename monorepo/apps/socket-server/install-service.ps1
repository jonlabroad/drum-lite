# Check if Chocolatey is already installed, and if not, install it
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
  Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# Check if Python is already installed, and if not, install it
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  choco install python -y --version=3.10
} elseif ((python --version 2>&1) -notlike 'Python 3.10*') {
  choco install python -y --version=3.10 --force
}

# Check if Pipenv is already installed, and if not, install it
if (-not (Get-Command pipenv -ErrorAction SilentlyContinue)) {
  python -m pip install pipenv
} elseif ((python --version 2>&1) -notlike 'Python 3*') {
  choco install python -y
}

# Check if NSSM is already installed
if (-not (Get-Command nssm.exe -ErrorAction SilentlyContinue)) {
  # Install NSSM using Chocolatey
  Write-Host "NSSM is not installed. Installing NSSM using Chocolatey..."
  choco install nssm -y
}

pip install pipenv

# Get the working directory of the script
$WorkingDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path

# Define variables
$ServiceName = "DrumSocketService"
$ServicePath = Join-Path $WorkingDirectory "run_service.bat"
$ServiceDir = $WorkingDirectory

# Install the service using NSSM
Start-Process -Wait -NoNewWindow -FilePath "nssm.exe" -ArgumentList "install $ServiceName `"$ServicePath`""
Start-Process -Wait -NoNewWindow -FilePath "nssm.exe" -ArgumentList "set $ServiceName AppDirectory `"$ServiceDir`""
#Start-Process -Wait -NoNewWindow -FilePath "nssm.exe" -ArgumentList "set $ServiceName AppParameters `""`"
Start-Process -Wait -NoNewWindow -FilePath "nssm.exe" -ArgumentList "start $ServiceName"
Start-Process -Wait -NoNewWindow -FilePath "nssm.exe" -ArgumentList "set $ServiceName AppStdout C:\temp\$ServiceName.txt"
Start-Process -Wait -NoNewWindow -FilePath "nssm.exe" -ArgumentList "set $ServiceName AppStderr C:\temp\$ServiceName.txt"

# Set service startup type to "Automatic"
Start-Process -Wait -NoNewWindow -FilePath "sc.exe" -ArgumentList "config $ServiceName start= auto"

# Configure service recovery options
Start-Process -Wait -NoNewWindow -FilePath "sc.exe" -ArgumentList "failure $ServiceName reset= 0 actions= restart/60000"
