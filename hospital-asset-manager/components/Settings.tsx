import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Settings as SettingsIcon, 
  Save,
  Check,
  Search,
  MoreVertical,
  Sliders,
  Building2,
  Tags,
  Truck,
  DollarSign
} from 'lucide-react';
import { User, UserRole, Supplier } from '../types';

// Dữ liệu mẫu người dùng
const initialUsers: User[] = [
  { id: '1', name: 'Nguyễn Văn A', email: 'admin@hospital.com', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '2', name: 'Trần Thị B', email: 'manager@hospital.com', role: 'MANAGER', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: '3', name: 'Lê Văn C', email: 'staff@hospital.com', role: 'USER', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

const initialSuppliers: Supplier[] = [
  { id: 'SUP01', name: 'Công ty TNHH MediEquip', contactPerson: 'Nguyễn Văn Hùng', phone: '0901234567', debt: 150000000, address: 'Hà Nội' },
  { id: 'SUP02', name: 'Global Health Supply', contactPerson: 'Ms. Sarah', phone: '0987654321', debt: 0, address: 'TP. HCM' },
  { id: 'SUP03', name: 'Vật tư Y tế Việt Nhật', contactPerson: 'Trần Minh', phone: '0912345678', debt: 50000000, address: 'Đà Nẵng' },
];

const RoleBadge = ({ role }: { role: UserRole }) => {
  const styles = {
    ADMIN: 'bg-purple-100 text-purple-700 border-purple-200',
    MANAGER: 'bg-blue-100 text-blue-700 border-blue-200',
    USER: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[role]}`}>
      {role === 'ADMIN' ? 'Quản trị viên' : role === 'MANAGER' ? 'Quản lý' : 'Nhân viên'}
    </span>
  );
};

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'assets' | 'suppliers'>('users');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole as UserRole } : u));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Cài đặt hệ thống</h1>
        <p className="text-slate-500 text-sm mt-1 sm:mt-2 max-w-2xl">
          Quản lý người dùng, phân quyền, cấu hình tài sản và đối tác.
        </p>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="border-b border-slate-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-6 sm:space-x-8 min-w-max">
          <button
            onClick={() => setActiveTab('users')}
            className={`
              flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm transition-colors
              ${activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
            `}
          >
            <Users size={18} />
            Người dùng
          </button>
          <button
             onClick={() => setActiveTab('assets')}
            className={`
              flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm transition-colors
              ${activeTab === 'assets' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
            `}
          >
            <Sliders size={18} />
            Cấu hình tài sản
          </button>
          <button
             onClick={() => setActiveTab('suppliers')}
            className={`
              flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm transition-colors
              ${activeTab === 'suppliers' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
            `}
          >
            <Truck size={18} />
            Nhà cung cấp & Công nợ
          </button>
        </nav>
      </div>

      {/* --- USERS TAB --- */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm nhân viên..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <button className="whitespace-nowrap px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                  + Thêm
                </button>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[600px]">
                 <thead>
                   <tr className="bg-slate-50 text-xs uppercase text-slate-500 font-bold tracking-wider">
                     <th className="p-4 pl-6">Người dùng</th>
                     <th className="p-4">Email</th>
                     <th className="p-4">Vai trò</th>
                     <th className="p-4 text-right pr-6">Thao tác</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 text-sm">
                   {users.map((user) => (
                     <tr key={user.id} className="hover:bg-slate-50 group transition-colors">
                       <td className="p-4 pl-6">
                         <div className="flex items-center gap-3">
                           <img src={user.avatar} alt={user.name} className="size-9 rounded-full object-cover shadow-sm" />
                           <span className="font-bold text-slate-900">{user.name}</span>
                         </div>
                       </td>
                       <td className="p-4 text-slate-500">{user.email}</td>
                       <td className="p-4">
                         <div className="relative group/select">
                           <select 
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="appearance-none bg-transparent pl-0 pr-8 py-1 font-semibold text-sm cursor-pointer focus:outline-none hover:text-primary transition-colors"
                           >
                             <option value="ADMIN">Quản trị viên</option>
                             <option value="MANAGER">Quản lý</option>
                             <option value="USER">Nhân viên</option>
                           </select>
                           <RoleBadge role={user.role} />
                         </div>
                       </td>
                       <td className="p-4 text-right pr-6">
                         <button className="text-slate-400 hover:text-primary p-2 rounded-full hover:bg-slate-100 transition-colors">
                           <MoreVertical size={18} />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
          
          {/* Permission Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                Định nghĩa quyền hạn
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <span className="font-bold text-purple-900 text-sm block mb-1">Quản trị viên (Admin)</span>
                  <p className="text-xs text-purple-800">Toàn quyền hệ thống, quản lý user, xem báo cáo tài chính.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="font-bold text-blue-900 text-sm block mb-1">Quản lý (Manager)</span>
                  <p className="text-xs text-blue-800">Thêm/Sửa tài sản, Nhập kho, In tem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ASSET CONFIG TAB --- */}
      {activeTab === 'assets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Department Config */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                   <Building2 className="text-primary" size={20} />
                   Khoa / Phòng & Đơn vị sử dụng
                </h3>
                <button className="text-sm text-primary font-bold hover:underline">+ Thêm mới</button>
             </div>
             <div className="space-y-3">
                {['Khoa Cấp Cứu', 'Khoa Nhi', 'Khoa Nội', 'Khoa Chẩn đoán HA', 'Khoa Hồi sức tích cực'].map((dept, i) => (
                   <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-primary/30 transition-colors">
                      <span className="text-slate-700 font-medium text-sm">{dept}</span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-slate-400 hover:text-blue-600"><SettingsIcon size={14}/></button>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Status Config */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                   <Tags className="text-primary" size={20} />
                   Trạng thái tài sản
                </h3>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                   <div className="flex items-center gap-3">
                      <span className="size-3 rounded-full bg-emerald-500"></span>
                      <div>
                         <p className="text-sm font-bold text-slate-900">Đang sử dụng (Active)</p>
                         <p className="text-xs text-slate-500">Thiết bị hoạt động bình thường</p>
                      </div>
                   </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                   <div className="flex items-center gap-3">
                      <span className="size-3 rounded-full bg-amber-500"></span>
                      <div>
                         <p className="text-sm font-bold text-slate-900">Đang bảo trì (Maintenance)</p>
                         <p className="text-xs text-slate-500">Đang trong quá trình sửa chữa/bảo dưỡng</p>
                      </div>
                   </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                   <div className="flex items-center gap-3">
                      <span className="size-3 rounded-full bg-rose-500"></span>
                      <div>
                         <p className="text-sm font-bold text-slate-900">Hỏng hóc (Broken)</p>
                         <p className="text-xs text-slate-500">Thiết bị không hoạt động, chờ xử lý</p>
                      </div>
                   </div>
                </div>
             </div>
             <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg">
                * Các trạng thái hệ thống mặc định không thể xóa để đảm bảo tính toàn vẹn dữ liệu.
             </div>
          </div>
        </div>
      )}

      {/* --- SUPPLIERS TAB --- */}
      {activeTab === 'suppliers' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Truck className="text-primary" size={20} />
                      Danh sách Nhà cung cấp
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">Theo dõi thông tin liên hệ và công nợ.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-2 justify-center">
                  + Thêm Nhà cung cấp
                </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase text-slate-500 font-bold tracking-wider">
                    <th className="p-4 pl-6">Tên công ty</th>
                    <th className="p-4">Người liên hệ</th>
                    <th className="p-4">Số điện thoại</th>
                    <th className="p-4 text-right">Công nợ hiện tại</th>
                    <th className="p-4 text-center">Trạng thái</th>
                    <th className="p-4 text-right pr-6">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {suppliers.map((sup) => (
                    <tr key={sup.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 pl-6">
                        <div>
                           <p className="font-bold text-slate-900">{sup.name}</p>
                           <p className="text-xs text-slate-500">{sup.address}</p>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700">{sup.contactPerson}</td>
                      <td className="p-4 text-slate-700 font-mono">{sup.phone}</td>
                      <td className="p-4 text-right">
                        <span className={`font-bold ${sup.debt > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                           {formatCurrency(sup.debt)}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                         {sup.debt > 0 ? (
                           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                             <DollarSign size={12} /> Nợ
                           </span>
                         ) : (
                           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                             <Check size={12} /> Đã thanh toán
                           </span>
                         )}
                      </td>
                      <td className="p-4 text-right pr-6">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-bold hover:underline">
                           Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default Settings;