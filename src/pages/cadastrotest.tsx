import { useState, useEffect } from 'react';
import { Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Text } from '@shadcn/ui'; // Importando os componentes do ShadCN

interface Client {
  id: number;
  name: string;
  email: string;
}

interface Asset {
  id: number;
  name: string;
  value: number;
  clientId: number;
}

const CadastroPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [assetName, setAssetName] = useState<string>('');
  const [assetValue, setAssetValue] = useState<number>(0);
  const [clientId, setClientId] = useState<number>(0);
  const [commandOutput, setCommandOutput] = useState<string | null>(null); // Estado para armazenar saída do comando

  // Função para buscar os clientes da API
  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/clients');
      if (!response.ok) throw new Error('Erro ao buscar clientes');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  // Função para buscar os ativos da API
  const fetchAssets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/assets');
      if (!response.ok) throw new Error('Erro ao buscar ativos');
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error('Erro ao buscar ativos:', error);
    }
  };

  // Função para cadastrar cliente na API
  const handleCreateClient = async () => {
    setLoading(true);
    try {
      const newClient: Client = { name: clientName, email: clientEmail, id: 0 };
      const response = await fetch('http://localhost:3001/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) throw new Error('Erro ao criar cliente');
      const data = await response.json();
      setClients([...clients, data]);
      setClientName('');
      setClientEmail('');
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para cadastrar ativo na API
  const handleCreateAsset = async () => {
    setLoading(true);
    try {
      const newAsset: Asset = { name: assetName, value: assetValue, clientId: clientId, id: 0 };
      const response = await fetch('http://localhost:3001/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAsset),
      });

      if (!response.ok) throw new Error('Erro ao criar ativo');
      const data = await response.json();
      setAssets([...assets, data]);
      setAssetName('');
      setAssetValue(0);
      setClientId(0);
    } catch (error) {
      console.error('Erro ao criar ativo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para executar o comando
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

  useEffect(() => {
    fetchClients();
    fetchAssets();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-3xl space-y-8">
        <Text className="text-center text-gray-800 mb-8">Cadastro de Clientes e Ativos</Text>

        {/* Formulário para Cadastro de Cliente */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <Text className="text-center text-gray-700 mb-4">Cadastrar Cliente</Text>
          <Input 
            placeholder="Nome do Cliente" 
            value={clientName} 
            onChange={(e) => setClientName(e.target.value)} 
            className="mb-4"
          />
          <Input 
            placeholder="Email do Cliente" 
            value={clientEmail} 
            onChange={(e) => setClientEmail(e.target.value)} 
            className="mb-4"
          />
          <Button 
            onClick={handleCreateClient} 
            loading={loading}
            className="w-full"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </Button>
        </div>

        {/* Formulário para Cadastro de Ativo */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <Text className="text-center text-gray-700 mb-4">Cadastrar Ativo</Text>
          <Input 
            placeholder="Nome do Ativo" 
            value={assetName} 
            onChange={(e) => setAssetName(e.target.value)} 
            className="mb-4"
          />
          <Input 
            placeholder="Valor do Ativo" 
            type="number" 
            value={assetValue} 
            onChange={(e) => setAssetValue(Number(e.target.value))} 
            className="mb-4"
          />
          <Input 
            placeholder="ID do Cliente" 
            type="number" 
            value={clientId} 
            onChange={(e) => setClientId(Number(e.target.value))} 
            className="mb-4"
          />
          <Button 
            onClick={handleCreateAsset} 
            loading={loading}
            className="w-full"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Ativo'}
          </Button>
        </div>

        {/* Exibindo Clientes Cadastrados */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <Text className="text-center text-gray-700 mb-4">Clientes Cadastrados</Text>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Exibindo Ativos Cadastrados */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <Text className="text-center text-gray-700 mb-4">Ativos Cadastrados</Text>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>ID Cliente</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.value}</TableCell>
                    <TableCell>{asset.clientId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Botão para executar o comando */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <Button onClick={executeCommand} className="w-full">
            Executar Comando
          </Button>
          {commandOutput && (
            <div className="mt-4">
              <Text>Saída do Comando:</Text>
              <pre>{commandOutput}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
