import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Page Not Found</h1>
        <Link to="/" className="link">
          back home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
