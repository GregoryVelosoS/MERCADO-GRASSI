// USA AS INFOS DO .ENV
require("dotenv").config();

// CONFIGURAÇÃO INICIAL DO SERVIDOR
const express = require("express");
const app = express();
const port = process.env.PORT;

// IMPORTAR O MÓDULO DE CAMINHOS 
const path = require("path")

// CONFIGURAR O EJS
app.set("view engine", "ejs")
// APONTA PRO EJS ONDE ESTÃO AS PÁGINAS
app.set("views", path.join(__dirname, "../client/views"))
// DEIXA A PASTA PUBLIC VISÍVEL AO EXPRESS
app.use(express.static(path.join(__dirname,"../client/public")))

// ROTA INICIAL DO SERVIDOR
app.get("/", (req, res) => {
  res.render('index')
});

// IMPORTA AS SUBROTAS DE PRODUTO
const produtoRoutes = require("./routes/produtoRoutes.js")
app.use("/produtos", produtoRoutes)

// SOBE O SERVIDOR
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// CONECTA O BANCO
const pool = require("./config/db.js");
(async () => {
  try {
    // Se o banco estiver ativo, tenta conectar
    await pool.getConnection();
    console.log("Banco conectado");
  } catch (erro) {
    // Se deu erro ao conectar ao banco, já finaliza
    console.log(erro);
    console.log("Erro ao conectar ao banco");
    process.exit(1);
  }
})();
