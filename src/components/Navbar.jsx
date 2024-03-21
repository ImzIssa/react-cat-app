import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`center nav ${scrolled ? "shadow" : ""}`}>
      <div className="nav__content">
        <Link to="/">
          <img src={logo} alt="cocktail db logo" className="logo" />
        </Link>
        <Link to="/" className="link link--nav">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
