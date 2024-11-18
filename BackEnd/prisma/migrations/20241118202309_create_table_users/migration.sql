-- CreateTable
CREATE TABLE `empresa` (
    `idempresa` INTEGER NOT NULL AUTO_INCREMENT,
    `datafuncao` DATE NOT NULL,
    `razaosocial` VARCHAR(250) NOT NULL,
    `nomefantasia` VARCHAR(250) NOT NULL,
    `cnpj` BIGINT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(20) NULL,
    `celular` VARCHAR(20) NULL,
    `responsavel` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(150) NULL,
    `numero` VARCHAR(20) NULL,
    `bairro` VARCHAR(50) NULL,
    `cidade` VARCHAR(50) NULL,
    `uf` CHAR(2) NULL,
    `cep` VARCHAR(10) NULL,
    `descricao` TEXT NULL,
    `nome_empresa` VARCHAR(155) NULL DEFAULT '',
    `id_usuarios` INTEGER NOT NULL,

    PRIMARY KEY (`idempresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL DEFAULT '',
    `cpf` VARCHAR(18) NOT NULL DEFAULT '0',
    `senha` VARCHAR(255) NOT NULL DEFAULT '0',
    `datacadastro` DATE NOT NULL,
    `celular` VARCHAR(20) NULL DEFAULT '0',
    `telefone` VARCHAR(20) NULL DEFAULT '0',
    `endereco` VARCHAR(150) NULL DEFAULT '',
    `cep` VARCHAR(10) NULL DEFAULT '0',
    `uf` CHAR(2) NULL DEFAULT '0',
    `cidade` VARCHAR(50) NULL DEFAULT '',
    `numero` VARCHAR(20) NULL DEFAULT '0',
    `bairro` VARCHAR(50) NULL DEFAULT '',

    INDEX `cpf`(`cpf`),
    INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
