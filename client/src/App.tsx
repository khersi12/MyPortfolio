import { Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import './App.css'
function App() {
  return (
    <>
      <Navbar />

      <main>
        <section className="home">
          <p className="home__eyebrow">Welcome to My Portfolio</p>
        <img src="/Logoo.png" alt="Khadra Hersi logo" />

          <h1>Hi, I'm Khadra Hersi</h1>

          <p className="home__intro">
            I am a Software Engineering Technology – Artificial Intelligence
            student at Centennial College with an interest in software
            development and artificial intelligence.
          </p>

          <p className="home__mission">
            My goal is to continue developing my programming and software
            engineering skills while creating practical and meaningful
            technology solutions.
          </p>

          <div className="home__links">
            <Link to="/about">About Me</Link>
            <Link to="/projects">View My Projects</Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
