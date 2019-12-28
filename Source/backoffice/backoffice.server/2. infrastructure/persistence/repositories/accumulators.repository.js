const AccumulatorDefinitionModel = require('../models/accumulator-definition.model');

module.exports = class AccumulatorsRepository {
    addDefinition(definition) {
        const dbDefinition = new AccumulatorDefinitionModel({
            _id: definition.id,
            name: definition.name,
            category: definition.category,
            size: definition.size
        });
        
         return dbDefinition.save();
    }
}