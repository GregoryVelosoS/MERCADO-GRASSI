// cria o roteador
const express = require("express");
const router = express.Router();

// IMPORTA O CONTROLLER
const produtoController = require("../controllers/produtoController.js")

// rota geral
router.get("/", produtoController.renderizarCadastro)

// rota teste
router.get("/criar", produtoController.cadastrar)

module.exports = router