import { FastifyInstance, FastifyRequest } from 'fastify';
import * as clientController from '../controllers/clientsController';
import { z } from 'zod';

// Esquemas de validação com Zod
const clientSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
});

const updateClientSchema = clientSchema.partial(); // Permite atualização parcial

interface Params {
  id: string; // Usamos string porque o Fastify recebe parâmetros de rota como string
}

export async function clientRoutes(fastify: FastifyInstance) {
  // Rota para obter todos os clientes
  fastify.get('/clients', async (_, reply) => {
    try {
      const clients = await clientController.getClientes();
      return reply.send(clients);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter clientes' });
    }
  });

  // Rota para obter um cliente por ID
  fastify.get('/clients/:id', async (request: FastifyRequest<{ Params: Params }>, reply) => {
    const id = Number(request.params.id);
    if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

    try {
      const client = await clientController.getCliente(id);
      if (!client) return reply.status(404).send({ error: 'Cliente não encontrado' });

      return reply.send(client);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter o cliente' });
    }
  });

  // Rota para adicionar um novo cliente
  fastify.post('/clients', async (request, reply) => {
    const validation = clientSchema.safeParse(request.body);
    if (!validation.success) {
      return reply.status(400).send({ error: validation.error.errors });
    }

    try {
      const newClient = await clientController.addCliente(validation.data);
      return reply.status(201).send(newClient);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar o cliente' });
    }
  });

  // Rota para atualizar um cliente existente
  fastify.put('/clients/:id', async (request: FastifyRequest<{ Params: Params }>, reply) => {
    const id = Number(request.params.id);
    if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

    const validation = updateClientSchema.safeParse(request.body);
    if (!validation.success) {
      return reply.status(400).send({ error: validation.error.errors });
    }

    try {
      const updatedClient = await clientController.updateCliente(id, validation.data);
      return reply.send(updatedClient);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao atualizar o cliente' });
    }
  });

  // Rota para deletar um cliente
  fastify.delete('/clients/:id', async (request: FastifyRequest<{ Params: Params }>, reply) => {
    const id = Number(request.params.id);
    if (isNaN(id)) return reply.status(400).send({ error: 'ID inválido' });

    try {
      await clientController.deleteCliente(id);
      return reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao deletar o cliente' });
    }
  });
}
