import "./home.scss";
import SearchBar from "../../components/searchBar/SearchBar";

const Home = () => {
  return (
    <div className="home">
      <div className="text-container">
        <div className="wrapper">
          <h1>Find real estate &amp; get your dream place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat adipisci dicta eveniet velit ab aspernatur, tenetur alias
            laudantium quasi corrupti, et odit cupiditate consequatur ullam
            ipsam sint ipsum inventore!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h2>16+</h2>
              <span>Years Of Experience</span>
            </div>
            <div className="box">
              <h2>200</h2>
              <span>Award Gained</span>
            </div>
            <div className="box">
              <h2>1200+</h2>
              <span>Property Ready</span>
            </div>
          </div>
        </div>
      </div>
      <div className="img-container">
        <img src="/bg.png" alt="landing" />
      </div>
    </div>
  );
};

export default Home;
