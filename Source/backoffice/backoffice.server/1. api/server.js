class Customer {
    id;
    name;
    email;
}

class Order {
    id;
    batteries;
    accumulators;
    customerId;
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Bootstrapper = require('./bootstrapper');
const batteriesController = require('./controllers/batteries.controller');
const accumulatorsController = require('./controllers/accumulators.controller');
const energyProvidersController = require('./controllers/energy-providers.controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/batteries', batteriesController);
app.use('/api/accumulators', accumulatorsController);
app.use('/api/energyProviders', energyProvidersController);

new Bootstrapper().bootsrapAll();

let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log('Listening on port ' + port);
});

