"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Altura da faixa fixa (anúncio + barra de nav, sem o painel móvel aberto). */
function measureSiteHeaderHeight(headerEl: HTMLElement) {
  const ann = headerEl.querySelector<HTMLElement>(".lp-announcement");
  const inner = headerEl.querySelector<HTMLElement>(".lp-nav-inner");
  if (!inner) return;
  const safeTop = parseFloat(getComputedStyle(headerEl).paddingTop) || 0;
  const annH = ann?.offsetHeight ?? 0;
  const innerH = inner.offsetHeight;
  const borderNav = 1;
  const h = safeTop + annH + innerH + borderNav;
  document.documentElement.style.setProperty(
    "--lp-site-header-height",
    `${Math.ceil(h)}px`,
  );
}

const nav = [
  { href: "#produto", label: "Produto" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#reviews", label: "Recursos" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [navOverHero, setNavOverHero] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl || typeof ResizeObserver === "undefined") return;

    const run = () => measureSiteHeaderHeight(headerEl);

    const inner = headerEl.querySelector<HTMLElement>(".lp-nav-inner");
    if (!inner) return;

    run();
    const ro = new ResizeObserver(run);
    const ann = headerEl.querySelector(".lp-announcement");
    if (ann) ro.observe(ann);
    ro.observe(inner);
    window.addEventListener("resize", run);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [announcementOpen]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

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
      ref={headerRef}
      className={
        navOverHero
          ? "lp-site-header lp-site-header--over-hero"
          : "lp-site-header lp-site-header--surface"
      }
    >
      {announcementOpen ? (
        <div className="lp-announcement">
          <div className="lp-container lp-announcement-inner">
            <p className="lp-announcement-copy">
              <span className="lp-announcement-kicker">NOVIDADE:</span>{" "}
              pré-análise com IA e revisão por estudantes de direito — piloto aberto.
            </p>
            <div className="lp-announcement-trailing">
              <a className="lp-announcement-cta" href="#comecar">
                Reserve sua vaga
                <span className="lp-announcement-arrow" aria-hidden>
                  ↗
                </span>
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
            className={
              open ? "lp-nav-toggle lp-nav-toggle--open" : "lp-nav-toggle"
            }
            aria-expanded={open}
            aria-controls="lp-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? "Fechar menu" : "Abrir menu"}
            </span>
            {open ? (
              <span className="lp-nav-toggle-close" aria-hidden>
                ×
              </span>
            ) : (
              <span className="lp-nav-toggle-bars" aria-hidden>
                <span />
                <span />
                <span />
                <span />
              </span>
            )}
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
