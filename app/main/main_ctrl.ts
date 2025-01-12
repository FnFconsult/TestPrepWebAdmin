import { IUser } from "../schemas/entity_set"
import { IAuthService } from "../authentication/auth_service"
import { MessageBox } from "../helpers/message_box"
import { Routes, AppServices, AngularServices } from '../helpers/config_keys';

interface IMenuItem {
    label: string;
    route: string;
    icon: string;
    header: boolean;
    privilege: string;
    children?: IMenuItem[];
}

class MainCtrl {
    version: string;
    username: string;
    menuItems: Array<IMenuItem>

    static $inject = [AngularServices.Q, AngularServices.RootScope, AngularServices.State, AppServices.AuthService];

    constructor(private $q: angular.IQService,
        private $rootScope: any,
        private $state: angular.ui.IStateService,
        private authenticate: IAuthService) {
        this.setVersion()
        this.setUserName()
        this.setUserMenus()
        this.$rootScope.$state = this.$state;
    }

    isLoggedIn() {
        this.setUserName()
        return this.authenticate.isLogin();
    }

    signOut() {
        this.authenticate.logOut().then((res) => {
            if (res.success) {
                this.$state.go(Routes.Login)
            }
        })
    }

    setVersion() {
        this.version = "1.2"
    }

    setUserName() {
        let user = this.authenticate.currentUser
        this.username = user ? user.name : ""
    }

    isAuthorize(privilege: string) {
        return this.authenticate.isAuthorize(privilege)
    }

    setUserMenus() {
        let menus: Array<IMenuItem> = [
            { label: "Dashboard", route: Routes.Dashboard, icon: "fa fa-dashboard",privilege: "Dashboard", header: false },
            { label: "Test Results", route: Routes.Results, icon: "fa fa-bar-chart-o", privilege: "Questions", header: false },
            { label: "Questions", route: Routes.Questions, icon: "fa fa-question-circle", privilege: "Questions", header: false },
            { label: "Payments", route: Routes.Payments, icon: "fa fa-credit-card", privilege: "Payments", header: false },
            { label: "Subscriptions", route: Routes.Subscriptions, icon: "fa fa-cubes", privilege: "Subscriptions", header: false },
            { label: "Plans", route: Routes.Plans, icon: "fa fa-map", privilege: "Plans", header: false },
            { label: "Reports", route: Routes.Reports, icon: "fa fa-flag", privilege: "Reports", header: false },
            { label: "Settings", route: Routes.Settings, icon: "fa fa-cogs", privilege: "Settings", header: false },
            { label: "Manage Users", route: Routes.Users, icon: "fa fa-users", privilege: "Administration", header: false },
        ]

        this.menuItems = menus;
    }
}

export { MainCtrl }