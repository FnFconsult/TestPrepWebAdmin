import {Routes} from '../helpers/config_keys';
import {IPlanService} from  "./plans_service"
import { MessageBox } from '../helpers/message_box';

class PlanDetailsCtrl {
    plan: any;
    loading: boolean;
    id: any;

    static $inject = ["$state", "$stateParams", "PlanService"];
    constructor(private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private plansService: IPlanService) {
        this.start()
    }

    private fetchPlan(id: number) {
        this.loading = true
        this.plansService.find(id).then((res) => {
            this.loading = false
            if (res.success) { this.plan = angular.copy(res.data) }
        })
    }

    openForm(id: number) {
        this.$state.go(Routes.PlanForm, {id})
    }

    delete(id: number) {
        MessageBox.confirm(`Delete Plan`, `Are you sure you want to delete this plan from the system?`).then((yes) => {
            if (yes) {
                this.plansService.delete(id).then((res) => {
                    if (res.success) {                        
                        this.$state.go(Routes.Plans)
                        
                    }
                })
            }
        })
    }

    private start() {
        if (this.$stateParams['id']) {
            this.id = +this.$stateParams['id'];
            this.fetchPlan(this.id)
        }
        else { this.$state.go(Routes.Plans) }
    }
}

export {PlanDetailsCtrl}