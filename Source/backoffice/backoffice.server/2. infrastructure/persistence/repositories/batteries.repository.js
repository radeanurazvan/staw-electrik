const BatteryDefinitionModel = require('../models/battery-definition.model');
const CatalogBatteryModel = require('../models/catalog-battery.model');
const BatteryDefinition = require('../../../3. core/domain/battery/battery-definition');

module.exports = class BatteriesRepository {
    async getDefinition(id) {
        const dbDefinition = await BatteryDefinitionModel.findById(id);
        return new BatteryDefinition(dbDefinition._id, dbDefinition.name, dbDefinition.size);
    }

    addDefinition(definition) {
        const dbDefinition = new BatteryDefinitionModel({
            _id: definition.id,
            name: definition.name,
            size: definition.size
        });
        
         return dbDefinition.save();
    }

    deleteDefinition(id) {
        return BatteryDefinitionModel.findByIdAndDelete(id);
    }

    addInCatalog(battery) {
        const dbBattery = new CatalogBatteryModel({
            _id: battery.id,
            definition: {
                id: battery.definition.id,
                name: battery.definition.name,
                size: battery.definition.size
            },
            price: battery.price,
            stock: battery.stock
        });
        
         return dbBattery.save();
    }
};