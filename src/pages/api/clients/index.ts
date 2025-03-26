// src/pages/api/clients.ts
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

  // Método GET (Buscar clientes)
  if (req.method === 'GET') {
    try {
      if (id) {
        // Buscar um cliente específico
        const client = await prisma.client.findUnique({
          where: { id: Number(id) },
        });

        if (!client) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        return res.status(200).json(client);
      } else {
        // Buscar todos os clientes
        const clients = await prisma.client.findMany();
        return res.status(200).json(clients);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }

  // Método POST (Criar novo cliente)
  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;

      // Validação básica
      if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
      }

      // Criar novo cliente
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

  // Método PUT (Atualizar cliente)
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

  // Método DELETE (Excluir cliente)
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

  // Caso o método não seja permitido
  return res.status(405).json({ error: 'Método não permitido' });
}
