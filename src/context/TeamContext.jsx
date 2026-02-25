import { createContext, useContext, useState, useEffect } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("fantasyTeam");
    return saved ? JSON.parse(saved) : {};
  });

  const [loadingPositions, setLoadingPositions] = useState({});

  // Persist team to localStorage
  useEffect(() => {
    localStorage.setItem("fantasyTeam", JSON.stringify(team));
  }, [team]);

  const addPlayer = async (player) => {
    const position = player.primaryPosition?.abbreviation || "Unknown";

    // Prevent duplicate adds for same position
    if (team[position]?.player?.id === player.id) return;

    setLoadingPositions((prev) => ({ ...prev, [position]: true }));

    try {
      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/people/${player.id}/stats?stats=season&group=hitting,pitching&season=2024`
      );

      const data = await res.json();

      setTeam((prev) => ({
        ...prev,
        [position]: {
          player,
          stats: data.stats || [],
        },
      }));
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoadingPositions((prev) => {
        const updated = { ...prev };
        delete updated[position];
        return updated;
      });
    }
  };

  const removePlayer = (position) => {
    setTeam((prev) => {
      const updated = { ...prev };
      delete updated[position];
      return updated;
    });
  };

  const clearTeam = () => {
    setTeam({});
    localStorage.removeItem("fantasyTeam");
  };

  return (
    <TeamContext.Provider
      value={{
        team,
        addPlayer,
        removePlayer,
        clearTeam,
        loadingPositions,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);