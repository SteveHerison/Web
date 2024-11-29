/*
  Warnings:

  - A unique constraint covering the columns `[nomefantasia]` on the table `empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome_empresa]` on the table `empresa` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nome_empresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bairroEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `celularEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cepEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cidadeEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricaoEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enderecoEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numeroEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefoneEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ufEmpresa` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `celular` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endereco` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uf` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cidade` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bairro` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `empresa` ALTER COLUMN `cnpj` DROP DEFAULT,
    MODIFY `responsavel` VARCHAR(255) NOT NULL DEFAULT 'Não informado',
    MODIFY `nome_empresa` VARCHAR(155) NOT NULL,
    MODIFY `bairroEmpresa` VARCHAR(50) NOT NULL DEFAULT 'Não informado',
    MODIFY `celularEmpresa` VARCHAR(20) NOT NULL DEFAULT 'Não informado',
    MODIFY `cepEmpresa` VARCHAR(10) NOT NULL DEFAULT '00000-000',
    MODIFY `cidadeEmpresa` VARCHAR(50) NOT NULL DEFAULT 'Não informado',
    MODIFY `descricaoEmpresa` TEXT NOT NULL DEFAULT '',
    MODIFY `enderecoEmpresa` VARCHAR(150) NOT NULL DEFAULT 'Não informado',
    MODIFY `numeroEmpresa` VARCHAR(20) NOT NULL DEFAULT '0',
    MODIFY `telefoneEmpresa` VARCHAR(20) NOT NULL DEFAULT 'Não informado',
    MODIFY `ufEmpresa` CHAR(2) NOT NULL DEFAULT 'XX';

-- AlterTable
ALTER TABLE `usuarios` ALTER COLUMN `email` DROP DEFAULT,
    ALTER COLUMN `cpf` DROP DEFAULT,
    ALTER COLUMN `senha` DROP DEFAULT,
    MODIFY `datacadastro` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `celular` VARCHAR(20) NOT NULL DEFAULT 'Não informado',
    MODIFY `telefone` VARCHAR(20) NOT NULL DEFAULT 'Não informado',
    MODIFY `endereco` VARCHAR(150) NOT NULL DEFAULT 'Não informado',
    MODIFY `cep` VARCHAR(10) NOT NULL DEFAULT '00000-000',
    MODIFY `uf` CHAR(2) NOT NULL DEFAULT 'XX',
    MODIFY `cidade` VARCHAR(50) NOT NULL DEFAULT 'Não informado',
    MODIFY `numero` VARCHAR(20) NOT NULL DEFAULT '0',
    MODIFY `bairro` VARCHAR(50) NOT NULL DEFAULT 'Não informado';

-- CreateIndex
CREATE UNIQUE INDEX `empresa_nomefantasia_key` ON `empresa`(`nomefantasia`);

-- CreateIndex
CREATE UNIQUE INDEX `empresa_nome_empresa_key` ON `empresa`(`nome_empresa`);
