// En tu componente de sección o contenedor
import CardDisplay from "../molecules/Card";
// En tu componente de sección o contenedor
import movies from "../../data/moviesData";

function MovieSection() {
    const moviesData = movies
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 bg-[#000000d8] lg:grid-cols-6 gap-4">
      {moviesData.map(movie => (
        <CardDisplay key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
export default MovieSection;