import React, { useState } from 'react'
import { useMutation, useQuery, useApolloClient } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BornForm from './components/BornForm'
import Login from './components/Login'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
    }
    published
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

const UPDATE_BORN = gql`
mutation updateBorn($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [updateBorn] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const [login] = useMutation(LOGIN)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors show={page === 'authors'} result={authors} />

      <BornForm show={page === 'authors'} updateBorn={updateBorn} result={authors} />

      <Books show={page === 'books'} result={books} />

      <NewBook show={page === 'add'} addBook={addBook} />

      <Login 
        show={page === 'login'} 
        login={login} 
        setToken={(token) => setToken(token)}
        setPage={setPage}
      />

    </div>
  )
}

export default App