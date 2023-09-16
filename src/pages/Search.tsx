import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard/MovieCard'

import { IMovies } from './Home'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import styles from './MoviesGrid.module.css'

const Search = () => {
  const [movies, setMovies] = useState<IMovies[]>([])
  const [error, setError] = useState<string>('')

  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const getSearchedMovies = async () => {
    setError('')
    axios
      .get(`${searchURL}?${apiKey}&query=${query}&language=pt-BR`)
      .then((res) => {
        setMovies(res.data.results)
      })
      .catch((error) => {
        console.error(error)
        setError('Ocorreu um erro inesperado durante a busca.\nPor favor, tente novamente mais tarde.')
      })
      .finally(() => console.log('Finalizado!'))
  }

  useEffect(() => {
    getSearchedMovies()
  }, [query])

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Resultados para <span className={styles.queryText}>{query}</span>
        </h2>
        <div className={styles.moviesContainer}>
          {movies.length > 0 && movies.map((movie) => <MovieCard showLink={true} key={movie.id} movie={movie} />)}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  )
}

export default Search
