import {IPlanService} from  "./plans_service"
import { Routes } from '../helpers/config_keys';
import { Toast, MessageBox } from '../helpers/message_box';
import {ILookUpService} from '../settings/lookup_service';
let _ = require("underscore")

class PlansCtrl {
    isLoading: boolean;
    lastFilter: any;
    records: Array<any>;

    //Pager Config
    totalRecords = 0;
    currentPage = 0;
    recordSize = 30;
    totalPages = 1;

    static $inject = ["PlanService", "$state"];

    constructor(private planService: IPlanService,
        private $state: angular.ui.IStateService) {
            this.fetch(<any>{ pager: { page: 1, size: 30 }});
    }

    pageChanged(page: number) {
        this.currentPage = page;
        this.lastFilter.pager.page = page;
        this.isLoading = true
        this.planService.query(this.lastFilter).then((res) => {
            this.isLoading = false
            if (res.success) {
                this.currentPage = this.lastFilter.pager.page;
                this.records = res.data
                this.totalRecords = res.total;
                this.totalPages = Math.ceil(res.total / this.recordSize);
            }
        })
    };

    open(id: number) {
        this.$state.go(Routes.PlanView, { id })
    }

    fetch(filter: any) {
        this.isLoading = true
        filter.pager = filter.pager || { page: 1, size: 30 }
        this.lastFilter = angular.copy(filter)
        this.planService.query(filter).then((res) => {
            this.isLoading = false
            if (res.success) {
                this.currentPage = filter.pager.page;
                this.records = res.data
                this.totalRecords = res.total;
                this.totalPages = Math.ceil(res.total / this.recordSize);
            }
        })
    }
}

export {PlansCtrl}