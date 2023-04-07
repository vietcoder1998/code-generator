const {replaceMultiple} = require("../../lib")

exports.generateBaseIndex = function (indexData, importSource, controllerSource) {
    return replaceMultiple(indexData, [/{{importSource}}/, /{{controllerSource}}/], [importSource, controllerSource])
}