"use client";

/* global fetch, console */

import React, { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PropTypes from 'prop-types';
import videosdata from "@/app/components/constants/videos.json";
import { useLanguage } from "@/app/context/LanguageContext";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [state, setState] = useState({
    isPlaying: false,
    progress: 0,
    volume: 1,
    duration: 0,
    currentTime: 0,
    error: null,
  });

  const handleError = (error) => {
    console.error('Video error:', error);
    setState(prev => ({ ...prev, error: 'Video playback failed', isPlaying: false }));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    setState(prev => ({ ...prev, isPlaying: !videoRef.current.paused }));
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / state.duration) * 100 || 0;
    setState(prev => ({ ...prev, currentTime, progress }));
  };

  const handleLoadedData = () => {
    if (videoRef.current) {
      setState(prev => ({
        ...prev,
        duration: videoRef.current.duration,
        volume: videoRef.current.volume,
      }));
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          videoRef.current.currentTime += 5;
          break;
        case 'ArrowLeft':
          videoRef.current.currentTime -= 5;
          break;
        case 'f':
          videoRef.current.requestFullscreen();
          break;
        case 'm':
          videoRef.current.muted = !videoRef.current.muted;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (state.error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {state.error}
        <button
          onClick={() => setState(prev => ({ ...prev, error: null }))}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative group">
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-xl  shadow-2xl"
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onPlay={() => setState(prev => ({ ...prev, isPlaying: true }))}
          onPause={() => setState(prev => ({ ...prev, isPlaying: false }))}
          aria-label="Video player"
          tabIndex={0}
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <input
            type="range"
            min="0"
            max="100"
            value={state.progress}
            onChange={(e) => {
              const progress = Number(e.target.value);
              if (videoRef.current) {
                videoRef.current.currentTime = (progress / 100) * state.duration;
              }
              setState(prev => ({ ...prev, progress }));
            }}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-yellow-400"
          />
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label={state.isPlaying ? 'Pause' : 'Play'}
              >
                {state.isPlaying ? '⏸' : '▶'}
              </button>
              <span className="text-white">
                {formatTime(state.currentTime)} / {formatTime(state.duration)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={state.volume}
                onChange={(e) => {
                  const volume = Number(e.target.value);
                  if (videoRef.current) videoRef.current.volume = volume;
                  setState(prev => ({ ...prev, volume }));
                }}
                className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-400"
                aria-label="Volume control"
              />
              <button
                onClick={() => videoRef.current?.requestFullscreen()}
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="Fullscreen"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

const VideoContent = () => {
  const searchParams = useSearchParams();
  const src = searchParams.get('src');
  const { language } = useLanguage();
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    if (src) {
      const details = videosdata.find(video => video.src === src);
      setVideoDetails(details || null);
    }
  }, [src]);

  if (!src) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
        <p className="ml-4 text-gray-500">Loading video...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <header className="container mx-auto pt-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          {videoDetails?.title?.[language] || videoDetails?.title?.en || 'Untitled Video'}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {videoDetails?.date || ''}
        </p>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <VideoPlayer src={src} />
        
        {videoDetails?.description && (
          <div className="mt-8 max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {videoDetails.description[language] || videoDetails.description.en}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const VideoPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
        <p className="ml-4 text-gray-500">Loading...</p>
      </div>
    }>
      <VideoContent />
    </Suspense>
  );
};

export default VideoPage;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}