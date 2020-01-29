import * as template from './sidebar.component.html';
import { TrexComponent, Component, HasInputs } from "@framework";
import { Subject } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import { inject } from 'inversify';
import { User } from 'src/shared/models/user.model';


@TrexComponent({
    selector: 'sidebar',
    template: template
})
export class SidebarComponent extends Component implements HasInputs{
    private channel: Subject<string>;
    public user: User;

    private menu = {
        batteries: true,
        accumulators: false,
        energy: false,
        customers: false,
        orders: false
    };

    public constructor(@inject(UserService) userService: UserService) {
        super();
        this.user = userService.getUser();
    }

    public gatherInputs(inputs: any): void {
        this.channel = inputs.channel;
    }

    public selected(event: any, self: SidebarComponent) {
        for(var key in self.menu) {
            self.menu[key] = false;
        }

        const clickedKey = event.target.getAttribute('data-value');
        self.menu[clickedKey] = true;
        self.channel.next(clickedKey);
    }

    public isSelected(key) {
        return this.menu[key];
    }
}
