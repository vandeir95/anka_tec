// src/controllers/clientController.ts
import { PrismaClient } from '@prisma/client'; // Importa a instância do Prisma

const prisma = new PrismaClient(); // Instancia o PrismaClient

// Função para obter todos os clientes
export function getClientes() {
  return prisma.client.findMany(); // Retorna todos os clientes
}

// Função para obter um cliente por ID
export function getCliente(id: number) {
  return prisma.client.findUnique({
    where: { id },
  }); // Retorna um cliente único pelo ID
}

// Função para adicionar um novo cliente
export async function addCliente(data: { name: string; email: string }) {
  return await prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      status: true, // Atribui o status como `true` por padrão, se necessário
    },
  });
}

// Função para atualizar um cliente
export async function updateCliente(id: number, data: { name?: string; email?: string }) {
  return prisma.client.update({
    where: { id },
    data, // Atualiza os campos `name` e/ou `email`
  });
}

// Função para deletar um cliente
export function deleteCliente(id: number) {
  return prisma.client.delete({
    where: { id },
  });
}
