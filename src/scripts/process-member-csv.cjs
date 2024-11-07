const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
let sqlQuery = `
INSERT INTO member (first_name, middle_name, last_name, preferred_name, email, bmfa_number, membership_number) VALUES `

// eslint-disable-next-line no-undef
fs.createReadStream(path.resolve(`${__dirname}/../temp/members.csv`))
  .pipe(csv())
  .on('data', function (data) {
    try {
      sqlQuery += `('${data.FIRST_NAME}', '${data.MIDDLE_NAME}', '${data.LAST_NAME}', '${data.PREFERRED_NAME}', '${data.EMAIL}', '${data.BMFA_NUMBER}', '${data.MEMBERSHIP_NUMBER}'),`
    } catch (err) {
      console.error(err)
    }
  })
  .on('end', function () {
    console.log(sqlQuery)
  })
