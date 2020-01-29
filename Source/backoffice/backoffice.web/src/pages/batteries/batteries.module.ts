import { Module } from '@framework';
import { SidebarComponent, FilterBarComponent, NotFoundComponent } from '@components';
import { BatteriesDefinitionsPage } from './definitions';

@Module({
    pages: [BatteriesDefinitionsPage],
    components: [
        SidebarComponent,
        FilterBarComponent,
        NotFoundComponent
    ]
})
export class BatteriesModule {
}