import React, { useState } from 'react';
import AudioPlayList from './components/AudioPlayList';
import VideoPlayList from './components/VideoPlayList';
import './index.css';

const App: React.FC = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const audioPlaylist = [
    { title: 'MANTRA (Official Audio)', src: '/assets/Bring Me The Horizon - MANTRA (Official Video).mp3' },
    { title: 'Can you Feel my Heart (Official Audio)', src: '/assets/Bring Me The Horizon - Can You Feel My Heart.mp3' },
  ];

  const videoPlaylist = [
    { title: 'Bring Me The Horizon - Throne', src: '/assets/Bring Me The Horizon - Throne.mp4' },
    { title: 'Doomed (Live at the Royal Albert Hall)', src: '/assets/Bring Me The Horizon - Doomed (Live at the Royal Albert Hall).mp4' },
  ];

  return (
    <div className="App min-h-screen flex flex-col" style={{ background: 'linear-gradient(45deg, #1a1a1a, #333)' }}>
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-center text-4xl sm:text-6xl font-bold my-8">Bring Me The Horizon Fan Page</h1>
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
          <button
            onClick={() => {
              setShowVideoPlayer(true);
              setShowAudioPlayer(false);
            }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-600 hover:bg-orange-700 text-white font-bold rounded mb-2 sm:mb-0"
          >
            Show Video Player
          </button>
          <button
            onClick={() => {
              setShowAudioPlayer(true);
              setShowVideoPlayer(false);
            }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-600 hover:bg-orange-700 text-white font-bold rounded mb-2 sm:mb-0"
          >
            Show Audio Player
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 sm:space-y-12">
          {showVideoPlayer && <VideoPlayList playlist={videoPlaylist} />}
          {showAudioPlayer && <AudioPlayList playlist={audioPlaylist} />}
        </div>
      </div>
      <footer className="text-center text-sm mt-8 p-4 bg-black text-white">
        <p>© 2024 Santiago Benítez Álvarez. Todos los derechos reservados.</p>
        <p>Licencia: Todos los derechos de las canciones pertenecen a Bring Me The Horizon.Material de origen utilizado solo para inmortalizar la banda</p>
      </footer>
    </div>
  );
};

export default App;
