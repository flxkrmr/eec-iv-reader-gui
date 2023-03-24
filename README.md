# EEC IV Reader GUI

GUI for the EEC IV Reader: https://github.com/flxkrmr/eec-iv-reader-arduino

Download Installer https://github.com/flxkrmr/eec-iv-reader-gui/releases/latest

Tested on Windows 10.

## Usage

When GUI ist started, connect Reader with USB and press "Connect". The Reader should restart on connection. Then select a mode on the Reader. The GUI will show when a reading has started and display the results.

## Commands
### Local startup
```
npm install
npm run start
```
### Creating installer
```
npm run make
```
### Publish Release draft to Github
```
set GITHUB_TOKEN=xxx
npm run publish
```
