require("dotenv/config");
const app = require("./app"),

  PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
});