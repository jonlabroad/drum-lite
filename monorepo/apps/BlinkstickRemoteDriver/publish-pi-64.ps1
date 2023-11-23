$version = "0.1.0"

dotnet publish -c Release -r linux-arm64 --self-contained

Set-Location -Path .\bin\Release\net8.0\linux-arm64\publish
Compress-Archive -Force -Path .\* -DestinationPath ..\..\..\..\..\BlinkstickRemoteDriverDotNet.zip
Set-Location -Path ..\..\..\..\..

gh release delete -y $version
gh release create $version --generate-notes --title "BlinkstickRemoteDriverDotNet $version" --notes "BlinkstickRemoteDriverDotNet $version"
gh release upload $version --clobber .\BlinkstickRemoteDriverDotNet.zip

