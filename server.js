const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")

//add change the extended to true so it can support varibale passing
app.use(express.urlencoded({extended: true}))
//tell us that the app object will use JSON messaging
app.use(express.json())

app.use("/api",apiRoutes)
app.use("/", htmlRoutes)


app.listen(PORT, () => {console.log(`Server listening on: http://localhost:${PORT}`);

});