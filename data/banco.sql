-- CRIAR O BANCO DE DADOS
CREATE DATABASE db_mercado_grassi;

-- UTILIZAR O BANCO NAS OPERACOES A SEGUIR
USE db_mercado_grassi;

-- ==========================================================
-- TABELA: USUARIOS -- Perfil previsto no projeto: GESTOR ou OPERADOR
-- ==========================================================

CREATE TABLE tb_usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL,
    esta_ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- ==========================================================
-- TABELA: PRODUTOS
-- ==========================================================
CREATE TABLE tb_produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    codigo_interno VARCHAR(30) NOT NULL UNIQUE,
    nome VARCHAR(120) NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    unidade_venda VARCHAR(20) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255),
    esta_ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- ==========================================================
-- TABELA: OCORRENCIAS
-- ==========================================================
CREATE TABLE tb_ocorrencias (
    id_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    produto_correto_id INT NOT NULL,
    produto_errado_id INT NOT NULL,
    operador_id INT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

	-- CHAVE ESTRANGEIRA DO PRODUTO CORRETO
        FOREIGN KEY (produto_correto_id) REFERENCES tb_produtos(id_produto),
        
	-- CHAVE ESTRANGEIRA DO PRODUTO ERRADO
        FOREIGN KEY (produto_errado_id)  REFERENCES tb_produtos(id_produto),

	-- CHAVE ESTRANGEIRA DO USUARIO
        FOREIGN KEY (operador_id)        REFERENCES tb_usuarios(id_usuario)
);

-- ==========================================================
-- INSERTS = INSERIR DADOS
-- ==========================================================

-- USUARIOS
INSERT INTO tb_usuarios(id_usuario, nome, email, senha, perfil, esta_ativo)
VALUES
    (DEFAULT, 'Gestor Greg', 'gestor@gmail.com', 'greg', 'gestor', 1),
    (DEFAULT, 'Cris Operador', 'operador@gmail.com', 'greg', 'operador', 1);
-- PRODUTOS
INSERT INTO tb_produtos(id_produto, codigo_interno, nome, categoria, unidade_venda, preco, imagem, esta_ativo)
VALUES
    (DEFAULT, 'FR001', 'Maca Gala', 'FRUTA', 'KG', 8.90, 'https://localfarmers.com.br/wp-content/uploads/2020/05/maca_gala_organica-1.jpg', 1),
    (DEFAULT, 'FR002', 'Maca Fuji', 'FRUTA', 'KG', 9.50, 'https://www.redesuperbom.com.br/media/produtos/536x536/18194_barcelos_frutas_maca-kg-fuji-extra-gr.PNG', 1),
    (DEFAULT, 'FR003', 'Limao Tahiti', 'FRUTA', 'KG', 6.80, 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Limes.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original', 1),
    (DEFAULT, 'FR004', 'Limao Siciliano', 'FRUTA', 'KG', 15.90, 'https://lapercussi.com/website/wp-content/uploads/2021/06/limao-la-percussi-1240x750.jpg', 1),
    (DEFAULT, 'LG001', 'Batata Inglesa', 'LEGUME', 'KG', 7.20, 'https://localfarmers.com.br/wp-content/uploads/2020/05/batata_inglesa_branca_organica_2-1.jpg', 1),
    (DEFAULT, 'LG002', 'Batata Asterix', 'LEGUME', 'KG', 8.10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLE8kyShElGYQK_Prcx1NwWUzrMlvRPhGktgcsGd010MrjO7pfVS31Iag&s=10', 1),
    (DEFAULT, 'VD001', 'Alface Crespa', 'VERDURA', 'UNIDADE', 4.50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJQAuNsbFQ2_3R-0UjC6Efu4-feqmIRA3VI-5LtbNMZ6TH1Zbg7csNspdG&s=10', 1),
    (DEFAULT, 'VD002', 'Couve', 'VERDURA', 'MACO', 5.00, 'https://www.sitiodamata.com.br/media/catalog/product/cache/80281f1a4d89199560fc0837e49d13da/s/e/sementes-couve-manteiga-da-georgia-brassica-oleracea_2nd.webp', 1);

-- OCORRENCIAS
-- Os IDs abaixo consideram que os INSERTs anteriores foram feitos em um banco novo, na ordem apresentada.
INSERT INTO tb_ocorrencias(id_ocorrencia, produto_correto_id, produto_errado_id, operador_id, quantidade)
VALUES
    (DEFAULT, 1, 2, 2, 2.00),
    (DEFAULT, 3, 4, 2, 1.50),
    (DEFAULT, 5, 6, 1, 3.00),
    (DEFAULT, 2, 1, 1, 1.00),
    (DEFAULT, 4, 3, 2, 2.50);

-- ==========================================================
-- READ = CONSULTAR DADOS
-- ==========================================================

-- TODOS OS USUARIOS
SELECT * FROM tb_usuarios;

-- TODOS OS PRODUTOS
SELECT * FROM tb_produtos;

-- TODOS AS OCORRÊNCIAS
SELECT * FROM tb_ocorrencias;