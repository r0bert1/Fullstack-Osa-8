import React, { useState } from 'react'

const BornForm = ({ show, updateBorn, result }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    await updateBorn({
      variables: { name, setBornTo: Number(born) }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        author
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option></option>
          {authors.map((a) => 
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BornForm