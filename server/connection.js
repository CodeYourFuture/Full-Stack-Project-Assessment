const { Pool } = require("pg");

//PGPASSWORD=EHnGlVF3h1gp9qjlT9haETZq3JN0qyXX psql -h dpg-cea4bqda4996meackcmg-a.oregon-postgres.render.com -U anthony guidedb
//"Server=heffalump.db.elephantsql.com;Port=5432;Database=xbixatua;UserId=xbixatua;Password=MZpFuYnavsnJw65QqMIG9JtHM29yqMz6"

const client = new Pool({
    host: "heffalump.db.elephantsql.com",
    user: "xbixatua",
    database: "xbixatua",
    password: "MZpFuYnavsnJw65QqMIG9JtHM29yqMz6",
    port: 5432
})

module.exports = client;