import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import FavoritesPage from "./features/favorites/pages/FavoritesPage";
import MovieDetailsPage from "./pages/MovieDetails";
import PersonDetailsPage from "./pages/PersonDetails";
import HomePage from "./pages/Home";
import MoviesPage from "./pages/Movies";

const App = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        <Route path="/person/:personId" element={<PersonDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
