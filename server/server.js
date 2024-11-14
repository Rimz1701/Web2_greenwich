const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/vocabModel.js');
const routes = require('./api/routes/vocabRoutes.js');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:123@fgwweb2.nsfd5.mongodb.net/?retryWrites=true&w=majority&appName=FGWWeb2',
    {useNewUrlParser: true }
);
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});
console.log(`Sever started on port ${port}`);