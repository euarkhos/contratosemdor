"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type ReviewSlide = {
  quoteBefore: string;
  quoteHighlight: string;
  quoteAfter: string;
  metricNum: string;
  metricLabel: string;
  ctaLabel: string;
  ctaHref: string;
  name: string;
  roleLine: string;
  orgLine: string;
  locationLine: string;
};

const slides: ReviewSlide[] = [
  {
    quoteBefore: "Contratos que me levavam uma semana ",
    quoteHighlight: "agora fecham em um dia",
    quoteAfter: ".",
    metricNum: "5×",
    metricLabel: "mais rápido no mesmo fluxo",
    ctaLabel: "Ouvir esta história",
    ctaHref: "#comecar",
    name: "Maria Santos",
    roleLine: "Responsável jurídica",
    orgLine: "PME · piloto",
    locationLine: "Lisboa, PT",
  },
  {
    quoteBefore: "Reduzimos o ruído operacional — ",
    quoteHighlight: "menos revisões manuais",
    quoteAfter: ", mais tempo para o estratégico.",
    metricNum: "88%",
    metricLabel: "menos toques manuais nos contratos",
    ctaLabel: "Ouvir esta história",
    ctaHref: "#comecar",
    name: "Equipa jurídica",
    roleLine: "Legal ops",
    orgLine: "SaaS · piloto",
    locationLine: "Porto, PT",
  },
  {
    quoteBefore: "Os estudantes ganham casos reais; o cliente ",
    quoteHighlight: "vê o estado do pedido",
    quoteAfter: " sem adivinhar.",
    metricNum: "100%",
    metricLabel: "rasto de pedido e pagamento alinhados",
    ctaLabel: "Ouvir esta história",
    ctaHref: "#comecar",
    name: "Clínica jurídica",
    roleLine: "Coordenação",
    orgLine: "Universidade parceira",
    locationLine: "Coimbra, PT",
  },
  {
    quoteBefore: "Integrámos o fluxo com o CRM — ",
    quoteHighlight: "menos emails, mais acordos",
    quoteAfter: ".",
    metricNum: "3×",
    metricLabel: "ciclos de revisão em menos passos",
    ctaLabel: "Ouvir esta história",
    ctaHref: "#comecar",
    name: "Operações comerciais",
    roleLine: "Revenue ops",
    orgLine: "B2B · piloto",
    locationLine: "Braga, PT",
  },
  {
    quoteBefore: "A equipa fecha mais rápido porque ",
    quoteHighlight: "tudo fica auditável",
    quoteAfter: ", do pedido ao pagamento.",
    metricNum: "40%",
    metricLabel: "menos tempo em follow-up administrativo",
    ctaLabel: "Ouvir esta história",
    ctaHref: "#comecar",
    name: "João Ferreira",
    roleLine: "CFO",
    orgLine: "Scale-up · tecnologia",
    locationLine: "Aveiro, PT",
  },
];

type ExtendedItem = { slide: ReviewSlide; reactKey: string };

function buildExtended(slidesData: ReviewSlide[]): ExtendedItem[] {
  const n = slidesData.length;
  if (n === 0) return [];
  return [
    { slide: slidesData[n - 1], reactKey: "clone-prev" },
    ...slidesData.map((slide, i) => ({ slide, reactKey: `slide-${i}` })),
    { slide: slidesData[0], reactKey: "clone-next" },
  ];
}

function LogoMark() {
  return (
    <div className="lp-review-logo-mark" aria-hidden>
      <span className="lp-review-logo-dot lp-review-logo-dot--a" />
      <span className="lp-review-logo-dot lp-review-logo-dot--b" />
      <span className="lp-review-logo-dot lp-review-logo-dot--c" />
      <span className="lp-review-logo-dot lp-review-logo-dot--d" />
    </div>
  );
}

/** Posição do trilho para centrar o slide no índice `index` (0 = clone do último, 1..n = reais, n+1 = clone do primeiro). */
function computeTrackTranslateX(
  viewportWidth: number,
  slideWidth: number,
  gap: number,
  index: number,
): number {
  return (viewportWidth - slideWidth) / 2 - index * (slideWidth + gap);
}

