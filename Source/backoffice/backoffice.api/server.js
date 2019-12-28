class AccumulatorDefinition {
    id;
    name;
    category; //bike, car, drone
}

class BatteryDefinition {
    id;
    name;
    size;
}

class CatalogBattery {
    id;
    name;
    size;
    stock;
    price;
}

class EnergyProviderDefinition {
    id;
    name;
    coordinates;
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