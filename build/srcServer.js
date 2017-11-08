//stuff to get the API running

//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const open = require("open");

//express
const app = express();
const port = 3000;
const router = express.Router();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routing
app.use("/api/potter", router);

//For GET requests:
router.get("/", (req, res) => {
    res.json(characters);
});

//Run Server
app.listen(port, (err) => {
    if (err) { console.log(err); }
    else { open(`http://localhost:${port}/api/potter`) }
});


//get character based on id
router.get("/:id", (req, res) => {
    const charID = req.params.id;
    const currentChar = characters.find((character) => character.id == charID);
    if (currentChar) { res.json(currentChar); }
    else { res.sendStatus(404); }
});

//post character
//takes a character with four values, checks to see if already exists, then adds to array if doesnt already
//initialise the post request
router.post("/", (req, res) => {

    const postChar = req.body;
    const isValid = isValidChar(postChar) && !characters.find((a) => a.id == postChar.id);
    if (isValid) {
        characters.push(postChar);
        res.send(postChar);
    }
    else { res.sendStatus(500); }
});


//put character
//takes a character at the specific url ID, replaces content of char with 
//the char received excluding id
router.put("/:id", (req, res) => {
    const charID = req.params.id;
    const currentChar = characters.find((character) => character.id == charID);
    if (currentChar) {
        const putChar = req.body;
        const isValid = isValidChar(putChar);
        if (isValid) {
            currentChar.name = putChar.name;
            currentChar.age = putChar.age;
            currentChar.title = putChar.title;
            res.sendStatus(204);
        }
        else { res.sendStatus(404); }
    }
});

/* DELETE REQUESTS */
//Doesn't take any information, a delete request at a specific ID endpoint will delete the object.
router.delete("/:id", (req, res) => {
    const charID = req.params.id;
    const currentChar = characters.findIndex((character) => character.id == charID);
    if (currentChar !== -1) {
        characters.splice(currentChar, 1);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});

//mock data to use instead of a database

const characters = [{
    id: 1,
    name: "Harry Potter",
    age: 11,
    title: "The boy who lived"
},
{
    id: 2,
    name: "Ronald Weasley",
    age: 11,
    title: "Ginger"
},
{
    id: 3,
    name: "Hermione Granger",
    age: 11,
    title:"insufferable know it all"
}
]


//check if the object is valid
function isValidChar(character) {
    return "id" in character && "name" in character && "age" in character && "title" in character;
}