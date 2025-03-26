// src/pages/api/execute-command.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { spawnSync } from 'cross-spawn';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configuração de CORS (se necessário)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Permite o acesso da URL do frontend
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Caso esteja utilizando cookies ou credenciais

  // Responder a requisições OPTIONS (pre-flight request)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { command, args, cwd } = req.body;

      // Se não passar o comando, retornar erro
      if (!command) {
        return res.status(400).json({ error: 'Comando é obrigatório' });
      }

      // Executar o comando com cross-spawn
      const result = spawnSync(command, args || [], { cwd });

      // Retornar o resultado
      return res.status(200).json({
        stdout: result.stdout.toString(),
        stderr: result.stderr.toString(),
        status: result.status,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao executar o comando' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
