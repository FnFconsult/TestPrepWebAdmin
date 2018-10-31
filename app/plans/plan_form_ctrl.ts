import {IPlanService} from  "./plans_service"
import {ILookUpService} from '../settings/lookup_service';
import { MessageBox } from '../helpers/message_box';
import { Routes } from '../helpers/config_keys';

class PlanFormCtrl {
    title: string = "Add New Plan";
    newPlan: any;
    saving: boolean;
    loading: boolean;

    static $inject = ["$scope", "$state", "$stateParams", "PlanService"];

    constructor(private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private plansService: IPlanService) {
        this.start()
    }

    save() {
        this.saving = true
        this.plansService.save(this.newPlan).then((res) => {
            this.saving = false
            if (res.success) this.$state.go(Routes.Plans)
        })
    }

    private fetchPlan(id: number) {
        let self: any = this;
        this.loading = true
        this.plansService.find(id).then((res) => {
            this.loading = false
            if (res.success) {
                this.newPlan = angular.copy(res.data)
            }
        })
    }

    private start() {
        let id = this.$stateParams['id']
        if (id) {
            this.title = "Update Plan Information"
            this.fetchPlan(id)
        } else {
            this.title = "Add New Plan"
            this.newPlan = <any>{}
        }
    }
}

export {PlanFormCtrl}