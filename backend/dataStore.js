class StudentBookDatabase {
    constructor() {
        this.students = [
            { name: 'Student1', postalCode: '1111' },
            { name: 'Student2', postalCode: '2222' },
            { name: 'Student3', postalCode: '3333' },
            { name: 'Student4', postalCode: '4444' },
            { name: 'Student5', postalCode: '5555' },
        ];

        this.books = [
            { title: 'Book1', code: 'B001', available: true },
            { title: 'Book2', code: 'B002', available: false },
            { title: 'Book3', code: 'B003', available: true },
            { title: 'Book4', code: 'B004', available: true },
            { title: 'Book5', code: 'B005', available: true },
        ];
    }

    // Method to validate a student's login

    validateStudentLogin(name, postalCode) {
        console.log("validate");
        const student = this.students.find((s) => s.name.trim() === name.trim() && s.postalCode.trim() === postalCode.trim());
        console.log("student",student);
        return !!student; // Returns true if the student is found, false if not
    }

    // Method to add a new student
    async addStudent(name, postalCode) {
        return new Promise((resolve, reject) => {
            // Check if the student already exists
            if (this.students.find((s) => s.name === name && s.postalCode === postalCode)) {
                console.log("Error");
                // Student with the same name already exists, reject the Promise with an error message
                reject(100);
            } else {
                // Add the student and resolve the Promise with a success message
                this.students.push({ name, postalCode });
                console.log("Updates", this.students);
                resolve({
                    message: "Student added successfully",
                    data: this.students
                });
            }
        });
    }

    async addBook(title, code, available) {
        return new Promise((resolve, reject) => {
            if (this.books.find((b) => b.title === title && b.code === code)) {
                reject(100);
            }
            else {
                this.books.push({ title, code, available});
                console.log("Updated books databse", this.books);
                resolve({ message: 'booked added sucessfully', data: this.books });
            }
        });
    }

    async borrowBook(title, available) {
        return new Promise((resolve, reject) => {
            if (this.books.find((b) => b.title === title && b.available === true)) {

                const book = this.books.find((b) => b.title === title && b.available === true);
                //console.log('borrowbook',book)
                if (book) {
                    const index = this.books.indexOf(book);
                    console.log('Index', index);
                    this.books[index].available = false;
                    //console.log(this.books)
                }
                resolve({ message: 'you sucessfully borrowed the book', data: this.books })
            }
            else {
                reject({ message: 'Book is not available' })
            }
        })
    }

    async returnBook(title, available) {
        console.log('return book func');
        return new Promise((resolve, reject) => {
            if (this.books.find((b) => b.title === title && b.available === available)) {
                const book = this.books.find((b) => b.title === title && b.available === false);

                if (book) {
                    const index = this.books.indexOf(book);
                    //console.log('Index', index);
                    this.books[index].available = true;
                }
                resolve({ message: 'you sucessfully returned the book', data: this.books })
            }
            else {
                reject({ message: 'Book is not available' })
            }
        })
    }

    getBooks() {
        return this.books;
    }
    getStudents() {
        return this.students;
    }
}

module.exports = StudentBookDatabase;
