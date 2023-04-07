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
  ].reduce((a, b) => a + (b ? b : ''), '')
}

exports.generateModelTemplate = (
  modelTemplate,
  entity,
  schemaName,
  tableName,
  paramester,
) => {
  // with modelgenerate
  modelTemplate = modelTemplate.replace(/{{(s|schemaName)}}/gm, schemaName)
  modelTemplate = modelTemplate.replace(
    /{{(s|paramester)}}/gm,
    this.generateDefineParamester(paramester),
  )
  modelTemplate = modelTemplate.replace(/{{(s|tableName)}}/gm, tableName)
  modelTemplate = modelTemplate.replace(/{{entity}}/gm, entity)

  return modelTemplate
}

exports.generateDefineParamester = (paramester) => {
  return paramester.reduce(
    (a, b) =>
      a +
      (b && b.name ? `\n${b.name} :{${this.generateSingleTemplate(b)}},` : ''),
    '',
  )
}

exports.generateSingleTemplate = ({ type, maxLength, refs, required }) => {
  let template = ''

  if (!type || type === '') {
    return ''
  }
  if (type && type !== '') {
    template += `type: ${this.gerateDefineModel(type)},`
  }

  if (maxLength && maxLength !== '') {
    template += `maxLength: ${maxLength},`
  }

  if (refs && refs !== '') {
    template += `refs: "${refs}",`
  }

  if (required && required !== '') {
    template += `required: true,`
  }

  return `${template}`
}
