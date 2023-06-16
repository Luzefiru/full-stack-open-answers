import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password })
      setUser(loggedInUser)

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(loggedInUser)
      )
      noteService.setToken(loggedInUser.token)
      return true
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return false
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedNoteappUser')
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm login={login} />
      </Togglable>
    )
  }

  const addNote = ({ content, important }) => {
    noteFormRef.current.toggleVisibility()
    noteService.create({ content, important }).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      <h2>Login</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>Logout</button>
            <br />
            <br />
          </div>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </ul>
      <Footer />
    </div>
  )
}

export default App
