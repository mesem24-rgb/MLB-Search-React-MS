import { createContext, useContext, useState, useCallback } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch players from MLB API
  const searchPlayers = useCallback(async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/people/search?names=${searchQuery}`
      );
      const data = await res.json();
      setResults(data.people || []);
      setQuery(searchQuery); // update the query here too
    } catch (err) {
      console.error("Error fetching players:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, setResults, loading, setLoading, searchPlayers }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);