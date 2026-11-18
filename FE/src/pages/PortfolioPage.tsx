
import {
  ArrowUpRight,
  Sparkles,
  Users
} from "lucide-react";

import { Link } from "react-router-dom";
import quiksilverSurfboard from "../assets/portfolio/01-surfboard-pink-yellow.jpg";
import hawaiianPostcard from "../assets/portfolio/02-hawaiian-postcard.jpg";
import oceanWave from "../assets/portfolio/03-ocean-wave.jpg";
import tropicalPopArt from "../assets/portfolio/04-y2k-tropical-pop-art.jpg";
import tropicalSunset from "../assets/portfolio/05-y2k-tropical-sunset.jpg";
import quiksilverReference from "../assets/portfolio/06-quiksilver-logo-reference.jpg";

import {
  teamInfo,
  members,
  projects
} from "../data/portfolio";

import MemberCard from "../components/portfolio/MemberCard";
import ProjectCard from "../components/portfolio/ProjectCard";
import ContactSection from "../components/portfolio/ContactSection";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function PortfolioPage() {
  // Hero Content Reveal
  const {
    ref: heroContentRef,
    isVisible: isHeroContentVisible
  } = useScrollReveal<HTMLDivElement>();

  // Hero Visual Reveal
  const {
    ref: heroVisualRef,
    isVisible: isHeroVisualVisible
  } = useScrollReveal<HTMLDivElement>();

  // Team Section Reveal
  const {
    ref: teamRef,
    isVisible: isTeamVisible
  } = useScrollReveal<HTMLElement>();

  // Project Section Reveal
  const {
    ref: projectRef,
    isVisible: isProjectVisible
  } = useScrollReveal<HTMLElement>();

  return (
    <div className="portfolio-page">

      {/* ===========================
          HERO SECTION
      =========================== */}

      <section className="hero-section">

        <div
          ref={heroContentRef}
          className={`hero-content scroll-reveal ${
            isHeroContentVisible ? "is-visible" : ""
          }`}
        >

          <div className="eyebrow">
            <span className="status-dot"></span>
            THE PEOPLE BEHIND THE IDEAS
          </div>

          <h1>
            We turn ideas
            <br />
            into <span>impact.</span>
          </h1>

          <p className="hero-description">
            {teamInfo.description}
          </p>

          <div className="hero-actions">

            <a href="#team" className="primary-button">
              Discover Our Team
              <ArrowUpRight size={18} />
            </a>

            <Link to="/chat" className="secondary-button">
              Talk to Our AI
              <Sparkles size={17} />
            </Link>

          </div>

        </div>

        <div
          ref={heroVisualRef}
          className={`hero-visual scroll-reveal scroll-reveal-delay ${
            isHeroVisualVisible ? "is-visible" : ""
          }`}
        >

          <div className="visual-top">
            <span>TEAM / PROFILE</span>
            <span>2026</span>
          </div>

          <div className="visual-center">

            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>

            <div className="visual-surfboard-wrap">
  <img
    src={quiksilverSurfboard}
    alt="Quiksilver surfboard"
    className="hero-surfboard-image"
  />
  <span className="surfboard-stamp">QUIK / SURF 2000</span>
</div>

          </div>

          <div className="visual-bottom">
            <span>CREATIVE MINDS.</span>
            <span>SHARED PURPOSE.</span>
          </div>

        </div>

      </section>

      {/* HAWAIIAN SURF Y2K EDITORIAL */}
      <section className="surf-editorial-section" aria-label="Hawaiian surf visual collection">
        <div className="surf-editorial-heading">
          <span className="section-kicker">A LITTLE ESCAPE FROM REALITY</span>
          <h2>GOOD VIBES. ENDLESS SUMMER.</h2>
          <p>Hawaiian surf spirit meets the playful energy of the Y2K era.</p>
        </div>

        <div className="surf-editorial-grid">
          <figure className="surf-editorial-card surf-card-postcard">
            <img src={hawaiianPostcard} alt="Vintage Hawaiian surf postcard" />
            <figcaption>ISLAND STATE OF MIND</figcaption>
          </figure>
          <figure className="surf-editorial-card surf-card-wave">
            <img src={oceanWave} alt="Ocean wave in the summer sun" />
            <figcaption>CHASE THE BLUE</figcaption>
          </figure>
          <figure className="surf-editorial-card surf-card-pop">
            <img src={tropicalPopArt} alt="Colorful Y2K tropical pop art" />
            <figcaption>Y2K SUMMER CLUB</figcaption>
          </figure>
          <figure className="surf-editorial-card surf-card-sunset">
            <img src={tropicalSunset} alt="Tropical sunset" />
            <figcaption>GOLDEN HOUR FOREVER</figcaption>
          </figure>
          <figure className="surf-editorial-card surf-card-logo">
            <img src={quiksilverReference} alt="Surf brand visual reference" />
            <figcaption>SURF CULTURE / 2000</figcaption>
          </figure>
        </div>

        <div className="surf-editorial-footer">
          <span>MADE FOR THE ENDLESS SUMMER</span>
          <span>EST. IN THE DIGITAL DAYDREAM</span>
        </div>
      </section>

      {/* ===========================
          TEAM INTRODUCTION
      =========================== */}

      <section
        ref={teamRef}
        className={`section-block scroll-reveal ${
          isTeamVisible ? "is-visible" : ""
        }`}
        id="team"
      >

        <div className="section-heading">

          <span className="section-label">
            01 / THE TEAM
          </span>

          <h2>
            {teamInfo.name}
            <br />
            <span>{teamInfo.tagline}</span>
          </h2>

          <p>
            Meet the people behind our ideas.
            Every member brings different strengths
            and expertise to our team.
          </p>

        </div>

        <div className="team-summary">

          <div>
            <Users size={25} />
            <strong>{members.length}</strong>
            <span>TEAM MEMBERS</span>
          </div>

          <div>
            <Sparkles size={25} />
            <strong>{projects.length}</strong>
            <span>PROJECTS</span>
          </div>

        </div>

        <div className="member-grid">

          {members.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              index={index}
            />
          ))}

        </div>

      </section>

      {/* ===========================
          PROJECT SHOWCASE
      =========================== */}

      <section
        ref={projectRef}
        className={`section-block scroll-reveal ${
          isProjectVisible ? "is-visible" : ""
        }`}
        id="projects"
      >

        <div className="section-heading">

          <span className="section-label">
            02 / SELECTED WORK
          </span>

          <h2>
            Ideas become
            <br />
            <span>real projects.</span>
          </h2>

          <p>
            Explore the projects and technologies
            that represent our team's capabilities.
          </p>

        </div>

        <div
          className={`project-grid ${
            projects.length === 1 ? "project-grid-single" : ""
          }`}
        >

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>

      </section>

      {/* ===========================
          CONTACT SECTION
      =========================== */}

      <ContactSection />

    </div>
  );
}
