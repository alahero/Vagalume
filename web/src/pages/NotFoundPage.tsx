import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";

/**
 * 404: enlaces claros de retorno sin redirección silenciosa.
 */
export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page not found | Vagalume Tulum"
        description="This page does not exist. Return to Vagalume Tulum beach club home or browse upcoming events."
        path="/404"
        noIndex
      />
      <section className="vl-notfound" aria-labelledby="vl-notfound-title">
        <p className="vl-notfound__eyebrow">404</p>
        <h1 id="vl-notfound-title" className="vl-notfound__title">
          This space is still jungle
        </h1>
        <p className="vl-notfound__text">
          The page you are looking for is not here. Head back to the sanctuary or check what is coming up
          next.
        </p>
        <div className="vl-notfound__actions">
          <Link className="vl-notfound__btn" to="/">
            Back to home
          </Link>
          <Link className="vl-notfound__btn vl-notfound__btn--ghost" to="/events">
            Upcoming events
          </Link>
        </div>
      </section>
    </>
  );
}
