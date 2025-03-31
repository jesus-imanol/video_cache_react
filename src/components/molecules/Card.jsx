import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function CardDisplay({ movie }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleToPlay = () => {
    navigate(`play/${movie.id}`, { state: { movie } });
    console.log(movie);
    
};
  return (
    <div 
      className="relative transition-transform duration-300 ease-in-out"
      style={{ 
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        zIndex: isHovered ? 10 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-md aspect-[2/3]">
        {/* Imagen de fondo */}
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay con información - siempre presente pero con opacidad condicional */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm opacity-80">{movie.year} • {movie.genre}</p>
          
          <div className="flex items-center mt-2">
            <span className="text-green-500 font-bold mr-1">{movie.rating}</span>
            <div className="flex">
  {[1, 2, 3, 4, 5].map(star => (
    <svg 
      key={star} 
      className={`w-4 h-4 ${star <= Math.round(movie.rating / 2) ? "fill-yellow-400" : "fill-gray-500"}`}
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))}
</div>

          </div>
          
          {/* Botones de acción */}
          <div className="flex mt-3 space-x-2">
            <button onClick={handleToPlay} className="bg-green-500 text-black px-4 py-1 rounded-md flex items-center justify-center text-sm font-semibold">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Reproducir
            </button>
            <button className="bg-gray-600 text-gray-950 px-2 py-1 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDisplay;