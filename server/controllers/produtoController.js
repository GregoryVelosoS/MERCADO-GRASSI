// IMPORTANDO O MODEL
const produtoModel = require("../models/produtoModel.js")

module.exports = {
    // CRUD

    // CREATE
    // ACESSAR A PÁGINA DE CADASTRO
    renderizarCadastro: (req,res) =>{
        res.render("produtos/cadastrar")
    },
    // CADASTRA O PRODUTO
    cadastrar: async (req,res) =>{
       try{
        // PEGAR AS INFORMAÇÕES DO BODY
        const {codigo_interno, nome, categoria, unidade_venda, preco, imagem, esta_ativo } = req.body

        // CONVERSÃO DO ESTADO DO PRODUTO
        const publico_bool = esta_ativo === "1" || esta_ativo === "true"

        // CHAMA O MODEL PARA ATIVAR A EXECUÇÃO NO BANCO DA FUNÇÃO DE CRIAÇÃO
        await produtoModel.criarProduto(codigo_interno, nome, categoria, unidade_venda, preco, imagem, publico_bool)

        // REDIRECIONA O USUÁRIO
        res.redirect("/")
       }
       catch(erro){
        console.log(erro);
        res.render("erro", {erro, mensagem: "Erro ao cadastrar o produto"})
       }
    },
    // PEDE A LISTA DE PRODUTOS PRO MODEL, E RENDERIZA A PÁGINA COM A LISTA 
    listarTodosProdutos: async (req, res) => {
        try{

            // SOLICITA AO MODEL A LISTA
            const produtos = await produtoModel.listarProdutos()

            // RENDERIZA A PÁGINA DE LISTA, MANDANDO A LISTA PRA ELA 
            res.render("produtos/listar", { produtos })
        }
        catch(erro){
            console.log(erro);
            res.render("erro", {erro, mensagem: "Erro ao listar os produtos"})
        }
    },
    // EXCLUIR UM PRODUTO
    excluirProduto: async (req, res) => {
        try{
            // PEGA O ID, VINDO DA URL
            const id = req.params.id;

            // SOLICITA AO MODEL A EXCLUSÃO
            await produtoModel.excluirProduto(id)

            // REDIRECIONA O USUÁRIO
            res.redirect("/produtos/listar")

        }
        catch(erro){
            console.log(erro);
            res.render("erro", {erro, mensagem: "Erro ao excluir um produto"})
        }
    },

    // ATUALIZAR
    renderizarEditar: async (req,res) => {
        try{
            // PEGA O ID, VINDO DA URL
            const idVindoDaUrl = req.params.id;

            // BUSCA AS INFORMAÇÕES
            const produto = await produtoModel.buscarPorId(idVindoDaUrl)

            // RENDERIZA A PÁGINA, PASSANDO O PRODUTO COMO OBJETO
            console.log(produto);
            
            res.render("produtos/editar", { produto })
        }
        catch(erro){
            console.log(erro);
            res.render("erro", {erro, mensagem: "Erro ao buscar um produto"})
        }
    },
    editarProduto: async (req,res) => {
        try{
            // PEGA O ID, VINDO DA URL
            const id = req.params.id;

            // PEGAR AS INFORMAÇÕES DO BODY
            const {codigo_interno, nome, categoria, unidade_venda, preco, imagem, esta_ativo } = req.body

            // CONVERSÃO DO ESTADO DO PRODUTO
            const publico_bool = esta_ativo === "1" || esta_ativo === "true"

            // CHAMA O MODEL PARA ATIVAR A EXECUÇÃO NO BANCO DA FUNÇÃO DE CRIAÇÃO
            await produtoModel.editarProduto(id, codigo_interno, nome, categoria, unidade_venda, preco, imagem, publico_bool)

            // RENDERIZA A PÁGINA
            res.redirect("/produtos/listar")
        }
        catch(erro){
            console.log(erro);
            res.render("erro", {erro, mensagem: "Erro ao editar um produto"})
        }
    } 
}