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
const customersController = require('./controllers/customers.controller');
const ordersController = require('./controllers/orders.controller');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(cors());

app.use('/api/batteries', batteriesController);
app.use('/api/accumulators', accumulatorsController);
app.use('/api/energyProviders', energyProvidersController);
app.use('/api/customers', customersController);
app.use('/api/orders', ordersController);

new Bootstrapper().bootsrapAll();

io.on('connection', function (socket) {
    console.log('io connection');
});

let port = process.env.PORT || 5000;
server.listen(port, function(){
    console.log('Listening on port ' + port);
});

