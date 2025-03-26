import { FastifyInstance } from 'fastify';
import * as assetController from '../controllers/assetController';
import { z } from 'zod';

// Esquemas de validação com Zod
const assetSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  value: z.number().positive('O valor deve ser positivo'),
  clientId: z.number().int().positive('O clientId deve ser um número inteiro positivo'),
});

const updateAssetSchema = assetSchema.partial(); // Permite atualização parcial

export async function assetRoutes(fastify: FastifyInstance) {
  // Rota para obter todos os assets
  fastify.get('/assets', async (_, reply) => {
    try {
      const assets = await assetController.getAssets();
      return reply.send(assets);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter assets' });
    }
  });

  // Rota para obter um asset por ID
  fastify.get('/assets/:id', async (request, reply) => {
    const id = Number((request.params as { id: string }).id);
    if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

    try {
      const asset = await assetController.getAsset(id);
      if (!asset) return reply.status(404).send({ error: 'Asset não encontrado' });

      return reply.send(asset);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter o asset' });
    }
  });

  // Rota para adicionar um novo asset
  fastify.post('/assets', async (request, reply) => {
    const validation = assetSchema.safeParse(request.body);
    if (!validation.success) {
      return reply.status(400).send({ error: validation.error.errors });
    }

    try {
      const newAsset = await assetController.addAsset(validation.data);
      return reply.status(201).send(newAsset);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar o asset' });
    }
  });

  // Rota para atualizar um asset existente
  fastify.put('/assets/:id', async (request, reply) => {
    const id = Number((request.params as { id: string }).id);
    if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

    const validation = updateAssetSchema.safeParse(request.body);
    if (!validation.success) {
      return reply.status(400).send({ error: validation.error.errors });
    }

    try {
      const updatedAsset = await assetController.updateAsset(id, validation.data);
      return reply.send(updatedAsset);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao atualizar o asset' });
    }
  });

  // Rota para deletar um asset
  fastify.delete('/assets/:id', async (request, reply) => {
    const id = Number((request.params as { id: string }).id);
    if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

    try {
      await assetController.deleteAsset(id);
      return reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao deletar o asset' });
    }
  });
}
