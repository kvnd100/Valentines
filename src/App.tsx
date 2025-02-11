import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import { LayerMaterial, Depth, Noise, Color } from 'lamina'
import { CurvedText } from './components/CurvedText'

export default function App() {
  return (
    <>
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5] }}>
      <OrbitControls enableZoom={false} autoRotate minPolarAngle={Math.PI / 1.8} maxPolarAngle={Math.PI / 1.8} />
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
          <FlowerBouquet scale={6.5} position={[0, -3.3, 0]} />
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
    </Canvas>
    </>
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FlowerBouquet(props:any) {
  const { scene } = useGLTF('/modals/scene.gltf');
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
