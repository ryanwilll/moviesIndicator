import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'

import styles from './Navbar.module.css'

function Navbar() {
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    if (!search) return

    navigate(`/search?q=${search}`)
    setSearch('')
  }

  return (
    <nav className={styles.navbar}>
      <h2>
        <Link to="/">
          <BiCameraMovie />
          Movie's Indicator
        </Link>
      </h2>
      <form onSubmit={handleSearch}>
        {/* <label>Busque um filme</label> */}
        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Busque um filme..." />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  )
}

export default Navbar
