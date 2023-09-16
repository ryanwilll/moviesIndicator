import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard/MovieCard'

import styles from './MoviesGrid.module.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export interface IMovies {
  adult: boolean
  backdrop_path: string
  genre_ids?: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number | string
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [topMovies, setTopMovies] = useState<IMovies[]>([])

  const getTopMovies = async () => {
    setLoading(true)
    setError('')
    axios
      .get(`${moviesURL}top_rated?${apiKey}&language=pt-BR`)
      .then((res: any) => {
        setTopMovies(res.data.results)
      })
      .catch((error) => {
        console.error(error)
        setError('Ocorreu um erro durante a busca dos filmes. Por favor, tente novamente mais tarde!')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getTopMovies()
  }, [])

  return (
    <div>
      {loading && <p>Carregando...</p>}
      <div className={styles.container}>
        <h2 className={styles.title}>Filmes mais visto</h2>
        <div className={styles.moviesContainer}>
          {topMovies.length > 0 && topMovies.map((movie) => <MovieCard showLink={true} key={movie.id} movie={movie} />)}
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Home
