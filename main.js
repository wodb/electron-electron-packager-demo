const {app,BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let mainWindow = null

app.on('ready',() => {
	mainWindow = new BrowserWindow({
		width:1200,
		height:800
	})
	mainWindow.loadURL(url.format({
		pathname:path.join(__dirname,'/app/index.html'),
		protocol:'file:',
		slashes:true
	}))
})

app.on('close', () => {
	mainWindow = null
})

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit()
	}
})