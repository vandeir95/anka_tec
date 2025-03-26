// src/app/page.tsx ou src/app/AssetsPage.tsx

import React from "react";
import AssetList from "@/components/AssetsList";

const AssetsPage: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo à Página de Ativos</h1>
      <AssetList />
    </div>
  );
};

export default AssetsPage;
