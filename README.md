```bash
   ('-.  ) (`-.       _ (`-.
 _(  OO)  ( OO ).    ( (OO  )
(,------.(_/.  \_)-._.`     \      _______  _____
 |  .---' \  `.'  /(__...--''     |__   __||  ___|
 |  |      \     /\ |  /  | |        | |   | |___ 
(|  '--.    \   \ | |  |_.' |        | |   |___  |
 |  .--'   .'    \_)|  .___.'        | |    ___| |
 |  `---. /  .'.  \ |  |             |_|   |_____|
 `------''--'   '--'`--'
```


# Express API Scaffolding with TypeScript (express-draft-ts)

This is a no-nonsense and minimal Express.js application generator with TypeScript support, which can be used as a starting point for any express application.

## Installation 🏭

```bash
$ npm install -g express-draft-ts
```

## Why TypeScript? 🤔

TypeScript offers several advantages:

1. **Type Safety**: Catch errors at compile time rather than at runtime
2. **Better IDE Support**: Improved code completion, navigation, and refactoring
3. **Self-Documenting Code**: Types serve as documentation
4. **Better Scalability**: Makes the codebase more maintainable as it grows

## Quick Start 🏃‍♂️

The quickest way to get started with express-ts is to utilize the executable `exp-ts` (OR `express-draft-ts`) to generate an application as shown below:

Create (and start) the app in current folder:

```bash
$ exp-ts .
$ cd .
$ npm run dev
```

OR, create (and start) the app (in `myApp` folder):

```bash
$ exp-ts myApp
$ cd myApp
$ npm run dev
```

This will basically create this structure in your folder:

```bash
.
├── .env
├── src
│   ├── app.ts
│   └── routes
│       └── api.route.ts
├── dist (after building)
├── node_modules
├── package-lock.json
├── package.json
└── tsconfig.json
```

This is how easy it is to get going with TypeScript and Express!

## What dependencies it installs?

- **express** - express framework
- **dotenv** - for env variables
- **http-errors** - to create http errors
- **morgan** - to log http requests

Dev dependencies:
- **typescript** - for TypeScript support
- **@types/express** - type definitions for Express
- **@types/node** - type definitions for Node.js
- **@types/http-errors** - type definitions for http-errors
- **@types/morgan** - type definitions for morgan
- **nodemon** - monitors changes in files

## Command Line Options

Currently none required - just provide the directory name where you want to generate the project.

## License 🎫

[MIT](LICENSE)

## Contribute 🤝

You can fork this repo and send a PR. 