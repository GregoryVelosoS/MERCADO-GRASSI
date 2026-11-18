# Guia de desenvolvimento

Este guia explica como preparar o projeto MERCADO-GRASSI do zero e como criar uma nova rota e uma view EJS seguindo a arquitetura existente.

## 1. Preparar o ambiente

Instale:

- Node.js;
- npm;
- Git;
- MySQL;
- VS Code ou outro editor.

As versões exatas não estão fixadas no projeto e devem ser escolhidas pelo ambiente da equipe.

## 2. Obter o projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd MERCADO-GRASSI
```

Não existe um pacote npm na raiz. O pacote da aplicação está em `server/`.

## 3. Criar o arquivo de ambiente

No diretório `server/`, crie `.env`:

```env
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

Não grave valores reais neste guia ou em commits.

- `PORT`: porta usada pelo Express.
- `DB_HOST`: endereço do MySQL.
- `DB_USER`: usuário de banco.
- `DB_PASSWORD`: senha do usuário.
- `DB_NAME`: banco usado pela aplicação.

O arquivo é carregado por `dotenv.config()` em `server/server.js`.

## 4. Criar o banco

Abra o cliente MySQL e execute `data/banco.sql`.

O script atual cria:

- o banco `db_mercado_grassi`;
- `tb_usuarios`;
- `tb_produtos`;
- `tb_ocorrencias`;
- registros iniciais de exemplo.

Se o script for atualizado no repositório, execute novamente a versão mais recente no ambiente local.

## 5. Instalar dependências

```bash
cd server
npm install
```

O npm usa `server/package.json` e `server/package-lock.json`.

## 6. Iniciar em desenvolvimento

```bash
npm run server
```

Esse script usa Nodemon e reinicia o servidor ao detectar mudanças.

Alternativamente:

```bash
npm start
```

Esse modo usa Node diretamente.

No navegador, use:

```text
http://localhost:<PORTA_CONFIGURADA>
```

## 7. Entender a estrutura

```text
server/server.js
  Inicializa Express e registra os módulos de rota

server/routes/
  Associa URL e método HTTP ao controller

server/controllers/
  Lê dados da requisição e escolhe o retorno

server/models/
  Executa operações SQL

server/config/db.js
  Cria o pool MySQL

client/views/
  Contém os templates EJS

client/public/
  Contém arquivos públicos, quando forem adicionados
```

## 8. Seguir o padrão existente

Uma funcionalidade completa deve usar estas quatro partes:

1. `view` EJS;
2. rota;
3. controller;
4. model.

O fluxo recomendado é:

```text
EJS -> rota -> controller -> model -> MySQL -> controller -> EJS
```

## 9. Criar uma rota de exemplo

Para este exemplo, adicionaremos uma página simples chamada **Status**. O objetivo é ensinar o padrão sem afirmar que essa página já existe no projeto.

### Passo 1: criar a view

Crie `client/views/status.ejs`:

```ejs
<%- include('partials/header') %>

<main class="container">
  <h1>Status do sistema</h1>
  <p><%= mensagem %></p>
</main>

<%- include('partials/footer') %>
```

### Passo 2: criar o roteador

Crie `server/routes/statusRoutes.js`:

```js
const express = require("express");
const router = express.Router();

const statusController = require("../controllers/statusController.js");

router.get("/", statusController.renderizarStatus);

module.exports = router;
```

### Passo 3: criar o controller

Crie `server/controllers/statusController.js`:

```js
module.exports = {
  renderizarStatus: (req, res) => {
    res.render("status", {
      mensagem: "Servidor funcionando"
    });
  }
};
```

### Passo 4: registrar a rota no servidor

Em `server/server.js`, após o registro das rotas existentes, adicione:

```js
const statusRoutes = require("./routes/statusRoutes.js");
app.use("/status", statusRoutes);
```

A página ficaria disponível em:

```text
GET /status
```

Este exemplo não envolve banco de dados. Para consultas SQL, o próximo passo seria criar um model e injetá-lo no controller.

## 10. Criar uma rota com model

Considere uma tabela já existente e um model que execute uma consulta segura.

Exemplo de controller:

```js
const statusModel = require("../models/statusModel.js");

module.exports = {
  listarStatus: async (req, res) => {
    try {
      const registros = await statusModel.listar();
      res.render("status", { registros });
    } catch (erro) {
      res.render("erro", {
        erro,
        mensagem: "Erro ao listar status"
      });
    }
  }
};
```

Exemplo de model:

```js
const db = require("../config/db.js");

module.exports = {
  listar: async () => {
    const sql = "SELECT * FROM nome_da_tabela";
    const [resultado] = await db.execute(sql);
    return resultado;
  }
};
```

