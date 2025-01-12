const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 500,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: true,
        },
    });

    // Hide menu bar
    win.setMenuBarVisibility(false);

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173');
    } else {
        // Use file protocol for production
        win.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }

    // Prevent navigation to file:// URLs
    win.webContents.on('will-navigate', (event, url) => {
        if (url.startsWith('file://')) {
            event.preventDefault();
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
