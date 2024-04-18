import React from "react";
import { useFrame } from "@react-three/fiber";

const Sphere = (props) => {
  const mesh = React.useRef();

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};

export default Sphere;
