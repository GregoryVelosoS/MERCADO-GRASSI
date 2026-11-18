# MERCADO-GRASSI

## Descrição do projeto

O **MERCADO-GRASSI** é um projeto didático de desenvolvimento web criado para organizar informações de um mercado. Na versão atual, a aplicação possui uma página inicial e funcionalidades de **cadastrar, listar e excluir produtos**.

O usuário acessa o sistema pelo navegador, navega pelas páginas renderizadas pelo servidor e envia formulários HTML. Os dados de produtos são armazenados em um banco MySQL por meio do driver `mysql2`.

O projeto foi preparado para evoluir com módulos de usuários, login, ocorrências e edição de produtos. Esses módulos ainda não fazem parte da versão atual; suas implementações estão previstas para o desenvolvimento futuro.

## Funcionalidades

### Implementadas

- Exibição da página inicial em `/`.
- Exibição do formulário de cadastro em `/produtos`.
- Cadastro de um produto em `/produtos/cadastrar`.
- Listagem dos produtos em `/produtos/listar`.
- Exclusão de um produto em `/produtos/excluir/:id`.
- Exibição de uma página específica quando ocorre um erro no cadastro, na listagem ou na exclusão.
- Configuração inicial de conexão com MySQL por pool de conexões.

### Ainda não implementadas

- Login e autenticação: existe `client/views/login.ejs`, mas não há rota ou configuração ativa.
- Gestão de usuários: os arquivos correspondentes existem, mas estão vazios.
- Gestão de ocorrências: os arquivos correspondentes existem, mas estão vazios.
- Edição de produtos: existe `client/views/produtos/editar.ejs`, mas não há rota, controller ou model ativo.
- Sessões com `express-session`: o pacote está instalado, mas ainda não está configurado no servidor.

## Arquitetura

```text
Navegador
   |
   | Formulário ou link HTTP
   v
Express.js
   |
   | Rota
   v
Controller
   |
   | Dados e regras da operação
   v
Model
   |
   | SQL com mysql2
   v
MySQL
   |
   | Resultado da consulta
   v
Model -> Controller -> View EJS -> Navegador
```

As páginas são renderizadas no servidor. Não há API JSON separada nem frontend em React, Vue ou Angular nesta versão.

| Pasta ou arquivo | Responsabilidade |
|---|---|
| `server/server.js` | Inicializa o Express, configura views, arquivos estáticos, middlewares e rotas. |
| `server/config/` | Contém a configuração do pool de conexões com MySQL. |
| `server/routes/` | Converte URLs e métodos HTTP em chamadas de controller. |
| `server/controllers/` | Recebe requisições, chama models e decide qual view renderizar ou para qual endereço redirecionar. |
| `server/models/` | Executa consultas SQL no banco por meio do pool de conexões. |
| `client/views/` | Contém os templates EJS usados pelo servidor. |
| `client/views/partials/` | Contém partes reutilizadas nas páginas, como cabeçalho e rodapé. |
| `client/public/` | Diretório reservado aos arquivos estáticos públicos. Está vazio nesta versão. |
| `data/banco.sql` | Script SQL para criar o banco, as tabelas, dados de exemplo e consultas. |
| `docs/` | Contém a documentação técnica do projeto. |

## Tecnologias utilizadas

