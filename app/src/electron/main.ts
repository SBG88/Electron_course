import { app, BrowserWindow, Tray } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123")
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  })

  new Tray(path.join(getAssetPath()), process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png");
});