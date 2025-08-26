import React, { useState } from 'react';
import MediaPlayer from './MediaPlayer';

const AudioPlayer: React.FC<{ playlist: string[] }> = ({ playlist }) => {
    const [currentTrack, setCurrentTrack] = useState(0);

    const handleNextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    const handlePrevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    return (
        <div className="audio-player bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-center mb-4">Audio Player</h3>


            <MediaPlayer type="audio" src={playlist[currentTrack]} />
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={handlePrevTrack}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
                >
                    Prev
                </button>
                <button
                    onClick={handleNextTrack}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AudioPlayer;
