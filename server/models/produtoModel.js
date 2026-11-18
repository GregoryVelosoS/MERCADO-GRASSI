// IMPORTAR AS CONFIGURAÇÕES DO BANCO
const db = require("../config/db.js")

module.exports = {
    // CREATE
    // funcao de criar o produto, passando as informações vinda do controller
    criarProduto: async (codigo_interno, nome, categoria, unidade_venda, preco, imagem, esta_ativo) =>{
        // QUERY PARA FAZER A OPERAÇÃO NO BANCO
        const sql = `INSERT INTO tb_produtos(codigo_interno, nome, categoria, unidade_venda, preco, imagem, esta_ativo)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`

        // FAZ A OPERAÇÃO, E RETORNA O ID DO PRODUTO INSERIDO
        const [resultado] = await db.execute(sql, [codigo_interno, nome, categoria, unidade_venda, preco, imagem, esta_ativo])

        // RETORNAR O ID DO PRODUTO INSERIDO
        return resultado.insertId
    },
    // READ
    listarProdutos: async () => {
        // QUERY PARA FAZER A OPERAÇÃO NO BANCO
        const sql = `SELECT * FROM tb_produtos`

        // FAZ A OPERAÇÃO, E RETORNA A LISTA DE PRODUTOS 
        const [resultado] = await db.execute(sql)

        // RETORNAR A LISTA DE PRODUTOS
        return resultado
    },
    // DELETE 
    excluirProduto: async (id) =>{
        // QUERY PARA FAZER A OPERAÇÃO NO BANCO
        const sql = `DELETE FROM tb_produtos WHERE id_produto = ?` 

        // FAZ A OPERAÇÃO
        await db.execute(sql,[id])
    }
}