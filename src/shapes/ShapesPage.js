import React from "react";
import { Link } from "react-router-dom";
import Shapes from "./Shapes"; // Assume this is your 3D shapes component

function ShapesPage() {
  return (
    <div>
      <h1>3D Shapes Interaction</h1>
      <Shapes />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default ShapesPage;
