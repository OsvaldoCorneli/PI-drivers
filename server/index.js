require("dotenv").config();
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');


const PORT = 3001;
const {DB_NAME} = process.env;

conn.sync({ force: true }).then(() => {
  console.log(`Connected to the ${DB_NAME} database`);
 
  
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

})
}).catch(error => console.error(error))
