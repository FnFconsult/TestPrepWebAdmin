import {Routes} from '../helpers/config_keys';
import {IQuestionService} from  "./questions_service"
import { MessageBox } from '../helpers/message_box';

class QuestionDetailCtrl {
    question: any;
    loading: boolean;
    id: any;

    static $inject = ["$state", "$stateParams", "QuestionService"];
    constructor(private $state: angular.ui.IStateService,
        private $stateParams: angular.ui.IStateParamsService,
        private questionsService: IQuestionService) {
        this.start()
    }

    private fetchQuestion(id: number) {
        this.loading = true
        this.questionsService.find(id).then((res) => {
            this.loading = false
            if (res.success) { this.question = angular.copy(res.data) }
        })
    }

    openForm(id: number) {
        this.$state.go(Routes.QuestionForm, {id})
    }

    delete(id: number) {
        MessageBox.confirm(`Delete Question`, `Are you sure you want to delete this question from the system?`).then((yes) => {
            if (yes) {
                this.questionsService.delete(id).then((res) => {
                    //MessageBox.alert(res.message)
                    if (res.success) {                        
                        this.$state.go(Routes.Questions)
                        
                    }
                })
            }
        })
    }

    private start() {
        if (this.$stateParams['id']) {
            this.id = +this.$stateParams['id'];
            this.fetchQuestion(this.id)
        }
        else { this.$state.go(Routes.Questions) }
    }
}

export {QuestionDetailCtrl}