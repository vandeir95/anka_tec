import React from "react";
import { useAssets } from "@/app/hooks/useAssets";

// Tipagem do ativo para melhorar a autocompletação
interface Asset {
  id: number;
  name: string;
  value: number;
}

const AssetList: React.FC = () => {
  const { data, error, isLoading } = useAssets();

  // Estado de carregamento
  if (isLoading) return <div>Carregando...</div>;

  // Estado de erro
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  // Se não houver dados
  if (!data || data.length === 0) return <div>Nenhum ativo encontrado.</div>;

  return (
    <div>
      <h1>Lista de Ativos</h1>
      <ul>
        {data.map((asset: Asset) => (
          <li key={asset.id}>
            <h3>{asset.name}</h3>
            <p>Valor: R$ {asset.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
