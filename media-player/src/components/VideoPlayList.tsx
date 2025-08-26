import React, { useState, useRef, useEffect } from 'react';

interface VideoTrack {
    title: string;
    src: string;
}

interface VideoPlayListProps {
    playlist: VideoTrack[];
}

const VideoPlayList: React.FC<VideoPlayListProps> = ({ playlist }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            const handleTimeUpdate = () => {
                setCurrentTime(videoRef.current!.currentTime);
            };
            const handleLoadedMetadata = () => {
                setDuration(videoRef.current!.duration);
            };
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            return () => {
                videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
                videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play();
        }
    }, [currentTrackIndex, isPlaying]);

    const playPause = () => {
        if (isPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const stop = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    return (
        <div className="video-playlist">
            <h3 className="text-3xl font-bold text-center mb-6">Video Playlist</h3>
            <ul className="mb-6">
                {playlist.map((track, index) => (
                    <li key={index} className={`cursor-pointer p-4 rounded ${index === currentTrackIndex ? 'bg-orange-500' : 'bg-gray-800 hover:bg-gray-700'}`}>
                        {track.title}
                    </li>
                ))}
            </ul>
            <video ref={videoRef} src={playlist[currentTrackIndex].src} className="w-full">
                Your browser does not support the video element.
            </video>
            <div className="flex justify-center space-x-4 mb-6">
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded" onClick={prevTrack}>Prev</button>
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded" onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded" onClick={stop}>Stop</button>
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded" onClick={nextTrack}>Next</button>
            </div>
            <div className="flex justify-center items-center space-x-4 mb-6">
                <label>Volume:</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
            </div>
            <div className="flex justify-center items-center space-x-4 mb-6">
                <label>Progress:</label>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                        if (videoRef.current) {
                            videoRef.current.currentTime = parseFloat(e.target.value);
                            setCurrentTime(videoRef.current.currentTime);
                        }
                    }}
                />
                <span>{new Date(currentTime * 1000).toISOString().substr(11, 8)} / {new Date(duration * 1000).toISOString().substr(11, 8)}</span>
            </div>
        </div>
    );
};

export default VideoPlayList;
