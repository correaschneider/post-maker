const fs = require('fs')
const contentFilePath = `./content/content${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}.json`

function save(content) {
  const contentString = JSON.stringify(content, '', 4)
  return fs.writeFileSync(contentFilePath, contentString)
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
  const contentJson = JSON.parse(fileBuffer)
  return contentJson
}

module.exports = {
  save,
  load
}