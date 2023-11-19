// app.test.js
const StudentBookDatabase = require('./dataStore.js'); // adjust the path accordingly

describe('validateStudentLogin', () => {
    // Mock students for testing
    const students = [
        { name: 'Student1', postalCode: '1111' },
        { name: 'Student2', postalCode: '2222' },
        { name: 'Student3', postalCode: '3333' },
        { name: 'Student4', postalCode: '4444' },
        { name: 'Student5', postalCode: '5555' },
    ];

    // Create an instance of StudentBookDatabase
    const studentDB = new StudentBookDatabase();
    // Mock the validateStudentLogin function to use our array of students
    beforeAll(() => {
        studentDB.students = students;
    });

    test('valid login', () => {
        const result = studentDB.validateStudentLogin('Student1', '1111');
        expect(result).toBe(true);
    });

    test('invalid login', () => {
        const result = studentDB.validateStudentLogin('InvalidName', 'InvalidCode');
        expect(result).toBe(false);
    });
});

describe('addStudent', () => {
    // Mock students for testing
    const students = [
        { name: 'Student1', postalCode: '1111' },
        { name: 'Student2', postalCode: '2222' },
        { name: 'Student3', postalCode: '3333' },
        { name: 'Student4', postalCode: '4444' },
        { name: 'Student5', postalCode: '5555' },
    ];

    // Create an instance of StudentBookDatabase
    const studentDB = new StudentBookDatabase();
    // Set the initial state with mock students
    studentDB.students = students;

    test('add new student', async () => {
        try {
            const result = await studentDB.addStudent('Student12', '1123');
            expect(result).toEqual({
                message: "Student added successfully",
                data: expect.arrayContaining([
                    expect.objectContaining({ name: 'Student12', postalCode: '1123' }),
                ]),
            });
        } catch (error) {
            console.error('Error:', error);
            // Re-throw the error to fail the test
            throw error;
        } // Assuming the new student is added to the array
    });

    test('reject adding existing student', async () => {
        try {
            await studentDB.addStudent('Student1', '1111');
            // If the promise resolves, this line should not be reached
            fail('Expected promise to reject');
        } catch (error) {
            expect(error).toBe(100); // Assuming you reject with 100 for an existing student
        }
    });
});


describe("Add Book test", () => {
    const books = [
        { title: 'Book1', code: 'B001', available: true },
        { title: 'Book2', code: 'B002', available: false },
        { title: 'Book3', code: 'B003', available: true },
        { title: 'Book4', code: 'B004', available: true },
        { title: 'Book5', code: 'B005', available: true },
    ];

    const bookDB = new StudentBookDatabase();

    bookDB.books = books;

    test('add new book sucess', async () => {

        try {
            const result = await bookDB.addBook('Book11', 'B0011', true)
            expect(result).toEqual({
                message: 'booked added sucessfully',
                data: expect.arrayContaining([
                    expect.objectContaining({ title: 'Book11', code: 'B0011', available:true}),
                ]),
            });
        } catch (error) {
            console.error('Error:', error);
            // Re-throw the error to fail the test
            throw error;
        }
    });

    test('reject adding exisiting book',async()=>{

        try {
            await bookDB.addBook('Book1','B001', true);
            // If the promise resolves, this line should not be reached
            fail('Expected promise to reject');
        } catch (error) {
            expect(error).toBe(100); // Assuming you reject with 100 for an existing student
        }
    });
});

describe("Borrow Book test", ()=>{


    const bookDB= new StudentBookDatabase();
    const books = bookDB.books;

    test('borrow book sucess', async ()=>{

        try {

            const result= await bookDB.borrowBook('Book1',true)
            expect(result).toEqual({
                message:'you sucessfully borrowed the book',
                data: expect.arrayContaining([
                    expect.objectContaining({ title: 'Book1', code: 'B001', available:false}),
            ])
            })
            
        } catch (error) {
            console.error('Error:', error);
            // Re-throw the error to fail the test
            throw error;
            
        }
    })

    test('reject borrow book',async ()=>{

        try {
            await bookDB.borrowBook('Book1',false);
            // If the promise resolves, this line should not be reached
            fail('Expected promise to reject');
        } catch (error) {
            expect(error).toEqual({message: 'Book is not available'}); // Assuming you reject with 100 for an existing student
        }
    });

})
