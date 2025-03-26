import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (id) {
        const client = await prisma.client.findUnique({
          where: { id: Number(id) },
        });

        if (!client) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        return res.status(200).json(client);
      } else {
        const clients = await prisma.client.findMany();
        return res.status(200).json(clients);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
      }

      const newClient = await prisma.client.create({
        data: { 
          name, 
          email,
          status: true,
        },
      });

      return res.status(201).json(newClient);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, email } = req.body;

      const client = await prisma.client.findUnique({
        where: { id: Number(id) },
      });

      if (!client) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const updatedClient = await prisma.client.update({
        where: { id: Number(id) },
        data: { name, email },
      });

      return res.status(200).json(updatedClient);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const client = await prisma.client.findUnique({
        where: { id: Number(id) },
      });

      if (!client) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await prisma.client.delete({
        where: { id: Number(id) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
