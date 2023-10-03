import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>BIENVENIDO</h1>
      <Link to="/home">Home page</Link>
    </div>
  );
}