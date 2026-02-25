import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useTeam } from "../context/TeamContext";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const { addPlayer } = useTeam(); // For Add to Team
  const { query, setQuery, results, setResults, loading, searchPlayers } =
    useSearch();
  const location = useLocation();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [stats, setStats] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  // Auto-read query from URL and fetch
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("q");
    if (searchQuery) {
      setQuery(searchQuery);
      searchPlayers(searchQuery);
    }
  }, [location.search, setQuery, searchPlayers]);

  // Search form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    searchPlayers(query);
    setVisibleCount(6);
  };

  // Open modal + fetch stats
  const openModal = async (player) => {
    setSelectedPlayer(player);
    setStats(null);
    setModalLoading(true);

    try {
      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/people/${player.id}/stats?stats=career&group=hitting,pitching`,
      );
      const data = await res.json();
      setStats(data.stats || []);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setStats(null);
  };

  // Render stats in modal
  const renderStats = () => {
    if (!stats || stats.length === 0) {
      return <p>No stats available.</p>;
    }

    return stats.map((group, index) => {
      const stat = group.splits?.[0]?.stat;
      if (!stat) return null;

      const groupName =
        group.group?.displayName?.toLowerCase() ||
        group.group?.name?.toLowerCase();

      if (groupName === "hitting") {
        return (
          <div key={index} className="stat-block">
            <h3>Hitting Stats</h3>
            <p>AVG: {stat.avg || "-"}</p>
            <p>HR: {stat.homeRuns || "-"}</p>
            <p>RBI: {stat.rbi || "-"}</p>
            <p>OBP: {stat.obp || "-"}</p>
            <p>OPS: {stat.ops || "-"}</p>
          </div>
        );
      }

      if (groupName === "pitching") {
        return (
          <div key={index} className="stat-block">
            <h3>Pitching Stats</h3>
            <p>ERA: {stat.era || "-"}</p>
            <p>SO: {stat.strikeOuts || "-"}</p>
            <p>WHIP: {stat.whip || "-"}</p>
            <p>W: {stat.wins || "-"}</p>
            <p>L: {stat.losses || "-"}</p>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <section>
      <h1>MLB Player Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search player name..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && (
  <div className="results">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="card skeleton-card">
        <div className="skeleton-img" />
        <div className="skeleton-text" />
        <div className="skeleton-text short" />
      </div>
    ))}
  </div>
)}

      {!loading && results.length === 0 && query && (
        <h2 style={{ marginTop: "20px", color: "red" }}>
          No results found for "
          <span style={{ color: "#007bff" }}>{query}</span>"
        </h2>
      )}

      {results.length > 0 && (
        <h2 style={{ marginTop: "20px" }}>
          Showing results for "<span style={{ color: "#007bff" }}>{query}</span>
          "
        </h2>
      )}

      <div className="results">
        {results.slice(0, visibleCount).map((player) => (
          <div
            key={player.id}
            className="card"
            onClick={() => openModal(player)}
          >
            <img
              src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_300,q_auto:best/v1/people/${player.id}/headshot/67/current`}
              alt={player.fullName}
              className="card-img"
              onError={(e) => {
                e.currentTarget.src = "/assets/default-player.png";
              }}
            />
            <div className="card__overlay">
              <h3>{player.fullName}</h3>
              <p>{player.currentTeam?.name || "Free Agent"}</p>
              <p>{player.primaryPosition?.abbreviation || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < results.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="load-more-btn"
          >
            Load More
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedPlayer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-background"
            style={{
              backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/w_1200,q_auto:best/v1/people/${selectedPlayer.id}/headshot/67/current)`,
            }}
          >
            <div className="modal-blur-layer" />
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>

              <div className="modal-header">
                <img
                  src={`https://img.mlbstatic.com/mlb-photos/image/upload/w_300,q_auto:best/v1/people/${selectedPlayer.id}/headshot/67/current`}
                  alt={selectedPlayer.fullName}
                  className="modal-player-img"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/default-player.png";
                  }}
                />
                <h2>{selectedPlayer.fullName}</h2>
              </div>

              {/* Add to Team button */}
              <button
                className="add-team-btn"
                onClick={() => {
                  addPlayer(selectedPlayer);
                  navigate("/team");
                }}
              >
                Add to Team
              </button>

              {modalLoading ? <p>Loading stats...</p> : renderStats()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Search;
