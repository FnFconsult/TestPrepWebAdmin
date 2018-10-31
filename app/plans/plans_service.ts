import {IModelService, IRequestResult} from "../schemas/structure"

interface IPlanService extends IModelService<any> {
    query(params: any): angular.IPromise<IRequestResult<Array<any>>>
}

class PlanService implements IPlanService {

    static $inject = ["$q", "$http", "BASEAPI"];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string) { }

    get() {
        let defer = this.$q.defer<IRequestResult<any>>()
        this.$http.get(`${this.baseUrl}/plans`).then((response: IRequestResult<Array<any>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    find(id: number) {
        let defer = this.$q.defer<IRequestResult<any>>()
        this.$http.get(`${this.baseUrl}/plans?id=${id}`).then((response: IRequestResult<any>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    query(params: any) {
        let defer = this.$q.defer<IRequestResult<any>>()
        this.$http.post(`${this.baseUrl}/plans/query`, params).then((response: IRequestResult<Array<any>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    save(Question: any) {
        let defer = this.$q.defer<IRequestResult<any>>()
        if (Question.id) {
            this.$http.put(`${this.baseUrl}/plans`, Question).then((response: IRequestResult<any>) => {
                defer.resolve(response)
            })
        } else {
            this.$http.post(`${this.baseUrl}/plans`, Question).then((response: IRequestResult<any>) => {
                defer.resolve(response)
            })
        }
        return defer.promise
    }

    delete(id: number) {
        let defer = this.$q.defer<IRequestResult<any>>()
        this.$http.delete(`${this.baseUrl}/plans?id=${id}`).then((response: IRequestResult<any>) => {
            defer.resolve(response)
        })
        return defer.promise
    }
}

export {PlanService, IPlanService}