#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import figlet from 'figlet';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import ora from 'ora';
import boxen from 'boxen';

const mArgs = process.argv.slice(2);
const startTime = new Date().getTime();

if (mArgs.length === 0) {
  console.log(logSymbols.error, chalk.red('Invalid args...'));
  console.log(chalk.blue('Quick start...'));
  console.group();
  console.log(chalk.green('exp-ts .'), '(OR express-draft-ts .)');
  console.log(`installs in current directory (${process.cwd()})`);
  console.log('OR');
  console.log(chalk.green('exp-ts mApp'), '(OR express-draft-ts mApp)');
  console.log(
    `installs in "mApp" directory (${path.join(process.cwd(), 'mApp')})`
  );
  console.groupEnd();
  process.exit(1);
}

const rootDir = path.join(process.cwd(), mArgs[0]);

figlet('Exp-TS', { font: 'Ghost' }, (err: Error | null, data: string | undefined) => {
  if (err) {
    console.log('Something went wrong...');
    console.log(err);
    return;
  }
  console.log(chalk.green(data || 'Exp-TS'));
  const channelLink = 'https://github.com/dev-nii-nartey/express-draft-ts';
  const paypalLink = 'https://paypal.me/niijnr';
  
  const youtube = `${chalk.white('📺 Visit @')} ${chalk.red(channelLink)}`;
  const paypal = `${chalk.white('💰 Support @')} ${chalk.blue(paypalLink)}`;
  const header = `${youtube}\n${paypal}`;
  console.log(
    boxen(header, {
      borderColor: 'yellow',
      borderStyle: 'classic',
      align: 'left',
    })
  );
  createApp();
});

async function createApp(): Promise<void> {
  try {
    if (!(await fs.pathExists(rootDir))) {
      await fs.mkdir(rootDir);
    }

    const files = await fs.readdir(rootDir);
    if (files.length > 0) {
      console.log(
        logSymbols.error,
        `Path ${chalk.green(rootDir)} not empty, ${chalk.red('aborting')}`
      );
      return;
    }
    console.log('🚚 Bootstrapping TypeScript Express app in', chalk.green(rootDir), '\n');

    await installScript('npm', ['init', '-y'], 'Creating Package.json ...');
    await installScript(
      'npm',
      ['i', 'express', 'dotenv', 'http-errors', 'morgan'],
      'Installing dependencies ...'
    );
    await installScript(
      'npm',
      ['i', '--save-dev', 'nodemon', 'typescript', '@types/node', '@types/express', '@types/http-errors', '@types/morgan'],
      'Installing dev dependencies ...'
    );
    await copyFiles();
    await modifyPackageJson();
    await createTsConfig();
    done();
  } catch (error) {
    console.log(error);
  }
}

function installScript(command: string, args: string[], spinnerText: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const spinner = ora({ text: spinnerText, spinner: 'dots' }).start();
    const child = spawn(command, args, { cwd: rootDir, shell: true });
    
    child.on('exit', (code, signal) => {
      if (code) {
        spinner.fail();
        console.log(`Process exit with code: ${code}`);
        reject(`Process exit with code: ${code}`);
      } else if (signal) {
        spinner.fail();
        console.log(`Process exit with signal: ${signal}`);
        reject(`Process exit with signal: ${signal}`);
      } else {
        spinner.succeed();
        resolve();
      }
    });
  });
}

function copyFiles(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Pouring files ...').start();
    try {
      const srcAppTs = path.join(__dirname, '..', 'templates', 'app.ts');
      const destAppTs = path.join(rootDir, 'src', 'app.ts');
      
      // Create src directory
      await fs.mkdir(path.join(rootDir, 'src'));
      
      await fs.copyFile(srcAppTs, destAppTs);

      const srcEnv = path.join(__dirname, '..', 'templates', 'default.env');
      const destEnv = path.join(rootDir, '.env');
      await fs.copyFile(srcEnv, destEnv);

      const srcApiRoute = path.join(
        __dirname,
        '..',
        'templates',
        'api.route.ts'
      );
      const routePath = path.join(rootDir, 'src', 'routes');
      await fs.mkdir(routePath);
      const destApiRoute = path.join(routePath, 'api.route.ts');
      await fs.copyFile(srcApiRoute, destApiRoute);

      // Create types directory
      const typesPath = path.join(rootDir, 'src', 'types');
      await fs.mkdir(typesPath);
      
      // Copy express.d.ts
      const srcExpressDts = path.join(
        __dirname,
        '..',
        'templates',
        'express.d.ts'
      );
      const destExpressDts = path.join(typesPath, 'express.d.ts');
      await fs.copyFile(srcExpressDts, destExpressDts);

      spinner.succeed();
      resolve();
    } catch (error) {
      spinner.fail();
      reject(error);
    }
  });
}

function modifyPackageJson(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Creating scripts ...').start();
    try {
      const pkgSrc = path.join(rootDir, 'package.json');
      const pkgfile = await fs.readFile(pkgSrc, { encoding: 'utf-8' });
      let packageJson = JSON.parse(pkgfile);

      packageJson = {
        ...packageJson,
        main: 'dist/app.js',
        scripts: {
          build: "tsc",
          start: 'node dist/app.js',
          dev: 'nodemon --watch src --exec ts-node src/app.ts',
        },
        license: 'MIT',
      };
      
      // Add ts-node as a dev dependency
      await installScript(
        'npm',
        ['i', '--save-dev', 'ts-node'],
        'Installing ts-node ...'
      );

      const pkgDest = path.join(rootDir, 'package.json');
      await fs.writeFile(pkgDest, JSON.stringify(packageJson, null, 2));
      
      spinner.succeed();
      resolve();
    } catch (error) {
      spinner.fail();
      reject(error);
    }
  });
}

function createTsConfig(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const spinner = ora('Creating tsconfig.json ...').start();
    try {
      const tsConfig = {
        compilerOptions: {
          target: "ES2018",
          module: "CommonJS",
          outDir: "./dist",
          rootDir: "./src",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          resolveJsonModule: true
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "**/*.test.ts"]
      };

      const tsConfigPath = path.join(rootDir, 'tsconfig.json');
      await fs.writeFile(tsConfigPath, JSON.stringify(tsConfig, null, 2));
      
      spinner.succeed();
      resolve();
    } catch (error) {
      spinner.fail();
      reject(error);
    }
  });
}

function done(): void {
  console.log(chalk.yellow('------------------------------------'));
  console.log('Begin by typing:');
  console.group();
  console.log(chalk.blue('cd'), mArgs[0]);
  console.log(chalk.blue('npm run dev'));
  console.group();
  console.log('starts the development server (using nodemon + ts-node 🧐)');
  console.groupEnd();
  console.log(chalk.blue('npm run build'));
  console.group();
  console.log('builds the TypeScript files to JavaScript');
  console.groupEnd();
  console.log(chalk.blue('npm start'));
  console.group();
  console.log(`starts the server with the compiled JavaScript (using node 😁)`);
  console.groupEnd();
  console.groupEnd();
  console.log(chalk.yellow('------------------------------------'));

  const endTime = new Date().getTime();
  const timeDifference = (endTime - startTime) / 1000;
  console.log(`✅ Done in ${timeDifference} seconds ✨`);
  console.log('🌈 Happy hacking with TypeScript 🦄');
} 