function ReviewSlideCard({ slide }: { slide: ReviewSlide }) {
  return (
    <div className="lp-review-slide-card">
      <div className="lp-review-slide-copy">
        <LogoMark />
        <blockquote className="lp-review-quote-serif" cite={slide.ctaHref}>
          {slide.quoteBefore}
          <span className="lp-review-highlight">{slide.quoteHighlight}</span>
          {slide.quoteAfter}
        </blockquote>
        <hr className="lp-review-divider" />
        <div className="lp-review-metric-row">
          <div className="lp-review-metric-block">
            <span className="lp-review-metric-num">{slide.metricNum}</span>
            <span className="lp-review-metric-label">{slide.metricLabel}</span>
          </div>
          <a className="lp-review-story-cta" href={slide.ctaHref}>
            {slide.ctaLabel}
          </a>
        </div>
      </div>
      <div className="lp-review-slide-media">
        <div className="lp-review-media-frame">
          <button type="button" className="lp-review-play" aria-label="Reproduzir vídeo (demonstração)">
            <span aria-hidden>▶</span>
          </button>
          <div className="lp-review-media-caption">
            <p className="lp-review-cap-name">{slide.name}</p>
            <p className="lp-review-cap-role">{slide.roleLine}</p>
            <p className="lp-review-cap-org">{slide.orgLine}</p>
            <p className="lp-review-cap-loc">{slide.locationLine}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingReviews() {
  const extended = buildExtended(slides);
  const n = slides.length;
  const lastExtendedIndex = n + 1;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(1);
  const slideIndexRef = useRef(1);

  /** Índice no array extended: 0 = clone do último, 1..n = reais, n+1 = clone do primeiro */
  const [slideIndex, setSlideIndex] = useState(1);
  const [trackX, setTrackX] = useState(0);
  /** Sem transição só no salto entre clone e slide real (loop infinito) */
  const [instantMove, setInstantMove] = useState(false);

  slideIndexRef.current = slideIndex;

  const measureAndComputeX = useCallback(
    (index: number) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return null;
      const slideEls = track.querySelectorAll<HTMLElement>(".lp-review-slide");
      if (slideEls.length === 0) return null;

      const V = viewport.clientWidth;
      const W = slideEls[0].offsetWidth;
      if (V <= 0 || W <= 0) return null;

      const gapRaw = getComputedStyle(track).columnGap || getComputedStyle(track).gap;
      const gap = gapRaw ? parseFloat(gapRaw) || 24 : 24;

      const i = Math.max(0, Math.min(lastExtendedIndex, index));
      return computeTrackTranslateX(V, W, gap, i);
    },
    [lastExtendedIndex],
  );

  useLayoutEffect(() => {
    const prev = prevIndexRef.current;
    prevIndexRef.current = slideIndex;

    const teleport =
      (prev === lastExtendedIndex && slideIndex === 1) || (prev === 0 && slideIndex === n);

    const x = measureAndComputeX(slideIndex);
    if (x == null) return;

    if (teleport) {
      setInstantMove(true);
      setTrackX(x);
      requestAnimationFrame(() => {
        setInstantMove(false);
      });
    } else {
      setTrackX(x);
    }
  }, [slideIndex, lastExtendedIndex, n, measureAndComputeX]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const x = measureAndComputeX(slideIndexRef.current);
      if (x != null) setTrackX(x);
    });
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [measureAndComputeX]);

  const handleTrackTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      if (e.target !== trackRef.current) return;

      setSlideIndex((current) => {
        if (current === lastExtendedIndex) return 1;
        if (current === 0) return n;
        return current;
      });
    },
    [lastExtendedIndex, n],
  );

  const goToAdjacent = useCallback(
    (dir: -1 | 1) => {
      setSlideIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return 0;
        if (next > lastExtendedIndex) return lastExtendedIndex;
        return next;
      });
    },
    [lastExtendedIndex],
  );

  const logicalSlide = slideIndex >= 1 && slideIndex <= n ? slideIndex : slideIndex === 0 ? n : 1;

  return (
    <section
      id="reviews"
      className="lp-reviews-section"
      aria-labelledby="reviews-heading"
    >
      <h2 id="reviews-heading" className="sr-only">
        Histórias e depoimentos
      </h2>
      <div className="lp-reviews-shell">
        <div className="lp-reviews-nav-row">
          <div className="lp-reviews-nav">
            <button
              type="button"
              className="lp-reviews-arrow"
              aria-label="Depoimento anterior"
              onClick={() => goToAdjacent(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="lp-reviews-arrow"
              aria-label="Próximo depoimento"
              onClick={() => goToAdjacent(1)}
            >
              ›
            </button>
          </div>
        </div>

        <div
          className="lp-reviews-carousel"
          ref={viewportRef}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Depoimentos"
          aria-live="polite"
        >
          <div
            className={`lp-reviews-track${instantMove ? " lp-reviews-track--instant" : ""}`}
            ref={trackRef}
            style={{ transform: `translate3d(${trackX}px, 0, 0)` }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {extended.map((item) => (
              <article key={item.reactKey} className="lp-review-slide">
                <ReviewSlideCard slide={item.slide} />
              </article>
            ))}
          </div>
        </div>

        <p className="sr-only">
          Depoimento {logicalSlide} de {n}
        </p>
      </div>
    </section>
  );
}
