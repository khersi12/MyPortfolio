import './AboutMe.css'

function AboutMe() {
  return (
    <section className="aboutme">
      <div className="aboutme__content">
        <p className="aboutme__eyebrow">About Me</p>

        <h2>Khadra Hersi</h2>

        <h3>Software Engineering Technology – Artificial Intelligence Co-op Student</h3>

        <p>
          I am a Software Engineering Technology – Artificial Intelligence
          student at Centennial College with an interest in software
          development and artificial intelligence. I am developing my
          programming skills in Python and C#, along with web development
          skills using HTML and CSS.
        </p>

        <p>
          Through my academic projects, I have gained experience with
          object-oriented programming, software requirements, and software
          engineering concepts. I enjoy learning new technologies, solving
          problems, and working collaboratively with others.
        </p>

        <ul className="aboutme__list">
          <li>Python and C# programming</li>
          <li>HTML and CSS web development</li>
          <li>Object-oriented programming</li>
          <li>Software engineering and problem solving</li>
        </ul>
      </div>
      <a href="Khadra_Hersi_Resume.pdf" target="_blank" rel="noopener noreferrer">
         Resume
      </a>
    </section>
  )
}

export default AboutMe