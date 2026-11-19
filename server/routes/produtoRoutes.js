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

// CHAMA A PÁGINA DE LISTA DE PRODUTOS
router.get("/listar", produtoController.listarTodosProdutos)

// EXCLUI UM PRODUTO
router.post("/excluir/:id", produtoController.excluirProduto) 

// UPDATE
// CHAMA A PÁGINA BUSCANDO AS INFORMAÇÕES DO PRODUTO
router.get("/editar/:id", produtoController.renderizarEditar)

// ATUALIZA COM AS NOVAS INFORMAÇÕES
router.post("/editar/:id", produtoController.editarProduto)

module.exports = router