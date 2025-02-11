import { useEffect, useRef } from 'react'

export function BackgroundMusic({ isPlaying }: { isPlaying: boolean }) {
    const audioRef = useRef<HTMLAudioElement>(null)
  
    useEffect(() => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play().catch(error => {
            console.log('Audio play failed:', error)
          })
        } else {
          audioRef.current.pause()
        }
      }
    }, [isPlaying])
  
    return (
      <audio ref={audioRef} loop>
        <source src="/music/music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    )
  }