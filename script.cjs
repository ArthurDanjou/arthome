const fs = require('node:fs')
const path = require('node:path')

const filesToModify = [
  'node_modules/drizzle-orm/sqlite-core/columns/integer.js',
  'node_modules/drizzle-orm/sqlite-core/columns/integer.cjs',
]

filesToModify.forEach((file) => {
  const filePath = path.join(__dirname, file)
  console.log(`Checking path: ${filePath}`)

  if (fs.existsSync(filePath)) {
    let fileContent = fs.readFileSync(filePath, 'utf8')
    fileContent = fileContent.replace(
      'value.getTime()',
      'value',
    )
    fs.writeFileSync(filePath, fileContent, 'utf8')
    console.log(`Modified: ${file}`)
  }
  else {
    console.error(`File not found: ${filePath}`)
  }
})
