# office

Manipule documentos office e pdf

## .exe

# for use in npm scripts
npm install electron-packager --save-dev

# for use from cli
npm install electron-packager -g

electron-packager . --overwrite --platform=win32 --arch=x64 --

electron-packager . akumos --platform=win32 --arch=x64


electron-packager . akumos --overwrite --asar=true --platform=win32 --arch=ia32

electron-packager . akumos --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"


# electron package

npm install -g pkg
npm install --save-dev electron

electron-packager . akumos --overwrite --asar --platform=win32 --arch=ia32 --prune=true --out=release-builds

--icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\""