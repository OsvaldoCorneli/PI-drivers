import { Link } from "react-router-dom";
import "./landingPageModule.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="overlay">
        <h1 className="welcome-text">¡Bienvenido a la Página de Drivers!</h1>
        <Link to="/home" className="link-button">
          Home
        </Link>
      </div>
    </div>
  );
}
