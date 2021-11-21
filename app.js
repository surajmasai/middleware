const express = require('express');


const books = require("./book.json");
// console.log(books);

const app = express();

app.use(express.json());


var middleware = (name) => {

    return (req, res, next) => {

        const originalSendFunction = res.send.bind(res);

        res.send = function (body) {
            body.api_requested_by = "suraj";

            return originalSendFunction(body);
        };
        next();
    };
};


app.get('/', middleware("name"), function (req, res) {

    res.send({ "api_requested_by": "Your Name", books })

})

app.post('/Books', function (req, res) {

    const newBooks = [...books, req.body];

    res.send(newBooks);

})


app.get("/Books/:id", middleware("name"), function (req, res) {

    const newBooks = books.filter((books) => books.id == req.params.id);

    res.send({ "api_requested_by": "Your Name", newBooks });

})


app.patch("/Books/:id", function (req, res) {

    const newBooks = books.map((user) => {

        if (req.params.id == user.id) {

            if (req?.body?.Author_Name) user.Author_Name = req.body.Author_Name;

            if (req?.body?.publish_year) user.publish_year = req.body.publish_year;

            // return req.body
            // return {
            //     "Author_Name": "dipak"
            // }

        }

        return user

    })
    res.send(newBooks);

})

app.delete("/Books/:id", function (req, res) {

    const newBooks = books.filter((books) => books.id == req.params.id);

    res.send(newBooks);
})


app.listen(4321, function () {
    console.log("hello port 4321");
})