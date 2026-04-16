import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Shield, TrendingUp, Users } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
      
      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">Nexus</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#features" className="nav-link">Características</a>
            <a href="#modules" className="nav-link">Módulos</a>
            <a href="#security" className="nav-link">Seguridad</a>
            <button className="btn-secondary">Iniciar Sesión</button>
          </motion.div>
        </nav>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-dark-300">La plataforma del futuro, disponible hoy</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Tu Centro de{' '}
              <span className="text-gradient">Inteligencia</span>
              <br />
              Digital Todo-en-Uno
            </h1>

            <p className="text-xl text-dark-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Nexus combina productividad, comunidad, inteligencia artificial y automatización 
              en una plataforma premium diseñada para el mundo hiperconectado de mañana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="btn-primary text-lg px-8 py-4"
              >
                Comenzar Gratis
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Ver Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Automatización IA"
              description="Agentes inteligentes que trabajan contigo 24/7"
              color="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Comunidad Evolutiva"
              description="Conecta con mentes brillantes globalmente"
              color="from-primary-500 to-purple-500"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Seguridad Enterprise"
              description="Protección de grado militar para tus datos"
              color="from-green-500 to-emerald-500"
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <StatItem number="10K+" label="Usuarios Activos" />
            <StatItem number="50M+" label="Tareas Automatizadas" />
            <StatItem number="99.9%" label="Uptime Garantizado" />
            <StatItem number="24/7" label="Soporte IA" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="card group cursor-pointer"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-dark-400">{description}</p>
    </motion.div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-gradient mb-2">{number}</div>
      <div className="text-dark-400">{label}</div>
    </div>
  );
}
