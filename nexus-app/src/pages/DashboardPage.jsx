import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Target, 
  Zap,
  Brain,
  MessageSquare,
  Calendar,
  Award,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');
  const [stats, setStats] = useState({
    tasksCompleted: 12,
    totalTasks: 20,
    streak: 7,
    reputationScore: 850,
    learningProgress: 65,
    connectionsCount: 143
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  const quickActions = [
    { icon: MessageSquare, label: 'Nuevo Chat IA', color: 'from-primary-500 to-purple-500' },
    { icon: CheckCircle, label: 'Crear Tarea', color: 'from-green-500 to-emerald-500' },
    { icon: Calendar, label: 'Agendar', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, label: 'Automatizar', color: 'from-yellow-500 to-orange-500' },
  ];

  const aiRecommendations = [
    {
      type: 'productivity',
      title: 'Optimiza tu mañana',
      description: 'Basado en tus patrones, las 9 AM son tu hora más productiva. Agenda tareas importantes entonces.',
      priority: 'high'
    },
    {
      type: 'learning',
      title: 'Continúa tu aprendizaje',
      description: 'Has completado el 65% del curso de IA. ¡Estás a solo 2 módulos de terminar!',
      priority: 'medium'
    },
    {
      type: 'wellness',
      title: 'Toma un descanso',
      description: 'Llevas 2 horas trabajando. Un descanso de 10 minutos mejorará tu productividad.',
      priority: 'low'
    }
  ];

  const recentActivities = [
    { action: 'Completó tarea', target: 'Diseño de interfaz', time: 'Hace 5 min', icon: CheckCircle, color: 'text-green-400' },
    { action: 'Interactuó con IA', target: 'Generación de contenido', time: 'Hace 15 min', icon: Brain, color: 'text-primary-400' },
    { action: 'Nueva conexión', target: 'María González', time: 'Hace 1 hora', icon: Users, color: 'text-accent-400' },
    { action: 'Progreso en curso', target: 'Machine Learning', time: 'Hace 2 horas', icon: GraduationCap, color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">{greeting}, Usuario</h1>
          <p className="text-dark-400">
            {format(new Date(), "EEEE, d 'de' MMMM, yyyy", { locale: es })}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="card px-6 py-3 flex items-center gap-3">
            <Award className="w-5 h-5 text-accent-400" />
            <div>
              <p className="text-sm text-dark-400">Reputación</p>
              <p className="font-bold text-lg">{stats.reputationScore}</p>
            </div>
          </div>
          <div className="card px-6 py-3 flex items-center gap-3">
            <Activity className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-sm text-dark-400">Racha</p>
              <p className="font-bold text-lg">{stats.streak} días</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          icon={CheckCircle}
          label="Tareas Completadas"
          value={`${stats.tasksCompleted}/${stats.totalTasks}`}
          progress={(stats.tasksCompleted / stats.totalTasks) * 100}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          icon={Clock}
          label="Horas Productivas"
          value="6.5h"
          progress={75}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={Target}
          label="Objetivos Mensuales"
          value="8/12"
          progress={67}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          icon={Users}
          label="Conexiones"
          value={stats.connectionsCount}
          progress={85}
          color="from-orange-500 to-red-500"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card h-full">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Acciones Rápidas
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-2xl p-6 bg-dark-800/50 border border-dark-600 hover:border-primary-500/30 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <action.icon className="w-8 h-8 mb-3 text-dark-400 group-hover:text-white transition-colors" />
                  <p className="text-sm font-medium text-dark-300 group-hover:text-white">
                    {action.label}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* AI Insights Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary-400" />
                Recomendaciones de IA
              </h3>
              
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      rec.priority === 'high' 
                        ? 'bg-red-500/10 border-red-500/30' 
                        : rec.priority === 'medium'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-blue-500/10 border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        rec.priority === 'high' ? 'bg-red-400' : 
                        rec.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                      <div>
                        <h4 className="font-semibold mb-1">{rec.title}</h4>
                        <p className="text-sm text-dark-400">{rec.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card h-full">
            <h2 className="text-xl font-semibold mb-6">Actividad Reciente</h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 pb-4 border-b border-dark-700/50 last:border-0 last:pb-0"
                >
                  <div className={`w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{activity.action}</p>
                    <p className="text-sm text-dark-400 truncate">{activity.target}</p>
                  </div>
                  <span className="text-xs text-dark-500">{activity.time}</span>
                </motion.div>
              ))}
            </div>

            {/* Learning Progress */}
            <div className="mt-6 pt-6 border-t border-dark-700/50">
              <h3 className="font-semibold mb-4">Progreso de Aprendizaje</h3>
              <div className="space-y-4">
                <ProgressBar label="Machine Learning" progress={65} color="from-blue-500 to-cyan-500" />
                <ProgressBar label="UX/UI Design" progress={40} color="from-purple-500 to-pink-500" />
                <ProgressBar label="Productividad" progress={85} color="from-green-500 to-emerald-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, progress, color }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="card stat-card"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-dark-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold mb-3">{value}</p>
      <div className="w-full bg-dark-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-2 rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
}

function ProgressBar({ label, progress, color }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-dark-400">{label}</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-dark-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
          className={`h-2 rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

// Import missing icons
import { Users, GraduationCap } from 'lucide-react';
