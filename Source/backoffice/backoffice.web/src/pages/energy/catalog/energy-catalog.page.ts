import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit } from '@framework';

import * as template from './energy-catalog.page.html'

@TrexPage({
    template: template
})
export class EnergyCatalogPage extends Page implements OnInit {
    public constructor(@inject(DomMaster) master: DomMaster) {
        super(master);
    }

    public onInit(): void {
    }

}