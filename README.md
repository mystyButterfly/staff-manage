# Staff Manage App
https://staff-server.great-site.net

To try all features, run this locally or watch the video in the ```video``` folder. Sorry, I couldn't find a free MySQL database that I can use with the Node.js server. I host the project on Apache-server because where I can use API. https://staff-server.great-site.net/api
![staffVideo](https://github.com/user-attachments/assets/d371740f-39a8-470f-aa07-bc71809a7f68)

[large size gif is loading... Please waite ~1min]

## Frontend Overview

Welcome to the Staff Manage App! This application is built with React and offers a user-friendly interface for managing a comprehensive list of individuals. Users can seamlessly view, search, sort, edit, create, and delete records, making it an essential tool for developing CRUD (Create, Read, Update, Delete) applications. The project exemplifies key React features and best practices, serving as an excellent learning opportunity for web developers.

### To run this locally, make the next steps:
1) download and open in your editor (VS-code ets.)
2) make available MySQL database; I use a local Apache server with a MySQL database. Create the dataset using SQL queries from the file "createDB.md"
3) open the terminal in your editor, navigate to the "backend" folder using ```cd backend```. Install dependencies with ```npm install```. To run this I use Node.js. To run this ```node server.js```
4) open a NEW terminal. Navigate to the "frontend" folder using ```cd frontend```. Install dependencies with ```npm install```. To run this use ```npm run dev```. Open the link from your terminal in your browser.
   
### Features

- **Dynamic Data Fetching:** Retrieve and display data from a RESTful server using the Fetch API, showcasing the integration of front-end applications with back-end services.
- **CRUD Operations:** Full functionality to Create, Read, Update, and Delete user records, emphasizing essential capabilities of modern applications.
- **Search Functionality:** Quickly filter records by name, age, city, or occupation to enhance user experience and efficiency.
- **Sorting Mechanism:** Clickable headers allow users to sort records by various fields (name, age, city, occupation) in both ascending and descending order.
- **Pagination:** Records are displayed across multiple pages for improved performance and usability with larger datasets.
- **Modals for User Experience:** Modern UI design using modal windows for viewing, editing, and creating records.
- **Keyboard Interaction:** Enhanced usability through keyboard navigation, enabling users to close modals using the Escape key.

### Technologies Used

- React
- JavaScript (ES6+)
- Fetch API
- HTML5 & CSS3
- RESTful API principles

## Backend Overview

The backend is a RESTful API developed with Node.js, Express, and MySQL. It manages a database of people and provides a robust interface for performing Create, Read, Update, and Delete (CRUD) operations. This API simplifies the integration and manipulation of person data in a database, laying the groundwork for full-stack applications.

### Key Features

- **CRUD Functionality:** Complete support for managing person records.
  - **Create:** Add new person entries to the database.
  - **Read:** Retrieve all stored person records.
  - **Update:** Modify existing person entries.
  - **Delete:** Remove person records from the database.
  
- **UUID Support:** Each individual added to the database receives a unique identifier via the UUID library, ensuring record distinction.
- **MySQL Integration:** Seamless connection to a MySQL database for efficient data storage and retrieval.
- **CORS Enabled:** Cross-Origin Resource Sharing (CORS) support makes the API easily consumable by other applications, facilitating access for front-end developers.
- **Body Parser Integration:** Utilize body-parser middleware for simplified JSON request and response handling, streamlining data manipulation.

## Set Up Your Database

To get started, you can create the database using the following SQL queries:

```sql
-- Create the database (optional)
CREATE DATABASE PeopleDB;
USE PeopleDB;

-- Create the table
CREATE TABLE People (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    city VARCHAR(100),
    occupation VARCHAR(100)
);

-- Insert data into the table
INSERT INTO People (id, name, age, city, occupation) VALUES
(1, 'Bob Smith', 34, 'Los Angeles', 'Software Engineer'),
(2, 'Alice Johnson', 28, 'New York', 'Graphic Designer'),
(3, 'Charlie Brown', 22, 'Chicago', 'Photographer'),
(4, 'Diana Prince', 30, 'Miami', 'Marketing Specialist'),
(5, 'Ethan Hunt', 40, 'San Francisco', 'Project Manager'),
(6, 'Fiona Gallagher', 26, 'Seattle', 'Web Developer'),
(7, 'George King', 31, 'Boston', 'Financial Analyst'),
(8, 'Hannah Lee', 24, 'Austin', 'Data Scientist'),
(9, 'Isaac Newton', 39, 'Denver', 'Physicist'),
(10, 'Julia Roberts', 37, 'Phoenix', 'Actress'),
(11, 'Kevin Hart', 42, 'Las Vegas', 'Comedian'),
(12, 'Laura Croft', 29, 'Orlando', 'Adventure Blogger'),
(13, 'Michael Scott', 36, 'Philadelphia', 'Regional Manager'),
(14, 'Natalie Portman', 32, 'San Diego', 'Actress'),
(15, 'Oliver Twist', 19, 'New Orleans', 'Student'),
(16, 'Paula Abdul', 45, 'Atlanta', 'Choreographer'),
(17, 'Quentin Tarantino', 58, 'Los Angeles', 'Director'),
(18, 'Rita Hayworth', 65, 'Tucson', 'Retired'),
(19, 'Sammy Davis Jr.', 54, 'Houston', 'Singer'),
(20, 'Tina Fey', 51, 'Chicago', 'Writer');
```
