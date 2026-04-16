import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile
        try {
          const profileRef = doc(db, 'users', user.uid);
          const profileSnap = await getDoc(profileRef);
          
          if (profileSnap.exists()) {
            setUserProfile(profileSnap.data());
          } else {
            // Create default profile
            const defaultProfile = {
              email: user.email,
              displayName: user.displayName || user.email?.split('@')[0],
              photoURL: user.photoURL || null,
              role: 'user',
              createdAt: new Date().toISOString(),
              settings: {
                notifications: true,
                privacy: 'public',
                theme: 'dark'
              },
              stats: {
                tasksCompleted: 0,
                postsCreated: 0,
                connectionsCount: 0,
                reputationScore: 100
              }
            };
            
            await setDoc(profileRef, defaultProfile);
            setUserProfile(defaultProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  const register = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    
    // Create user profile
    const profileData = {
      email,
      displayName: displayName || email.split('@')[0],
      photoURL: null,
      role: 'user',
      createdAt: new Date().toISOString(),
      settings: {
        notifications: true,
        privacy: 'public',
        theme: 'dark'
      },
      stats: {
        tasksCompleted: 0,
        postsCreated: 0,
        connectionsCount: 0,
        reputationScore: 100
      }
    };
    
    await setDoc(doc(db, 'users', result.user.uid), profileData);
    
    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (updates) => {
    if (!currentUser) return;
    
    const profileRef = doc(db, 'users', currentUser.uid);
    await updateDoc(profileRef, updates);
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('nexus-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    theme,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    toggleTheme
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
