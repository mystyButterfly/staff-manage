const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '', 
    database: 'peopledb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to MySQL database.');
});



// CRUD operations
// Fetch all people
app.get('/api/people', (req, res) => {
    db.query('SELECT * FROM People', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// fetch people for reports
// GraphQL Schema
const schema = buildSchema(`
    type Person {
        id: String
        name: String
        age: Int
        occupation: String
        city: String
    }

    type Query {
        people: [Person]
    }

`);
// Resolvers
const root = {
    people: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM People', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
}

// Create a new person
app.post('/api/people', (req, res) => {
    const person = { id: uuidv4(), ...req.body }; // Include the id in person

    // Check if age is 18 or older
    if (person.age < 18) {
        return res.status(400).json({ error: "Age must be 18 or older. Response from server" });
    }

    db.query('INSERT INTO People SET ?', person, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(person); // Return the entire person object including id
    });
});



// Update a person
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const person = req.body;
    // Check if age is 18 or older
    if (person.age < 18) {
        return res.status(400).json({ error: "Age must be 18 or older. Response from server" });
    }
    db.query('UPDATE People SET ? WHERE id = ?', [person, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ id, ...person });
    });
});

// Delete a person
app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM People WHERE id = ?', [id], (err, results) => {
        // Handle database query error
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).send({ error: 'An error occurred while trying to delete the person.' });
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).send({ error: 'Person not found.' });
        }

        // Successfully deleted the record
        res.sendStatus(204);
    });
});

// Use express-graphql to create the GraphQL HTTP server
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Enable GraphiQL interface
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
