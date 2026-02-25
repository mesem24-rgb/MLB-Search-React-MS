import { useTeam } from "../context/TeamContext";

function Team() {
  const { team, removePlayer } = useTeam();

  const renderStats = (stats) => {
    if (!stats || stats.length === 0) {
      return <p>No stats available</p>;
    }

    return stats.map((group, i) => {
      const stat = group.splits?.[0]?.stat;
      if (!stat) return null;

      if (group.group?.displayName === "hitting") {
        return (
          <div key={i} className="stat-block">
            <p>AVG: {stat.avg || "-"}</p>
            <p>HR: {stat.homeRuns || "-"}</p>
            <p>RBI: {stat.rbi || "-"}</p>
            <p>OPS: {stat.ops || "-"}</p>
          </div>
        );
      }

      if (group.group?.displayName === "pitching") {
        return (
          <div key={i} className="stat-block">
            <p>ERA: {stat.era || "-"}</p>
            <p>SO: {stat.strikeOuts || "-"}</p>
            <p>WHIP: {stat.whip || "-"}</p>
            <p>W: {stat.wins || "-"}</p>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <section className="team-page">
      <h1>Your Fantasy Team</h1>

      {Object.keys(team).length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No players added yet. Go to Search and build your team!
        </p>
      )}

      <div className="team-grid">
        {Object.entries(team).map(([position, data]) => {
          const { player, stats } = data;

          return (
            <div
              key={position}
              className="team-card"
              style={{
                backgroundImage: `url(https://img.mlbstatic.com/mlb-photos/image/upload/w_600,q_auto:best/v1/people/${player.id}/headshot/67/current)`,
              }}
            >
              <div className="team-card-overlay">
                <div>
                  <h3>{player.fullName}</h3>
                  <p className="position-label">{position}</p>
                </div>

                <div className="stats-container">{renderStats(stats)}</div>

                <button
                  className="remove-btn"
                  onClick={() => removePlayer(position)}
                >
                  Remove Player
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Team;
