// src/types/chakra.d.ts

// Declaração para o Chakra UI
declare module "@chakra-ui/react" {
  import { ReactNode } from "react";

  export interface ChakraProviderProps {
    children: ReactNode;
  }

  export const ChakraProvider: React.FC<ChakraProviderProps>;
}

// src/types/chakra.d.ts
// src/types/chakra.d.ts
// src/types/chakra.d.ts

// src/types/chakra.d.ts

// Declaração para o ShadCN UI
declare module "@shadcn/ui" {
  import { FC, ReactNode } from "react";

  // Corrigindo a tipagem do Button para incluir 'onClick'
  export const Button: FC<{ 
    variant?: string; 
    className?: string; 
    loading?: boolean; 
    children?: ReactNode; 
    onClick?: () => void; 
  }>;

  export const Text: FC<{ 
    className?: string; 
    children?: ReactNode; 
  }>;

  export const Input: FC<{ 
    placeholder: string; 
    value: string | number; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    className?: string; 
    type?: string 
  }>;

  export const Table: FC<{ 
    className?: string; 
    children?: ReactNode;  // Adicionando 'children' para permitir o conteúdo dentro da tabela
  }>;
  
  export const TableContainer: FC<{ 
    className?: string; 
    children?: ReactNode;  // Adicionando 'children' para permitir o conteúdo dentro do TableContainer
  }>;

  export const TableHead: FC<{ 
    className?: string; 
    children?: ReactNode;  // Adicionando 'children' para permitir o conteúdo dentro do TableHead
  }>;

  export const TableBody: FC<{ 
    className?: string; 
    children?: ReactNode;  // Adicionando 'children' para permitir o conteúdo dentro do TableBody
  }>;

  export const TableRow: FC<{ 
    className?: string; 
    children?: ReactNode;  // Adicionando 'children' para permitir o conteúdo dentro do TableRow
  }>;

  export const TableCell: FC<{ 
    className?: string; 
    children?: ReactNode;  // Adicionando 'children' para permitir o conteúdo dentro do TableCell
  }>;
}
