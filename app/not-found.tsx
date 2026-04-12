import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada · Contrato sem Dor",
  description: "O endereço que procuras não existe ou foi movido.",
};

export default function NotFound() {
  return (
    <div className="lp-not-found">
      <div className="lp-not-found-inner">
        <Link href="/" className="lp-not-found-logo" aria-label="Contrato sem Dor — início">
          <img
            className="lp-not-found-logo-img"
            src="/brand/cd-logo-preto.svg"
            alt=""
            decoding="async"
          />
        </Link>

        <p className="lp-not-found-eyebrow">Erro 404</p>

        <h1 className="lp-not-found-title">
          Página não <span className="lp-not-found-title-accent">encontrada.</span>
        </h1>

        <p className="lp-not-found-lead">
          O endereço que procuras não existe, foi movido ou o link está desactualizado.
          Verifica o URL ou regressa ao início.
        </p>

        <div className="lp-not-found-actions">
          <Link className="lp-btn lp-btn--on-dark lp-btn--lg" href="/">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
