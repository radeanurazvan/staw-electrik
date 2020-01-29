import { Router } from "@framework";
import { routes } from "@constants";
import { 
    LoginModule,
    HomeModule,
    BatteriesModule,
    AccumulatorsModule
} from "@pages";

export class AppModule {
    private modules: any = [
        LoginModule,
        HomeModule,
        BatteriesModule,
        AccumulatorsModule
    ];    

    public static run(): void {
        Router.init(routes);
    }
}