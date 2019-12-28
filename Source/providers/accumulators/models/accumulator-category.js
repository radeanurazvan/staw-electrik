const categories = {
    bike: 1,
    car: 2,
    drone: 3
};

module.exports = {
    ...categories,
    all: [categories.bike, categories.car, categories.drone]
};