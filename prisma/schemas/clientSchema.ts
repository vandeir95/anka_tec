import { z } from "zod";

// Validação para criação de um client
export const createClientSchema = z.object({
  name: z.string().min(3, "O nome do cliente deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"), // Valida o formato do email
  status: z.boolean().optional(), // Status é opcional
});

// Validação para atualização de um client (todos os campos opcionais)
export const updateClientSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  status: z.boolean().optional(),
});
