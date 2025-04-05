import { useState } from 'react';
import HeaderComponent from "../components/organisms/Header";
import movies from '../data/moviesData';
function News() {
    
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  
  // Obtener géneros únicos para el filtro
  const allGenres = ["Todos", ...new Set(movies.flatMap(movie => movie.genre.split(", ")))];
  
  // Filtrar películas por género seleccionado
  const filteredMovies = selectedGenre === "Todos" 
    ? movies 
    : movies.filter(movie => movie.genre.includes(selectedGenre));
  
  // Obtener las películas más aclamadas (rating más alto)
  const acclaimedMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="bg-[#000000cd] min-h-screen text-gray-200">
      <HeaderComponent />

      {/* Hero section con imagen de Rick y Morty de fondo */}
      {/* Hero section con imagen de Rick y Morty de fondo */}
      {/* Hero section con imagen de Rick y Morty de fondo */}
{/* Hero section con imagen de Rick y Morty de fondo */}
<div className="relative">
  <div className="w-full h-96 flex items-center justify-center overflow-hidden">
    {/* Imagen de fondo con overlay negro difuminado */}
    <div className="absolute inset-0">
      <img 
        src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/10/rick-morty-critica.jpg" 
        alt="Rick and Morty" 
        className="w-full h-full object-cover"
      />
      {/* Overlay negro difuminado para mejorar contraste y legibilidad */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
    </div>
    
    {/* Contenido del hero */}
    <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Explora el mundo animado</h1>
      <p className="text-xl text-gray-200">Descubre series animadas clásicas y nuevos favoritos</p>
    </div>
  </div>
</div>
      
      {/* Películas aclamadas por la crítica */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
       <div className='mb-6'> <h2 className="text-3xl font-bold mb-9 border-l-4 border-purple-500 pl-4">Aclamadas por la Crítica</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {acclaimedMovies.map(movie => (
            <div key={movie.id} className="bg-[#0000009c] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="relative pb-[140%]">
                <img 
                  src={movie.imageUrl} 
                  alt={movie.title} 
                  className="absolute h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 rounded-full p-1 px-2 font-bold text-sm">
                  ★ {movie.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{movie.year} • {movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Todas las películas con filtro por género */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold border-l-4 border-blue-500 pl-4 mb-4 md:mb-0">Explora la Colección</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {allGenres.map(genre => (
              <button 
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedGenre === genre 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:bg-gray-750">
              <div className="relative pb-[140%]">
                <img 
                  src={movie.imageUrl} 
                  alt={movie.title} 
                  className="absolute h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 rounded-full p-1 px-2 font-bold text-sm">
                  ★ {movie.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{movie.year} • {movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer con información adicional */}
      <footer className="bg-gray-950 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-300">Series Animadas</h3>
            <p className="text-gray-400">Explora nuestra colección de series animadas clásicas y contemporáneas, perfectas para nostálgicos y nuevos fans.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-300">Géneros</h3>
            <ul className="text-gray-400">
              {allGenres.filter(genre => genre !== "Todos").map(genre => (
                <li key={genre} className="mb-1">{genre}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-300">Sobre Nosotros</h3>
            <p className="text-gray-400">Somos apasionados por traer la magia de la animación a una nueva generación, preservando los clásicos que marcaron épocas.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p>© 2025 Animación Clásica. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default News;