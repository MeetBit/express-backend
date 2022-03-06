#!/usr/bin/env node

const { execSync } = require('child_process')

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (error) {
    console.log(`Failed to execute ${command}`, e)
    return false
  }
  return true
}


const repoName = process.argv[2] ? process.argv[2] : 'my-server'
const gitCheckoutCommand = `git clone https://github.com/MeetBit/express-backend.git ${repoName}`
const installDepsCommand = `cd ${repoName} && yarn`
const runDevComand = `yarn dev`

console.log(`Cloning repository and creating ${repoName} project.`)
const checkedOut = runCommand(gitCheckoutCommand)
if (!checkedOut) process.exit(code: -1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand)
if (!installedDeps) process.exit(code: -1)

console.log(`Express-Backend server created. Running ${repoName} server now.`)
const ranDev = runCommand(runDevComand)
if (!ranDev) process.exit(code: -1)