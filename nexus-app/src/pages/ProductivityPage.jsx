import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  Plus, 
  Calendar, 
  Flag, 
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Edit
} from 'lucide-react';

export default function ProductivityPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Diseñar interfaz de dashboard', description: 'Crear wireframes y mockups', priority: 'high', dueDate: '2024-01-15', completed: false, category: 'design' },
    { id: 2, title: 'Implementar autenticación Firebase', description: 'Configurar login y registro', priority: 'high', dueDate: '2024-01-16', completed: true, category: 'development' },
    { id: 3, title: 'Revisar documentación del proyecto', description: 'Actualizar README y docs', priority: 'medium', dueDate: '2024-01-17', completed: false, category: 'documentation' },
    { id: 4, title: 'Optimizar rendimiento de la app', description: 'Mejorar tiempos de carga', priority: 'low', dueDate: '2024-01-18', completed: false, category: 'optimization' },
    { id: 5, title: 'Preparar presentación para cliente', description: 'Slides y demo en vivo', priority: 'high', dueDate: '2024-01-19', completed: false, category: 'business' },
  ]);

  const [filter, setFilter] = useState('all');
  const [showNewTask, setShowNewTask] = useState(false);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length
  };

  const categories = [
    { id: 'design', name: 'Diseño', color: 'from-purple-500 to-pink-500' },
    { id: 'development', name: 'Desarrollo', color: 'from-blue-500 to-cyan-500' },
    { id: 'documentation', name: 'Documentación', color: 'from-green-500 to-emerald-500' },
    { id: 'optimization', name: 'Optimización', color: 'from-yellow-500 to-orange-500' },
    { id: 'business', name: 'Negocios', color: 'from-red-500 to-rose-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Productividad</h1>
          <p className="text-dark-400">Gestiona tus tareas y alcanza tus objetivos</p>
        </div>
        
        <button
          onClick={() => setShowNewTask(!showNewTask)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Tarea
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatCard label="Total" value={stats.total} color="from-primary-500 to-purple-500" />
        <StatCard label="Completadas" value={stats.completed} color="from-green-500 to-emerald-500" />
        <StatCard label="Pendientes" value={stats.pending} color="from-yellow-500 to-orange-500" />
        <StatCard label="Alta Prioridad" value={stats.highPriority} color="from-red-500 to-rose-500" />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-4"
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
          <input
            type="text"
            placeholder="Buscar tareas..."
            className="input-field pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-dark-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field py-2 px-3"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>
      </motion.div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className={`card group ${task.completed ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Circle className="w-6 h-6 text-dark-400 hover:text-primary-400 transition-colors" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-dark-400' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-dark-400 mt-1">{task.description}</p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getCategoryColor(task.category, categories)}`}>
                        {getCategoryName(task.category, categories)}
                      </span>
                      
                      <div className="flex items-center gap-1 text-sm text-dark-400">
                        <Calendar className="w-4 h-4" />
                        {task.dueDate}
                      </div>
                      
                      <div className={`flex items-center gap-1 text-sm ${
                        task.priority === 'high' ? 'text-red-400' :
                        task.priority === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                      }`}>
                        <Flag className="w-4 h-4" />
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-dark-400 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800/50">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-dark-400 hover:text-red-400 transition-colors rounded-lg hover:bg-dark-800/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-dark-400 hover:text-dark-300 transition-colors rounded-lg hover:bg-dark-800/50">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Task Form */}
      {showNewTask && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card fixed inset-x-4 bottom-4 lg:inset-x-auto lg:right-4 lg:w-96 z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Nueva Tarea</h3>
            <button onClick={() => setShowNewTask(false)} className="text-dark-400 hover:text-dark-300">
              <Circle className="w-5 h-5 rotate-45" />
            </button>
          </div>
          
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Título de la tarea"
              className="input-field"
            />
            <textarea
              placeholder="Descripción"
              rows={3}
              className="input-field resize-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <select className="input-field">
                <option>Alta Prioridad</option>
                <option>Media Prioridad</option>
                <option>Baja Prioridad</option>
              </select>
              <input type="date" className="input-field" />
            </div>
            <button type="submit" className="btn-primary w-full">
              Crear Tarea
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="card stat-card">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <p className="text-dark-400 text-sm">{label}</p>
    </div>
  );
}

function getCategoryColor(categoryId, categories) {
  const category = categories.find(c => c.id === categoryId);
  return category?.color || 'from-gray-500 to-gray-600';
}

function getCategoryName(categoryId, categories) {
  const category = categories.find(c => c.id === categoryId);
  return category?.name || categoryId;
}
