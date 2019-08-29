import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo'

const ALL_BOOKS = gql`
query createBook($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const Books = ({ show }) => {
  const [genre, setGenre] = useState('all')
  const [allBooks, setAllBooks] = useState([])
  const [booksToShow, setBooksToShow] = useState([])

  const client = useApolloClient()

  const fetchBooks = async (selectedGenre) => {
    const { data } = await client.query({
      query: ALL_BOOKS,
      variables: { genre: selectedGenre }
    })
    setBooksToShow(data.allBooks)
  }

  const fetchAll = async (selectedGenre) => {
    const { data } = await client.query({
      query: ALL_BOOKS
    })
    setAllBooks(data.allBooks)
    setBooksToShow(data.allBooks)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  if (!show) {
    return null
  }

  const genres = allBooks.reduce((a, c) =>
    a.concat(c.genres.filter(genre => !a.includes(genre)))
  , [])

  const filterBooks = async (selectedGenre) => {
    setGenre(selectedGenre)
    if (selectedGenre === 'all') {
      fetchAll()
      return
    }
    fetchBooks(selectedGenre)
  }

  return (
    <div>
      <h2>books</h2>

      {(genre === 'all')
        ? <p>all</p>
        : <p>in genre <b>{genre}</b></p>
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
          {booksToShow.map(a =>
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