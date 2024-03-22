import { useGlobalContext } from "../context";
import CatCard from "./CatCard";
import { Loader } from "./Loader";

const CatsList = () => {
  const { filteredCats: cats, searchTerm, loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (cats.length < 1) {
    return (
      <div className="container">
        <h1>Nothing to show!</h1>
      </div>
    );
  }
  console.log(searchTerm);
  return (
    <section className="section">
      <h2 className="section-title">
        Showing {searchTerm ? `${searchTerm} Cats` : "All Cat Types"}
      </h2>
      <div className="cats-center">
        {cats.map((cat) => {
          return <CatCard key={cat.id} data={cat} />;
        })}
      </div>
    </section>
  );
};

export default CatsList;
