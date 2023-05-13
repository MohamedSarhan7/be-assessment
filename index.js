const express = require('express');

const db = require("./database/db");
const PORT = require('./config/config').PORT;
const v1Router = require('./routes/v1/index');


const app = express();

// db connection
db();

//  middlewares
app.use(express.json());


// routes
app.use('/api/v1', v1Router);
app.use('/', (req, res) => {
    res.send({ "message": "Hello, World!" })

});

// errors middleware
app.use((error, req, res, next) => {
    
    return res.status(error.status || 400).send({ message: error.message || error.array || error });

})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT} .....`)
})