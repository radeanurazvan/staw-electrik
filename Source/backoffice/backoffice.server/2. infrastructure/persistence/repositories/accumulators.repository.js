const AccumulatorDefinitionModel = require('../models/accumulator-definition.model');
const CatalogAccumulatorModel = require('../models/catalog-accumulator.model');
const AccumulatorDefinition = require('../../../3. core/domain/accumulator/accumulator-definition')
const CatalogAccumulator = require('../../../3. core/domain/accumulator/catalog-accumulator')

module.exports = class AccumulatorsRepository {
    async getDefinition(id) {
        const dbDefinition = await AccumulatorDefinitionModel.findById(id);
        if(!dbDefinition) {
            return null;
        }
        return new AccumulatorDefinition(dbDefinition._id, dbDefinition.name, dbDefinition.category, dbDefinition.size);
    }

    addDefinition(definition) {
        const dbDefinition = new AccumulatorDefinitionModel({
            _id: definition.id,
            name: definition.name,
            category: definition.category,
            size: definition.size
        });
        
        return dbDefinition.save();
    }

    deleteDefinition(id) {
        return AccumulatorDefinitionModel.findByIdAndDelete(id);
    }

    addInCatalog(accumulator) {
        const dbAccumulator = new CatalogAccumulatorModel({
            _id: accumulator.id,
            definition: {
                id: accumulator.definition.id,
                name: accumulator.definition.name,
                category: accumulator.definition.category,
                size: accumulator.definition.size
            },
            price: accumulator.price,
            stock: accumulator.stock
        });
        
        return dbAccumulator.save();
    }

    async getCatalogAccumulator(id) {
        const dbAccumulator = await CatalogAccumulatorModel.findById(id);
        if(!dbAccumulator) {
            return null;
        }

        return new CatalogAccumulator(dbAccumulator.definition, dbAccumulator.stock, dbAccumulator.price, dbAccumulator._id);
    }
}