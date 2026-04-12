import Link from "next/link";

export function LandingHero() {
  return (
    <section id="lp-hero" className="lp-hero" aria-labelledby="hero-title">
      <div className="lp-container">
        <div className="lp-hero-grid">
          <div className="lp-hero-copy">
            <h1 id="hero-title" className="lp-display">
              Análise de contratos inteligentes{" "}
              <span className="lp-hero-underline">aqui</span>.
            </h1>
            <p className="lp-lead">
              Conecta o teu contrato a estudantes de direito num fluxo guiado:
              pré-análise por IA, pagamento claro e revisão com regras de nível — do
              envio à entrega.
            </p>
            <div className="lp-hero-ctas">
              <a className="lp-btn lp-btn--on-dark lp-btn--lg" href="#comecar">
                Demonstração
              </a>
            </div>
            <div className="lp-hero-trust">
              <span className="lp-g2-badge">★ 4,8 · G2</span>
              <span>Milhares de contratos analisados com a nossa comunidade</span>
            </div>
          </div>
          <div className="lp-hero-media-slot">
            <p className="sr-only">
              Área reservada para vídeo de demonstração ou anexo de ficheiros.
            </p>
            <div className="lp-hero-media" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingMain() {
  return (
    <section id="produto" className="lp-section lp-section--product">
      <div className="lp-container">
        <div className="lp-produto-grid">
          <div className="lp-produto-copy">
            <div className="lp-produto-kicker">
              <svg
                className="lp-produto-icon"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="lp-produto-eyebrow">UM CLICK</p>
            </div>
            <h2 className="lp-produto-title">
              Conecta contrato ao maior hub inovador de análises contratuais
            </h2>
            <p className="lp-produto-body">
              Pare de saltar entre editores e IAs genéricas. No Contrato Sem Dor,
              pré-análise, pagamento e revisão humana cabem num só clique — com menos
              atrito e mais transparência.
            </p>
            <p className="lp-produto-replaces">
              Acaba com o vai-e-vem entre ferramentas e sistemas que não funcionam.
            </p>
            <a className="lp-produto-cta" href="#solucoes">
              Ver em ação
            </a>
          </div>
          <div className="lp-produto-media-slot">
            <p className="sr-only">
              Área reservada para vídeo ou imagem do produto (placeholder).
            </p>
            <div className="lp-produto-media" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingQuotes() {
  return (
    <section id="quotes" className="lp-quotes" aria-label="Confiança">
      <div className="lp-container">
        <div className="lp-quotes-row">
          <span className="lp-quote-logo">Escolas parceiras</span>
          <span className="lp-quote-logo">Escritórios piloto</span>
          <span className="lp-quote-logo">Associações estudantis</span>
          <span className="lp-quote-logo">Programas de estágio</span>
        </div>
      </div>
    </section>
  );
}

export function LandingPoints() {
  const items = [
    {
      title: "Pré-análise com IA",
      desc: "Classificação de complexidade e orçamento transparente antes de pagar.",
    },
    {
      title: "Revisão por estudantes",
      desc: "Filas justas, níveis por semestre e regras de qualidade aplicadas ao serviço.",
    },
    {
      title: "Repositório inteligente",
      desc: "Contratos e obrigações numa só plataforma — preparado para relatórios e auditoria.",
    },
  ];
  return (
    <section id="solucoes" className="lp-section lp-section--solucoes">
      <div className="lp-container">
        <div className="lp-solucoes-grid">
          <div className="lp-solucoes-media-slot">
            <p className="sr-only">
              Área reservada para ilustração das soluções (placeholder).
            </p>
            <div className="lp-solucoes-media" aria-hidden="true" />
          </div>
          <div className="lp-solucoes-copy">
            <div className="lp-produto-kicker">
              <svg
                className="lp-produto-icon"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="lp-produto-eyebrow">Soluções</p>
            </div>
            <h2 className="lp-produto-title">Três pilares de formação</h2>
            <p className="lp-produto-body">
              Pré-análise, revisão e repositório — três peças que fecham o ciclo num
              só fluxo.
            </p>
            <div className="lp-solucoes-pillars">
              {items.map((item) => (
                <div key={item.title} className="lp-solucoes-pillar">
                  <p className="lp-solucoes-pillar-lead">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="lp-solucoes-pillar-desc">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="lp-solucoes-cta-wrap">
              <a className="lp-produto-cta" href="#reviews">
                Saiba mais
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LandingReviews } from "./landing-reviews";

export function LandingAwards() {
  const stats = [
    { num: "99,9%", label: "Objetivo de uptime" },
    { num: "4,9", label: "Satisfação interna (piloto)" },
    { num: "SOC 2", label: "Roadmap de conformidade" },
    { num: "1", label: "Plataforma · foco no fluxo" },
  ];
  return (
    <section id="premios" className="lp-section lp-awards" aria-label="Confiança">
      <div className="lp-container">
        <p className="lp-eyebrow">Confiança</p>
        <h2 className="lp-h2">Nada menos do que um produto sério contigo</h2>
        <div className="lp-awards-grid">
          {stats.map((s) => (
            <div key={s.label} className="lp-award-cell">
              <p className="lp-award-num">{s.num}</p>
              <p className="lp-award-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingWhy() {
  const items = [
    {
      title: "IA nativa em cada fase",
      text:
        "Acelera a contratação ao longo do ciclo com automação para preparar, colaborar e analisar depois da assinatura.",
    },
    {
      title: "Integração no teu ecossistema",
      text:
        "Liga o fluxo às ferramentas que a equipa já usa — menos saltos entre apps e um rasto único do pedido ao pagamento.",
    },
    {
      title: "Acompanhamento dedicado",
      text:
        "Onboarding e suporte pensados para a operação jurídica e de negócio — uma plataforma que as equipas adoptam.",
    },
  ];
  return (
    <section id="porque" className="lp-porque" aria-labelledby="porque-heading">
      <div className="lp-container">
        <header className="lp-porque-header">
          <p className="lp-porque-eyebrow">Por que nós?</p>
          <h2 id="porque-heading" className="lp-porque-title">
            Contratação que funciona para{" "}
            <span className="lp-porque-title-accent">todos.</span>
          </h2>
        </header>
        <div className="lp-porque-grid">
          {items.map((item) => (
            <article key={item.title} className="lp-porque-card">
              <h3 className="lp-porque-card-kicker">{item.title}</h3>
              <p className="lp-porque-card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingBanner() {
  return (
    <section id="banner" className="lp-banner" aria-labelledby="banner-title">
      <div className="lp-container">
        <h2 id="banner-title">Pronto para modernizar o teu fluxo de contratos?</h2>
        <p>
          Agendar conversa com a equipa — ambientes de staging e integrações alinhadas
          ao roadmap técnico.
        </p>
        <a className="lp-btn lp-btn--primary lp-btn--lg" href="#comecar">
          Falar connosco
        </a>
      </div>
    </section>
  );
}

export function LandingStart() {
  return (
    <section id="comecar" className="lp-start" aria-labelledby="start-title">
      <div className="lp-container">
        <header className="lp-porque-header lp-start-header">
          <p className="lp-porque-eyebrow">Começar</p>
          <h2 id="start-title" className="lp-porque-title">
            Comece a usar o {" "}
            <span className="lp-porque-title-accent">Contrato Sem Dor.</span>
          </h2>
        </header>
        <p className="lp-start-lead">
          Escolha a conta de cliente ou estudante, complete os passos iniciais e comece
          a enviar pedidos ou a integrar revisões, conforme o seu perfil.
        </p>
        <div className="lp-start-actions">
          <Link className="lp-btn lp-btn--on-dark lp-btn--lg" href="/registo">
            Criar conta
          </Link>
          <Link className="lp-btn lp-btn--outline-light lp-btn--lg" href="/entrar">
            Entrar
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-grid">
          <div className="lp-footer-brand-block">
            <p className="lp-footer-brand">Contrato Sem Dor</p>
            <p className="lp-footer-tagline">
              Plataforma que liga clientes a estudantes de direito — pré-análise
              assistida por IA, pagamento transparente, revisão humana com filas por
              nível e regras de elegibilidade, com rasto do pedido ao pagamento.
            </p>
          </div>
          <div className="lp-footer-col">
            <h4>Produto</h4>
            <ul className="lp-footer-links">
              <li>
                <a href="#produto">Como funciona</a>
              </li>
              <li>
                <a href="#solucoes">Soluções</a>
              </li>
              <li>
                <a href="#comecar">Preços / piloto</a>
              </li>
            </ul>
          </div>
          <div className="lp-footer-col">
            <h4>Empresa</h4>
            <ul className="lp-footer-links">
              <li>
                <a href="#">Sobre</a>
              </li>
              <li>
                <a href="#">Carreiras</a>
              </li>
              <li>
                <a href="#">Contato</a>
              </li>
            </ul>
          </div>
          <div className="lp-footer-col">
            <h4>Legal</h4>
            <ul className="lp-footer-links">
              <li>
                <a href="#">Privacidade</a>
              </li>
              <li>
                <a href="#">Termos</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© {new Date().getFullYear()} Contrato Sem Dor. Todos os direitos reservados.</span>
          <a
            href="https://arkagencia.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            arkagencia.com.br
          </a>
        </div>
      </div>
    </footer>
  );
}
