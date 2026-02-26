import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
  };

  return (
    <section 
    id="landing">
    
      <div className="landing__description">
        <h1>
          <span>The Best MLB Player Data Search</span>
        </h1>
        <p>FIND ANY PLAYER WITH MLB SEARCH</p>

        <form onSubmit={handleSubmit} className="search-box">
          <input
            className="search-input" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search MLB player..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}

export default Home;
