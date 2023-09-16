//* Hooks/Dependencias
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

//* Interface
import { IMovies } from '../../pages/Home'

//* URL Base
const imageURL = import.meta.env.VITE_IMG

type Props = {
  showLink: boolean
  movie: IMovies
}

const MovieCard = ({ showLink, movie }: Props) => {
  const normalizeNumbers = (number: number) => {
    return Number(number.toFixed(1))
  }

  return (
    <div className="movieCard">
      <img src={`${imageURL}${movie.poster_path}`} alt={`Capa do filme ${movie.title}`} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {normalizeNumbers(movie.vote_average)}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  )
}

export default MovieCard
