import React, { useMemo, useState, useEffect } from 'react';
import { 
  Filter, 
  RefreshCcw, 
  ChevronDown, 
  Eye, 
  Edit, 
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Building2,
  Printer,
  CheckSquare,
  Square,
  Search,
  X,
  Trash2,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Hammer
} from 'lucide-react';
import { Asset, User, AssetType, AssetStatus } from '../types';
import LabelPrintingModal from './LabelPrinting';

interface AssetListProps {
  onAssetClick: (id: string, mode: 'view' | 'edit') => void;
  currentUser: User;
  defaultStatus?: string; 
}

// Helper: Input Search Component
const TableSearchInput = ({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (val: string) => void }) => (
  <div className="relative mt-2">
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
    <input 
      type="text" 
      className="w-full pl-6 pr-6 py-1 text-[11px] border border-slate-200 rounded bg-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 font-normal h-7"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()} 
    />
    {value && (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onChange('');
        }}
        className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
      >
        <X size={12} />
      </button>
    )}
  </div>
);

// Cập nhật dữ liệu mẫu với originalPrice
const assets: Asset[] = [
  { id: 'HCQT.2023.001', name: 'Máy siêu âm 4D', category: 'Thiết bị chẩn đoán', department: 'Khoa Cấp Cứu', model: 'Voluson E10', serialNumber: '882910-X', purchaseDate: '2023', status: 'active', assetType: 'fixed', image: 'https://images.unsplash.com/photo-1516549655169-df83a0833860?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 450000000 },
  { id: 'HCQT.2023.015', name: 'Bơm tiêm điện', category: 'Thiết bị hỗ trợ', department: 'Khoa Cấp Cứu', model: 'B.Braun', serialNumber: 'BB-991', purchaseDate: '2023', status: 'active', assetType: 'tool', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 15000000 },
  { id: 'HCQT.2021.042', name: 'Máy X-Quang KTS', category: 'Chẩn đoán hình ảnh', department: 'Khoa Chẩn đoán HA', model: 'Siemens Multix', serialNumber: 'SM-9921', purchaseDate: '2021', status: 'maintenance', assetType: 'fixed', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 1200000000 },
  { id: 'HCQT.2022.088', name: 'Giường bệnh điện', category: 'Nội thất', department: 'Khoa Nội', model: 'Hillrom 900', serialNumber: 'HR-1102', purchaseDate: '2022', status: 'broken', assetType: 'fixed', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 35000000 },
  { id: 'HCQT.2022.089', name: 'Tủ đầu giường', category: 'Nội thất', department: 'Khoa Nội', model: 'Hoa Phat', serialNumber: 'HP-01', purchaseDate: '2022', status: 'active', assetType: 'tool', image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 2500000 },
  { id: 'HCQT.2023.102', name: 'Máy đo huyết áp', category: 'Thiết bị theo dõi', department: 'Khoa Nhi', model: 'Omron HEM-7121', serialNumber: 'OM-3334', purchaseDate: '2023', status: 'active', assetType: 'tool', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 1200000 },
  { id: 'HCQT.2023.103', name: 'Cân sức khỏe điện tử', category: 'Thiết bị theo dõi', department: 'Khoa Nhi', model: 'Tanita', serialNumber: 'TA-11', purchaseDate: '2023', status: 'active', assetType: 'tool', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 850000 },
  { id: 'HCQT.2020.005', name: 'Máy thở', category: 'Thiết bị hỗ trợ', department: 'Hồi sức tích cực', model: 'Draeger Evita', serialNumber: 'DR-5511', purchaseDate: '2020', status: 'active', assetType: 'fixed', image: 'https://images.unsplash.com/photo-1631217868269-dfc15c03296c?auto=format&fit=crop&q=80&w=200&h=200', originalPrice: 650000000 },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    active: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-500', label: 'Đang sử dụng' },
    maintenance: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-500', label: 'Đang bảo trì' },
    broken: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', dot: 'bg-rose-500', label: 'Hỏng hóc' },
    disposed: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400', label: 'Đã thanh lý' },
  };
  const style = styles[status] || styles.active;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}>
      <span className={`size-1.5 rounded-full ${style.dot} ${status === 'active' ? 'animate-pulse' : ''}`}></span>
      {style.label}
    </span>
  );
};

