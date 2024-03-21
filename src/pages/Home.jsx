import SearchForm from "../components/Search";
import CatsList from "../components/CatsList";

const Home = () => {
  return (
    <main>
      <div style={{ marginTop: "2rem" }}>
        <SearchForm />
        <CatsList />
      </div>
    </main>
  );
};

export default Home;
