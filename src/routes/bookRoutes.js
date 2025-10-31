const express = require("express");
const router = express.Router();

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
let count = 1;

//localhost:5000/api/v1/books
router.get("/", (req, res) => {
    res.status(200).json({message: `From the Book API route with ${req.method}`, 
        books,
        success: true
    });
});

router.get("/:id", (req, res) => {
    console.log(typeof req.params.id);
    //get by ID
    const book = books.find(book => book.id === parseInt(req.params.id));
    console.log(">>>", book);
    if (book === undefined){
        res.status(404).json({
            message: `Book with ID ${req.params.id} can not be found.`,
            success: false,
        });
    } else {res.status(200).json({
        message: `From the Book API route with ${req.method}`, 
        id: req.params.id,
        book, 
        success: true,
    });
    
    }
});

router.post("/", (req, res) => {
    const id = count++;
    books.push({id, ...req.body });
    console.log("My Books: ", books);
    res.status(200).json({
        message: `From the Book API route with ${req.method}`, 
        book: books[books. length -1],
        success: true
    });
});

router.put("/:id", (req, res) => {
    console.log(req.params.id);
    res.status(200).json({
        message: `From the Book API route with ${req.method}`,
        id: req.params.id, 
        success: true,
    });
});

router.delete("/:id", (req, res) => {
    console.log(req.params.id);
    res.status(200).json({
        message: `From the Book API route with ${req.method}`, 
        id: req.params.id,
        success: true,
    });
});

module.exports = router;