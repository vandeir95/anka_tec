// src/controllers/assetController.ts
import { PrismaClient } from '@prisma/client'; // Importa a instância do Prisma
import { Prisma, asset } from '@prisma/client'; // Importa o tipo Asset do Prisma

const prisma = new PrismaClient(); // Instancia o PrismaClient

// Função para obter todos os assets
export function getAssets() {
  return prisma.asset.findMany(); // Retorna todos os assets
}

// Função para obter um asset por ID
export function getAsset(id: number) {
  return prisma.asset.findUnique({
    where: { id },
  }); // Retorna um asset único pelo ID
}

// Função para adicionar um novo asset
export async function addAsset(data: { name: string; value: number; clientId: number }) {
  return await prisma.asset.create({
    data: {
      name: data.name,
      value: data.value,
      clientId: data.clientId, // Associa o asset a um cliente
    },
  });
}

// Função para atualizar um asset
export async function updateAsset(id: number, data: { name?: string; value?: number; clientId?: number }) {
  return prisma.asset.update({
    where: { id },
    data, // Atualiza os campos name, value e/ou clientId
  });
}

// Função para deletar um asset
export function deleteAsset(id: number) {
  return prisma.asset.delete({
    where: { id },
  });
}
