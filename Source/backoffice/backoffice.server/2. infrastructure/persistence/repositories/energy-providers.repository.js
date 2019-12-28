const EnergyProviderDefinitionModel = require('../models/energy-provider.model');

module.exports = class EnergyProvidersRepository {
    addDefinition(definition) {
        const dbDefinition = new EnergyProviderDefinitionModel({
            _id: definition.id,
            name: definition.name,
            coordinates: definition.coordinates
        });
        
         return dbDefinition.save();
    }
}