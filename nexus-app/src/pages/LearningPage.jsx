import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Award, 
  Clock, 
  TrendingUp,
  Star,
  Filter,
  Search
} from 'lucide-react';

export default function LearningPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Machine Learning Avanzado',
      instructor: 'Dr. Roberto Sánchez',
      progress: 65,
      modules: 12,
      completedModules: 8,
      duration: '24 horas',
      rating: 4.9,
      students: '2.3K',
      category: 'ia',
      image: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Diseño de Interfaces Futuristas',
      instructor: 'Ana Martínez',
      progress: 40,
      modules: 8,
      completedModules: 3,
      duration: '16 horas',
      rating: 4.8,
      students: '1.8K',
      category: 'design',
      image: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Arquitectura de Software Escalable',
      instructor: 'Carlos Rodríguez',
      progress: 85,
      modules: 10,
      completedModules: 9,
      duration: '20 horas',
      rating: 4.9,
      students: '3.1K',
      category: 'development',
      image: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Productividad con IA',
      instructor: 'María González',
      progress: 20,
      modules: 6,
      completedModules: 1,
      duration: '12 horas',
      rating: 4.7,
      students: '4.5K',
      category: 'productivity',
      image: 'from-yellow-500 to-orange-500'
    }
  ];

  const learningPaths = [
    { name: 'Desarrollador Full Stack', courses: 8, completed: 5, color: 'from-blue-500 to-cyan-500' },
    { name: 'Experto en IA', courses: 12, completed: 7, color: 'from-purple-500 to-pink-500' },
    { name: 'Diseñador UX/UI', courses: 6, completed: 4, color: 'from-green-500 to-emerald-500' },
  ];

  const achievements = [
    { icon: Award, title: 'Primer Curso', description: 'Completa tu primer curso', unlocked: true },
    { icon: Star, title: 'Excelencia', description: 'Obtén 95% en un examen', unlocked: true },
    { icon: TrendingUp, title: 'Racha de 7 días', description: 'Estudia 7 días seguidos', unlocked: true },
    { icon: BookOpen, title: 'Bibliotecario', description: 'Completa 10 cursos', unlocked: false },
  ];

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Aprendizaje</h1>
          <p className="text-dark-400">Tu camino hacia la maestría profesional</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="card px-6 py-3 flex items-center gap-3">
            <Award className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="text-sm text-dark-400">Nivel Actual</p>
              <p className="font-bold text-lg">Experto</p>
            </div>
          </div>
          <div className="card px-6 py-3 flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-sm text-dark-400">Horas Totales</p>
              <p className="font-bold text-lg">127h</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Paths Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-4">Rutas de Aprendizaje</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningPaths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card stat-card cursor-pointer"
            >
              <div className={`w-full h-2 rounded-full bg-gradient-to-r ${path.color} mb-4`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(path.completed / path.courses) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full bg-gradient-to-r ${path.color}`}
                />
              </div>
              <h3 className="font-semibold mb-2">{path.name}</h3>
              <p className="text-dark-400 text-sm">{path.completed}/{path.courses} cursos completados</p>
            </motion.div>
          ))}
        </div>
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
            placeholder="Buscar cursos..."
            className="input-field pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-dark-400" />
          {['all', 'ia', 'design', 'development', 'productivity'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-primary-500 text-white'
                  : 'glass text-dark-400 hover:text-dark-50'
              }`}
            >
              {filter === 'all' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="card group cursor-pointer overflow-hidden"
          >
            {/* Course Image */}
            <div className={`h-40 bg-gradient-to-br ${course.image} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                <p className="text-white/80 text-sm">{course.instructor}</p>
              </div>
              <button className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white ml-1" />
              </button>
            </div>

            {/* Course Info */}
            <div className="mt-4 space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-dark-400">Progreso</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-2 rounded-full bg-gradient-to-r ${course.image}`}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-dark-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.completedModules}/{course.modules} módulos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                  <span className="text-dark-500">({course.students})</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">Logros</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`card text-center p-6 ${!achievement.unlocked && 'opacity-50 grayscale'}`}
            >
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                  : 'bg-dark-700'
              }`}>
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{achievement.title}</h3>
              <p className="text-sm text-dark-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
