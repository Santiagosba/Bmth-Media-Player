import React, { useRef, useState, useEffect } from 'react';

const MediaPlayer = ({ type, src }: { type: string, src: string }) => {
    const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null); // Ref para acceder al elemento de audio o video
    const [currentTime, setCurrentTime] = useState(0); // Estado para manejar el tiempo actual de reproducción
    const [duration, setDuration] = useState(0); // Estado para manejar la duración total del medio
    const [isPlaying, setIsPlaying] = useState(false); // Estado para manejar si el medio está reproduciéndose o no
    const [volume, setVolume] = useState(1); // Estado para manejar el volumen

    // Función para reproducir el medio
    const play = () => {
        if (mediaRef.current) {
            mediaRef.current.play();
            setIsPlaying(true);
        }
    };

    // Función para pausar el medio
    const pause = () => {
        if (mediaRef.current) {
            mediaRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Función para detener el medio (pausar y reiniciar tiempo)
    const stop = () => {
        if (mediaRef.current) {
            mediaRef.current.pause();
            mediaRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    // Función para cambiar el volumen
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value); // Convert the string to a number
        setVolume(newVolume);
        if (mediaRef.current) {
            mediaRef.current.volume = newVolume;
        }
    };

    // Efecto para actualizar el tiempo actual de reproducción y la duración total del medio
    useEffect(() => {
        const updateMediaInfo = () => {
            if (mediaRef.current) {
                setCurrentTime(mediaRef.current.currentTime);
                setDuration(mediaRef.current.duration);
            }
        };

        if (mediaRef.current) {
            mediaRef.current.addEventListener('timeupdate', updateMediaInfo);
            mediaRef.current.addEventListener('loadedmetadata', updateMediaInfo);
        }

        return () => {
            if (mediaRef.current) {
                mediaRef.current.removeEventListener('timeupdate', updateMediaInfo);
                mediaRef.current.removeEventListener('loadedmetadata', updateMediaInfo);
            }
        };
    }, [mediaRef]);

    // Función para ir a una posición específica de la pista
    const seekTo = (time: number) => {
        if (mediaRef.current) {
            mediaRef.current.currentTime = time;
        }
    };

    // Renderizado condicional basado en el tipo de medio
    return (
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            {type === 'video' ? (
                <video ref={mediaRef as React.RefObject<HTMLVideoElement>} className="w-full rounded-lg" controls={false}>
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <audio ref={mediaRef} controls={false}>
                    <source src={src} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}
            <div className="flex justify-center items-center space-x-4 mt-4">
                <button onClick={isPlaying ? pause : play} className="bg-blue-500 text-white px-4 py-2 rounded-lg">{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={stop} className="bg-red-500 text-white px-4 py-2 rounded-lg">Stop</button>
                <input id="volume" type="range" min="0" max="1" step="0.1" value={volume} onChange={changeVolume} className="w-32" />
            </div>
            <div className="flex justify-center items-center space-x-4 mt-4">
                <input type="range" min="0" max={duration} value={currentTime} onChange={(e) => seekTo(parseFloat(e.target.value))} className="w-full" />
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
        </div>
    );
};

// Función para formatear el tiempo en formato "MM:SS"
const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default MediaPlayer;
