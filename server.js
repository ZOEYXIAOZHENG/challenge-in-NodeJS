const express = require("express");
const routes = require("./routes");

createServer = () => {
    const app = express();
    app.use("/api", routes);
    return app;
};

module.exports = createServer;
