import {IQuestionService} from  "./questions_service"
import { Routes } from '../helpers/config_keys';
import { Toast, MessageBox } from '../helpers/message_box';
import {ILookUpService} from '../settings/lookup_service';
let _ = require("underscore")

class QuestionsCtrl {
    isLoading: boolean;
    lastFilter: any;
    records: Array<any>;
    kinds: Array<any>;
    types: Array<any>;
    categories: Array<any>;
    lookUps = ["kinds"];

    //Pager Config
    totalRecords = 0;
    currentPage = 1;
    recordSize = 30;
    totalPages = 1;

    static $inject = ["QuestionService", "$state", "LookUpService", "BASEAPI"];

    constructor(private questionsService: IQuestionService,
        private $state: angular.ui.IStateService,
        private lookupService: ILookUpService,
		private baseUrl: string) {
            this.fetch(<any>{ pager: { page: 1, size: 30 }});
            this.loadLookUps();
    }

    pageChanged(page: number) {
        this.currentPage = page;
        this.lastFilter.pager.page = page;
        this.isLoading = true
        this.questionsService.query(this.lastFilter).then((res) => {
            this.isLoading = false
            if (res.success) {
                this.records = res.data
                this.totalRecords = res.total;
                this.totalPages = Math.ceil(res.total / this.recordSize);
            }
        })
    };

    open(id: number) {
        this.$state.go(Routes.QuestionView, { id })
    }

    private loadLookUps() {
        let self: any = this;
        this.lookUps.forEach((lookup) => {
            this.lookupService.fetch(lookup).then((res) => {
                if (res.success) { self[lookup] = res.data }
            })
        })
    }

    queryTypes(Id: number) {
        var obj = {kindId:Id}
        this.lookupService.queryTypes(obj).then((res) => {
            if (res.success) { this.types = res.data }
        })
    }
    
    queryCategories(Id: number) {
        var obj = {typeId:Id}
        this.lookupService.queryCategories(obj).then((res) => {
            if (res.success) { this.categories = res.data }
        })
	}

    fetch(filter: any) {
        this.isLoading = true
        filter.pager = filter.pager || { page: 1, size: 30 }
        this.lastFilter = angular.copy(filter)
        this.questionsService.query(filter).then((res) => {
            this.isLoading = false
            if (res.success) {
                this.records = res.data
                this.totalRecords = res.total;
                this.totalPages = Math.ceil(res.total / this.recordSize);
            }
        })
    }
}

export {QuestionsCtrl}