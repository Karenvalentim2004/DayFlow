const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // usuário do MySQL
  password: 'sua_senha', // senha do MySQL
  database: 'nome_do_seu_banco'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectado ao banco de dados com sucesso!");
});

module.exports = connection;