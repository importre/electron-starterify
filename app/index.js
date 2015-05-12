'use strict'

const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const MenuItem = require('menu-item');

// report crashes to the Electron project
require('crash-reporter').start();

// prevent window being GC'd
let mainWindow = null;
var menu = null;

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 768,
    resizable: true
  });

  mainWindow.loadUrl(`file://${__dirname}/index.html`);

  try {
    var bs = require("browser-sync").create();
    bs.watch(`${__dirname}/**/*`, function (event, file) {
      if (event == "change" && file.match(/(.css|.html|.js)$/g)) {
        mainWindow.reloadIgnoringCache();
      }
    });
  } catch (e) {
  }

  if (process.platform == 'darwin') {
    var darwinTmpl = [
      {
        label: 'Electron',
        submenu: [
          {
            label: 'About Electron',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide Electron',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function () {
              mainWindow.restart();
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: function () {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: function () {
              mainWindow.toggleDevTools();
            }
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click: function () {
              require('shell').openExternal('http://electron.atom.io')
            }
          },
          {
            label: 'Documentation',
            click: function () {
              require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme')
            }
          },
          {
            label: 'Community Discussions',
            click: function () {
              require('shell').openExternal('https://discuss.atom.io/c/electron')
            }
          },
          {
            label: 'Search Issues',
            click: function () {
              require('shell').openExternal('https://github.com/atom/electron/issues')
            }
          }
        ]
      }
    ];

    menu = Menu.buildFromTemplate(darwinTmpl);
    Menu.setApplicationMenu(menu);
  } else {
    var template = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O'
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: function () {
              mainWindow.close();
            }
          }
        ]
      },
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: function () {
              mainWindow.restart();
            }
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: function () {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          },
          {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: function () {
              mainWindow.toggleDevTools();
            }
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click: function () {
              require('shell').openExternal('http://electron.atom.io')
            }
          },
          {
            label: 'Documentation',
            click: function () {
              require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme')
            }
          },
          {
            label: 'Community Discussions',
            click: function () {
              require('shell').openExternal('https://discuss.atom.io/c/electron')
            }
          },
          {
            label: 'Search Issues',
            click: function () {
              require('shell').openExternal('https://github.com/atom/electron/issues')
            }
          }
        ]
      }
    ];

    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }


  mainWindow.on('closed', function () {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
  });
});
