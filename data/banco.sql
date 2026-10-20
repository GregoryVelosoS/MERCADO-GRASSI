-- EXCLUIR O BANCO 
DROP DATABASE IF EXISTS db_mercado;

-- CRIAR O BANCO DE DADOS
CREATE DATABASE IF NOT EXISTS db_mercado;

-- UTILIZAR O BANCO NAS OPERACOES A SEGUIR
USE db_mercado;

-- ==========================================================
-- TABELA: USUARIOS -- Perfil previsto no projeto: GESTOR ou OPERADOR
-- ==========================================================

CREATE TABLE tb_usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM("operador", 'gestor') NOT NULL,
    esta_ativo TINYINT(1) NOT NULL DEFAULT 1
);

-- ==========================================================
-- TABELA: PRODUTOS
-- ==========================================================
CREATE TABLE tb_produto (
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
CREATE TABLE tb_ocorrencia (
    id_ocorrencia INT PRIMARY KEY AUTO_INCREMENT,
    produto_correto INT NOT NULL,
    produto_errado INT NOT NULL,
    usuario INT NOT NULL,
    quantidade INT NOT NULL,
    diferenca DECIMAL(5,2) NOT NULL,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

	-- CHAVE ESTRANGEIRA DO PRODUTO CORRETO
    FOREIGN KEY (produto_correto) 
    REFERENCES tb_produto(id_produto),
        
	-- CHAVE ESTRANGEIRA DO PRODUTO ERRADO
    FOREIGN KEY (produto_errado)  
    REFERENCES tb_produto(id_produto),

	-- CHAVE ESTRANGEIRA DO USUARIO
    FOREIGN KEY (usuario)        
    REFERENCES tb_usuario(id_usuario)
);
