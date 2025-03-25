import validateNpmPackageName from 'validate-npm-package-name';

export function validatePackageName(name: string): boolean {
  return validateNpmPackageName(name).validForNewPackages;
}

export default validatePackageName; 