const fs = require('fs')

const s1 = 10000
const s2 = 10000

let data = Array.from({ length: s1 }, (_, i) =>
  Array.from({ length: s2 }, (_, j) => j)
)

data = JSON.stringify(data)

fs.writeFileSync('./data.json', data)
