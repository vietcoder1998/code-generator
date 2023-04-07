const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')

let lastSourceIndex = '../example'

exports.destroy = () => {
  fs.createReadStream(path.resolve(__dirname, '../../../data/routes.csv'))
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async (row) => {
      const [entity] = row
      const sourceIndex = row ? row[row.length - 1] : ''
      if (sourceIndex) {
        lastSourceIndex = sourceIndex
      }
      const modelFileName = `${entity}.model.js`
      const controllerFileName = `${entity}.controller.js`
      const modelDir = path.resolve(
        __dirname,
        lastSourceIndex,
        'models',
        modelFileName,
      )
      const controllerDir = path.resolve(
        __dirname,
        lastSourceIndex,
        'controllers',
        controllerFileName,
      )
      const isModelFileExist = await fs.existsSync(modelDir)
      const isControllerFileExist = await fs.existsSync(controllerDir)

      if (isModelFileExist) {
        fs.unlinkSync(modelDir, '')
      }

      if (isControllerFileExist) {
        fs.unlinkSync(controllerDir, '')
      }

      console.log(`delete ${controllerFileName} success! -> `, controllerDir)
    })
    .on('error', function (err) {
      // do something with `err`
      console.log('Write error: ' + err)
    })
}

this.destroy()
