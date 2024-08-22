const Express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = Express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
const possessionRoutes = require('./routes/possession');
const patrimoineRoutes = require('./routes/patrimoine');
app.use('/possession', possessionRoutes);
app.use('/patrimoine', patrimoineRoutes);


app.listen(port, () => {
    console.log("Serveur running on http://localhost:5000");
    
})