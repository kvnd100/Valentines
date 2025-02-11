import { Text } from '@react-three/drei';
import { useEffect, useState } from 'react';

export function CurvedText({ text, radius = 3, fontSize = 0.5, letterSpacing = 0.1 , positionOffset =[0,0,0] , rotateOffset=[0,0,0] }: { text: string; radius?: number; fontSize?: number; letterSpacing?: number; positionOffset?: [number, number, number]; rotateOffset?: [number, number, number] }) {
  const [positions, setPositions] = useState<{ char: string; position: [number, number, number] }[]>([]);

  useEffect(() => {
    const angleIncrement = (2 * Math.PI) / (text.length - letterSpacing);
    const newPositions = text.split('').map((char: string, index: number) => {
      const angle = index * angleIncrement;
      const x = radius * Math.cos(angle) + positionOffset[0];
      const y = positionOffset[1]; 
      const z = radius * Math.sin(angle) + positionOffset[2];
      return { char, position: [x, y, z] as [number, number, number] }; 
    });
    setPositions(newPositions);
  }, [text, radius, letterSpacing, positionOffset]);

  return (
    <>
      {positions.map(({ char, position }, index) => (
        <Text
          key={index}
          position={position}
          rotation={rotateOffset}
          fontSize={fontSize}
          color="hotpink"
        >
          {char}
        </Text>
      ))}
    </>
  );
}
