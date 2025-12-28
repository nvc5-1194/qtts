import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  List, 
  Wrench, 
  FileBarChart, 
  Settings, 
  Menu, 
  Search, 
  Bell, 
  Plus,
  LogOut,
  Hospital,
  Boxes,
  QrCode,
  Hammer
} from 'lucide-react';
import { Page, User } from '../types';
import QRScannerModal from './QRScannerModal';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page, assetId?: string) => void;
  onLogout: () => void;
  currentUser: User;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, onLogout, currentUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  const navItems = [
    { id: Page.DASHBOARD, label: 'Bảng điều khiển', icon: LayoutDashboard },
    { id: Page.ASSET_LIST, label: 'Danh sách tài sản', icon: List },
    { id: Page.MAINTENANCE_REPAIR, label: 'Bảo trì & Sửa chữa', icon: Hammer }, // Gộp chung
    { id: Page.BATCH_IMPORT, label: 'Nhập theo lô', icon: Boxes },
    { id: 'REPORTS', label: 'Báo cáo', icon: FileBarChart },
  ];

  const handleQRScanSuccess = (assetId: string) => {
    setIsQRScannerOpen(false);
    onNavigate(Page.ASSET_DETAIL, assetId);
  };

  return (
    <div className="flex h-screen w-full bg-background-light overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 transform bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
        md:relative md:translate-x-0 flex flex-col justify-between
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex items-center justify-center rounded-lg size-10 text-primary">
              <Hospital size={24} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Hospital Assets</h1>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    // Navigate logic for all handled pages
                    if ([Page.DASHBOARD, Page.ASSET_LIST, Page.BATCH_IMPORT, Page.MAINTENANCE_REPAIR].includes(item.id as Page)) {
                      onNavigate(item.id as Page);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={20} />
                  <p className="text-sm font-medium">{item.label}</p>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-200">
          <button 
            onClick={() => {
                onNavigate(Page.SETTINGS);
                setIsMobileMenuOpen(false);
            }}
            className={`flex w-full items-center gap-3 px-3 py-3 rounded-lg transition-colors mb-2 ${
              currentPage === Page.SETTINGS 
              ? 'bg-slate-100 text-slate-900 font-semibold' 
              : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings size={20} />
            <p className="text-sm font-medium">Cài đặt</p>
          </button>
          
          <button 
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <p className="text-sm font-medium">Đăng xuất</p>
          </button>

          <div className="mt-4 flex items-center gap-3 px-3">
            <div className="relative">
              <img 
                src={currentUser.avatar}
                alt="User" 
                className="rounded-full size-9 ring-2 ring-white object-cover"
              />
              <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
              <span className="text-[10px] text-slate-500 font-medium">
                {currentUser.role === 'ADMIN' ? 'Quản trị viên' : currentUser.role === 'MANAGER' ? 'Quản lý' : 'Nhân viên'}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-50/50">
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:text-primary rounded-lg active:bg-slate-100"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-slate-900 hidden sm:block">
              {currentPage === Page.DASHBOARD && 'Tổng quan'}
              {currentPage === Page.ASSET_LIST && 'Danh sách tài sản'}
              {currentPage === Page.MAINTENANCE_REPAIR && 'Bảo trì & Sửa chữa'}
              {currentPage === Page.ASSET_DETAIL && 'Chi tiết tài sản'}
              {currentPage === Page.BATCH_IMPORT && 'Nhập tài sản theo lô'}
              {currentPage === Page.SETTINGS && 'Cài đặt hệ thống'}
            </h2>
            <h2 className="text-lg font-bold text-slate-900 sm:hidden block truncate max-w-[150px]">
              Hospital Assets
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
                onClick={() => setIsQRScannerOpen(true)}
                className="flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md shadow-slate-900/10 active:scale-95 transition-transform"
            >
                <QrCode size={18} />
                <span className="hidden sm:inline">Quét QR</span>
            </button>

            <div className="relative hidden md:block mr-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                className="h-10 pl-10 pr-4 rounded-full bg-slate-100 border-none focus:ring-2 focus:ring-primary/50 text-sm text-slate-700 placeholder:text-slate-400 w-64 transition-all outline-none" 
                placeholder="Tìm kiếm tài sản..." 
                type="text"
              />
            </div>
            
            <button className="relative text-slate-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* Chỉ Admin và Manager mới thấy nút Thêm */}
            {currentUser.role !== 'USER' && (
              <button 
                onClick={() => onNavigate(Page.BATCH_IMPORT)}
                className="md:flex hidden items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-primary/30 active:scale-95"
              >
                <Plus size={18} />
                <span>Thêm</span>
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth pb-20 sm:pb-8">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            {children}
          </div>
        </div>
      </main>

      <QRScannerModal 
        isOpen={isQRScannerOpen} 
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleQRScanSuccess}
      />
    </div>
  );
};

export default Layout;