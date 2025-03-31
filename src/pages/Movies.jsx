import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../components/organisms/Header";
import moviesData from '../data/moviesData';

function Movies() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const movies = moviesData
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePlayMovie = (movie) => {
        navigate(`../play/${movie.id}`, { state: { movie } });
        console.log(movie);
     };

    const genres = [...new Set(movies.flatMap(movie => movie.genre.split(', ')))];

    return (
        <div className="bg-black min-h-screen text-white">
            <HeaderComponent />
            
            <main className="container mx-auto px-4 pt-24 pb-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Películas</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar películas..."
                            className="bg-gray-900 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredMovies.map(movie => (
                        <div 
                            key={movie.id}
                            className="group cursor-pointer"
                            onClick={() => handlePlayMovie(movie)}
                        >
                            <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                                <div className="relative aspect-[3/4]">
                                    <img 
                                        src={movie.imageUrl} 
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <button className="bg-orange-400 text-black font-medium py-2 px-4 rounded-md w-full">
                                            Ver Ahora
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
                                    <div className="flex justify-between text-sm text-gray-400">
                                        <span>{movie.year}</span>
                                        <div className="flex items-center">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-4 w-4 text-yellow-400 mr-1" 
                                                viewBox="0 0 20 20" 
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>{movie.rating}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500 truncate">
                                        {movie.genre}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredMovies.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No se encontraron películas que coincidan con tu búsqueda.</p>
                    </div>
                )}

                <div className="mt-12 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Géneros</h2>
                    <div className="flex flex-wrap gap-3">
                        {genres.map(genre => (
                            <button 
                                key={genre}
                                className="bg-gray-800 hover:bg-orange-400 hover:text-black transition-colors duration-300 px-4 py-2 rounded-full text-sm"
                                onClick={() => setSearchTerm(genre)}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Movies;