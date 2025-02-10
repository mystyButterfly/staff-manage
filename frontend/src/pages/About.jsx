
function About() {
  return (
    <div className="htu-container">
      <div className="htu-header">
        <h1>People Management App</h1>
        <h2>Frontend Overview</h2>
        <p>
          This is a React-based People Management application that provides a
          user-friendly interface for managing a list of individuals. Users can
          easily view, search, sort, edit, create, and delete records, making it
          an essential tool for developing CRUD (Create, Read, Update, Delete)
          applications. For report creation, GraphQL is used to fetch only the
          necessary data.
        </p>
      </div>

      <section>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Dynamic Data Fetching:</strong> Utilize the Fetch API and
            GraphQL to retrieve and display data from various back-end services.
          </li>
          <li>
            <strong>CRUD Operations:</strong> Implement the core functionality
            to Create, Read, Update, and Delete user records, showcasing
            essential application capabilities.
          </li>
          <li>
            <strong>Search Functionality:</strong> Quickly filter and search
            through records to enhance user experience and efficiency. Users can
            search by name, age, city, or occupation.
          </li>
          <li>
            <strong>Sorting Mechanism:</strong> Clickable headers to sort
            records by different fields (name, age, city, occupation) in
            ascending or descending order, reinforcing core concepts of data
            manipulation.
          </li>
          <li>
            <strong>Pagination:</strong> Displays records across multiple pages,
            improving performance and usability for larger datasets.
          </li>
          <li>
            <strong>Modals for UX:</strong> Uses modal windows for viewing,
            editing, and creating records, providing a clean and modern UI
            experience.
          </li>
          <li>
            <strong>Keyboard Interaction:</strong> Enhances usability with
            keyboard navigation, allowing users to close modals using the Escape
            key.
          </li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>JavaScript (ES6+)</li>
          <li>Fetch API</li>
          <li>GraphQL</li>
          <li>HTML5 & CSS3</li>
          <li>RESTful API principles</li>
        </ul>
      </section>
      <div>
        <header className="htu-header">
          <h1>Backend Overview</h1>
          <p>
            Backend is a RESTful API built with Node.js, Express, and MySQL,
            designed to manage a database of people. It provides a user-friendly
            interface for Create, Read, Update, and Delete (CRUD) operations,
            enabling web developers to easily integrate and manipulate person
            data in a database. This API serves as a foundation for full-stack
            applications, streamlining backend interactions.
          </p>
        </header>

        <section>
          <h2>Key Features:</h2>
          <ul>
            <li>
              <strong>CRUD Functionality:</strong> Implement full CRUD
              operations for managing person records.
              <ul>
                <li>
                  <strong>Create:</strong> Add a new person to the database.
                </li>
                <li>
                  <strong>Read:</strong> Fetch all persons stored in the
                  database.
                </li>
                <li>
                  <strong>Update:</strong> Modify existing person records.
                </li>
                <li>
                  <strong>Delete:</strong> Remove a person from the database.
                </li>
              </ul>
            </li>
            <li>
              <strong>UUID Support:</strong> Each person added to the database
              receives a unique identifier using the UUID library, ensuring all
              records are distinct.
            </li>
            <li>
              <strong>MySQL Integration:</strong> The API connects seamlessly to
              a MySQL database, allowing developers to utilize MySQL for data
              storage and retrieval.
            </li>
            <li>
              <strong>CORS Enabled:</strong> Cross-Origin Resource Sharing
              (CORS) is enabled for easy API consumption from other
              applications, making it accessible to front-end developers.
            </li>
            <li>
              <strong>Body Parser Integration:</strong> JSON request and
              response handling is simplified with the body-parser middleware,
              facilitating easy data manipulation.
            </li>
          </ul>
        </section>
      </div>
      <div>
        <h2>Create a database using these SQL queries</h2>
        <br />
        <div>
          -- Create the database (optional)
          <br />
          CREATE DATABASE PeopleDB; USE PeopleDB;
          <br />
          <br />
          -- Create the table
          <br />
          CREATE TABLE People ( id VARCHAR(36) PRIMARY KEY, name VARCHAR(100),
          age INT, city VARCHAR(100), occupation VARCHAR(100) );
          <br />
          <br />
          -- Insert data into the table
          <br />
          INSERT INTO People (id, name, age, city, occupation) VALUES (1, 'Bob
          Smith', 34, 'Los Angeles', 'Software Engineer'), (2, 'Alice Johnson',
          28, 'New York', 'Graphic Designer'), (3, 'Charlie Brown', 22,
          'Chicago', 'Photographer'), (4, 'Diana Prince', 30, 'Miami',
          'Marketing Specialist'), (5, 'Ethan Hunt', 40, 'San Francisco',
          'Project Manager'), (6, 'Fiona Gallagher', 26, 'Seattle', 'Web
          Developer'), (7, 'George King', 31, 'Boston', 'Financial Analyst'),
          (8, 'Hannah Lee', 24, 'Austin', 'Data Scientist'), (9, 'Isaac Newton',
          39, 'Denver', 'Physicist'), (10, 'Julia Roberts', 37, 'Phoenix',
          'Actress'), (11, 'Kevin Hart', 42, 'Las Vegas', 'Comedian'), (12,
          'Laura Croft', 29, 'Orlando', 'Adventure Blogger'), (13, 'Michael
          Scott', 36, 'Philadelphia', 'Regional Manager'), (14, 'Natalie
          Portman', 32, 'San Diego', 'Actress'), (15, 'Oliver Twist', 19, 'New
          Orleans', 'Student'), (16, 'Paula Abdul', 45, 'Atlanta',
          'Choreographer'), (17, 'Quentin Tarantino', 58, 'Los Angeles',
          'Director'), (18, 'Rita Hayworth', 65, 'Tucson', 'Retired'), (19,
          'Sammy Davis Jr.', 54, 'Houston', 'Singer'), (20, 'Tina Fey', 51,
          'Chicago', 'Writer');
        </div>
      </div>
    </div>
  );
}

export default About;