const AssetTypeBadge = ({ type }: { type: AssetType }) => {
  if (type === 'fixed') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase">
        <Building2 size={10} /> TSCĐ
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 uppercase">
      <Briefcase size={10} /> CCDC
    </span>
  );
};

const formatCurrency = (amount: number | undefined) => {
    if (!amount) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const MaintenanceCompletionModal = ({ isOpen, onClose, onConfirm, assetId }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-3 bg-green-100 text-green-600 rounded-full">
             <CheckCircle2 size={24} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-slate-900">Xác nhận hoàn thành</h3>
             <p className="text-sm text-slate-500">Cập nhật thông tin sửa chữa cho tài sản {assetId}</p>
           </div>
        </div>

        <div className="space-y-4">
           <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">Ngày hoàn thành</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
           </div>
           
           <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">Nội dung công việc / Sửa chữa</label>
              <textarea 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none h-24 resize-none"
                placeholder="Mô tả chi tiết công việc đã thực hiện..."
              ></textarea>
           </div>

           <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">Minh chứng (Hình ảnh)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-pointer transition-colors">
                  <Camera className="text-slate-400 mb-2" size={24} />
                  <p className="text-xs text-slate-500">Nhấn để tải lên ảnh sau khi sửa chữa</p>
              </div>
           </div>
        </div>

        <div className="flex gap-3 mt-8">
           <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Hủy bỏ</button>
           <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">Lưu & Hoàn thành</button>
        </div>
      </div>
    </div>
  );
};

