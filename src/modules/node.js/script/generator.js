const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')
const { generateModelTemplate } = require('../generator/model.generator')
const {
  generateControllerIndexTemplate,
  generateControllerImportIndex,
  generateMultiControllerToIndex,
  generateImportToIndex,
} = require('../generator/controller.generator')
const { getTemplateWithMethodAndMethodType } = require('../template')
const { generateBaseIndex } = require('../generator/base.generator')

exports.generateModel = async () => {
  let diagram = {}
  let lastEntity = ''
  let lastSourceIndex = ''

  fs.createReadStream(path.resolve(__dirname, '../../../data/schema.csv'))
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async (row) => {
      const [
        entity,
        schemaName,
        tableName,
        name,
        type,
        maxLength,
        refs,
        required,
        sourceIndex,
      ] = row

      if (sourceIndex && sourceIndex !== '') {
        lastSourceIndex = sourceIndex
      }

      const isNewEntity = entity && entity !== '' && entity !== lastEntity

      if (isNewEntity) {
        lastEntity = entity

        Object.assign(diagram, {
          [entity]: {
            schemaName,
            tableName,
            paramester: [
              {
                name,
                type,
                maxLength,
                refs,
                required,
              },
            ],
          },
        })
      } else {
        const paramester = diagram[lastEntity]?.paramester ?? {}
        diagram[lastEntity].paramester = [
          ...paramester,
          {
            type,
            maxLength,
            refs,
            required,
            name,
          },
        ]
      }
    })
    .on('error', function (err) {
      // do something with `err`
      console.log('Write error: ' + err)
    })
    .on('end', async function () {
      let modelTemplate = await fs.readFileSync(
        path.resolve(__dirname, '../template/server/models/base.txt'),
        'utf8',
      )

      Object.entries(diagram).forEach(
        async ([entity, { schemaName, tableName, paramester }]) => {
          const newModelTemplate = generateModelTemplate(
            modelTemplate,
            entity,
            schemaName,
            tableName,
            paramester,
          )

          const modelFileName = `${entity}.model.js`
          const modelDir = path.resolve(
            __dirname,
            lastSourceIndex,
            'models',
            modelFileName,
          )
          const isModelFileExist = await fs.existsSync(modelDir)

          if (!isModelFileExist) {
            fs.appendFileSync(modelDir, '')
          }

          await fs.writeFileSync(modelDir, newModelTemplate)

          console.log(`generated ${modelFileName} successfully ->`, modelDir)
        },
      )
    })
}

exports.generateController = async () => {
  let diagram = {}
  let lastEntity = ''
  let lastSourceIndex = ''

  fs.createReadStream(path.resolve(__dirname, '../../../data/routes.csv'))
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async (row) => {
      const [
        entity,
        schemaName,
        tableName,
        description,
        query,
        body,
        params,
        name,
        method,
        methodType,
        fullRoute,
        sourceIndex,
      ] = row

      if (sourceIndex && sourceIndex !== '') {
        lastSourceIndex = sourceIndex
      }
      const isNewEntity = entity && entity !== '' && entity !== lastEntity
      const template = await getTemplateWithMethodAndMethodType(
        method,
        methodType,
      )

      if (isNewEntity) {
        lastEntity = entity

        Object.assign(diagram, {
          [entity]: {
            schemaName,
            tableName,
            setup: [
              {
                description,
                query,
                body,
                params,
                name,
                method,
                methodType,
                fullRoute,
                template,
              },
            ],
          },
        })
      } else {
        const setup = diagram[lastEntity]?.setup ?? {}
        diagram[lastEntity].setup = [
          ...setup,
          {
            description,
            query,
            body,
            params,
            name,
            method,
            methodType,
            fullRoute,
            template,
          },
        ]
      }
    })
    .on('error', function (err) {
      // do something with `err`
      console.log('Write error: ' + err)
    })
    .on('end', async function () {
      Object.entries(diagram).forEach(
        async ([entity, { schemaName, tableName, setup }]) => {
          const newControllerTemplate = generateControllerIndexTemplate(
            entity,
            schemaName,
            tableName,
            setup,
          )
          const strRouter = generateMultiControllerToIndex(entity, setup)
          const strImport = generateImportToIndex(entity)
          const controllerFileName = `${entity}.controller.js`
          const controllerDir = path.resolve(
            __dirname,
            lastSourceIndex,
            'controllers',
            controllerFileName,
          )

          // write controller to index file
          const indexPath = path.resolve(__dirname, lastSourceIndex, 'index.js')
          const indexResource = path.resolve(
            __dirname,
            '../template/server/base',
            'index.txt',
          )
          const indexContext = await fs.readFileSync(indexResource).toString()
          const newIndexResource = generateBaseIndex(indexContext, strImport, strRouter)
          console.log(lastSourceIndex)
          await fs.writeFileSync(
            indexPath,
            newIndexResource,
            { encoding: 'utf8' },
          )

          // write to controller file
          const isControllerFileExist = await fs.existsSync(controllerDir)

          if (!isControllerFileExist) {
            fs.appendFileSync(controllerDir, '')
          }

          fs.writeFile(controllerDir, newControllerTemplate, (err) => {
            if (err) {
              console.error(err)
            }
          })

          console.log(
            `generated ${controllerFileName} successfully -> `,
            controllerDir,
          )
        },
      )
    })
}

this.generateModel()
this.generateController()
