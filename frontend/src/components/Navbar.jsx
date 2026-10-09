import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X, ShoppingCart, User, LogIn, ShieldCheck } from "lucide-react";
import { navLinks } from "../mock";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import ExperienceControls, { IconButton, ThemeSwatches } from "./ExperienceControls";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { count } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") { setOpen(false); menuRef.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const length = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${length > 0 ? window.scrollY / length : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [location]);

  return <header className="site-header">
    <nav className="site-nav" aria-label="Main navigation">
      <Link to="/" className="brand" aria-label="KennyPvtHax home"><span className="brand-mark">K<span>/</span>X</span><span className="brand-name">Kenny<span>PvtHax</span><small>INDEPENDENT RESEARCH LAB</small></span></Link>
      <div className="desktop-nav">
        {navLinks.map((link) => <NavLink key={link.to} end to={link.to} className={({ isActive }) => `nav-link ${isActive && !link.to.includes("#") ? "active" : ""}`}>{link.label}</NavLink>)}
      </div>
      <div className="nav-actions">
        <ExperienceControls />
        <IconButton label={`Shortlist${count ? ` (${count})` : ""}`} onClick={() => navigate("/checkout")}><ShoppingCart size={17} />{count > 0 && <span className="cart-count">{count}</span>}</IconButton>
        <IconButton label={user ? "Your account" : "Sign in"} className="account-button" onClick={() => user ? navigate("/account") : setAuthOpen(true)}>{user ? <User size={17} /> : <LogIn size={17} />}</IconButton>
        {user?.is_admin && <IconButton label="Admin" onClick={() => navigate("/admin")}><ShieldCheck size={17} /></IconButton>}
        <Link to="/demos" className="button-primary nav-cta">Enter the lab <ArrowUpRight size={15} /></Link>
        <button ref={menuRef} type="button" className="icon-button menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </nav>
    {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
      {navLinks.map((link, index) => <NavLink end key={link.to} to={link.to}><span className="mono">0{index + 1}</span>{link.label}<ArrowUpRight size={16} /></NavLink>)}
      <div className="mobile-menu-bottom"><ThemeSwatches />{!user && <button onClick={() => { setOpen(false); setAuthOpen(true); }}><LogIn size={16} />Sign in</button>}</div>
    </nav>}
    <div className="reading-progress" ref={progressRef} />
    <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={() => navigate("/account")} />
  </header>;
}
