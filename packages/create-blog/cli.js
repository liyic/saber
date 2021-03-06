#!/usr/bin/env node
const path = require('path')
const { promisify } = require('util')
const colors = require('kleur')

const args = process.argv.slice(2)

if (args.length === 0 || args.includes('--help')) {
  console.log(
    `create-blog v${require('./package').version}

Usage: create-blog <dir>
  `.trim()
  )
  process.exit(1)
}

if (parseInt(process.versions.node, 10) < 8) {
  console.log(
    `Node.js ${
      process.versions.node
    } isn't supported, you need Node.js 8 or above.`
  )
  process.exit(1)
}

const dir = path.resolve(args[0])

console.log(`Creating blog...`)

const { ncp } = require('ncp')

promisify(ncp)(path.join(__dirname, 'template'), dir)
  .then(() => {
    console.log(
      colors.green(`Successfully created a blog at ${colors.underline(dir)}`)
    )
    console.log(colors.bold(`To start dev server, run:`))
    console.log(colors.cyan(`$ cd ${path.relative(process.cwd(), dir)}`))
    console.log(colors.cyan(`$ npm install`))
    console.log(colors.cyan(`$ npm run dev`))
    console.log(colors.dim(`For more details, please check out the README.md`))
  })
  .catch(console.error)
