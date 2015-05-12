# electron-starterify

:electric_plug: [Electron][electron] application skeleton based on [React][react]


## Usage

Install dependencies.

```sh
$ npm install
```

### Development

```sh
$ gulp watch
```

### Release (Deploy)

1. Set `release` [task option][opt] in `gulpfile.js` if you want.
  - Check [latest version of electron][latest]

2. Run
  ```sh
  $ gulp build
  ```

3. See `./release` directory


## Troubleshooting

- [Error: spawn zip ENOENT][issue1] on Windows


[electron]: http://electron.atom.io/
[react]: http://facebook.github.io/react/
[latest]: https://github.com/atom/electron/releases/latest
[opt]: https://github.com/mainyaa/gulp-electron#options
[issue1]: https://github.com/importre/electron-starterify/issues/1#issuecomment-101391136
