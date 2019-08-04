import React, { useState } from 'react'

const BornForm = ({ show, updateBorn }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

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
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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