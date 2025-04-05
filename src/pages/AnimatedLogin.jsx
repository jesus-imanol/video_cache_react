import React, { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
const NetflixLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setError('');
    
    try {
      const response = await fetch('http://44.210.189.143:3000/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password_hash: password
        }),
      });
      
      if (response.ok) {
        // Extract the token from the Authorization header
        const authHeader = response.headers.get('Authorization');
        const token = authHeader ? authHeader.replace('Bearer ', '') : '';
        
        // Get user data from response body
        const userData = await response.json();
        
        // Store both token and user info in localStorage
        localStorage.setItem('authToken', token);
        
        if (userData && userData.data && userData.data.attributes) {
          localStorage.setItem('userName', userData.data.attributes.full_name);
          localStorage.setItem('userEmail', userData.data.attributes.email);
          localStorage.setItem('userId', userData.data.id);
        }
        
        navigate('/home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error de conexión. Por favor intenta de nuevo.');
      console.error('Login error:', error);
    } finally {
      setIsAnimating(false);
    }
  };
  
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      {/* El div para la imagen de fondo (debes añadir la imagen como background-image en tus estilos personalizados) */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: 'url(/bg_login.jpg)', 
        filter: 'brightness(40%)' 
      }}></div>
      
      {/* Overlay para mejor contraste */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Logo Netflix (puedes reemplazarlo con tu propio logo) */}
      <div className="absolute top-8 left-8 z-20">
        <span className="text-red-600 text-4xl font-bold tracking-tighter">SCREAMED</span>
      </div>
      
      <div className={`relative z-10 bg-black bg-opacity-75 rounded-md overflow-hidden w-full max-w-md p-16 transform transition-all duration-500 border border-gray-800 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-white mb-6">Inicia sesión</h1>
          <p className="text-gray-400 text-sm">
            Accede con tus credenciales
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-red-200 rounded text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6 flex flex-col gap-6">
          <div>
            <div className={`gap-6 relative transform transition-all duration-300 ${isAnimating ? 'translate-y-1' : ''}`}>
              <input
                id="email"
                type="email"
                className="form-input mt-6 w-full px-5 py-4 bg-gray-800 text-gray-200 rounded text-base focus:ring-1 focus:ring-red-600 focus:outline-none placeholder-gray-500 border-none"
                placeholder="Email o número de teléfono"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <div className={`transform transition-all duration-300 ${isAnimating ? 'translate-y-1' : ''}`}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input w-full px-5 py-4 bg-gray-800 text-gray-200 rounded text-base focus:ring-1 focus:ring-red-600 focus:outline-none placeholder-gray-500 border-none pr-12"
                  placeholder="Contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center items-center px-4 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 focus:outline-none transform transition-all duration-300 ${
                isAnimating ? 'scale-95 bg-red-700' : ''
              }`}
            >
              {isAnimating ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn size={20} className="mr-2" />
                  Iniciar Sesión
                </div>
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember" 
                type="checkbox" 
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded" 
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                Recuérdame
              </label>
            </div>
            <div className="text-sm">
        
            </div>
          </div>
        </form>
        
        <div className="mt-8">
          <p className="text-gray-500 mb-4">
             <Link to="/register" className="text-white hover:underline">Registrate aqui</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetflixLogin;