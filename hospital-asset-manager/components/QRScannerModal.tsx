import React, { useState, useEffect } from 'react';
import { X, QrCode, Camera, Zap } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (assetId: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
    } else {
      setScanning(false);
    }
  }, [isOpen]);

  // Giả lập quét thành công sau 2 giây
  const handleSimulateScan = () => {
    setScanning(false);
    // Giả lập tìm thấy ID này
    setTimeout(() => {
        onScanSuccess('HCQT.2023.001');
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Camera Viewfinder UI */}
      <div className="relative w-full h-full flex flex-col">
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
          <div className="text-white bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/20">
            Scanner Mode
          </div>
          <button onClick={onClose} className="text-white bg-black/20 p-2 rounded-full backdrop-blur-md hover:bg-white/20">
            <X size={24} />
          </button>
        </div>

        {/* Viewfinder */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-slate-900">
           {/* Fake Camera Feed Background */}
           <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center filter blur-sm"></div>
           
           <div className="relative z-10 w-64 h-64 border-2 border-primary/80 rounded-3xl flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary -mt-1 -ml-1 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary -mt-1 -mr-1 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary -mb-1 -ml-1 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary -mb-1 -mr-1 rounded-br-xl"></div>
              
              <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
              <div className="h-0.5 w-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] absolute top-1/2 -translate-y-1/2 animate-[scan_2s_ease-in-out_infinite]"></div>
           </div>
           
           <p className="relative z-10 mt-8 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
             Di chuyển camera đến mã QR trên thiết bị
           </p>
        </div>

        {/* Controls */}
        <div className="bg-black/90 pb-8 pt-6 px-6 flex flex-col gap-4 items-center">
            <button 
                onClick={handleSimulateScan}
                className="w-full max-w-xs bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                <QrCode size={20} />
                Giả lập quét tem
            </button>
            <div className="flex gap-8 text-white/60">
                <button className="flex flex-col items-center gap-1 hover:text-white">
                    <div className="p-3 rounded-full bg-white/10"><Zap size={20} /></div>
                    <span className="text-xs">Đèn Flash</span>
                </button>
                <button className="flex flex-col items-center gap-1 hover:text-white">
                    <div className="p-3 rounded-full bg-white/10"><Camera size={20} /></div>
                    <span className="text-xs">Nhập mã</span>
                </button>
            </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-120px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default QRScannerModal;