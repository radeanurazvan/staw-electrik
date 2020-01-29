import { 
    HomePage,
    BatteriesDefinitionsPage,
    BatteriesCatalogPage,
    AccumulatorsDefinitionsPage,
    AccumulatorsCatalogPage
} from '@pages';

export interface Route {
    page: any;
    redirectTo: any;
}

export const routes: {[s: string]: Partial<Route>} = {
    '/home': {
        page: HomePage
    },
    '/batteries/definitions': {
        page: BatteriesDefinitionsPage
    },
    '/batteries/catalog': {
        page: BatteriesCatalogPage
    },
    '/accumulators/definitions': {
        page: AccumulatorsDefinitionsPage
    },
    '/accumulators/catalog': {
        page: AccumulatorsCatalogPage
    },
    '*': {
        redirectTo: '/home'
    },
};