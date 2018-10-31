import {PartialViews, Routes} from '../helpers/config_keys';
import {IQuestionService} from  "./questions_service"
import {ILookUpService} from '../settings/lookup_service';

//let XLSX = require('xlsx');

class QuestionsUploadCtrl {
    questions: Array<any>
    isLoading: boolean;
    kinds: Array<any>;
    types: Array<any>;
    categories: Array<any>;
    lookUps = ["kinds"];
    static $inject = ["$state", "QuestionService", "$scope", "XLSXReaderService","LookUpService"];
    constructor(private $state: angular.ui.IStateService,
        private questionService: IQuestionService,
        private $scope: any,
        private XLSXReaderService: any,        
        private lookupService: ILookUpService) {
        this.start()
    }

    private readFileData(files: any) {
        this.questions= [];
        let excelFile = files[0];
        this.XLSXReaderService.readFile(excelFile, true, true).then((xlsxData: any) => {
            console.log(xlsxData)
            let data: Array<any> = xlsxData.sheets["Main"];
            if(data.length > 0){
                this.questions = data.map((rec: any) => { return this.refactorRecord(rec) })
            }            
        });
    };
    
    private refactorRecord(data: any): any {
        console.log(data)
        let self: any = this
        let que = <any>{   
            questionText: data.QUESTION,
            answer: data.ANSWER,
            option1: data.OPTION_1,
            option2: data.OPTION_2,
            option3: data.OPTION_3,
            option4: data.OPTION_4,
            option5: data.OPTION_5,
            reason: data.REASON,
            categoryName: data.CATEGORY
        }
        return que;
    }
    
       
    save(){
        this.isLoading = true;
        this.questionService.saveUpload(this.questions).then((res) => {
            this.isLoading = false
            if (res.success) { 
                this.questions = [] 
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
        //this.loadLookUps()
        this.$scope.fileChanged = (ele: any) => {
            this.readFileData(ele)
        }
    }
}

export {QuestionsUploadCtrl}