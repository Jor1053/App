import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Image,
  Video,
  Link,
  Send,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: 'María González', avatar: 'MG', role: 'AI Researcher', reputation: 950 },
      content: 'Acabo de terminar un proyecto fascinante sobre redes neuronales aplicadas a la productividad personal. Los resultados superaron todas mis expectativas. ¿Alguien interesado en colaborar en la próxima fase?',
      image: null,
      likes: 142,
      comments: 28,
      shares: 15,
      timestamp: 'Hace 2 horas',
      tags: ['IA', 'Productividad', 'Colaboración']
    },
    {
      id: 2,
      author: { name: 'Carlos Rodríguez', avatar: 'CR', role: 'Full Stack Developer', reputation: 820 },
      content: 'Comparto mi experiencia migrando una aplicación enterprise a Firebase. La escalabilidad y el tiempo real son increíbles. Aquí les dejo algunos tips clave que aprendí en el proceso.',
      image: 'gradient',
      likes: 89,
      comments: 34,
      shares: 22,
      timestamp: 'Hace 4 horas',
      tags: ['Firebase', 'Desarrollo', 'Enterprise']
    },
    {
      id: 3,
      author: { name: 'Ana Martínez', avatar: 'AM', role: 'UX Designer', reputation: 1100 },
      content: 'El diseño del futuro no es solo sobre estética, es sobre crear experiencias que se adapten inteligentemente al contexto del usuario. La IA está revolucionando cómo pensamos la interacción humano-computadora.',
      image: null,
      likes: 256,
      comments: 67,
      shares: 45,
      timestamp: 'Hace 6 horas',
      tags: ['UX', 'IA', 'Diseño']
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: posts.length + 1,
      author: { name: 'Tú', avatar: 'TU', role: 'Usuario', reputation: 100 },
      content: newPost,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Ahora',
      tags: ['Nuevo']
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const trendingTopics = [
    { tag: '#InteligenciaArtificial', posts: '2.3K' },
    { tag: '#Productividad', posts: '1.8K' },
    { tag: '#Firebase', posts: '1.5K' },
    { tag: '#UXDesign', posts: '1.2K' },
    { tag: '#WebDevelopment', posts: '980' }
  ];

  const topContributors = [
    { name: 'Ana Martínez', avatar: 'AM', reputation: 1100 },
    { name: 'María González', avatar: 'MG', reputation: 950 },
    { name: 'Carlos Rodríguez', avatar: 'CR', reputation: 820 },
    { name: 'Luis Hernández', avatar: 'LH', reputation: 780 },
    { name: 'Sofía López', avatar: 'SL', reputation: 720 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-white">TU</span>
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="¿Qué quieres compartir con la comunidad?"
                rows={3}
                className="w-full bg-transparent border-none outline-none resize-none text-dark-50 placeholder-dark-500"
              />
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-700/50">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-dark-400 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800/50">
                    <Image className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-dark-400 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800/50">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-dark-400 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800/50">
                    <Link className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="btn-primary flex items-center gap-2 py-2 px-4 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold text-white">{post.author.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-dark-400">
                    <span>{post.author.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {post.author.reputation}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.timestamp}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-dark-400 hover:text-dark-300">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Post Content */}
            <p className="text-dark-100 leading-relaxed mb-4">{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post Image Placeholder */}
            {post.image && (
              <div className="rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 h-48 flex items-center justify-center">
                <Image className="w-12 h-12 text-dark-400" />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-dark-700/50">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    likedPosts.includes(post.id) ? 'text-red-400' : 'text-dark-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                
                <button className="flex items-center gap-2 text-dark-400 hover:text-green-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-400" />
            Tendencias
          </h3>
          
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between group cursor-pointer">
                <span className="text-dark-300 group-hover:text-primary-400 transition-colors">
                  {topic.tag}
                </span>
                <span className="text-sm text-dark-500">{topic.posts}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Contributors */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Top Contribuidores
          </h3>
          
          <div className="space-y-4">
            {topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="font-semibold text-white text-sm">{contributor.avatar}</span>
                  </div>
                  {index < 3 && (
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{contributor.name}</p>
                  <p className="text-sm text-dark-400">{contributor.reputation} pts</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-400" />
            Comunidad
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-dark-800/50">
              <p className="text-3xl font-bold text-gradient">10K+</p>
              <p className="text-sm text-dark-400 mt-1">Miembros</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-dark-800/50">
              <p className="text-3xl font-bold text-gradient">50K+</p>
              <p className="text-sm text-dark-400 mt-1">Publicaciones</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-dark-800/50">
              <p className="text-3xl font-bold text-gradient">100+</p>
              <p className="text-sm text-dark-400 mt-1">Comunidades</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-dark-800/50">
              <p className="text-3xl font-bold text-gradient">24/7</p>
              <p className="text-sm text-dark-400 mt-1">Actividad</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
