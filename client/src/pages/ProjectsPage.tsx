import './ProjectsPage.css'
function ProjectsPage() {
  return (
<main className="projects">
    <h1>Projects</h1>
     
      <section className="project">

        <h2>Park Environment Simulation</h2>
        <img src="/Spider.png" alt="Park Environment Simulation" />

        <p>
          Python • Object-Oriented Programming
        </p>

        <p>
          Developed a Python-based environment simulation using classes such
          as Thing, Agent, Environment, Park, BlindDog, Food, Water, and
          Person. The project used object-oriented programming concepts to
          model agent behaviours including movement, eating, drinking, and
          barking.
        </p>
      </section>

      <section className="project">
        <h2>Image Favorites Gallery</h2>
        <img src="/JavaScript.png" alt="Image Favorites Gallery" />

        <p>
          JavaScript • DOM Manipulation
        </p>

        <p>
          Created an interactive image gallery using JavaScript. Users can
          open images in a modal, add up to five images to their favorites,
          and remove images from their favorites list. JavaScript was used
          to dynamically create and manage page elements.
        </p>
      </section>

      <section className="project">
        <h2>Video Game Collection Manager</h2>
        <img src="/CSharpOutput.png" alt="Video Game Collection " />

        <p>
          C# • Object-Oriented Programming
        </p>

        <p>
          Developed a C# console program that creates and manages a list of
          games. The program uses classes, constructors, properties,
          validation, methods, and a static game counter. Game ratings are
          validated between 0 and 10, and the program identifies highly rated
          games.
        </p>
      </section>
    </main>
  )
}

export default ProjectsPage
