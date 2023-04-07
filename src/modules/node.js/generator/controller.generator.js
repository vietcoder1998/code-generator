const { replaceMultiple } = require('../../lib')
const { getTemplateWithMethodAndMethodType } = require('../template/index')

exports.generateSingleImport = function (schemaName, entity) {
  return `const ${schemaName} = require('../models/${entity}.model')`
}

exports.generateMultiImport = function (importList) {
  return importList.map(function ({ schemaName, entity }) {
    return generateSingleport(schemaName, entity)
  })
}

exports.generateBody = function (body) {
  return body ? `\t\nconst{ ${body} } = req.body ` : null
}

exports.generateParams = function (params) {
  return params ? `\t\nconst{ ${params} } = req.path ` : null
}

exports.generateQuery = function (query) {
  return query ? `\t\nconst{ ${query} } = req.query ` : null
}

exports.gerateDefineModel = function (define) {
  if (!define) {
    return '{}'
  }
  let newDefine = define.replace('objectId', 'Schema.Types.ObjectId')
  newDefine = newDefine.replace('string', 'String')

  return newDefine
}

exports.generateDefineInit = (query, body, params) => {
  return [
    this.generateBody(body),
    this.generateQuery(query),
    this.generateParams(params),
  ].reduce((a, b) => a + (b ? b : ''), '\t')
}

exports.generateUpdateBody = function (body) {
  return `${body.toString()}`
}

exports.generateControllerTemplate = (entity, schemaName, tableName, setup) => {
  return setup.reduce(
    (a, b) =>
      a +
      (b && b.name
        ? `\n${this.generateSingleModule(
            b.template,
            entity,
            tableName,
            schemaName,
            b,
          )}`
        : ''),
    '',
  )
}

exports.generateSingleModule = function (
  template,
  entity,
  tableName,
  schemaName,
  { name, query, body, params },
) {
  return replaceMultiple(
    template,
    [
      /{{defineInit}}/gm,
      /{{description}}/gm,
      /{{(s|schemaName)}}/gm,
      /{{(s|tableName)}}/gm,
      /{{(s|name)}}/gm,
      /{{(entity)}}/gm,
      /{{updateBody}}/gm,
    ],
    [
      this.generateDefineInit(query, body, params),
      entity,
      schemaName,
      tableName,
      name,
      entity,
      body.toString(),
    ],
  )
}

exports.generateControllerIndexTemplate = (
  entity,
  schemaName,
  tableName,
  setup,
) => {
  const strImport = `${this.generateSingleImport(schemaName, entity)}\n`
  const contextImport = `\n${this.generateControllerTemplate(
    entity,
    schemaName,
    tableName,
    setup,
  )}`

  return strImport + contextImport
}

exports.generateMultiControllerToIndex = (entity, setup) => {
  let router = setup.reduce(
    (a, b) =>
      a +
      (b
        ? `\n ${this.generateSingleControllerToIndex(
            entity,
            b.method,
            b.name,
            b.fullRoute,
          )}`
        : ''),
    '',
  )

  return router
}

exports.generateSingleControllerToIndex = (entity, method, name, fullRoute) => {
  console.log('generateSingleControllerToIndex', entity, name)

  if (!fullRoute) {
    return ''
  }

  const controllerName = `${entity}Controller.${name}`
  return `app.${method.toLowerCase()}("${fullRoute}", ${controllerName})`
}

exports.generateImportToIndex = (entity) => {
  return `const ${entity}Controller = require("./controllers/${entity}.controller.js")`
}
