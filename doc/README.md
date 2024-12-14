# Electron-JS
Desktop app browser through Chromium.
##  Technologies
-Typescript
-Electron
-React
-Vite
-Electron-Builder
## Start app
### Create React App
npm create vite .
npm i
### Modify some files
move all src content into new *ui* folder
modify index.html:
**<script type="module" src="/src/ui/main.tsx"></script>**
delete public folder
### Define Build
build: {
    outDir: "dist-react",
  }
### Install Electron
npm i --save-dev electron