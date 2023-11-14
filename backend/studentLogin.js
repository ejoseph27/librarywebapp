const StudentBookDatabase = require('./dataStore');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Import the cors middleware
app.use(bodyParser.json());
// Enable CORS for all routes or specify specific routes
app.use(cors());

const studentDB = new StudentBookDatabase(); // Create an instance of the class

app.get('/', (req, res) => {
    res.send('Home Page');
});
app.post('/api/login', (req, res) => {
    // Retrieve the student's name and postal code from the request body
    const { name, postalCode } = req.body;
    const isLoginValid = studentDB.validateStudentLogin(name, postalCode);

    // Perform validation (e.g., check if name and postal code match records)
    if (isLoginValid) {
        res.status(200).json({ message: 'Login success' });
    } else {
        res.status(401).json({ message: 'Login failed' });
    }
});

app.post('/api/addstudentlist', async (req, res) => {

    try {
        console.log("Request body", req.body);
        // Assuming studentDB.addStudent returns a Promise
        const studentData = await studentDB.addStudent(req.body.name, req.body.postalcode);
        if (typeof studentData === 'object' && studentData !== null) {
            // Success message
            res.status(200).json({ message: 'Student added successfully', studentData });
        } else {
            // Error message
            res.status(400).json({ error: 'name already exist', studentData });
        }

    } catch (error) {
        // Handle any errors and send an error response with an appropriate status code
        res.status(500).json({ error: 'Student already exist' });
    }

});

app.post('/api/addbookslist', async (req, res) => {
console.log("AddBOOK",req.body);
    try {
        //console.log("Request body", req.body);
        // Assuming studentDB.addStudent returns a Promise
        const bookData = await studentDB.addBook(req.body.title, req.body.code,req.body.available);
        if (typeof bookData === 'object' && bookData !== null) {
            // Success message
            res.status(200).json({ message: 'Book added successfully', bookData });
        } else {
            // Error message
            res.status(400).json({ error: 'Book already exist', bookData });
        }

    } catch (error) {
        // Handle any errors and send an error response with an appropriate status code
        res.status(500).json({ error: 'Book already exist' });
    }

});

app.post('/api/returnbook', async (req, res) => {
    console.log('Request Body return book', req.body);
    try {
        const bookDb = studentDB.returnBook(req.body.title, req.body.code, req.body.available);
        if (typeof bookDb === 'object' && bookDb !== null) {
            // Success message
            res.status(200).json({ message: 'book added successfully', bookDb });

        }
        else {

            res.status(400).json({ error: 'unsucessfull' })

        }

    } catch (error) {
        res.status(500).json('Internal Error');
    }
})

app.post('/api/borrowbook', async (req, res) => {
    console.log('Request Body borrow books', req.body);
    try {
        const bookDb = studentDB.borrowBook(req.body.title, req.body.bookId);
        if (typeof bookDb === 'object' && bookDb !== null) {
            // Success message
            res.status(200).json({ message: 'book returned successfully', bookDb });
        }
        else {
            res.status(400).json({ error: 'unsucessfull' })
        }

    } catch (error) {
        res.status(500).json('Internal Error');
    }
})

app.get('/api/booklist', (req, res) => {
    console.log(req.body);
    const bookData = studentDB.getBooks();
    console.log(bookData);
    res.json(bookData)
});
app.get('/api/studentlist', (req, res) => {
    console.log(req.body);
    const studentsData = studentDB.getStudents();
    console.log(studentsData);
    res.json(studentsData)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
