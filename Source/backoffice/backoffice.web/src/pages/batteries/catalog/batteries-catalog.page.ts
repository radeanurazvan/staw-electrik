import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit } from '@framework';

import * as template from './batteries-catalog.page.html'

@TrexPage({
    template: template
})
export class BatteriesCatalogPage extends Page implements OnInit {
    public constructor(@inject(DomMaster) master: DomMaster) {
        super(master);
    }

    public onInit(): void {
    }

}