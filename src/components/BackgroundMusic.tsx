import { useEffect, useRef } from 'react';

function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.play();
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} loop muted={false}>
        <source src="/music/music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default BackgroundMusic;
