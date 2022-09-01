# CluckCluckGo
A non-tracking modern Web browser.

# Development

## Running

Please ensure you have **latest** [`Node.js`](https://nodejs.org/en/) and [`Yarn`](https://classic.yarnpkg.com/en/docs/install/#windows-stable) installed on your machine.


Make sure you have build tools installed. You can install them by running this command as **administrator**:

```bash
npm i -g @electron/build-tools
```

```bash
yarn
yarn rebuild
yarn dev
```

## Packaging

MacOS:

```bash
yarn compile-darwin
```

Windows:

```bash
yarn compile-win32
```

Linux:

```bash
yarn compile-linux
```

