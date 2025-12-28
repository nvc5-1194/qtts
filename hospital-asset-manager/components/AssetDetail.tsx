import React from 'react';
import { 
  Save, 
  Copy, 
  ChevronDown, 
  Camera, 
  Printer, 
  UploadCloud, 
  FileText, 
  Trash2,
  Paperclip,
  Edit,
  Lock,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { User } from '../types';

interface AssetDetailProps {
  assetId: string | null;
  onBack: () => void;
  mode: 'view' | 'edit';
  onEdit: () => void;
  currentUser: User;
}

const AssetDetail: React.FC<AssetDetailProps> = ({ assetId, onBack, mode, onEdit, currentUser }) => {
  const isReadOnly = mode === 'view';
  const canEdit = currentUser.role === 'ADMIN' || currentUser.role === 'MANAGER';

  // Helper styles for readonly state
  const inputClass = isReadOnly 
    ? "w-full rounded-lg bg-slate-100 border-none text-slate-700 text-sm h-11 px-4 cursor-default focus:ring-0"
    : "w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all";

  return (
    <>
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 pb-6 px-1">
        <button onClick={onBack} className="text-slate-500 hover:text-primary text-sm font-medium transition-colors">Trang chủ</button>
        <span className="text-slate-500 text-sm font-medium">/</span>
        <button onClick={onBack} className="text-slate-500 hover:text-primary text-sm font-medium transition-colors">Quản lý tài sản</button>
        <span className="text-slate-500 text-sm font-medium">/</span>
        <span className="text-slate-900 text-sm font-medium">Chi tiết tài sản</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {isReadOnly ? 'Thông tin chi tiết' : 'Chỉnh sửa tài sản'}
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            ID: <span className="font-mono font-bold text-slate-700">{assetId || "HOSP-EQ-2023-0849"}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {isReadOnly ? (
            <>
              {/* Nút Báo hỏng nhanh */}
              <button className="flex-1 md:flex-none h-10 px-4 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                 <AlertTriangle size={18} />
                 Báo hỏng
              </button>

              <button 
                onClick={onBack} 
                className="flex-1 md:flex-none min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 text-sm font-bold transition-colors shadow-sm"
              >
                Quay lại
              </button>
              {canEdit && (
                <button 
                  onClick={onEdit}
                  className="flex-1 md:flex-none min-w-[84px] items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors shadow-md shadow-blue-500/20 flex gap-2"
                >
                  <Edit size={18} />
                  Sửa
                </button>
              )}
            </>
          ) : (
            <>
              <button 
                onClick={onBack} 
                className="flex-1 md:flex-none min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 text-sm font-bold transition-colors shadow-sm"
              >
                Hủy bỏ
              </button>
              <button className="flex-1 md:flex-none min-w-[84px] items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors shadow-md shadow-blue-500/20 flex gap-2">
                <Save size={18} />
                Lưu
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Info Column */}
        <div className="lg:col-span-8 space-y-6 lg:space-y-8">
          
          {/* General Info */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
            {isReadOnly && <div className="absolute top-4 right-4 text-slate-400"><Lock size={20}/></div>}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-slate-900 text-lg font-bold">Thông tin chung</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">Đang hoạt động</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-slate-900 text-sm font-medium">Tên tài sản <span className="text-red-500">*</span></label>
                <input className={inputClass} placeholder="Ví dụ: Máy siêu âm Philips CX50" type="text" defaultValue="Máy siêu âm Philips CX50" readOnly={isReadOnly} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Hãng sản xuất</label>
                <input className={inputClass} placeholder="Ví dụ: Philips Healthcare" type="text" defaultValue="Philips Healthcare" readOnly={isReadOnly} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Model</label>
                <input className={inputClass} placeholder="Ví dụ: CX50" type="text" defaultValue="CX50" readOnly={isReadOnly} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Số Serial</label>
                <input className={inputClass} placeholder="Ví dụ: SN-99887766" type="text" defaultValue="SN-99887766" readOnly={isReadOnly} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Nhà cung cấp</label>
                <div className="relative">
                  <select disabled={isReadOnly} className={`${inputClass} appearance-none`}>
                    <option>Công ty TNHH MediEquip</option>
                    <option>Global Health Supply</option>
                  </select>
                  {!isReadOnly && <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />}
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-slate-900 text-lg font-bold">Lịch bảo trì & Bảo dưỡng</h3>
               <button className="text-sm text-primary font-bold hover:underline">+ Lên lịch</button>
             </div>
             <div className="p-6">
               <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 mb-3">
                  <div className="p-2 bg-white rounded-md border border-slate-200 text-slate-500">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                       <h4 className="font-bold text-slate-900 text-sm">Bảo dưỡng định kỳ Q4/2023</h4>
                       <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Sắp tới</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Dự kiến: 15/11/2023 • Đơn vị: Kỹ thuật Bệnh viện</p>
                  </div>
               </div>
               
               <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100 opacity-60">
                  <div className="p-2 bg-slate-100 rounded-md border border-slate-200 text-slate-400">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                       <h4 className="font-bold text-slate-900 text-sm line-through">Kiểm chuẩn bức xạ</h4>
                       <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Hoàn thành</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Ngày: 20/05/2023 • Kết quả: Đạt chuẩn</p>
                  </div>
               </div>
             </div>
          </div>

          {/* Financials */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
            {isReadOnly && <div className="absolute top-4 right-4 text-slate-400"><Lock size={20}/></div>}
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-slate-900 text-lg font-bold">Vòng đời & Tài chính</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Năm sản xuất</label>
                <input className={inputClass} type="number" defaultValue={2021} readOnly={isReadOnly} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Ngày bắt đầu sử dụng</label>
                <input className={inputClass} type="date" defaultValue="2022-01-15" readOnly={isReadOnly} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Đơn vị sử dụng</label>
                <div className="relative">
                   <select disabled={isReadOnly} className={`${inputClass} appearance-none`}>
                    <option>Khoa Tim mạch</option>
                    <option>Khoa Chẩn đoán hình ảnh</option>
                  </select>
                  {!isReadOnly && <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 text-sm font-medium">Nguyên giá (VND)</label>
                <div className="relative">
                  <input className={`${inputClass} ${!isReadOnly ? 'pr-10' : ''}`} type="text" defaultValue="450.000.000" readOnly={isReadOnly} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₫</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column (Image & Docs) */}
        <div className="lg:col-span-4 space-y-6 lg:space-y-8">
          
          {/* Image & QR */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-slate-900 text-lg font-bold">Hình ảnh & Mã QR</h3>
              {!isReadOnly && <button className="text-primary text-sm font-bold hover:underline">Sửa</button>}
            </div>
            <div className="p-6 flex flex-col items-center gap-6">
              <div className="w-full aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden relative group">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516549655169-df83a0833860?auto=format&fit=crop&q=80&w=600&h=400")' }}></div>
                {!isReadOnly && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white font-bold flex items-center gap-2">
                      <Camera size={20} /> Thay đổi ảnh
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full bg-primary/5 rounded-lg p-4 flex items-center gap-4 border border-dashed border-primary/30">
                <div className="size-16 bg-white p-1 rounded-sm shrink-0 shadow-sm flex items-center justify-center">
                  <div className="size-14 bg-slate-900" style={{
                      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath fill='black' d='M0 0h10v10H0z'/%3E%3Cpath fill='white' d='M1 1h3v3H1zM6 1h3v3H6zM1 6h3v3H1zM5 5h1v1H5zM8 8h1v1H8z'/%3E%3C/svg%3E")`,
                      WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath fill='black' d='M0 0h10v10H0z'/%3E%3Cpath fill='white' d='M1 1h3v3H1zM6 1h3v3H6zM1 6h3v3H1zM5 5h1v1H5zM8 8h1v1H8z'/%3E%3C/svg%3E")`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      backgroundColor: 'currentColor'
                  }}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{assetId || "HOSP-EQ-2023-0849"}</p>
                  <button className="text-xs text-primary font-medium flex items-center gap-1 mt-1 hover:underline">
                    <Printer size={14} /> In nhãn
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-slate-900 text-lg font-bold">Tài liệu đính kèm</h3>
              <Paperclip className="text-slate-400" size={20} />
            </div>
            <div className="p-6 flex flex-col gap-3">
              {!isReadOnly && (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors gap-2">
                  <UploadCloud className="text-slate-400" size={32} />
                  <p className="text-xs text-slate-500">Kéo thả PDF vào đây, hoặc <span className="text-primary font-bold">chọn tệp</span></p>
                </div>
              )}
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="size-8 rounded bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">Huong_Dan_Su_Dung_v2.pdf</p>
                    <p className="text-xs text-slate-500">2.4 MB • Đã thêm 12/01</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 border-t border-slate-200 py-6 text-center">
        <p className="text-slate-500 text-sm">© 2024 Hospital Asset Manager. All rights reserved.</p>
      </footer>
    </>
  );
};

export default AssetDetail;