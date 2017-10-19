import numeral from 'numeral'

const courseValue =numeral(1000).format('$0.00')
console.log(`the course costs ${courseValue}`)
