import React from 'react';

const Lights = () => {
  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </>
  );
};

export default Lights;