| Tecnologia | Versão declarada | Função no projeto | Link oficial |
|---|---:|---|---|
| Node.js | Versão não definida | Executa o servidor JavaScript e os scripts npm. | [nodejs.org](https://nodejs.org/) |
| npm | Versão não definida | Instala e gerencia as dependências declaradas em `server/package.json`. | [docs.npmjs.com](https://docs.npmjs.com/) |
| Express | `^5.3.0` | Cria o servidor HTTP, define rotas e middlewares. | [expressjs.com](https://expressjs.com/) |
| EJS | `^7.0.2` | Renderiza páginas HTML no servidor usando dados recebidos do controller. | [ejs.co](https://ejs.co/) |
| MySQL | Versão não definida | Armazena usuários, produtos e ocorrências. | [mysql.com](https://www.mysql.com/) |
| `mysql2` | `^3.24.6` | Conecta o Node.js ao MySQL e executa consultas parametrizadas. | [sidorares.github.io/node-mysql2](https://sidorares.github.io/node-mysql2/) |
| dotenv | `^18.0.10` | Carrega variáveis de ambiente do arquivo `server/.env`. | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |
| express-session | `^1.19.0` | Dependência preparada para futura implementação de sessões. Ainda não está configurada. | [npmjs.com/package/express-session](https://www.npmjs.com/package/express-session) |
| Nodemon | `^3.1.14` | Reinicia o servidor durante o desenvolvimento quando arquivos são alterados. | [nodemon.io](https://nodemon.io/) |
| Bootstrap | CDN Alpha `6.0.0-alpha.1` | Fornece estilos e componentes visuais das páginas EJS. | [getbootstrap.com](https://getbootstrap.com/) |

### Explicação da conexão entre as tecnologias

**Node.js** executa o código JavaScript da pasta `server`. **npm** instala as bibliotecas declaradas no pacote. **Express** usa os módulos de rota para receber requisições HTTP e responde com views ou redirecionamentos. **EJS** recebe os dados do controller e gera o HTML enviado ao navegador. **dotenv** lê as configurações privadas antes o servidor iniciar. **`mysql2`** usa essas configurações para criar um pool que permite ao model consultar ou alterar o banco **MySQL**. **Nodemon** facilita o desenvolvimento, reiniciando o servidor automaticamente. **Bootstrap** é carregado diretamente por CDN pelas páginas EJS e fornece estilos ao HTML.

## Pré-requisitos

Instale ou prepare no computador de desenvolvimento:

- Node.js em uma versão compatível com as dependências.
- npm.
- Git.
- MySQL ou outro ambiente compatível com os comandos usados em `data/banco.sql`.
- Um editor de código, como o VS Code.

Versões exatas de Node.js e MySQL não estão definidas no projeto.

## Instalação e execução

Os comandos abaixo devem ser executados em um terminal na pasta do projeto.

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd MERCADO-GRASSI
```

### 2. Criar o arquivo de ambiente

Crie o arquivo `server/.env`. Não copie nem compartilhe os valores reais do ambiente.

```env
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

### 3. Criar o banco de dados

Execute o conteúdo de `data/banco.sql` no cliente do MySQL. Preencha `DB_NAME` com o nome configurado no ambiente local. O script atual cria o banco `db_mercado_grassi`.

```text
mysql -u <usuario> -p < data/banco.sql
```

Esse comando usa nomes apenas como instrução; substitua `<usuario>` pelo usuário real do ambiente local.

### 4. Instalar as dependências

```bash
cd server
npm install
```

### 5. Iniciar o servidor

Modo normal:

```bash
npm start
```

Modo com reinicialização automática:

```bash
npm run server
```

Não existe uma pasta de frontend separada para iniciar. A interface EJS é servida pelo Express.

### 6. Abrir no navegador

Acesse `http://localhost:<PORTA_CONFIGURADA>`.

Exemplos de páginas:

- `/`: página inicial.
- `/produtos`: formulário de cadastro.
- `/produtos/listar`: tabela de produtos.

## Variáveis de ambiente

Estas são as únicas variáveis encontradas no código. Nenhum valor real é exibido nesta documentação.

| Nome | Obrigatoriedade | Descrição |
|---|---|---|
| `PORT` | Obrigatória | Porta em que o servidor Express ficará disponível. |
| `DB_HOST` | Obrigatória | Endereço do servidor MySQL. |
| `DB_USER` | Obrigatória | Usuário usado pelo `mysql2` para conectar ao banco. |
| `DB_PASSWORD` | Obrigatória | Senha usada pela conexão MySQL. |
| `DB_NAME` | Obrigatória | Nome da base de dados usada pelo pool de conexões. |

## Endpoints da API

Nesta versão, os endpoints respondem principalmente com páginas HTML ou redirecionamentos. Não há resposta JSON implementada.

| Método | Rota | Descrição | Parâmetros | Resposta |
|---|---|---|---|---|
| `GET` | `/` | Renderiza `index.ejs`. | Nenhum. | Página HTML. |
| `GET` | `/produtos` | Renderiza o formulário de cadastro de produto. | Nenhum. | Página HTML. |
| `POST` | `/produtos/cadastrar` | Insere um produto na tabela `tb_produtos`. | Campos enviados pelo formulário: `codigo_interno`, `nome`, `categoria`, `unidade_venda`, `preco`, `imagem`, `esta_ativo`. | Em sucesso: redireciona para `/`. Em erro: renderiza `erro.ejs`. |
| `GET` | `/produtos/listar` | Consulta todos os produtos e renderiza a tabela. | Nenhum. | Página HTML contendo o resultado de `SELECT * FROM tb_produtos`. |
| `POST` | `/produtos/excluir/:id` | Exclui o produto cujo `id_produto` corresponde ao parâmetro da URL. | `id` na URL. | Em sucesso: redireciona para `/produtos/listar`. Em erro: renderiza `erro.ejs`. |

### Exemplo de cadastro

```text
POST /produtos/cadastrar
Content-Type: application/x-www-form-urlencoded

codigo_interno=FR001
nome=Maca Gala
categoria=fruta
unidade_venda=kg
preco=8.90
imagem=https://example.invalid/imagem.jpg
esta_ativo=1
```

Em caso de sucesso, o servidor responde com um redirecionamento HTTP para `/`.

## Scripts disponíveis

Estes são os scripts definidos em `server/package.json`:

| Comando | Executa | Uso |
|---|---|---|
| `npm test` | `echo "Error: no test specified" && exit 1` | Ainda não executa testes automatizados. |
| `npm start` | `node server.js` | Inicia o servidor uma vez. |
| `npm run server` | `nodemon ./server.js localhost 3000` | Inicia o servidor em modo de desenvolvimento. |

Observação: o script `npm run server` informa o endereço `localhost 3000` ao Nodemon, mas a porta efetivamente usada pelo Express continua dependendo de `process.env.PORT`.

## Estrutura de pastas

```text
MERCADO-GRASSI/
├── client/
│   ├── public/                 # Arquivos estáticos públicos; atualmente vazio
│   └── views/
│       ├── index.ejs           # Página inicial
│       ├── login.ejs           # Login previsto; ainda não conectado a uma rota
│       ├── erro.ejs            # Página de erro
│       ├── partials/
│       │   ├── header.ejs      # Cabeçalho compartilhado
│       │   └── footer.ejs      # Rodapé compartilhado
│       └── produtos/
│           ├── cadastrar.ejs   # Formulário de cadastro
│           ├── listar.ejs      # Lista e exclusão de produtos
│           └── editar.ejs      # Estrutura inicial; edição ainda não implementada
├── data/
│   └── banco.sql               # Criação do banco e dados iniciais
├── docs/
│   ├── ARQUITETURA.md          # Fluxo técnico detalhado
│   └── GUIA-DESENVOLVIMENTO.md # Guia para configurar e evoluir o projeto
├── server/
│   ├── server.js               # Entrada da aplicação
│   ├── package.json
│   ├── package-lock.json
│   ├── .env                    # Arquivo local de ambiente; não versionar valores
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   └── models/
├── .gitignore
├── .gitattributes
└── README.md
```

## Problemas comuns

### O servidor não inicia

- Confirme que `PORT` está definido em `server/.env`.
- Execute `npm install` dentro da pasta `server`.
- Confirme que não há outro processo usando a porta configurada.

### Aparece “Erro ao conectar ao banco”

- Confirme `DB_HOST`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`.
- Confirme que o MySQL está em execução.
- Confirme que o banco e a tabela `tb_produtos` foram criados.
- Verifique permissões do usuário MySQL.

### A página `/produtos/listar` não mostra produtos

- Execute o script `data/banco.sql`.
- Confirme que o script foi executado na base definida por `DB_NAME`.
- Confirme que a tabela `tb_produtos` contém registros.

### Uma view não é encontrada

- Confirme o caminho relativo em `res.render(...)`.
- Views devem estar dentro de `client/views`.
- O servidor configura esse diretório em `server/server.js`.

### Não consigo acessar Usuários ou Ocorrências

Essas áreas ainda não estão implementadas nesta versão. Os links no cabeçalho não terão páginas até que suas rotas sejam criadas e registradas no servidor.

### Não consigo editar um produto

A página de edição existe como estrutura, mas o controller, o model e as rotas ainda não foram implementados.

## Pontos marcados como [VERIFICAR]

- **Versões de Node.js e npm:** não foram fixadas no projeto.
- **Versão do MySQL:** não foi definida no projeto.
- **Arquivos de usuários e ocorrências:** ainda serão implementados.
- **Login:** ainda será criado e conectado ao fluxo do sistema.
- **Edição de produtos:** ainda será implementada.
- **Sessões:** `express-session` será configurado futuramente.
- **Script SQL:** será atualizado em uma etapa futura do projeto.
- **Usuários e ocorrências no cabeçalho:** não estão disponíveis nesta versão.

