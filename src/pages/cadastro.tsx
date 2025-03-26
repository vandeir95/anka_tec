import { useState } from 'react';

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

  // Função para buscar os clientes da API
  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clients');
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
      const response = await fetch('http://localhost:3000/api/assets');
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
      const response = await fetch('http://localhost:3000/api/clients', {
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
      const response = await fetch('http://localhost:3000/api/assets', {
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

  return (
    <div className="flex justify-center items-center min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Cadastro de Clientes e Ativos</h1>

        {/* Formulário para Cadastro de Cliente */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Cadastrar Cliente</h2>
          <input 
            type="text" 
            className="border p-3 mb-4 w-full rounded" 
            placeholder="Nome do Cliente" 
            value={clientName} 
            onChange={(e) => setClientName(e.target.value)} 
          />
          <input 
            type="email" 
            className="border p-3 mb-4 w-full rounded" 
            placeholder="Email do Cliente" 
            value={clientEmail} 
            onChange={(e) => setClientEmail(e.target.value)} 
          />
          <button 
            className="bg-blue-500 text-white p-3 rounded w-full" 
            onClick={handleCreateClient} 
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </button>
        </div>

        {/* Formulário para Cadastro de Ativo */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Cadastrar Ativo</h2>
          <input 
            type="text" 
            className="border p-3 mb-4 w-full rounded" 
            placeholder="Nome do Ativo" 
            value={assetName} 
            onChange={(e) => setAssetName(e.target.value)} 
          />
          <input 
            type="number" 
            className="border p-3 mb-4 w-full rounded" 
            placeholder="Valor do Ativo" 
            value={assetValue} 
            onChange={(e) => setAssetValue(Number(e.target.value))} 
          />
          <input 
            type="number" 
            className="border p-3 mb-4 w-full rounded" 
            placeholder="ID do Cliente" 
            value={clientId} 
            onChange={(e) => setClientId(Number(e.target.value))} 
          />
          <button 
            className="bg-green-500 text-white p-3 rounded w-full" 
            onClick={handleCreateAsset} 
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Ativo'}
          </button>
        </div>

        {/* Exibindo Clientes Cadastrados */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Clientes Cadastrados</h2>
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">Email</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-100">
                  <td className="border p-3 text-sm text-gray-700">{client.id}</td>
                  <td className="border p-3 text-sm text-gray-700">{client.name}</td>
                  <td className="border p-3 text-sm text-gray-700">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exibindo Ativos Cadastrados */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Ativos Cadastrados</h2>
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">Valor</th>
                <th className="border p-3 text-left text-sm font-medium text-gray-700">ID Cliente</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-100">
                  <td className="border p-3 text-sm text-gray-700">{asset.id}</td>
                  <td className="border p-3 text-sm text-gray-700">{asset.name}</td>
                  <td className="border p-3 text-sm text-gray-700">{asset.value}</td>
                  <td className="border p-3 text-sm text-gray-700">{asset.clientId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
