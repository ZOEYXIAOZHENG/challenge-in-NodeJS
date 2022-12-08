const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = 3000;

app.use("/api", routes);
app.listen(PORT, () =>
    console.log(`Server running on http://localhost/${PORT}`)
);
