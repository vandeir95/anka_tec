// src/pages/api/assets.ts (ou api/assets.js se for JS)
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';  // Certifique-se de que o Prisma está configurado corretamente

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Permite o acesso da URL do frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Caso esteja utilizando cookies ou credenciais

  // Responder a requisições OPTIONS (pre-flight request)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (id) {
        const asset = await prisma.asset.findUnique({
          where: { id: Number(id) },
        });

        if (!asset) {
          return res.status(404).json({ error: 'Ativo não encontrado' });
        }

        return res.status(200).json(asset);
      } else {
        const assets = await prisma.asset.findMany();
        return res.status(200).json(assets);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar ativos' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, value, clientId } = req.body;

      if (!name || !value || !clientId) {
        return res.status(400).json({ error: 'Nome, valor e clientId são obrigatórios' });
      }

      const newAsset = await prisma.asset.create({
        data: { name, value, clientId },
      });

      return res.status(201).json(newAsset);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar ativo' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, value, clientId } = req.body;

      const asset = await prisma.asset.findUnique({
        where: { id: Number(id) },
      });

      if (!asset) {
        return res.status(404).json({ error: 'Ativo não encontrado' });
      }

      const updatedAsset = await prisma.asset.update({
        where: { id: Number(id) },
        data: { name, value, clientId },
      });

      return res.status(200).json(updatedAsset);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar ativo' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const asset = await prisma.asset.findUnique({
        where: { id: Number(id) },
      });

      if (!asset) {
        return res.status(404).json({ error: 'Ativo não encontrado' });
      }

      await prisma.asset.delete({
        where: { id: Number(id) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao excluir ativo' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
