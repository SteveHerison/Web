/*
  Warnings:

  - You are about to drop the column `bairro` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `celular` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `uf` on the `empresa` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailEmpresa]` on the table `empresa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailEmpresa` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Made the column `cnpj` on table `empresa` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `empresa_email_key` ON `empresa`;

-- AlterTable
ALTER TABLE `empresa` DROP COLUMN `bairro`,
    DROP COLUMN `celular`,
    DROP COLUMN `cep`,
    DROP COLUMN `cidade`,
    DROP COLUMN `descricao`,
    DROP COLUMN `email`,
    DROP COLUMN `endereco`,
    DROP COLUMN `numero`,
    DROP COLUMN `telefone`,
    DROP COLUMN `uf`,
    ADD COLUMN `bairroEmpresa` VARCHAR(50) NULL,
    ADD COLUMN `celularEmpresa` VARCHAR(20) NULL,
    ADD COLUMN `cepEmpresa` VARCHAR(10) NULL,
    ADD COLUMN `cidadeEmpresa` VARCHAR(50) NULL,
    ADD COLUMN `descricaoEmpresa` TEXT NULL,
    ADD COLUMN `emailEmpresa` VARCHAR(100) NOT NULL,
    ADD COLUMN `enderecoEmpresa` VARCHAR(150) NULL,
    ADD COLUMN `numeroEmpresa` VARCHAR(20) NULL,
    ADD COLUMN `telefoneEmpresa` VARCHAR(20) NULL,
    ADD COLUMN `ufEmpresa` CHAR(2) NULL,
    MODIFY `cnpj` VARCHAR(18) NOT NULL DEFAULT '0';

-- CreateIndex
CREATE UNIQUE INDEX `empresa_emailEmpresa_key` ON `empresa`(`emailEmpresa`);
