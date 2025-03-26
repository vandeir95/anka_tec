// AssetsPage.tsx
import { useEffect, useState } from 'react';

interface Asset {
  id: number;
  name: string;
  value: number;
  clientId: number;
}

const AssetsPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commandOutput, setCommandOutput] = useState<string | null>(null); // Estado para armazenar saída do comando

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/assets');
        if (!response.ok) {
          throw new Error('Erro ao buscar ativos');
        }
        const data = await response.json();
        setAssets(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Função para chamar a API que executa comandos
  const executeCommand = async () => {
    try {
      const response = await fetch('/api/execute-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command: 'ls', // Comando que você deseja executar
          args: ['-l'], // Argumentos, se houver
          cwd: '/some/directory', // Caminho do diretório, se necessário
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCommandOutput(data.stdout); // Armazena o stdout
      } else {
        setCommandOutput(data.error); // Caso ocorra algum erro, armazena a mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao executar o comando', error);
      setCommandOutput('Erro ao executar o comando');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Ativos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>ID Cliente</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.value}</td>
              <td>{asset.clientId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão para executar o comando */}
      <button onClick={executeCommand}>Executar Comando</button>

      {/* Exibir o resultado do comando */}
      {commandOutput && (
        <div>
          <h3>Saída do Comando:</h3>
          <pre>{commandOutput}</pre>
        </div>
      )}
    </div>
  );
};

export default AssetsPage;
