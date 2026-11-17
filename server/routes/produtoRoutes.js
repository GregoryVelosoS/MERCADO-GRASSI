// cria o roteador
const express = require("express");
const router = express.Router();

// IMPORTA O CONTROLLER
const produtoController = require("../controllers/produtoController.js")

// CRUD
// CHAMA A PÁGINA 
router.get("/", produtoController.renderizarCadastro)
// ENVIA AS INFORMAÇÕES DE CADASTRO
router.post("/cadastrar", produtoController.cadastrar)

module.exports = router