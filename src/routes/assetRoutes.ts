// src/routes/assetRoutes.ts
import { FastifyInstance } from 'fastify';
import * as assetController from '../controllers/assetController'; // Importa as funções do controller

export async function assetRoutes(fastify: FastifyInstance) {
  // Rota para obter todos os assets
  fastify.get('/assets', async (request, reply) => {
    try {
      const assets = await assetController.getAssets();
      return reply.send(assets); // Retorna todos os assets
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter assets' });
    }
  });

  // Rota para obter um asset por ID
  fastify.get('/assets/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    try {
      const asset = await assetController.getAsset(id);
      if (asset) {
        return reply.send(asset); // Retorna o asset encontrado
      } else {
        return reply.status(404).send({ error: 'Asset não encontrado' });
      }
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter o asset' });
    }
  });

  // Rota para adicionar um novo asset
  fastify.post('/assets', async (request, reply) => {
    const { name, value, clientId } = request.body as { name: string; value: number; clientId: number };
    try {
      const newAsset = await assetController.addAsset({ name, value, clientId });
      return reply.status(201).send(newAsset); // Retorna o novo asset criado
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar o asset' });
    }
  });

  // Rota para atualizar um asset existente
  fastify.put('/assets/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    const { name, value, clientId } = request.body as { name?: string; value?: number; clientId?: number };
    try {
      const updatedAsset = await assetController.updateAsset(id, { name, value, clientId });
      return reply.send(updatedAsset); // Retorna o asset atualizado
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao atualizar o asset' });
    }
  });

  // Rota para deletar um asset
  fastify.delete('/assets/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    try {
      await assetController.deleteAsset(id);
      return reply.status(204).send(); // Retorna 204 No Content após deletar
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao deletar o asset' });
    }
  });
}
