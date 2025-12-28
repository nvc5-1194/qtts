import React, { useState } from 'react';
import { 
  Printer, 
  QrCode,
  Download,
  Settings,
  X,
  CheckCircle2
} from 'lucide-react';
import { Asset } from '../types';

interface LabelPrintingModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[]; // Danh sách tài sản cần in
}

const LabelPreview = ({ asset }: { asset: Asset }) => (
  <div className="bg-white border-2 border-slate-900 rounded-lg p-3 w-full aspect-[2/1] flex gap-3 shadow-sm relative overflow-hidden break-inside-avoid mb-4">
    <div className="bg-slate-900 size-20 shrink-0 flex items-center justify-center text-white">
      <QrCode size={48} strokeWidth={1.5} />
    </div>
    <div className="flex flex-col justify-between min-w-0 flex-1">
      <div>
        <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">{asset.name}</h4>
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">{asset.department}</p>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400">Asset ID</span>
        <span className="font-mono text-sm font-bold text-slate-900 tracking-tight">{asset.id}</span>
      </div>
    </div>
    <div className="absolute -right-4 -bottom-4 text-slate-50 opacity-50 rotate-12 pointer-events-none">
       <div className="text-6xl font-black">+</div>
    </div>
  </div>
);

const LabelPrintingModal: React.FC<LabelPrintingModalProps> = ({ isOpen, onClose, assets }) => {
  const [printSize, setPrintSize] = useState<'small' | 'medium' | 'large'>('medium');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-slate-100 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-primary rounded-lg">
              <Printer size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">In tem nhãn tài sản</h2>
              <p className="text-sm text-slate-500">Đã chọn {assets.length} tài sản để in</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Settings Sidebar */}
          <div className="w-full md:w-80 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Kích thước tem</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors border-slate-200">
                  <input 
                    type="radio" 
                    name="size" 
                    checked={printSize === 'small'} 
                    onChange={() => setPrintSize('small')}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-slate-900">Khổ nhỏ</p>
                    <p className="text-slate-500 text-xs">35mm x 22mm</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors border-primary bg-blue-50/50 ring-1 ring-primary">
                  <input 
                    type="radio" 
                    name="size" 
                    checked={printSize === 'medium'} 
                    onChange={() => setPrintSize('medium')}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-slate-900">Khổ tiêu chuẩn</p>
                    <p className="text-slate-500 text-xs">50mm x 30mm</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors border-slate-200">
                  <input 
                    type="radio" 
                    name="size" 
                    checked={printSize === 'large'} 
                    onChange={() => setPrintSize('large')}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-slate-900">Khổ lớn</p>
                    <p className="text-slate-500 text-xs">70mm x 40mm</p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Tùy chọn in</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary" />
                  Hiển thị tên đơn vị
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary" />
                  Hiển thị mã QR
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                  In viền khung
                </label>
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 flex gap-2">
                 <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                 <span>Máy in sẵn sàng: Brother QL-800</span>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 bg-slate-100 p-8 overflow-y-auto">
             <div className="max-w-3xl mx-auto">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Xem trước bản in ({printSize})</h3>
                 <span className="text-xs text-slate-400">Trang 1/1</span>
               </div>
               
               <div className="bg-white p-8 shadow-sm min-h-[500px] border border-slate-200">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
                   {assets.map(asset => (
                     <LabelPreview key={asset.id} asset={asset} />
                   ))}
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Hủy bỏ
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 hover:text-primary transition-colors">
            <Download size={18} />
            Tải PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
            <Printer size={18} />
            In ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelPrintingModal;