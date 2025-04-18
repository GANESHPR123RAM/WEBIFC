/* global IFC */

import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
const WebIFC = require("web-ifc");


// ... rest of your component

const IFCViewer = () => {



  const [ifcModel, setIfcModel] = useState(null);
  const sceneRef = useRef();

  // Handle file upload and load the IFC model
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const loader = new WebIFC.WebIFC.IFCLoader(); // Use IFC loader to parse the model
    const arrayBuffer = await file.arrayBuffer(); // Read the file as an array buffer

    loader.parse(arrayBuffer, (model) => {
      console.log('IFC model loaded:', model);
      setIfcModel(model); // Save the model in the state
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} /> {/* Input to upload IFC file */}
      <Canvas ref={sceneRef} style={{ width: '100%', height: '100vh' }}>
        {/* Lighting and camera controls */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} />
        
        {/* Render the IFC model if it's loaded */}
        {ifcModel && (
          <primitive
            object={ifcModel}
            position={[0, 0, 0]} // Position the model in 3D space
          />
        )}

        {/* Orbit controls to navigate around the scene */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default IFCViewer;
