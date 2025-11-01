const express = require("express");
const router = express.Router();

//  In-memory "database"
const books = [{
     "id": 1,
     "title": "Persona 2",
     "Company": "Sony"
     },
     {
     "id": 2,
     "title": "Persona 3",
     "Company": "Sony"
     },
     {
     "id": 3,
     "title": "Persona 4",
     "Company": "Sony"
     },
     {
     "id": 4,
     "title": "Persona 5",
     "Company": "Sony"
     }];

// Use the current max ID to safely determine the next ID
let nextId = Math.max(...books.map(b => b.id)) + 1;

// GET gets all books
router.get("/", (req, res) => {
     res.status(200).json({
        message: `From the Book API route with ${req.method}`, 
     books,
     success: true
     });
});

// GET by ID gets a single book by it's ID
router.get("/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
     const book = books.find(book => book.id === bookId);
     
     if (book === undefined){
     res.status(404).json({
     message: `Book with ID ${req.params.id} can not be found.`,
     success: false,
     });
     } else {
        res.status(200).json({
     message: `From the Book API route with ${req.method}`, 
     id: req.params.id, // ID is included in the output
     book, 
     success: true,
     });
     }
});

//POST adds a new book
router.post("/", (req, res) => {
    // Basic validation
    if (!req.body.title || !req.body.Company) {
        return res.status(400).json({
            message: "Missing 'title' or 'Company' in request body",
            success: false
        });
    }

     const newBook = {
        id: nextId++, // Assign the next available ID and increment
        title: req.body.title,
        Company: req.body.Company
    };

     books.push(newBook);
     
     res.status(200).json({ 
     message: `From the Book API route with ${req.method}`, 
     book: newBook,
     success: true
     });
});

//PUT updates an existing book
router.put("/:id", (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === idToUpdate);

    // Check if book exists
    if (bookIndex === -1) {
        return res.status(404).json({
            message: `Book with ID ${req.params.id} can not be found.`,
            success: false,
        });
    }

    // Create the updated book object
    const updatedBook = { 
        ...books[bookIndex], // Keep original data (like ID)
        ...req.body,        // Overwrite with new data from request
        id: idToUpdate      // Ensure the ID remains unchanged
    };

    // Replace the old book in the array
    books[bookIndex] = updatedBook;

     res.status(200).json({
         message: `From the Book API route with ${req.method}`,
         id: req.params.id, // ID is included in the output
        book: updatedBook,
     success: true,
     });
});

//DELETE deletes a book by its ID
router.delete("/:id", (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === idToDelete);

    // Check if the book exists
    if (bookIndex === -1) {
        return res.status(404).json({
            message: `Book with ID ${req.params.id} can not be found.`,
            success: false,
        });
    }

    // Remove the book from the array
    const [deletedBook] = books.splice(bookIndex, 1);

     res.status(200).json({
         message: `From the Book API route with ${req.method}`, 
         id: req.params.id, // ID is included in the output
        deletedBook: deletedBook,
         success: true,
     });
});

module.exports = router;

