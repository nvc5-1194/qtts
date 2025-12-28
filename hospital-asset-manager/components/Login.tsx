import React from 'react';
import { Hospital, User, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex min-h-screen w-full flex-row overflow-hidden bg-white">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30 mix-blend-multiply"></div>
        
        <div className="relative z-10 flex flex-col items-start justify-end h-full w-full p-16 pb-24 text-white">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <Hospital size={36} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Hệ thống</h2>
              <h2 className="text-3xl font-bold tracking-tight text-blue-100">Quản lý Tài sản</h2>
            </div>
          </div>
          <p className="text-lg text-blue-50 max-w-md leading-relaxed font-medium">
            Giải pháp quản lý thiết bị y tế toàn diện, tối ưu hóa quy trình vận hành và đảm bảo an toàn cho bệnh nhân.
          </p>
          <div className="mt-10 flex gap-2">
            <div className="h-1.5 w-8 rounded-full bg-white"></div>
            <div className="h-1.5 w-2 rounded-full bg-white/40"></div>
            <div className="h-1.5 w-2 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 bg-white shadow-2xl lg:shadow-none">
        <div className="w-full max-w-sm lg:w-[420px] space-y-8">
          <div className="lg:hidden flex flex-col items-center mb-8 text-primary">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Hospital size={40} />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Đăng nhập tài khoản
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Chào mừng trở lại! Vui lòng nhập thông tin để truy cập.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold leading-6 text-slate-900" htmlFor="email">
                  Tên đăng nhập hoặc Email
                </label>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@hospital.com"
                    className="block w-full rounded-xl border-0 py-3.5 pl-4 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all duration-200 outline-none"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <User className="text-slate-400" size={20} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold leading-6 text-slate-900" htmlFor="password">
                    Mật khẩu
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-primary hover:text-blue-600 transition-colors">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="block w-full rounded-xl border-0 py-3.5 pl-4 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-all duration-200 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer group"
                  >
                    {showPassword ? (
                      <EyeOff className="text-slate-400 group-hover:text-primary transition-colors" size={20} />
                    ) : (
                      <Eye className="text-slate-400 group-hover:text-primary transition-colors" size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-xl bg-primary px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 ease-out transform active:scale-[0.98]"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-slate-500">Hoặc</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Chưa có tài khoản?
              <a href="#" className="font-bold text-primary hover:text-blue-600 ml-1 transition-colors hover:underline">
                Đăng ký tài khoản mới
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-auto pt-10 text-center lg:text-left w-full max-w-sm lg:max-w-[420px]">
          <div className="border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400 leading-relaxed">
              © 2024 Hệ thống Quản lý Tài sản Bệnh viện.<br />Powered by Google Apps Script.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;