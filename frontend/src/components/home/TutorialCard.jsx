import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle, Maximize, Minimize } from 'lucide-react';

const TutorialCard = ({ tutorial }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url + (url.includes('?') ? '&autoplay=1&playsinline=1&fs=0&rel=0' : '?autoplay=1&playsinline=1&fs=0&rel=0');
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&fs=0&rel=0` : url;
  };

  const handlePlay = (e) => {
    e.preventDefault();
    setIsPlaying(true);
  };

  const handleFullscreen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isFullscreen) {
      const container = videoContainerRef.current;
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(err => console.log(err));
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      } else if (document.webkitExitFullscreen && document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
      } else {
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden card-hover group border border-neutral-100 flex flex-col h-full block">
      <div 
        ref={videoContainerRef}
        className={isFullscreen 
          ? "fixed inset-0 z-[9999] w-full h-full bg-black group/player flex items-center justify-center" 
          : "relative w-full pb-[56.25%] bg-neutral-200 overflow-hidden group/player"
        }
      >
        {isPlaying ? (
          <>
            <iframe 
              src={getEmbedUrl(tutorial.videoUrl)} 
              className={isFullscreen ? "w-full h-full" : "absolute top-0 left-0 w-full h-full"}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              title={tutorial.title}
            ></iframe>
            <button 
              onClick={handleFullscreen}
              className="absolute top-2 right-2 z-10 p-2 bg-black/60 text-white rounded md:opacity-0 md:group-hover/player:opacity-100 transition-opacity flex items-center justify-center"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full cursor-pointer group/thumb overflow-hidden" onClick={handlePlay}>
            <img 
              src={tutorial.thumbnail} 
              alt={tutorial.title} 
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover/thumb:opacity-100 transition-opacity">
              <PlayCircle size={64} className="text-white/90 transform group-hover/thumb:scale-110 transition-transform duration-300" />
            </div>
            {tutorial.duration && (
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {tutorial.duration}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-dorn uppercase tracking-wider">
            {tutorial.category}
          </span>
          <span className="text-xs text-neutral-500">
            {tutorial.uploadDate}
          </span>
        </div>
        
        <h3 
          className="text-lg font-heading font-semibold text-neutral-900 mb-2 line-clamp-2 cursor-pointer hover:text-dorn transition-colors"
          onClick={handlePlay}
        >
          {tutorial.title}
        </h3>
        
        <p className="text-neutral-600 text-sm font-light line-clamp-3">
          {tutorial.description}
        </p>
      </div>
    </div>
  );
};

export default TutorialCard;
