import React, { useState, useRef } from 'react';
import HeaderComponent from '../components/organisms/Header';
import ButtonMuted from '../components/atoms/Button_mutted';
import SectionHome from '../components/organisms/SectionHome';
function HomeView() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <>
    <HeaderComponent></HeaderComponent>
      <main className="h-screen w-full bg-[#252525] relative overflow-hidden mt-3.5 flex">
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover absolute top-0 left-0 brightness-50"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="./Vete a la Versh - T6 E2_ Pato Vagabundo.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 z-10"></div>
        </div>
        
        {/* Netflix-style Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white">
          {/* Logo/Title */}
          <div className="text-6xl font-bold mb-4 uppercase">
            <img className='w-[300px]' src="./example_logo_versh.webp" alt="" />
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 gap-4">
            <button className="bg-[#ffffff8b] text-black px-6 py-2 rounded flex items-center hover:bg-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Reproducir
            </button>
            
            <button className="bg-gray-500/50 text-white px-6 py-2 rounded flex items-center hover:bg-gray-500/40 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Más información
            </button>
          </div>
        </div>
        
     <ButtonMuted toggleSound={toggleSound} isMuted={isMuted}></ButtonMuted>
        
      </main>
      <SectionHome></SectionHome>
    </>
  );
}

export default HomeView;