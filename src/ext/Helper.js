import moment from "moment"

export const parseDate = (dateString) => {
  var dateParsed = ""

  var parseAsDate = moment(dateString, 'YYYY-MM-DD');
  dateParsed = parseAsDate.format("MMM DD, YYYY")

  return dateParsed
}

export const splitDate = (dateString, expectDate) => {
  var dateParsed = ""

  var parseAsDate = moment(dateString, 'YYYY-MM-DD');
  dateParsed = parseAsDate.format(expectDate)

  return dateParsed
}