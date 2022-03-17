const path = require("path")

module.exports ={
    config: path.resolve(_dirname,'src', 'config','db.js'),
    "migrations-path":path.resolve(_dirname,'src', 'database','migrations')
}