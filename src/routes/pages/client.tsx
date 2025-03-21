import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@shadcn/ui';

// Definir esquema de validação com Zod
const clientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
});

type ClientFormData = z.infer<typeof clientSchema>;

// Função para buscar clientes
const fetchClients = async () => {
  const response = await axios.get('/api/clients');
  return response.data;
};

// Função para adicionar um cliente
const addClient = async (client: ClientFormData) => {
  const response = await axios.post('/api/clients', client);
  return response.data;
};

export default function ClientsPage() {
  const { data: clients, isLoading } = useQuery('clients', fetchClients);
  const { register, handleSubmit, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });
  const mutation = useMutation(addClient, {
    onSuccess: () => {
      // Refresca a lista de clientes após adicionar
    },
  });

  const onSubmit = (data: ClientFormData) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Clientes</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome</label>
          <Input id="name" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>
        
        <Button type="submit">Adicionar Cliente</Button>
      </form>
      
      <ul>
        {clients?.map((client) => (
          <li key={client.id}>{client.name} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
}
