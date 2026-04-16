import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  CheckSquare, 
  GraduationCap, 
  ShoppingCart, 
  Heart, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Brain,
  LogOut,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: MessageSquare, label: 'Asistente IA', id: 'assistant' },
  { icon: Users, label: 'Comunidad', id: 'community' },
  { icon: CheckSquare, label: 'Productividad', id: 'productivity' },
  { icon: GraduationCap, label: 'Aprendizaje', id: 'learning' },
  { icon: ShoppingCart, label: 'Economía', id: 'economy' },
  { icon: Heart, label: 'Bienestar', id: 'wellness' },
  { icon: Settings, label: 'Configuración', id: 'settings' },
];

export default function DashboardLayout({ children, currentPage = 'dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { currentUser, userProfile, logout, toggleTheme, theme } = useAuth();

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 280 : 80,
          x: mobileMenuOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
        }}
        className="fixed left-0 top-0 h-full glass-dark border-r border-dark-700/50 z-50 lg:z-30"
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-gradient">Nexus</span>
            )}
          </motion.div>
          
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-dark-400 hover:text-dark-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                currentPage === item.id
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                  : 'text-dark-400 hover:bg-dark-800/50 hover:text-dark-50'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
              {item.id === 'assistant' && sidebarOpen && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400">
                  IA
                </span>
              )}
            </motion.a>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{userProfile?.displayName || 'Usuario'}</p>
                <p className="text-sm text-dark-400 truncate">{currentUser?.email}</p>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={logout}
                className="text-dark-400 hover:text-red-400 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div 
        className="transition-all duration-300"
        style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (sidebarOpen ? 280 : 80) : 0 }}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-20 glass-dark border-b border-dark-700/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden text-dark-400 hover:text-dark-50"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block text-dark-400 hover:text-dark-50"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="input-field pl-10 w-64 lg:w-80"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="text-dark-400 hover:text-dark-50 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="relative text-dark-400 hover:text-dark-50 transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-500 text-white text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
