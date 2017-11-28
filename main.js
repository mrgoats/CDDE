const electron = require('electron');
const {
    app,
    BrowserWindow
} = electron;

app.commandLine.appendSwitch('--ignore-gpu-blacklist');

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});


app.on('ready', () => {

    let win = new BrowserWindow({
        width: 1366,
        height: 768
    });

    win.setMenu(null);

    win.loadURL(`file://${__dirname}/app/index.html`);

    win.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

});
