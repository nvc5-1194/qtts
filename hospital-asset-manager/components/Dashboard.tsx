import React from 'react';
import { 
  Package, 
  DollarSign, 
  Wrench, 
  AlertTriangle, 
  ArrowRight,
  Monitor,
  Trash2
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, bgClass, trend }: any) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 group hover:border-primary/30 transition-all h-full">
    <div className="flex justify-between items-start">
      <div className={`${bgClass} p-3 rounded-xl ${colorClass} group-hover:bg-primary group-hover:text-white transition-colors`}>
        <Icon size={24} />
      </div>
      <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${trend.includes('+') ? 'text-green-600 bg-green-50' : 'text-slate-500 bg-slate-100'}`}>
        {trend}
      </span>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const chartData = [
    { name: 'Hoạt động tốt', value: 70, color: '#137fec' },
    { name: 'Hỏng hóc', value: 15, color: '#f43f5e' },
    { name: 'Đang bảo trì', value: 10, color: '#fbbf24' },
    { name: 'Thanh lý', value: 5, color: '#94a3b8' },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Xin chào, Admin! 👋</h1>
        <p className="text-sm sm:text-base text-slate-500">Dưới đây là thống kê tổng quan về tình trạng tài sản hôm nay.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Tổng tài sản" value="2,450" subtext="Toàn bộ thiết bị" trend="+12%" 
          icon={Package} colorClass="text-primary" bgClass="bg-blue-50" 
        />
        <StatCard 
          title="Tổng giá trị" value="12.5 tỷ ₫" subtext="Ước tính hiện tại" trend="+5%" 
          icon={DollarSign} colorClass="text-purple-600" bgClass="bg-purple-50" 
        />
        <StatCard 
          title="Đang bảo trì" value="10" subtext="Đang xử lý kỹ thuật" trend="Ổn định" 
          icon={Wrench} colorClass="text-orange-600" bgClass="bg-orange-50" 
        />
        <StatCard 
          title="Báo hỏng" value="15" subtext="Cần sửa chữa gấp" trend="+3 mới" 
          icon={AlertTriangle} colorClass="text-red-600" bgClass="bg-red-50" 
        />
         <StatCard 
          title="Đã thanh lý" value="42" subtext="Thiết bị loại bỏ" trend="+2" 
          icon={Trash2} colorClass="text-slate-600" bgClass="bg-slate-100" 
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Biểu đồ trạng thái tài sản</h3>
           </div>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-full">
              <div className="h-64 w-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-3xl font-black text-slate-900">2,450</span>
                  <span className="text-sm text-slate-500 font-medium">Thiết bị</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                 {chartData.map((item) => (
                   <div key={item.name} className="flex items-center justify-between gap-12 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                     <div className="flex items-center gap-3">
                       <span className="size-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                       <span className="text-sm font-medium text-slate-700">{item.name}</span>
                     </div>
                     <div className="text-right">
                        <span className="block text-sm font-bold text-slate-900">{item.value}%</span>
                        <span className="text-xs text-slate-400">~ {(2450 * item.value / 100).toFixed(0)} cái</span>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Activity */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Hoạt động gần đây</h3>
            <div className="relative pl-4 border-l-2 border-slate-100 flex flex-col gap-8">
              {[
                { text: <span>BS. Minh báo hỏng <span className="text-red-600 font-bold">Máy Monitor #2</span></span>, time: '10 phút trước', dot: 'bg-red-500' },
                { text: <span>Kỹ thuật viên đã sửa xong <span className="text-primary font-bold">Giường G-102</span></span>, time: '2 giờ trước', dot: 'bg-primary' },
                { text: <span>Thêm mới 5 <span className="text-slate-900 font-bold">Máy đo huyết áp</span> vào kho</span>, time: 'Hôm qua', dot: 'bg-slate-400' },
                { text: <span>Đề xuất thanh lý <span className="text-slate-600 font-bold">Tủ lạnh hỏng</span></span>, time: 'Hôm qua', dot: 'bg-slate-600' },
              ].map((activity, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute -left-[21px] top-1.5 size-3 rounded-full ring-4 ring-white transition-transform group-hover:scale-110 ${activity.dot}`}></div>
                  <p className="text-sm text-slate-700 leading-relaxed">{activity.text}</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{activity.time}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-2.5 text-sm font-bold text-primary bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center justify-center gap-2">
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;