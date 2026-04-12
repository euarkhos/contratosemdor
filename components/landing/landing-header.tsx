"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "#produto", label: "Produto" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#reviews", label: "Recursos" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [navOverHero, setNavOverHero] = useState(true);

  useEffect(() => {
    if (announcementOpen) {
      document.documentElement.style.setProperty("--lp-main-offset", "124px");
      document.documentElement.style.setProperty("--lp-main-offset-sm", "118px");
    } else {
      document.documentElement.style.setProperty("--lp-main-offset", "72px");
      document.documentElement.style.setProperty("--lp-main-offset-sm", "72px");
    }
  }, [announcementOpen]);

  useEffect(() => {
    const hero = document.getElementById("lp-hero");
    if (!hero) return;

    const updateHeroNav = () => {
      const r = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      const fullyInView =
        r.height <= vh + 2
          ? r.top >= -1 && r.bottom <= vh + 1
          : window.scrollY < 64 && r.top >= -32;
      setNavOverHero(fullyInView);
    };

    updateHeroNav();
    window.addEventListener("scroll", updateHeroNav, { passive: true });
    window.addEventListener("resize", updateHeroNav);
    const ro = new ResizeObserver(updateHeroNav);
    ro.observe(hero);
    return () => {
      window.removeEventListener("scroll", updateHeroNav);
      window.removeEventListener("resize", updateHeroNav);
      ro.disconnect();
    };
  }, [announcementOpen]);

  return (
    <header
      className={
        navOverHero
          ? "lp-site-header lp-site-header--over-hero"
          : "lp-site-header lp-site-header--surface"
      }
    >
      {announcementOpen ? (
        <div className="lp-announcement">
          <div className="lp-container lp-announcement-inner">
            <span>
              Novidade: pré-análise com IA e revisão por estudantes de direito —
              piloto aberto.
            </span>
            <div className="lp-announcement-end">
              <a href="#comecar">
                Reserva o teu lugar
                <span aria-hidden>→</span>
              </a>
              <button
                type="button"
                className="lp-announcement-close"
                aria-label="Fechar faixa de anúncio"
                onClick={() => setAnnouncementOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <nav className="lp-nav" aria-label="Principal">
        <div className="lp-container lp-nav-inner">
          <Link
            className="lp-logo"
            href="/"
            aria-label="Contrato sem Dor — início"
          >
            <img
              className={
                navOverHero
                  ? "lp-logo-img lp-logo-img--light"
                  : "lp-logo-img"
              }
              src="/brand/cd-logo-preto.svg"
              alt=""
              decoding="async"
            />
          </Link>

          <div className="lp-nav-links">
            {nav.map((item) => (
              <a key={item.href} className="lp-nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="lp-nav-actions">
            <Link className="lp-btn lp-btn--outline" href="/entrar">
              Entrar
            </Link>
            <Link className="lp-btn lp-btn--primary" href="/registo">
              Criar conta
            </Link>
          </div>

          <button
            type="button"
            className="lp-nav-toggle"
            aria-expanded={open}
            aria-controls="lp-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            {open ? "✕" : "☰"}
          </button>
        </div>

        <div
          id="lp-mobile-menu"
          className="lp-container lp-mobile-panel"
          data-open={open ? "true" : "false"}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              className="lp-nav-link"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link className="lp-btn lp-btn--outline" href="/entrar">
            Entrar
          </Link>
          <Link className="lp-btn lp-btn--primary" href="/registo">
            Criar conta
          </Link>
        </div>
      </nav>
    </header>
  );
}
