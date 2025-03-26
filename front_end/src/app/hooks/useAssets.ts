// src/app/hooks/useAssets.ts
import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "@/services/assetService";  // Ajuste o caminho conforme necessário

// Hook personalizado
export function useAssets() {
  return useQuery({
    queryKey: ["assets"],        // Chave da consulta
    queryFn: fetchAssets,        // Função que faz a requisição
  });
}
