import React from "react";

export const HeroBanner = () => {
  const logo = "https://img.icons8.com/?size=100&id=xOiIkQtdbcaI&format=png&color=000000";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="React logo" />
      </div>
      <h1 className="hero-banner__headline">Hello, There</h1>
      <p className="hero-banner__description">
        This is a Calendar application<strong></strong>.
      </p>
      <a
        id="code-sample-link"
        // target="_blank"
        rel="noopener noreferrer"
        href="http://localhost:4040/profile"
        className="button button--secondary"
      >
        Please Log In to Continue
      </a>
    </div>
  );
};
