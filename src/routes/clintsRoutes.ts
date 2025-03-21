// src/routes/clientRoutes.ts
import { FastifyInstance, FastifyRequest } from 'fastify';
import * as clientController from '../controllers/clientsController'; // Importa as funções do controller

// Definindo os tipos para o parâmetro da rota
interface Params {
  id: number;
}

export async function clientRoutes(fastify: FastifyInstance) {
  // Rota para obter todos os clientes
  fastify.get('/clients', async (request, reply) => {
    try {
      const clients = await clientController.getClientes();
      return reply.send(clients); // Retorna todos os clientes
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter clientes' });
    }
  });

  // Rota para obter um cliente por ID
  fastify.get('/clients/:id', async (request: FastifyRequest<{ Params: Params }>, reply) => {
    const { id } = request.params;
    try {
      const client = await clientController.getCliente(id);
      if (client) {
        return reply.send(client); // Retorna o cliente encontrado
      } else {
        return reply.status(404).send({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter o cliente' });
    }
  });

  // Rota para adicionar um novo cliente
  fastify.post('/clients', async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };
    try {
      const newClient = await clientController.addCliente({ name, email });
      return reply.status(201).send(newClient); // Retorna o novo cliente criado
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar o cliente' });
    }
  });

  // Rota para atualizar um cliente existente
  fastify.put('/clients/:id', async (request: FastifyRequest<{ Params: Params }>, reply) => {
    const { id } = request.params;
    const { name, email } = request.body as { name?: string; email?: string };
    try {
      const updatedClient = await clientController.updateCliente(id, { name, email });
      return reply.send(updatedClient); // Retorna o cliente atualizado
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao atualizar o cliente' });
    }
  });

  // Rota para deletar um cliente
  fastify.delete('/clients/:id', async (request: FastifyRequest<{ Params: Params }>, reply) => {
    const { id } = request.params;
    try {
      await clientController.deleteCliente(id);
      return reply.status(204).send(); // Retorna 204 No Content após deletar
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao deletar o cliente' });
    }
  });
}
