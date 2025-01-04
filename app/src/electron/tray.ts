import { app, BrowserWindow, Menu, Tray } from 'electron';
import { getAssetPath } from "./pathResolver.js";
import path from "path"

export function createTray(mainwindow: BrowserWindow) {
  const tray = new Tray(
    path.join(
      getAssetPath(),
      process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png"
    )
  );

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainwindow.show();
          if (app.dock) {
            app.dock.show();
          }
        }
      },
      {
        label: "Exit",
        click: () => app.quit()
      }
    ])
  );
}