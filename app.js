const express = require("express");
const path = require("path");
const app = express();



app.listen(process.env.PORT || 8080, function () {
    console.log(`Server listening on: http://localhost:8080`)
})

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});




