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
    playbackRate: 1.0
  });
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [initialSeekDone, setInitialSeekDone] = useState(false);
  const seekTimeoutRef = useRef(null);
  
  // Update connection status
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

  // Cache video function
  const cacheVideo = async (videoUrl) => {
    try {
      // Only cache videos from our server (not YouTube)
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        console.log("Cannot cache YouTube videos");
        return;
      }
      
      const cache = await caches.open("video-cache");
      const response = await fetch(videoUrl, { mode: 'no-cors' });
      await cache.put(videoUrl, response.clone());
      console.log("Video successfully stored in cache");
    } catch (error) {
      console.error("Error caching video:", error);
    }
  };

  // Check if video is cached
  const isVideoCached = async (videoUrl) => {
    try {
      const cache = await caches.open("video-cache");
      const cachedResponse = await cache.match(videoUrl);
      return !!cachedResponse;
    } catch (error) {
      console.error("Error checking cache:", error);
      return false;
    }
  };

  // Load saved data and setup cache
  useEffect(() => {
    if (!movie?.video) return;
    
    // Load saved data
    const loadSavedData = () => {
      if (movie?.id) {
        const savedData = localStorage.getItem(`video-data-${movie.id}`);
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            
            // If saved position is near the end, start from beginning
            const playbackPosition = parsedData.playbackPosition || 0;
            const duration = parsedData.duration || 0;
            
            // If less than 20 seconds from end or greater than duration, restart
            if (duration && (duration - playbackPosition < 20 || playbackPosition >= duration)) {
              console.log("Saved position near end, restarting");
              setVideoData(prev => ({
                ...prev,
                playbackPosition: 0,
                lastWatched: parsedData.lastWatched,
                volume: parsedData.volume || 0.8,
                playbackRate: parsedData.playbackRate || 1.0
              }));
            } else {
              setVideoData(prev => ({
                ...prev,
                playbackPosition: playbackPosition,
                lastWatched: parsedData.lastWatched,
                volume: parsedData.volume || 0.8,
                playbackRate: parsedData.playbackRate || 1.0
              }));
            }
          } catch (e) {
            console.error("Error parsing saved data:", e);
          }
        }
      }
    };
    
    // Try to cache video if online
    const setupVideoCache = async () => {
      if (navigator.onLine) {
        const isCached = await isVideoCached(movie.video);
        if (!isCached) {
          console.log("Caching video...");
          await cacheVideo(movie.video);
        } else {
          console.log("Video is already cached");
        }
      }
    };
    
    loadSavedData();
    setupVideoCache();
    
    return () => {
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, [movie]);

  // Handle initial seek after player is ready
  useEffect(() => {
    // Only attempt to seek if player is ready, we have saved position and haven't sought yet
    if (isPlayerReady && videoData.playbackPosition > 0 && !initialSeekDone && playerRef.current) {
      console.log(`Attempting to position video at: ${videoData.playbackPosition}s`);
      
      // Wait a short time for video to load first
      seekTimeoutRef.current = setTimeout(() => {
        try {
          playerRef.current.seekTo(videoData.playbackPosition, 'seconds');
          console.log("Seek completed");
          setInitialSeekDone(true);
        } catch (error) {
          console.error("Error seeking initial position:", error);
        }
      }, 2000);
    }
  }, [isPlayerReady, videoData.playbackPosition, initialSeekDone]);

  // Function to save playback position and other data
  const handleProgress = (progress) => {
    if (!movie?.id) return;
    
    setVideoData(prev => {
      // Only save if significant change or every 5 seconds
      if (Math.abs(progress.playedSeconds - prev.playbackPosition) > 5) {
        const newData = {
          url: prev.url,
          playbackPosition: progress.playedSeconds,
          lastWatched: new Date().toISOString(),
          duration: playerRef.current ? playerRef.current.getDuration() : prev.duration,
          volume: prev.volume,
          playbackRate: prev.playbackRate
        };
        
        localStorage.setItem(`video-data-${movie.id}`, JSON.stringify(newData));
        return newData;
      }
      
      return prev;
    });
  };

  // Offline indicator
  const OfflineIndicator = () => (
    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-2 rounded shadow-lg z-20">
      Sin conexión
    </div>
  );

  return (
    <section className="w-full h-screen bg-black flex flex-col relative">
      {!isOnline && <OfflineIndicator />}
      
      <ReactPlayer
        ref={playerRef}
        url={videoData.url}
        playing={true}
        controls={true}
        width="100%"
        height="100%"
        volume={videoData.volume}
        playbackRate={videoData.playbackRate}
        onProgress={handleProgress}
        progressInterval={1000}
        onDuration={(duration) => {
          console.log(`Duration detected: ${duration}s`);
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
        onReady={() => {
          console.log("Player ready");
          setIsPlayerReady(true);
        }}
        onError={(e) => {
          console.error("Playback error:", e);
          // Try to restart if there's an error
          setVideoData(prev => ({ ...prev, playbackPosition: 0 }));
        }}
      />
    </section>
  );
}

export default PlayVideo;