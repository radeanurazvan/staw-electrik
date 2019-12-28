class CatalogBattery {
    id;
    name;
    size;
    stock;
    price;
}

class CatalogEnergyProvider {
    id;
    name;
    coordinates;
    pricePerUnit;
}

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

const app = express();
app.use(bodyParser.json());
app.use(cors());

new Bootstrapper().bootsrapAll();

let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log('Listening on port ' + port);
});

