import { z } from "zod";

// Validação para criação de um asset
export const createAssetSchema = z.object({
  name: z.string().min(3, "O nome do asset deve ter pelo menos 3 caracteres"),
  value: z.number().positive("O valor do asset deve ser positivo"),
  clientId: z.number().int().positive("O clientId deve ser um número inteiro positivo"),
});

// Validação para atualização de um asset (todos os campos opcionais)
export const updateAssetSchema = z.object({
  name: z.string().min(3).optional(),
  value: z.number().positive().optional(),
  clientId: z.number().int().positive().optional(),
});

// Validação para deleção de um asset (somente ID)
export const deleteAssetSchema = z.object({
  id: z.number().int().positive("ID deve ser um número inteiro positivo"),
});
