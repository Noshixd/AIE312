import { NavLink } from "react-router-dom";
import {
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";

import quiksilverLogo from "../../assets/quiksilver-logo.svg";

const isMockApiMode =
  import.meta.env.VITE_USE_MOCK_API === "true";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-container">
        <NavLink
          to="/"
          className="brand"
          aria-label="TEAMSPACE and Quiksilver home"
        >
          <img
            src={quiksilverLogo}
            alt="Quiksilver"
            className="brand-quiksilver-logo"
          />
          <span className="brand-divider" aria-hidden="true">×</span>
          <span className="brand-name">
            TEAM<span>SPACE.</span>
          </span>
        </NavLink>

        <nav className="nav-menu" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <LayoutDashboard size={16} aria-hidden="true" />
            <span>Portfolio</span>
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>AI Chat</span>
          </NavLink>
        </nav>

        <div
          className="nav-status"
          role="status"
          aria-label={
            isMockApiMode
              ? "Chat API is using mock mode"
              : "Chat API is configured for real API mode"
          }
        >
          <span className="status-dot" aria-hidden="true" />
          <span>
            {isMockApiMode ? "MOCK API MODE" : "REAL API MODE"}
          </span>
        </div>
      </div>
    </header>
  );
}
