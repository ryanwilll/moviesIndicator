import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs'

import MovieCard from '../components/MovieCard/MovieCard'
import styles from './Movie.module.css'
import axios from 'axios'

interface IMovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  genres: Object[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  popularity: number
  poster_path: string
  production_companies: Object[]
  production_countries: Object[]
  revenue: number
  runtime: number
  release_date: string
  spoken_languages: Object[]
  status: string
  overview: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  tagline: string
  budget: number
}

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState<IMovieDetails>()
  const [error, setError] = useState<string>()

  const getMovie = async () => {
    setError('')
    axios
      .get(`${moviesURL}${id}?${apiKey}&language=pt-BR`)
      .then((res) => {
        setMovie(res.data)
        console.log(res)
      })
      .catch((error) => setError(error))
      .finally(() => console.log(`${moviesURL}${id}?${apiKey}&language=pt-BR`))
  }

  const formatCurrency = (number: number) => {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  useEffect(() => {
    getMovie()
  }, [])

  return (
    <div className={styles.moviePage}>
      {movie && (
        <>
          <MovieCard showLink={false} movie={movie} />
          <p className={styles.tagline}>{movie.tagline}</p>
          <div className={styles.info}>
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className={styles.info}>
            <h3>
              <BsGraphUp /> Faturamento:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className={styles.info}>
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className={styles.info}>
            <div className={styles.description}>
              <h3>
                <BsFillFileEarmarkTextFill /> Descrição:
              </h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        </>
      )}
      {error && <p className={styles.error}>error</p>}
    </div>
  )
}

export default Movie
