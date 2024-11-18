/*
  Warnings:

  - A unique constraint covering the columns `[razaosocial]` on the table `empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `datacadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `empresa_razaosocial_key` ON `empresa`(`razaosocial`);

-- CreateIndex
CREATE UNIQUE INDEX `empresa_cnpj_key` ON `empresa`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `empresa_email_key` ON `empresa`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_email_key` ON `usuarios`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_cpf_key` ON `usuarios`(`cpf`);

-- AddForeignKey
ALTER TABLE `empresa` ADD CONSTRAINT `empresa_id_usuarios_fkey` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
