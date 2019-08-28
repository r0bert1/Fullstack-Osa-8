import React, { useState, useEffect } from 'react'

const Books = ({ show, result }) => {
  const [genre, setGenre] = useState('all')
  const [books, setBooks] = useState([])

  useEffect(() => {
    setBooks(result.data.allBooks)
  }, [result.data.allBooks])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks

  const genres = allBooks.reduce((a, c) =>
    a.concat(c.genres.filter(genre => !a.includes(genre)))
  , [])

  const filterBooks = (selectedGenre) => {
    setGenre(selectedGenre)
    if (selectedGenre === 'all') {
      setBooks(allBooks)
      return
    }
    const filtered = allBooks.filter(book => book.genres.includes(selectedGenre))
    setBooks(filtered)
  }

  return (
    <div>
      <h2>books</h2>

      {(genre === 'all')
        ? <p>all</p>
        : <p>in genre {genre}</p>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {genres.map(g =>
        <button key={g} onClick={() => filterBooks(g)}>{g}</button>
      )}
      <button onClick={() => filterBooks('all')}>all genres</button>
    </div>
  )
}

export default Books