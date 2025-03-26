// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// const { id } = req.query;

//   if (req.method === 'GET') {
//     // GET: Buscar um usuário pelo ID
//     try {
//       const user = await prisma.asset.findUnique({
//         where: { id: Number(id) }, // Converte id para número
//       });

//       if (!user) {
//         return res.status(404).json({ error: 'Usuário não encontrado' });
//       }

//       return res.status(200).json(user);
//     } catch (error) {
//       return res.status(500).json({ error: 'Erro ao buscar usuário' });
//     }
//   } }
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Verificar se o ID é válido (número)
  const numericId = id ? Number(id) : undefined; // Usando undefined em vez de null

  if (numericId && isNaN(numericId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (req.method === 'GET') {
    try {
      if (numericId !== undefined) {
        // Buscar um asset pelo ID
        const asset = await prisma.asset.findUnique({
          where: { id: numericId },
        });

        if (!asset) {
          return res.status(404).json({ error: 'Ativo não encontrado' });
        }

        return res.status(200).json(asset);
      } else {
        // Buscar todos os assets
        const assets = await prisma.asset.findMany();
        return res.status(200).json(assets);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ativos' });
    }
  }

  if (req.method === 'POST') {
    // Criar um novo asset
    try {
      const { name, value, clientId } = req.body;

      if (!name || !value || !clientId) {
        return res.status(400).json({ error: 'Nome, valor e clientId são obrigatórios' });
      }

      const newAsset = await prisma.asset.create({
        data: { 
          name, 
          value,
          clientId
        },
      });

      return res.status(201).json(newAsset);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar ativo' });
    }
  }

  if (req.method === 'PUT') {
    // Atualizar um asset pelo ID
    try {
      const { name, value, clientId } = req.body;

      const asset = await prisma.asset.findUnique({
        where: { id: numericId },
      });

      if (!asset) {
        return res.status(404).json({ error: 'Ativo não encontrado' });
      }

      const updatedAsset = await prisma.asset.update({
        where: { id: numericId },
        data: { 
          name, 
          value,
          clientId
        },
      });

      return res.status(200).json(updatedAsset);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar ativo' });
    }
  }

  if (req.method === 'DELETE') {
    // Excluir um asset pelo ID
    try {
      const asset = await prisma.asset.findUnique({
        where: { id: numericId },
      });

      if (!asset) {
        return res.status(404).json({ error: 'Ativo não encontrado' });
      }

      await prisma.asset.delete({
        where: { id: numericId },
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir ativo' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