const AssetList: React.FC<AssetListProps> = ({ onAssetClick, currentUser, defaultStatus = 'all' }) => {
  // Thêm state cho serialSearch
  const [filters, setFilters] = useState({ id: '', name: '', department: '', model: '', serial: '' });
  const [statusFilter, setStatusFilter] = useState(defaultStatus);
  const [deptFilter, setDeptFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); 
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [completionModal, setCompletionModal] = useState<{isOpen: boolean, assetId: string | null}>({isOpen: false, assetId: null});

  // Local state for assets to handle updates (Complete/Dispose)
  const [localAssets, setLocalAssets] = useState<Asset[]>(assets);

  useEffect(() => {
    setStatusFilter(defaultStatus);
  }, [defaultStatus]);
  
  const filteredAndSortedAssets = useMemo(() => {
    let result = [...localAssets];
    if (filters.id) result = result.filter(a => a.id.toLowerCase().includes(filters.id.toLowerCase().trim()));
    if (filters.name) result = result.filter(a => a.name.toLowerCase().includes(filters.name.toLowerCase().trim()));
    if (filters.department) result = result.filter(a => a.department.toLowerCase().includes(filters.department.toLowerCase().trim()));
    if (filters.model) result = result.filter(a => a.model.toLowerCase().includes(filters.model.toLowerCase().trim()));
    if (filters.serial) result = result.filter(a => a.serialNumber.toLowerCase().includes(filters.serial.toLowerCase().trim()));
    
    if (statusFilter !== 'all') {
      if (statusFilter === 'attention') {
         // Special filter for "Maintenance & Repair" page
         result = result.filter(a => a.status === 'broken' || a.status === 'maintenance');
      } else {
         result = result.filter(a => a.status === statusFilter);
      }
    }
    
    if (deptFilter !== 'all') result = result.filter(a => a.department === deptFilter);
    if (typeFilter !== 'all') result = result.filter(a => a.assetType === typeFilter);

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [filters, statusFilter, deptFilter, typeFilter, localAssets]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAndSortedAssets.length) setSelectedIds([]);
    else setSelectedIds(filteredAndSortedAssets.map(a => a.id));
  };

  const handleCompleteMaintenance = () => {
     if (completionModal.assetId) {
        setLocalAssets(prev => prev.map(a => a.id === completionModal.assetId ? {...a, status: 'active'} : a));
        setCompletionModal({isOpen: false, assetId: null});
     }
  };

  const handleDispose = (id: string) => {
     if (window.confirm("Bạn có chắc chắn muốn đề xuất thanh lý thiết bị này không?")) {
        setLocalAssets(prev => prev.map(a => a.id === id ? {...a, status: 'disposed'} : a));
     }
  };

  const isAttentionMode = statusFilter === 'attention';

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              {isAttentionMode ? 'Bảo trì & Sửa chữa' : 'Danh sách tài sản'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 sm:mt-2 max-w-2xl">
              {isAttentionMode 
                ? 'Theo dõi, cập nhật tiến độ sửa chữa và đề xuất thanh lý các thiết bị hỏng.' 
                : 'Quản lý toàn bộ trang thiết bị y tế trong hệ thống.'}
            </p>
          </div>
          {/* Hide Print Button if in Attention Mode */}
          {selectedIds.length > 0 && !isAttentionMode && (
             <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:static md:translate-x-0">
               <button 
                onClick={() => setIsPrintModalOpen(true)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full md:rounded-lg text-sm font-bold transition-colors shadow-xl shadow-slate-900/30 md:shadow-lg md:shadow-slate-900/20"
              >
                <Printer size={18} />
                <span>In {selectedIds.length} tem</span>
              </button>
             </div>
          )}
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium w-full sm:w-auto">
            <Filter size={18} />
            <span>Bộ lọc:</span>
            {/* Mobile Search - Only shows on mobile */}
             <div className="md:hidden flex-1 ml-2 relative">
                <input 
                  type="text" 
                  placeholder="Tìm nhanh..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-primary outline-none"
                  value={filters.name}
                  onChange={(e) => setFilters({...filters, name: e.target.value})}
                />
             </div>
          </div>
          
          <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-3 w-full sm:w-auto scrollbar-hide">
            <div className="relative group min-w-[140px]">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none w-full cursor-pointer flex h-9 items-center rounded-lg bg-white border border-slate-200 hover:border-primary px-3 pr-8 text-slate-900 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Tất cả loại</option>
                <option value="fixed">Tài sản cố định</option>
                <option value="tool">Công cụ dụng cụ</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
            </div>

            <div className="relative group min-w-[140px]">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full cursor-pointer flex h-9 items-center rounded-lg bg-white border border-slate-200 hover:border-primary px-3 pr-8 text-slate-900 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang sử dụng</option>
                <option value="maintenance">Đang bảo trì</option>
                <option value="broken">Hỏng hóc</option>
                <option value="disposed">Đã thanh lý</option>
                <option value="attention">Cần xử lý (Hỏng/Bảo trì)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
            </div>
             <div className="relative group min-w-[160px]">
              <select 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="appearance-none w-full cursor-pointer flex h-9 items-center rounded-lg bg-white border border-slate-200 hover:border-primary px-3 pr-8 text-slate-900 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Tất cả khoa/phòng</option>
                <option value="Khoa Cấp Cứu">Khoa Cấp Cứu</option>
                <option value="Khoa Nhi">Khoa Nhi</option>
                <option value="Khoa Nội">Khoa Nội</option>
                <option value="Khoa Chẩn đoán HA">Khoa Chẩn đoán HA</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
            </div>
            <button 
              className="ml-auto sm:ml-2 text-sm text-slate-500 hover:text-primary font-medium transition-colors flex items-center gap-1 py-1.5 px-2 rounded hover:bg-slate-100 whitespace-nowrap"
              onClick={() => {
                  setFilters({ id: '', name: '', department: '', model: '', serial: '' });
                  setStatusFilter(defaultStatus);
                  setDeptFilter('all');
                  setTypeFilter('all');
              }}
            >
              <RefreshCcw size={16} />
              <span className="hidden lg:inline">Xóa</span>
            </button>
          </div>
        </div>

        {/* --- DESKTOP VIEW: TABLE --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-col hidden md:flex">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 align-top">
                  {/* 1. Checkbox */}
                  <th className="py-4 pl-6 pr-3 w-14">
                    <button onClick={toggleSelectAll} className="flex items-center justify-center text-slate-400">
                      {selectedIds.length === filteredAndSortedAssets.length && filteredAndSortedAssets.length > 0 ? <CheckSquare className="text-primary" size={20} /> : <Square size={20} />}
                    </button>
                  </th>
                  
                  {/* 2. Phân loại */}
                  <th className="py-3 px-3 min-w-[100px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Phân loại</span>
                    <div className="h-7 mt-2"></div>
                  </th>
                  
                  {/* 3. Mã tài sản */}
                  <th className="py-3 px-3 min-w-[120px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Mã tài sản</span>
                    <TableSearchInput 
                      placeholder="Tìm mã..." 
                      value={filters.id}
                      onChange={(val) => setFilters({...filters, id: val})} 
                    />
                  </th>
                  
                  {/* 4. Khoa / Phòng */}
                  <th className="py-3 px-3 min-w-[150px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Khoa / Phòng</span>
                    <TableSearchInput 
                      placeholder="Tìm khoa..." 
                      value={filters.department}
                      onChange={(val) => setFilters({...filters, department: val})} 
                    />
                  </th>
                  
                  {/* 5. Tên tài sản */}
                  <th className="py-3 px-3 min-w-[200px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Tên tài sản</span>
                    <TableSearchInput 
                      placeholder="Tìm tên..." 
                      value={filters.name}
                      onChange={(val) => setFilters({...filters, name: val})} 
                    />
                  </th>
                  
                  {/* 6. Model */}
                  <th className="py-3 px-3 min-w-[100px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Model</span>
                    <TableSearchInput 
                      placeholder="Tìm model..." 
                      value={filters.model}
                      onChange={(val) => setFilters({...filters, model: val})} 
                    />
                  </th>
                  
                  {/* 7. Serial */}
                  <th className="py-3 px-3 min-w-[100px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Serial</span>
                    <TableSearchInput 
                      placeholder="Tìm serial..." 
                      value={filters.serial}
                      onChange={(val) => setFilters({...filters, serial: val})} 
                    />
                  </th>
                  
                  {/* 8. Nguyên giá */}
                  <th className="py-3 px-3 min-w-[120px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Nguyên giá</span>
                    <div className="h-7 mt-2"></div>
                  </th>
                  
                  {/* 9. Trạng thái */}
                  <th className="py-3 px-3 w-[140px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Trạng thái</span>
                    <div className="h-7 mt-2"></div>
                  </th>
                  
                  {/* 10. Hành động */}
                  <th className="py-3 pl-3 pr-6 text-right w-[100px]">
                    <span className="text-xs font-bold uppercase text-slate-500">Hành động</span>
                    <div className="h-7 mt-2"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAndSortedAssets.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-slate-400">Không tìm thấy dữ liệu.</td>
                  </tr>
                ) : (
                  filteredAndSortedAssets.map((asset) => (
                    <tr 
                      key={asset.id} 
                      className={`group hover:bg-slate-50 transition-colors ${selectedIds.includes(asset.id) ? 'bg-blue-50/80' : ''}`}
                      onClick={() => toggleSelect(asset.id)}
                    >
                      <td className="py-4 pl-6 pr-3">
                        <button className="flex items-center justify-center text-slate-400">
                          {selectedIds.includes(asset.id) ? <CheckSquare className="text-primary" size={20} /> : <Square className="group-hover:text-slate-500" size={20} />}
                        </button>
                      </td>
                      <td className="py-4 px-3"><AssetTypeBadge type={asset.assetType} /></td>
                      <td className="py-4 px-3 font-semibold text-slate-900 font-mono text-xs md:text-sm">{asset.id}</td>
                      <td className="py-4 px-3 text-slate-600">{asset.department}</td>
                      <td className="py-4 px-3 font-medium text-slate-900">{asset.name}</td>
                      <td className="py-4 px-3 text-slate-600">{asset.model}</td>
                      <td className="py-4 px-3 text-slate-600 font-mono">{asset.serialNumber}</td>
                      <td className="py-4 px-3 text-slate-900 font-medium">{formatCurrency(asset.originalPrice)}</td>
                      <td className="py-4 px-3"><StatusBadge status={asset.status} /></td>
                      <td className="py-4 pl-3 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                           {isAttentionMode ? (
                              <>
                                <button 
                                  onClick={() => setCompletionModal({isOpen: true, assetId: asset.id})}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-bold text-xs transition-colors border border-green-200"
                                >
                                  <CheckCircle2 size={14} /> Hoàn thành
                                </button>
                                <button 
                                  onClick={() => handleDispose(asset.id)}
                                  className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-200"
                                  title="Đề xuất thanh lý"
                                >
                                  <X size={16} />
                                </button>
                              </>
                           ) : (
                              <>
                                <button onClick={() => onAssetClick(asset.id, 'view')} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><Eye size={18}/></button>
                                <button onClick={() => onAssetClick(asset.id, 'edit')} className="p-1.5 hover:bg-blue-50 hover:text-primary rounded-lg text-slate-500"><Edit size={18}/></button>
                              </>
                           )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* --- MOBILE VIEW (Simplified) --- */}
        <div className="md:hidden flex flex-col gap-3">
          {filteredAndSortedAssets.length === 0 ? (
             <div className="text-center py-10 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
               Không tìm thấy tài sản nào
             </div>
          ) : (
            filteredAndSortedAssets.map(asset => (
              <div 
                key={asset.id}
                className={`bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-3 ${selectedIds.includes(asset.id) ? 'border-primary ring-1 ring-primary' : 'border-slate-200'}`}
                onClick={() => onAssetClick(asset.id, 'view')}
              >
                  <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                           <AssetTypeBadge type={asset.assetType} />
                           <span className="text-xs font-mono text-slate-500">{asset.id}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm">{asset.name}</h3>
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); toggleSelect(asset.id); }}>
                        {selectedIds.includes(asset.id) ? <CheckSquare className="text-primary" size={20} /> : <div className="size-5 rounded border-2 border-slate-300"></div>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-1 text-xs text-slate-600">
                      <span><Building2 size={10} className="inline mr-1"/> {asset.department}</span>
                      <span>Model: {asset.model}</span>
                      <span>Serial: {asset.serialNumber}</span>
                      <span className="font-semibold">{formatCurrency(asset.originalPrice)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <StatusBadge status={asset.status} />
                      <div className="flex gap-2">
                           {isAttentionMode ? (
                              <button onClick={(e) => {e.stopPropagation(); setCompletionModal({isOpen: true, assetId: asset.id})}} className="p-1.5 bg-green-50 text-green-700 rounded"><CheckCircle2 size={16}/></button>
                           ) : (
                              <button onClick={(e) => {e.stopPropagation(); onAssetClick(asset.id, 'edit')}} className="p-1.5 bg-slate-100 rounded"><Edit size={16}/></button>
                           )}
                      </div>
                  </div>
              </div>
            ))
          )}
        </div>

      </div>

      <LabelPrintingModal 
        isOpen={isPrintModalOpen} 
        onClose={() => setIsPrintModalOpen(false)}
        assets={assets.filter(a => selectedIds.includes(a.id))}
      />

      <MaintenanceCompletionModal 
         isOpen={completionModal.isOpen}
         assetId={completionModal.assetId}
         onClose={() => setCompletionModal({isOpen: false, assetId: null})}
         onConfirm={handleCompleteMaintenance}
      />
    </>
  );
};

export default AssetList;