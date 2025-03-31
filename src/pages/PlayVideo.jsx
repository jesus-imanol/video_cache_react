import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

function PlayVideo() {
  const location = useLocation();
  const { movie } = location.state || {};
  const playerRef = useRef(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [videoData, setVideoData] = useState({
    url: movie?.video || "",
    playbackPosition: 0,
    lastWatched: null,
    duration: 0,
    volume: 0.8,
    playbackRate: 1.0,
    buffered: 0
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(false);
  
  // Actualizar estado de conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Función para almacenar el video en la caché
  const cacheVideo = async (videoUrl) => {
    try {
      // Solo cachear si el video es de nuestro servidor (no de YouTube)
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        console.log("No se pueden cachear videos de YouTube");
        return;
      }
      
      const cache = await caches.open("video-cache");
      const response = await fetch(videoUrl, { mode: 'no-cors' });
      await cache.put(videoUrl, response.clone());
      console.log("Video almacenado en la caché correctamente");
    } catch (error) {
      console.error("Error al almacenar el video:", error);
    }
  };

  // Verificar si el video está cacheado
  const isVideoCached = async (videoUrl) => {
    try {
      const cache = await caches.open("video-cache");
      const cachedResponse = await cache.match(videoUrl);
      return !!cachedResponse;
    } catch (error) {
      console.error("Error al verificar caché:", error);
      return false;
    }
  };

  // Cargar datos guardados y configurar caché
  useEffect(() => {
    if (!movie?.video) return;
    
    // Cargar datos guardados
    const loadSavedData = () => {
      if (movie?.id) {
        const savedData = localStorage.getItem(`video-data-${movie.id}`);
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            setVideoData(prev => ({
              ...prev,
              playbackPosition: parsedData.playbackPosition || 0,
              lastWatched: parsedData.lastWatched,
              volume: parsedData.volume || 0.8,
              playbackRate: parsedData.playbackRate || 1.0
            }));
          } catch (e) {
            console.error("Error parsing saved data:", e);
          }
        }
      }
    };
    
    // Intentar cachear el video si estamos online
    const setupVideoCache = async () => {
      if (navigator.onLine) {
        const isCached = await isVideoCached(movie.video);
        if (!isCached) {
          console.log("Cacheando video...");
          await cacheVideo(movie.video);
        } else {
          console.log("El video ya está en caché");
        }
      }
    };
    
    loadSavedData();
    setupVideoCache();
    
    // Autoesconder controles tras 3 segundos
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [movie]);

  // Función para guardar la posición de reproducción y otros datos
  const handleProgress = (progress) => {
    if (!movie?.id) return;
    
    setVideoData(prev => {
      // Solo guardar si hay un cambio significativo o cada 5 segundos
      if (Math.abs(progress.playedSeconds - prev.playbackPosition) > 5) {
        const newData = {
          url: prev.url,
          playbackPosition: progress.playedSeconds,
          lastWatched: new Date().toISOString(),
          duration: playerRef.current ? playerRef.current.getDuration() : prev.duration,
          volume: prev.volume,
          playbackRate: prev.playbackRate,
          buffered: progress.loaded
        };
        
        localStorage.setItem(`video-data-${movie.id}`, JSON.stringify(newData));
        return newData;
      }
      
      return {
        ...prev,
        buffered: progress.loaded
      };
    });
  };

  // Controlar volumen
  const handleVolumeChange = (newVolume) => {
    setVideoData(prev => {
      const updatedData = { ...prev, volume: newVolume };
      if (movie?.id) {
        localStorage.setItem(`video-data-${movie.id}`, JSON.stringify(updatedData));
      }
      return updatedData;
    });
  };

  // Controlar velocidad de reproducción
  const handlePlaybackRateChange = (newRate) => {
    setVideoData(prev => {
      const updatedData = { ...prev, playbackRate: newRate };
      if (movie?.id) {
        localStorage.setItem(`video-data-${movie.id}`, JSON.stringify(updatedData));
      }
      return updatedData;
    });
  };

  // Buscar posición específica en el video
  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const bounds = progressBar.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percent = x / width;
    const seekTime = percent * videoData.duration;
    
    if (playerRef.current) {
      playerRef.current.seekTo(seekTime);
    }
    
    setVideoData(prev => {
      const updatedData = { ...prev, playbackPosition: seekTime };
      if (movie?.id) {
        localStorage.setItem(`video-data-${movie.id}`, JSON.stringify(updatedData));
      }
      return updatedData;
    });
  };

  // Mostrar/ocultar controles al mover el mouse
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Formato de tiempo (segundos a MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Componente de controles personalizado
  const CustomControls = () => (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-[#00000080] p-3 flex flex-col transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Barra de progreso */}
      <div 
        className="w-full h-2 bg-gray-700 rounded cursor-pointer mb-3 relative"
        onClick={handleSeek}
      >
        {/* Progreso de buffer */}
        <div 
          className="absolute top-0 left-0 h-full bg-gray-500 rounded"
          style={{ width: `${videoData.buffered * 100}%` }}
        />
        {/* Progreso de reproducción */}
        <div 
          className="absolute top-0 left-0 h-full bg-amber-600 rounded"
          style={{ width: `${(videoData.playbackPosition / videoData.duration) * 100}%` }}
        />
        {/* Marcador de posición */}
        <div 
          className="absolute top-0 h-4 w-4 rounded-full bg-white -mt-1"
          style={{ left: `calc(${(videoData.playbackPosition / videoData.duration) * 100}% - 4px)` }}
        />
      </div>
      
      {/* Controles principales */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Botón de reproducción/pausa */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-1 bg-amber-600 rounded text-white"
          >
            {isPlaying ? "Pausar" : "Reproducir"}
          </button>
          
          {/* Tiempo */}
          <div className="text-white text-sm">
            {formatTime(videoData.playbackPosition)} / {formatTime(videoData.duration)}
          </div>
          
          {/* Volumen */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Vol</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={videoData.volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
          
          {/* Velocidad de reproducción */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Vel</span>
            <select 
              value={videoData.playbackRate}
              onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
              className="bg-transparent text-white border border-gray-600 rounded px-1"
            >
              <option value="0.5" className="bg-gray-800">0.5x</option>
              <option value="0.75" className="bg-gray-800">0.75x</option>
              <option value="1.0" className="bg-gray-800">1.0x</option>
              <option value="1.25" className="bg-gray-800">1.25x</option>
              <option value="1.5" className="bg-gray-800">1.5x</option>
              <option value="2.0" className="bg-gray-800">2.0x</option>
            </select>
          </div>
        </div>
        
        {/* Información del video */}
        <div className="text-right">
          <h1 className="text-amber-600 font-bold">{movie?.title}</h1>
          <p className="text-white text-sm">{movie?.genre}</p>
          {!isOnline && <p className="text-red-400 text-xs">Modo offline</p>}
        </div>
      </div>
    </div>
  );

  // Mostrar estado de buffering
  const BufferingIndicator = () => (
    <div className={`absolute inset-0 flex items-center justify-center ${isBuffering ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="bg-black bg-opacity-70 p-4 rounded-lg">
        <div className="text-white">Cargando...</div>
      </div>
    </div>
  );

  return (
    <section 
      className="w-full h-screen bg-black flex flex-col relative"
      onMouseMove={handleMouseMove}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoData.url}
        playing={isPlaying}
        controls={false}
        width="100%"
        height="100%"
        volume={videoData.volume}
        playbackRate={videoData.playbackRate}
        onProgress={handleProgress}
        progressInterval={1000}
        onBuffer={() => setIsBuffering(true)}
        onBufferEnd={() => setIsBuffering(false)}
        onDuration={(duration) => {
          setVideoData(prev => ({ ...prev, duration }));
        }}
        config={{
          file: {
            forceVideo: true,
            attributes: {
              controlsList: 'nodownload'
            }
          }
        }}
        onReady={(player) => {
          if (videoData.playbackPosition > 0) {
            player.seekTo(videoData.playbackPosition, 'seconds');
          }
        }}
        onError={(e) => {
          console.error("Error en reproducción:", e);
        }}
      />
      <BufferingIndicator />
      <CustomControls />
      
      {/* Indicador de estado de red */}
      {!isOnline && (
        <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded">
          Sin conexión
        </div>
      )}
    </section>
  );
}

export default PlayVideo;