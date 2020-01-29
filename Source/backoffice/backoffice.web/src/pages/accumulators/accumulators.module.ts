import { Module } from '@framework';
import { SidebarComponent, FilterBarComponent, NotFoundComponent } from '@components';
import { AccumulatorsDefinitionsPage } from './definitions';

@Module({
    pages: [AccumulatorsDefinitionsPage],
    components: [
        SidebarComponent,
        FilterBarComponent,
        NotFoundComponent
    ]
})
export class AccumulatorsModule {
}