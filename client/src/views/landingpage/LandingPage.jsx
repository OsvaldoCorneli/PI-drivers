import { Link } from "react-router-dom";
import "./landingPageModule.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="overlay">
        <h1 className="welcome-text">WELCOME!</h1>
        <h5>You can search your favorite driver</h5>
        <h6>LET'S GO!</h6>

        <Link to="/home" className="link-button">
          Home
        </Link>
      </div>
    </div>
  );
}
