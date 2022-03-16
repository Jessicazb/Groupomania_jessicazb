const Sequelize = require ('sequelize');
const sequelize = new Sequelize("Groupomania","adm","hello",{
  user: 'adm',
  password: 'hello',
  database: "Groupomania",
  host: 'localhost',
  dialect:'mysql',
});

sequelize.authenticate()
.then(function(){
 console.log("connection db reussie!")
}).catch(function(){
    console.log("erreur db!")
})


module.exports = sequelize;