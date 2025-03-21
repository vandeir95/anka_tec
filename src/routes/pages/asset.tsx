import { useQuery } from 'react-query';
import axios from 'axios';
import { Button } from '@shadcn/ui';

// Função para buscar ativos
const fetchAssets = async () => {
  const response = await axios.get('/api/assets');
  return response.data;
};

export default function AssetsPage() {
  const { data: assets, isLoading } = useQuery('assets', fetchAssets);

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Ativos</h1>
      <ul>
        {assets?.map((asset) => (
          <li key={asset.id}>{asset.name} - {asset.value}</li>
        ))}
      </ul>
      <Button disabled>Adicionar Ativo (Somente Leitura)</Button>
    </div>
  );
}
