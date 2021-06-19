const electron = require('electron');
const {
    BrowserWindow,
    app,
    ipcMain,
    Menu,
    dialog,
    globalShortcut
} = electron;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 1400, height: 900, show: false });
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

});



