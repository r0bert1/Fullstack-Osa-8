import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BornForm from './components/BornForm'

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
    author
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

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => <Authors show={page === 'authors'} result={result} />}
      </Query>

      <Mutation
        mutation={UPDATE_BORN}
        refetchQueries={[{ query: ALL_AUTHORS }]}
      >
        {(updateBorn) =>
          <BornForm
            show={page === 'authors'}
            updateBorn={updateBorn}
          />
        }
      </Mutation>

      <Query query={ALL_BOOKS}>
        {(result) => <Books show={page === 'books'} result={result} />}
      </Query>

      <Mutation
        mutation={CREATE_BOOK}
        refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}
      >
        {(addBook) => 
          <NewBook
            show={page === 'add'}
            addBook={addBook}
          />
        }
      </Mutation>
    </div>
  )
}

export default App