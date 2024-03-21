import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useGlobalContext } from "../context";
import "../styles/Details.css";

const CatDetailsPage = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const { singleCat } = useGlobalContext();

  useEffect(() => {
    if (!id) {
      return <Navigate to="/" />;
    }
    const fetchedCat = singleCat(id);
    setCat(fetchedCat);
  }, [id, singleCat]);

  if (!cat) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  const {
    image,
    name,
    origin,
    life_span,
    description,
    temperament,
    wikipedia_url,
  } = cat;

  return (
    <section className="section cat-section" style={{ margin: "4rem" }}>
      <div className="cat">
        <img src={image?.url ?? ""} alt={name}></img>
        <div className="cat-info">
          <p>
            <span className="cat-data">Type :</span> {name}
          </p>
          <p>
            <span className="cat-data">Origin :</span> {origin}
          </p>
          <p>
            <span className="cat-data">Lifespan :</span> {life_span}
          </p>

          <p>
            <span className="cat-data">Temperament :</span>
            {temperament}
          </p>
          <p>
            <span className="cat-data">Wiki :</span>
            <Link to={wikipedia_url} className="link">
              {wikipedia_url}
            </Link>
          </p>
          <p>
            <span className="cat-data">description :</span> {description}
          </p>
        </div>
      </div>
    </section>
  );

  return <>{JSON.stringify(cat)}</>;
};

export default CatDetailsPage;
