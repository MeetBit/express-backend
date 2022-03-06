#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (error) {
    console.log(`Failed to execute ${command}`, error)
    return false
  }
  return true
}

const repoName = process.argv[2] ? process.argv[2] : 'my-server'

const gitCheckoutCommand = `git clone https://github.com/MeetBit/express-backend.git ${repoName}`
const renameCommand = `cd ${repoName} && node -e "let pkg=require('./package.json'); pkg.name='${repoName}'; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"`
const installDepsCommand = `cd ${repoName} && yarn`
const runDevComand = `cd ${repoName} && yarn dev`

console.log(`Cloning repository and creating ${repoName} project.`)
const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) process.exit(-1)

console.log(`Renaming project to ${repoName}`)
const renamed = runCommand(renameCommand)
if (!renamed) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) process.exit(-1)

console.log(`Express-Backend server created. Running ${repoName} server now.`)
const ranDev = runCommand(runDevComand)
if (!ranDev) process.exit(-1)
