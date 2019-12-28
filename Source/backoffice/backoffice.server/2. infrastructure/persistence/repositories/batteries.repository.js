const BatteryDefinitionModel = require('../models/battery-definition.model');

module.exports = class BatteriesRepository {
    addDefinition(definition) {
        const dbDefinition = new BatteryDefinitionModel({
            _id: definition.id,
            name: definition.name,
            size: definition.size
        });
        
         return dbDefinition.save();
    }
};