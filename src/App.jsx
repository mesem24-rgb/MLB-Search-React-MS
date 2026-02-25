import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Team from "./pages/Team";

import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <>
    <SearchProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </SearchProvider>
    </>
  );
}

export default App;
