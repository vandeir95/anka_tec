// pages/assets.tsx

import { useAssets } from "@/app/hooks/useAssets";  // Importando o hook de assets

const AssetsPage = () => {
  const { data, error, isLoading } = useAssets();

  if (isLoading) return <div>Carregando...</div>;
  if (error instanceof Error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2>Lista de Ativos</h2>
      <ul>
        {data?.map((asset: any) => (
          <li key={asset.id}>{asset.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssetsPage;
