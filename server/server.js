const cors = require("cors");
const dotenv = require("dotenv");

const app = require("./app");

const PORT = process.env.PORT || 5000;

// !IMPORTANT
// temporary solution to start working in inside the client with async

app.use(cors());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
