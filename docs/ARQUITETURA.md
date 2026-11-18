# Arquitetura do projeto

## Visão geral

O MERCADO-GRASSI é uma aplicação web server-side desenvolvida com Node.js e Express. As páginas são templates EJS renderizados pelo servidor, em vez de uma interface separada construída em React, Vue ou Angular.

O fluxo principal pode ser dividido assim:

```text
Usuário
  -> navegador
  -> Express
  -> rota
  -> controller
  -> model
  -> MySQL
  -> resultado
  -> controller
  -> EJS
  -> HTML no navegador
```

## Responsabilidade de cada camada

### Servidor

`server/server.js` é o ponto de entrada. Ele:

1. carrega `dotenv`;
2. lê `PORT`;
3. cria a aplicação Express;
4. define `EJS` como view engine;
5. aponta o diretório `client/views`;
6. aponta `client/public` como diretório de arquivos estáticos;
7. habilita leitura de JSON e formulários;
8. registra a rota inicial;
9. registra as rotas de produtos;
10. inicia o servidor;
11. testa a conexão com MySQL.

### Rotas

A pasta `server/routes/` transforma uma URL em uma chamada de controller.

No módulo de produtos, `produtoRoutes.js` possui:

- `GET /produtos`: abre o cadastro;
- `POST /produtos/cadastrar`: cadastra;
- `GET /produtos/listar`: lista;
- `POST /produtos/excluir/:id`: exclui.

Como `server.js` monta esse roteador com `app.use("/produtos", produtoRoutes)`, não é necessário repetir `/produtos` dentro das rotas internas.

### Controllers

A pasta `server/controllers/` interpreta a requisição e decide o que o usuário receberá. O controller não contém SQL diretamente; ele chama o model.

No cadastro, por exemplo, o controller:

1. obtém os campos de `req.body`;
2. converte `esta_ativo` em um valor booleano;
3. chama `produtoModel.criarProduto(...)`;
4. redireciona para `/`;
5. renderiza `erro.ejs` caso ocorra uma exceção.

### Models

A pasta `server/models/` contém o acesso ao banco. O model de produtos usa consultas SQL no pool criado em `server/config/db.js`.

O model:

- utiliza parâmetros `?` para evitar concatenar diretamente os valores na consulta;
- executa `INSERT`, `SELECT` ou `DELETE`;
- retorna o `insertId`, a lista de produtos ou nenhum resultado, conforme a operação.

### Views

A pasta `client/views/` contém os templates EJS. O controller passa dados para a view com `res.render`.

No cadastro, o formulário envia os campos por `POST` para `/produtos/cadastrar`. Na listagem, `produtos/listar.ejs` recebe uma variável `produtos` e usa `forEach` para criar uma linha por registro.

## Configuração do banco

`server/config/db.js` cria um pool MySQL com:

- `DB_HOST`;
- `DB_USER`;
- `DB_NAME`;
- `DB_PASSWORD`;
- limite de dez conexões;
- fila habilitada por `queueLimit: 0`.

Ao iniciar, `server.js` chama `pool.getConnection()`. Se a conexão falhar, mostra o erro no terminal e encerra o processo.

## Exemplo real: cadastro de um produto

### 1. Usuário abre o formulário

O usuário acessa `/produtos`. O Express combina o prefixo com `router.get("/")`, executando `produtoController.renderizarCadastro`.

O controller chama:

```js
res.render("produtos/cadastrar")
```

O EJS procura `client/views/produtos/cadastrar.ejs` e envia o HTML ao navegador.

### 2. Usuário envia o formulário

No template, o formulário possui:

```html
<form action="/produtos/cadastrar" method="post">
```

Ao clicar em cadastrar, o navegador envia os campos no corpo da requisição.

### 3. Express recebe o corpo

O middleware `express.urlencoded({ extended: true })` transforma os campos enviados pelo formulário em propriedades de `req.body`.

### 4. A rota chama o controller

No roteador:

```text
POST /produtos/cadastrar
       ->
produtoController.cadastrar
```

### 5. O controller prepara os dados

O controller obtém propriedades como `codigo_interno`, `nome`, `categoria`, `unidade_venda`, `preco`, `imagem` e `esta_ativo`.

Quando `esta_ativo` é `"1"` ou `"true"`, o valor se torna booleano verdadeiro. Esse valor é convertido pelo driver na operação MySQL conforme o código atual.

### 6. O controller chama o model

O controller chama:

```text
produtoModel.criarProduto(...)
```

### 7. O model executa o SQL

O model executa:

```sql
INSERT INTO tb_produtos(
    codigo_interno,
    nome,
    categoria,
    unidade_venda,
    preco,
    imagem,
    esta_ativo
)
VALUES (?, ?, ?, ?, ?, ?, ?)
```

Os valores não são concatenados diretamente na SQL. Eles são enviados separadamente ao `mysql2`, que trata os parâmetros da consulta.

### 8. O MySQL confirma a operação

O model recebe o resultado da execução e devolve `resultado.insertId`, que representa o identificador gerado pelo banco.

### 9. O usuário recebe a resposta

Em caso de sucesso, o controller responde com:

```text
redirect para /
```

O navegador acessa `/` e recebe a página inicial.

Em caso de erro, o controller executa:

```js
res.render("erro", {
  erro,
  mensagem: "Erro ao cadastrar o produto"
})
```

Isso combina a view `erro.ejs` com a mensagem e o objeto de erro.

## Exemplo real: listagem de produtos

1. O usuário acessa `/produtos/listar`.
2. `produtoRoutes.js` chama `produtoController.listarTodosProdutos`.
3. O controller chama `produtoModel.listarProdutos`.
4. O model executa `SELECT * FROM tb_produtos`.
5. O MySQL devolve as linhas encontradas.
6. O model retorna o array de resultados.
7. O controller renderiza `produtos/listar` e envia o array na propriedade `produtos`.
8. `listar.ejs` percorre o array e cria uma linha da tabela para cada produto.

## Exemplo real: exclusão de produto

1. O usuário clica no botão Excluir.
2. O formulário envia `POST` para `/produtos/excluir/<id>`.
3. A rota captura o ID com `req.params.id`.
4. O controller chama `produtoModel.excluirProduto(id)`.
5. O model executa `DELETE FROM tb_produtos WHERE id_produto = ?`.
6. Em sucesso, o controller redireciona para `/produtos/listar`.
7. Em erro, o controller renderiza `erro.ejs`.

## Fluxo dos módulos futuros

Usuários e ocorrências possuem diretórios e arquivos de entrada, mas os módulos estão vazios. Portanto, nenhuma requisição real pode ser mapeada para eles nesta versão.

As implementações futuras devem seguir a mesma arquitetura:

```text
View EJS
  -> rota
  -> controller
  -> model
  -> tabela MySQL
  -> controller
  -> view ou redirecionamento
```

## Pontos marcados como [VERIFICAR]

- **Versão do banco:** a versão de MySQL usada pelo ambiente não está registrada.
- **Usuários:** a implementação ainda será criada.
- **Ocorrências:** a implementação ainda será criada.
- **Login:** a view existe, mas não há fluxo de autenticação.
- **Sessões:** o pacote está instalado e será implementado futuramente.
- **Edição:** a view existe como exemplo, mas o fluxo completo ainda não existe.
