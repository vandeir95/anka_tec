// src/services/assetService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('A variável de ambiente NEXT_PUBLIC_API_URL não está configurada');
}

export const fetchAssets = async () => {
  const response = await fetch(`${API_URL}/api/assets`);

  if (!response.ok) {
    // Lançar erro detalhado
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Erro ao buscar os ativos');
  }

  return response.json();
};
