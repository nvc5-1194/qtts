import React, { useState } from 'react';
import { Page, Asset, UserRole, User } from './types';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AssetList from './components/AssetList';
import AssetDetail from './components/AssetDetail';
import BatchImport from './components/BatchImport';
import Settings from './components/Settings';

// Mock current user
const MOCK_USER: User = {
  id: '1',
  name: 'Nguyễn Văn Admin',
  email: 'admin@hospital.com',
  role: 'ADMIN', // Change to 'MANAGER' or 'USER' to test permissions
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [detailMode, setDetailMode] = useState<'view' | 'edit'>('view');

  const handleLogin = () => {
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentPage(Page.LOGIN);
  };

  const navigateTo = (page: Page, assetId?: string, mode: 'view' | 'edit' = 'view') => {
    setCurrentPage(page);
    if (page === Page.ASSET_DETAIL) {
      setDetailMode(mode);
    }
    if (assetId) {
      setSelectedAssetId(assetId);
    } else {
      setSelectedAssetId(null);
    }
  };

  if (currentPage === Page.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onNavigate={navigateTo} 
      onLogout={handleLogout}
      currentUser={currentUser}
    >
      {currentPage === Page.DASHBOARD && <Dashboard />}
      {currentPage === Page.ASSET_LIST && (
        <AssetList 
          onAssetClick={(id, mode) => navigateTo(Page.ASSET_DETAIL, id, mode)} 
          currentUser={currentUser}
          defaultStatus="all"
        />
      )}
      {currentPage === Page.MAINTENANCE_REPAIR && (
        <AssetList 
          onAssetClick={(id, mode) => navigateTo(Page.ASSET_DETAIL, id, mode)} 
          currentUser={currentUser}
          defaultStatus="attention" // Lọc tự động trạng thái Cần xử lý
        />
      )}
      {currentPage === Page.ASSET_DETAIL && (
        <AssetDetail 
          assetId={selectedAssetId} 
          mode={detailMode}
          currentUser={currentUser}
          onBack={() => navigateTo(Page.ASSET_LIST)} 
          onEdit={() => setDetailMode('edit')}
        />
      )}
      {currentPage === Page.BATCH_IMPORT && <BatchImport />}
      {currentPage === Page.SETTINGS && <Settings />}
    </Layout>
  );
};

export default App;