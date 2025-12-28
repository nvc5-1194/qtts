import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ChevronDown, 
  Plus, 
  Trash2, 
  Save, 
  FileSpreadsheet, 
  AlertCircle,
  CheckCircle2,
  Printer,
  FilePlus,
  Copy
} from 'lucide-react';
import { Asset, AssetType } from '../types';
import LabelPrintingModal from './LabelPrinting';

const BatchImport: React.FC = () => {
  // Mode selection
  const [importMode, setImportMode] = useState<'single' | 'batch'>('single');

  // Common States
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState<Asset[]>([]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // --- BATCH MODE STATES ---
  const [hasSerial, setHasSerial] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [usageDate, setUsageDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [previewIds, setPreviewIds] = useState<string[]>([]);
  
  // --- SINGLE MODE STATES ---
  const [singleAsset, setSingleAsset] = useState<Partial<Asset>>({
    name: '',
    department: 'Khoa Cấp Cứu',
    category: 'Thiết bị chẩn đoán',
    assetType: 'fixed',
    model: '',
    serialNumber: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    status: 'active',
    originalPrice: 0,
    id: ''
  });

  // Shared Form States (used for batch default values as well)
  const [assetName, setAssetName] = useState('');
  const [department, setDepartment] = useState('Khoa Kho Dược & TBYT');
  const [category, setCategory] = useState('Thiết bị chẩn đoán');
  const [assetType, setAssetType] = useState<AssetType>('tool');

  // Logic sinh ID tự động cho Batch
  useEffect(() => {
    if (quantity > 0) {
      const year = usageDate ? new Date(usageDate).getFullYear() : new Date().getFullYear();
      const startSequence = 46; 
      const ids = [];
      for (let i = 0; i < Math.min(quantity, 10); i++) {
        const currentSeq = startSequence + i;
        const seqString = String(currentSeq).padStart(3, '0');
        ids.push(`HCQT.${year}.${seqString}`);
      }
      setPreviewIds(ids);
    }
  }, [quantity, usageDate]);

  // Logic sinh ID tự động cho Single (khi chưa nhập)
  useEffect(() => {
    if (importMode === 'single' && !singleAsset.id) {
       const year = new Date().getFullYear();
       setSingleAsset(prev => ({...prev, id: `HCQT.${year}.001`})); // Mock next ID
    }
  }, [importMode]);

  const handleSaveBatch = () => {
    const year = usageDate ? new Date(usageDate).getFullYear() : new Date().getFullYear();
    const startSequence = 46; 
    const newAssets: Asset[] = [];

    for (let i = 0; i < quantity; i++) {
       const currentSeq = startSequence + i;
       const id = `HCQT.${year}.${String(currentSeq).padStart(3, '0')}`;
       newAssets.push({
         id: id,
         name: assetName || 'Tài sản mới',
         category: category,
         department: department,
         model: 'N/A',
         serialNumber: 'N/A',
         purchaseDate: usageDate,
         status: 'active',
         assetType: assetType,
         image: '',
         originalPrice: 0
       });
    }

    setGeneratedAssets(newAssets);
    setIsSuccess(true);
  };

  const handleSaveSingle = () => {
    if (!singleAsset.name) {
        alert("Vui lòng nhập tên tài sản");
        return;
    }
    const newAsset: Asset = {
        id: singleAsset.id || `HCQT.${new Date().getFullYear()}.999`,
        name: singleAsset.name,
        category: singleAsset.category || '',
        department: singleAsset.department || '',
        model: singleAsset.model || '',
        serialNumber: singleAsset.serialNumber || '',
        purchaseDate: singleAsset.purchaseDate || '',
        status: singleAsset.status as any || 'active',
        assetType: singleAsset.assetType as AssetType || 'fixed',
        image: '',
        originalPrice: singleAsset.originalPrice || 0
    };
    setGeneratedAssets([newAsset]);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setAssetName('');
    setQuantity(1);
    setGeneratedAssets([]);
    setSingleAsset({
        name: '',
        department: 'Khoa Cấp Cứu',
        category: 'Thiết bị chẩn đoán',
        assetType: 'fixed',
        model: '',
        serialNumber: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        status: 'active',
        originalPrice: 0,
        id: `HCQT.${new Date().getFullYear()}.002`
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-green-100 p-4 rounded-full text-green-600 mb-6">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Nhập kho thành công!</h2>
        <p className="text-slate-500 max-w-md mb-8">
          Đã thêm <span className="font-bold text-slate-900">{generatedAssets.length}</span> tài sản vào hệ thống. 
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Tiếp tục nhập thêm
          </button>
          <button 
            onClick={() => setIsPrintModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
          >
            <Printer size={20} />
            In tem ngay
          </button>
        </div>

        <LabelPrintingModal 
          isOpen={isPrintModalOpen} 
          onClose={() => setIsPrintModalOpen(false)}
          assets={generatedAssets}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Thêm mới tài sản</h1>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Lựa chọn phương thức nhập liệu phù hợp với nhu cầu của bạn.
          </p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
         <button 
            onClick={() => setImportMode('single')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${importMode === 'single' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
         >
            <FilePlus size={18} /> Nhập lẻ (Chi tiết)
         </button>
         <button 
            onClick={() => setImportMode('batch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${importMode === 'batch' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
         >
            <Copy size={18} /> Nhập theo lô (Nhanh)
         </button>
      </div>

      {/* --- SINGLE MODE --- */}
      {importMode === 'single' && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
                     <Package className="text-primary" size={20} />
                     <h3 className="text-slate-900 text-lg font-bold">Thông tin chi tiết tài sản</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="md:col-span-2">
                        <label className="text-slate-900 text-sm font-medium">Tên tài sản <span className="text-red-500">*</span></label>
                        <input 
                           className="w-full mt-1 rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all"
                           placeholder="Ví dụ: Máy siêu âm Doppler màu"
                           value={singleAsset.name}
                           onChange={e => setSingleAsset({...singleAsset, name: e.target.value})}
                        />
                     </div>

                     <div>
                        <label className="text-slate-900 text-sm font-medium">Mã tài sản (ID)</label>
                        <input 
                           className="w-full mt-1 rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all font-mono"
                           value={singleAsset.id}
                           onChange={e => setSingleAsset({...singleAsset, id: e.target.value})}
                        />
                        <p className="text-xs text-slate-400 mt-1">Để trống để tự động sinh mã</p>
                     </div>

                     <div>
                        <label className="text-slate-900 text-sm font-medium">Khoa / Phòng</label>
                        <div className="relative mt-1">
                           <select 
                              className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all appearance-none"
                              value={singleAsset.department}
                              onChange={e => setSingleAsset({...singleAsset, department: e.target.value})}
                           >
                              <option>Khoa Cấp Cứu</option>
                              <option>Khoa Hồi sức tích cực</option>
                              <option>Khoa Chẩn đoán hình ảnh</option>
                              <option>Khoa Nhi</option>
                           </select>
                           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                        </div>
                     </div>

                     <div>
                        <label className="text-slate-900 text-sm font-medium">Phân loại</label>
                        <div className="relative mt-1">
                           <select 
                              className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all appearance-none"
                              value={singleAsset.assetType}
                              onChange={e => setSingleAsset({...singleAsset, assetType: e.target.value as AssetType})}
                           >
                              <option value="fixed">Tài sản cố định</option>
                              <option value="tool">Công cụ dụng cụ</option>
                           </select>
                           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                        </div>
                     </div>

                     <div>
                        <label className="text-slate-900 text-sm font-medium">Nhóm tài sản</label>
                        <div className="relative mt-1">
                           <select 
                              className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all appearance-none"
                              value={singleAsset.category}
                              onChange={e => setSingleAsset({...singleAsset, category: e.target.value})}
                           >
                              <option>Thiết bị chẩn đoán</option>
                              <option>Thiết bị hỗ trợ</option>
                              <option>Nội thất</option>
                              <option>CNTT</option>
                           </select>
                           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
                     <FileSpreadsheet className="text-primary" size={20} />
                     <h3 className="text-slate-900 text-lg font-bold">Thông tin kỹ thuật & Tài chính</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="text-slate-900 text-sm font-medium">Model (Ký hiệu)</label>
                        <input 
                           className="w-full mt-1 rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all"
                           placeholder="VD: CX-50"
                           value={singleAsset.model}
                           onChange={e => setSingleAsset({...singleAsset, model: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="text-slate-900 text-sm font-medium">Số Serial (S/N)</label>
                        <input 
                           className="w-full mt-1 rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all"
                           placeholder="Nhập số serial..."
                           value={singleAsset.serialNumber}
                           onChange={e => setSingleAsset({...singleAsset, serialNumber: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="text-slate-900 text-sm font-medium">Nguyên giá (VND)</label>
                        <input 
                           type="number"
                           className="w-full mt-1 rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all"
                           placeholder="0"
                           value={singleAsset.originalPrice}
                           onChange={e => setSingleAsset({...singleAsset, originalPrice: parseInt(e.target.value) || 0})}
                        />
                     </div>
                     <div>
                        <label className="text-slate-900 text-sm font-medium">Ngày đưa vào sử dụng</label>
                        <input 
                           type="date"
                           className="w-full mt-1 rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all"
                           value={singleAsset.purchaseDate}
                           onChange={e => setSingleAsset({...singleAsset, purchaseDate: e.target.value})}
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Hoàn tất</h3>
                  <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
                     <p className="text-sm text-slate-600 mb-2"><span className="font-semibold">Tên:</span> {singleAsset.name || '(Chưa nhập)'}</p>
                     <p className="text-sm text-slate-600 mb-2"><span className="font-semibold">Loại:</span> {singleAsset.assetType === 'fixed' ? 'Tài sản cố định' : 'Công cụ dụng cụ'}</p>
                     <p className="text-sm text-slate-600"><span className="font-semibold">Serial:</span> {singleAsset.serialNumber || 'N/A'}</p>
                  </div>
                  <button 
                     onClick={handleSaveSingle}
                     className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
                  >
                     <Save size={18} /> Lưu & Nhập kho
                  </button>
               </div>
            </div>
         </div>
      )}

      {/* --- BATCH MODE --- */}
      {importMode === 'batch' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                <Copy className="text-primary" size={20} />
                <h3 className="text-slate-900 text-lg font-bold">Thông tin lô tài sản (Nhập nhanh)</h3>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-slate-900 text-sm font-medium">Tên tài sản <span className="text-red-500">*</span></label>
                  <input 
                    className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all" 
                    placeholder="Ví dụ: Bơm tiêm điện" 
                    type="text" 
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 text-sm font-medium">Phân loại quản lý</label>
                  <div className="relative">
                    <select 
                      className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all appearance-none"
                      value={assetType}
                      onChange={(e) => setAssetType(e.target.value as AssetType)}
                    >
                      <option value="fixed">Tài sản cố định</option>
                      <option value="tool">Công cụ dụng cụ</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 text-sm font-medium">Danh mục / Nhóm</label>
                  <div className="relative">
                    <select 
                      className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all appearance-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Thiết bị chẩn đoán</option>
                      <option>Dụng cụ y tế</option>
                      <option>Vật tư tiêu hao</option>
                      <option>Nội thất bệnh viện</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 text-sm font-medium">Khoa / Phòng tiếp nhận</label>
                  <div className="relative">
                    <select 
                      className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all appearance-none"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="Khoa Kho Dược & TBYT">Khoa Kho Dược & TBYT</option>
                      <option value="Khoa Cấp Cứu">Khoa Cấp Cứu</option>
                      <option value="Khoa Hồi sức tích cực">Khoa Hồi sức tích cực</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-slate-900 text-lg font-bold">Cấu hình lô hàng</h3>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="hasSerial" 
                    checked={hasSerial}
                    onChange={(e) => setHasSerial(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer" 
                  />
                  <label htmlFor="hasSerial" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                    Có số Serial riêng biệt?
                  </label>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-900 text-sm font-medium">Số lượng nhập <span className="text-red-500">*</span></label>
                    <input 
                      className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all" 
                      type="number" 
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-900 text-sm font-medium">Ngày sử dụng (Tính năm)</label>
                    <input 
                      className="w-full rounded-lg bg-slate-50 border-transparent focus:border-primary focus:ring-0 focus:bg-white text-slate-900 text-sm h-11 px-4 transition-all" 
                      type="date" 
                      value={usageDate}
                      onChange={(e) => setUsageDate(e.target.value)}
                    />
                  </div>
                </div>

                {!hasSerial ? (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="text-primary shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Chế độ tự động tạo mã (Tịnh tiến)</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Hệ thống sẽ tự động sinh <span className="font-bold">{quantity}</span> mã tài sản định danh (ID) theo cấu trúc 
                        <span className="font-mono bg-white px-1 mx-1 rounded border border-slate-200">HCQT.{new Date(usageDate || new Date()).getFullYear()}.NNN</span>
                        dựa trên năm sử dụng.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
                    <FileSpreadsheet className="text-amber-600 shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Nhập danh sách Serial</p>
                      <p className="text-sm text-slate-600 mt-1">
                        Vui lòng tải lên file Excel chứa danh sách số Serial ở bước sau.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-slate-900 text-lg font-bold">Xem trước ID</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-500">Số lượng:</span>
                  <span className="text-lg font-bold text-slate-900">{quantity} tài sản</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mã ID dự kiến</p>
                  {previewIds.map((id, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-600 font-mono bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {id}
                    </div>
                  ))}
                  {quantity > 10 && (
                    <div className="text-center text-xs text-slate-400 italic pt-1">
                      ...và {quantity - 10} mã khác
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleSaveBatch}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-xl active:scale-[0.98]"
                >
                  <Save size={18} />
                  Lưu & Nhập lô
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchImport;