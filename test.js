const bitmask = require('json-bitmask')
const parseMask = bitmask.from({
    ADMIN: 8
})

console.log(parseMask(8))