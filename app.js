const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;



app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});




