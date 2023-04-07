const path = require('path')
const fs = require('fs')
/**
 * Switches template with method and type of method
 * @param { "GET" | "POST" | "DELETE" | "PUT"} method
 * @param { undefined | "single" | "multiple" } methodType
 *
 * @return { String }
 */

exports.getTemplateName = (method, methodType) => {
  const baseName = `.controller.txt`

  const actionName = (() => {
    switch (method) {
      case 'GET':
        return 'request'
      case 'POST':
        return 'update'
      case 'DELETE':
        return 'delete'
      case 'GET':
        return 'request'
      default:
        return 'request'
    }
  })()
  const actionTypeName = (() => {
    switch (methodType) {
      case '':
        return ''

      case 'single':
        return ''
      case 'multiple':
        return '-many'

      default:
        return ''
    }
  })()

  return `${actionName}${actionTypeName}${baseName}`
}

/**
 * Switches template with method and type of method
 * @param { "GET" | "POST" | "DELETE" | "PUT"} method
 * @param { undefined | "single" | "multiple" } methodType
 *
 * @return { Promise<String> }
 */


exports.getTemplateWithMethodAndMethodType = async (method, methodType) => {
  const templateName = this.getTemplateName(method, methodType)
  const template = await fs
    .readFileSync(path.resolve(__dirname, './server/controllers/' + templateName), {
      encoding: 'utf8',
    })

  return template
}
