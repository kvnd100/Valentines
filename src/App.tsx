import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, ContactShadows, OrbitControls, useGLTF, useProgress, Html } from '@react-three/drei'
import { LayerMaterial, Depth, Noise, Color } from 'lamina'
import { CurvedText } from './components/CurvedText'
import { Suspense, useEffect, useRef, useState } from 'react'
import { BackgroundMusic } from './components/BackgroundMusic'

export default function App() {
  const [started, setStarted] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  return (
    <>
    {!started ? (
        <div className="landing-page">
          <button 
            className="start-button"
            onClick={() => {
              setStarted(true)
              setMusicPlaying(true)
            }}
          >
            🌹 Click to Start Your Surprise 🌹
          </button>
        </div>
      ) : (
        <>
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={<Loader />}>

            <SceneComponents onLoaded={() => setAssetsLoaded(true)} />

            </Suspense>
            {!assetsLoaded && <Loader />}
          </Canvas>
          <BackgroundMusic isPlaying={musicPlaying} />
        </>
     )}
<style>{`
  /* Keep original button styles */
  .landing-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    z-index: 1000;
  }

  .start-button {
    padding: 20px 40px;
    font-size: 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    color: #ff6b6b;
    font-family: 'Arial', sans-serif;
    animation: pulse 2s infinite;
  }

  .start-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  /* New loader styles */
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.98);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fade-out {
    opacity: 0;
    transform: scale(1.2);
  }

  .heart-loader {
    position: relative;
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
  }

  .heart-core {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ff6b6b;
    clip-path: path('M40,75.8C20.2,63.6,0,45.4,0,28.1C0,12.6,12.6,0,28.1,0c8.1,0,15.5,4.6,19.8,11.2C51.3,4.6,59.6,0,67.9,0C83.4,0,96,12.6,96,28.1c0,17.3-20.2,35.5-39.9,47.7L40,75.8z');
    animation: heartBeat 1.2s ease-in-out infinite;
  }

  .heart-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 107, 107, 0.2);
    border-radius: 50%;
    animation: pulse 1.5s ease-out infinite;
  }

  .progress-container {
    width: 200px;
    height: 6px;
    background: #ffe6e6;
    border-radius: 3px;
    overflow: hidden;
    margin: 15px 0;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #ff9a9e, #ff6b6b);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .loading-text {
    text-align: center;
    font-family: 'Arial', sans-serif;
  }

  .loading-message {
    color: #ff6b6b;
    font-size: 1.1rem;
    margin-bottom: 8px;
    font-weight: 500;
    min-height: 24px;
  }

  .loading-percentage {
    color: #ff9a9e;
    font-size: 1.2rem;
    font-weight: bold;
  }

  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes pulse {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
`}</style>
    </>
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FlowerBouquet(props: any) {
  const { scene } = useGLTF('/modals/scene.gltf')
  
  useEffect(() => {
    useGLTF.preload('/models/scene.gltf')
    if (props.onLoad) props.onLoad()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onLoad])

  return <primitive object={scene} {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Striplight(props:any){
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}

function Loader() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [currentMessage, setCurrentMessage] = useState("Preparing your romantic surprise...")

  useEffect(() => {
    const messages = [
      "Gathering roses...",
      "Lighting candles...",
      "Writing love letters...",
      "Tuning violins...",
      "Finalizing magic...",
    ]
    const messageIndex = Math.min(Math.floor(progress / 20), messages.length - 1)
    setCurrentMessage(messages[messageIndex])
  }, [progress])

  useEffect(() => {
    if (!active && progress === 100) {
      loaderRef.current?.classList.add('fade-out')
      setTimeout(() => setVisible(false), 800)
    }
  }, [active, progress])

  if (!visible) return null

  return (
    <Html center>
      <div ref={loaderRef} className="loader-container">
        <div className="heart-loader">
          <div className="heart-pulse"></div>
          <div className="heart-core"></div>
        </div>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-text">
          <div className="loading-message">{currentMessage}</div>
          <div className="loading-percentage">{Math.round(progress)}%</div>
        </div>
      </div>
    </Html>
  )
}


function SceneComponents({ onLoaded }: { onLoaded: () => void }) {
  return (
    <>
<OrbitControls  enablePan={false}   enableZoom={false} autoRotate minPolarAngle={Math.PI / 1.8} maxPolarAngle={Math.PI / 1.8} />
      <pointLight position={[10, 10, 5]} />
      <pointLight position={[-10, -10, -5]} />
      <ambientLight intensity={0.4} />
      <CurvedText 
    text="Will You Be My Valentine Rosy?" 
    radius={10} 
    fontSize={0.5} 
    positionOffset={[0, 0, 0]}
    rotateOffset={[Math.PI / 4, Math.PI / 8, 0]}
  />
  
  {/* Second CurvedText with medium radius and a slight offset in Y */}
  <CurvedText 
    text="Will You Be My Valentine Rosy?" 
    radius={5} 
    fontSize={0.5} 
    positionOffset={[0,2, 0]}
    rotateOffset={[Math.PI / 6, Math.PI / 8, 0]}
  />

<CurvedText 
    text="Will You Be My Valentine Rosy?" 
    radius={4} 
    fontSize={0.5} 
    positionOffset={[0,-1, 0]}
  />
  
  {/* Third CurvedText with the smallest radius and adjusted Y offset */}
  <CurvedText 
    text="Will You Be My Valentine Rosy?" 
    radius={4} 
    fontSize={0.5} 
    positionOffset={[0, 6, 0]}
    rotateOffset={[Math.PI / 8, Math.PI / 8, 0]}
  />
      <group position={[0, -1.5, 0]}>
        <Float position={[0, 2.15, 0]} speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <FlowerBouquet scale={6.5} position={[0, -3.3, 0]} onLoad={onLoaded} />
        </Float>
        <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />
      </group>

      <Environment background resolution={64}>
        <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
        <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} />
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Color color="blue" alpha={1} mode="normal" />
            <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={new THREE.Vector3(100, 100, 100)} attachArray={undefined} attachObject={undefined} attachFns={undefined} />
            <Noise mapping="local" type="cell" scale={0.5} mode="softlight" attachArray={undefined} attachObject={undefined} attachFns={undefined} />
          </LayerMaterial>
        </mesh>
      </Environment>
    </>
  )
}