Substitua `nome_da_tabela` por uma tabela real antes de usar o exemplo.

## 11. Criar um formulário

Um formulário HTML envia dados para uma rota:

```html
<form action="/produtos/cadastrar" method="post">
  <input type="text" name="nome" required>
  <button type="submit">Cadastrar</button>
</form>
```

Para ler esses dados no Express:

```js
const nome = req.body.nome;
```

O middleware necessário já está configurado em `server/server.js`:

```js
app.use(express.urlencoded({ extended: true }));
```

## 12. Criar uma rota POST segura

No roteador:

```js
router.post("/exemplo", exemploController.cadastrar);
```

No model, use parâmetros:

```js
await db.execute(
  "INSERT INTO tabela_exemplo (nome) VALUES (?)",
  [nome]
);
```

Não faça:

```js
"INSERT INTO tabela_exemplo (nome) VALUES ('" + nome + "')"
```

Esse modelo inseguro permite conteúdo inesperado ou SQL malicioso.

## 13. Criar um componente EJS reutilizável

No projeto, componentes reutilizáveis são feitos como partials dentro de `client/views/partials/`.

Exemplo de `client/views/partials/alerta.ejs`:

```ejs
<div class="alert alert-info" role="alert">
  <%= mensagem %>
</div>
```

Para usar:

```ejs
<%- include('partials/alerta', { mensagem: 'Cadastro concluído' }) %>
```

Os arquivos existentes `header.ejs` e `footer.ejs` seguem a mesma ideia.

## 14. Criar a funcionalidade de edição planejada

A view `editar.ejs` já existe como estrutura. Para finalizar a edição:

1. adicionar uma rota `GET /produtos/editar/:id`;
2. adicionar uma rota `POST /produtos/editar/:id`;
3. criar funções no controller;
4. criar uma consulta de busca no model;
5. criar uma consulta de atualização no model;
6. preencher o formulário com os dados buscados;
7. redirecionar para a listagem após salvar.

Deve-se usar o padrão de parâmetros `?` em todas as consultas MySQL.

## 15. Implementar usuários

Os arquivos de usuários estão vazios e ainda serão implementados. Ao criá-los:

- mantenha o padrão rota, controller e model;
- use `tb_usuarios`;
- registre o módulo em `server.js`;
- crie primeiro a estrutura da view;
- valide se o módulo precisa de login ou sessão antes de adicioná-lo.

## 16. Implementar ocorrências

Os arquivos de ocorrências estão vazios e ainda serão implementados. Ao criá-los:

- mantenha o padrão rota, controller e model;
- use `tb_ocorrencias`;
- relacionar corretamente produtos e usuários conforme as chaves estrangeiras;
- registrar o módulo em `server.js`;
- criar views específicas depois que os campos forem confirmados no banco.

## 17. Implementar login

O arquivo `login.ejs` existe, mas não há autenticação ativa.

Quando for implementado, será necessário:

- criar rotas;
- criar controller;
- criar model;
- configurar `express-session`;
- definir a estratégia de armazenamento da sessão;
- decidir a forma de proteção de rotas;
- definir como senhas serão armazenadas e verificadas.

Até essa implementação, não é seguro considerar o projeto como sistema autenticado.

## 18. Testar mudanças

O projeto não possui testes automatizados nesta versão. `npm test` falha por padrão.

Antes de considerar uma alteração concluída, teste manualmente:

1. iniciar o servidor;
2. conectar ao banco;
3. abrir a página inicial;
4. abrir o formulário;
5. enviar dados válidos;
6. confirmar o registro no MySQL;
7. abrir a listagem;
8. excluir um registro;
9. testar dados inválidos;
10. testar a página de erro.

## 19. Problemas comuns

### Dependências não encontradas

Execute:

```bash
cd server
npm install
```

### Banco não conectado

Confira todas as variáveis do `.env` sem imprimir seus valores em arquivos compartilhados.

### Porta incorreta

A porta real é `process.env.PORT`. O texto `localhost 3000` no script é específico do Nodemon e não substitui a configuração de ambiente.

### Template não encontrado

Confirme:

- o nome usado em `res.render`;
- a existência do arquivo em `client/views`;
- o caminho relativo correto.

### View sem dados

Confirme que o controller passou a propriedade esperada:

```js
res.render("pagina", { produtos })
```

## Pontos marcados como [VERIFICAR]

- Versões mínimas de Node.js e npm.
- Versão do MySQL.
- Definição final dos módulos de usuários e ocorrências.
- Fluxo final de login.
- Estratégia de sessão com `express-session`.
- Campos e validações finais da edição de produto.
