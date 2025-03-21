import { PrismaClient } from "@prisma/client";

// Cria a instância do Prisma Client
export const prisma = new PrismaClient();

// Lide com a desconexão quando o processo for encerrado (SIGINT, SIGTERM)
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Desconectado do banco de dados.");
  process.exit(0); // Encerra o processo com sucesso
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  console.log("Desconectado do banco de dados.");
  process.exit(0); // Encerra o processo com sucesso
});
