/**
 * [forEach description]
 *
 * @param   {String | undefined}  input  value of replace
 * @param   { String[] | Regex[]}  regexList list of regex or replace values
 *
 * @return  {String}        new Input return
 */

exports.replaceMultiple = (input, regexList, dataList) => {
  regexList.forEach((regex, index) => {
    input = input.replace(regex, dataList[index])
  })

  return input
}
