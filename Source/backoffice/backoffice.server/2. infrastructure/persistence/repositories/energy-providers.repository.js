const CatalogEnergyProviderModel = require('../models/catalog-energy-provider.model');
const EnergyProviderDefinitionModel = require('../models/energy-provider.model');
const EnergyProviderDefinition = require('../../../3. core/domain/energy-provider/energy-provider-definition');

module.exports = class EnergyProvidersRepository {
    async getDefinition(id) {
        const dbDefinition = await EnergyProviderDefinitionModel.findById(id);
        if(!dbDefinition) {
            return null;
        }
        return new EnergyProviderDefinition(dbDefinition._id, dbDefinition.name, dbDefinition.coordinates);
    }

    addDefinition(definition) {
        const dbDefinition = new EnergyProviderDefinitionModel({
            _id: definition.id,
            name: definition.name,
            coordinates: definition.coordinates
        });
        
         return dbDefinition.save();
    }

    deleteDefinition(id) {
        return EnergyProviderDefinitionModel.findByIdAndDelete(id);
    }

    addInCatalog(energyProvider) {
        const dbEnergyProvider = new CatalogEnergyProviderModel({
            _id: energyProvider.id,
            definition: {
                id: energyProvider.definition.id,
                name: energyProvider.definition.name,
                coordinates: energyProvider.definition.coordinates
            },
            pricePerUnit: energyProvider.pricePerUnit,
        });
        
         return dbEnergyProvider.save();
    }
}