import {IQuestionService} from  "./questions_service"
import {ILookUpService} from '../settings/lookup_service';
import { MessageBox } from '../helpers/message_box';
import { Routes } from '../helpers/config_keys';

class QuestionFormCtrl {
    title: string = "Add New Question";
    newQuestion: any;
    saving: boolean;
    loading: boolean;
    kinds: Array<any>;
    types: Array<any>;
    categories: Array<any>;
    lookUps = ["kinds"];

    static $inject = ["$scope", "$state", "$stateParams", "QuestionService", "LookUpService"];

    constructor(private $scope: angular.IScope,
        private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private questionsService: IQuestionService,
        private lookupService: ILookUpService) {
        this.start()
    }

    save() {
        this.saving = true
        this.questionsService.save(this.newQuestion).then((res) => {
            this.saving = false
            if (res.success) this.$state.go(Routes.Questions)
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

    private fetchQuestion(id: number) {
        let self: any = this;
        this.loading = true
        this.questionsService.find(id).then((res) => {
            this.loading = false
            if (res.success) {
                this.newQuestion = angular.copy(res.data)
            }
        })
    }

    private loadLookUps() {
        let self: any = this;
        this.lookUps.forEach((lookup) => {
            this.lookupService.fetch(lookup).then((res) => {
                if (res.success) { self[lookup] = res.data }
            })
        })
    }

    private start() {
        this.loadLookUps()
        let id = this.$stateParams['id']
        if (id) {
            this.title = "Update Question Information"
            this.fetchQuestion(id)
        } else {
            this.title = "Add New Question"
            this.newQuestion = <any>{}
        }
    }
}

export {QuestionFormCtrl}