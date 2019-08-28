import React from 'react'

const Recommendations = ({ show, userResult, booksResult }) => {

  if (!show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = userResult.data.me.favoriteGenre
  const allBooks = booksResult.data.allBooks
  
  const booksToShow = allBooks.filter(b => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favourite genre <b>{favoriteGenre}</b></p>

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
    </div>
  )
}

export default Recommendations