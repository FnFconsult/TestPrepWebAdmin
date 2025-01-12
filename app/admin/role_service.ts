import {IRequestResult, IModelService } from '../schemas/structure';
import {IRole} from '../schemas/entity_set'
import {AppServices, AngularServices} from '../helpers/config_keys'

interface IRoleService extends IModelService<IRole> {
    privileges(): angular.IPromise<IRequestResult<Array<string>>>
}

class RoleService implements IRoleService {
    static $inject = [AngularServices.Q, AngularServices.Http, AppServices.BaseApi];

    constructor(private $q: angular.IQService,
        private $http: angular.IHttpService,
        private baseUrl: string) { }

    get() {
        let defer = this.$q.defer<IRequestResult<IRole[]>>()
        this.$http.get(`${this.baseUrl}/profile`).then((response: IRequestResult<Array<IRole>>) => {
            response.data = response.data.map((role) => {
                if (role.privileges) {
                    role.privileges = role.privileges.toString().split(',')
                }
                return role
            })
            defer.resolve(response)
        })
        return defer.promise
    }

    privileges() {
        let defer = this.$q.defer<IRequestResult<string[]>>()
        this.$http.get(`${this.baseUrl}/admin/getroles`).then((response: IRequestResult<Array<string>>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    find(id: number) {
        let defer = this.$q.defer<IRequestResult<IRole>>()
        this.$http.get(`${this.baseUrl}/profile?id=${id}`).then((response: IRequestResult<IRole>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

    query(params: any) { return this.get() }

    save(profile: IRole) {
        let defer = this.$q.defer<IRequestResult<IRole>>()
        let theProfile = <any>profile
        theProfile.privileges = profile.privileges.toString()

        if (profile.id) {
            this.$http.put(`${this.baseUrl}/admin/updateprofile`, theProfile).then((response: IRequestResult<IRole>) => {
                if (response.data.privileges) {
                    response.data.privileges = response.data.privileges.toString().split(',')
                }
                defer.resolve(response)
            })
        } else {
            this.$http.post(`${this.baseUrl}/profile`, theProfile).then((response: IRequestResult<IRole>) => {
                if (response.data.privileges) {
                    response.data.privileges = response.data.privileges.toString().split(',')
                }
                defer.resolve(response)
            })
        }
        return defer.promise
    }

    delete(id: number) {
        let defer = this.$q.defer<IRequestResult<IRole>>()
        this.$http.delete(`${this.baseUrl}/profile?id=${id}`).then((response: IRequestResult<IRole>) => {
            defer.resolve(response)
        })
        return defer.promise
    }

}

export {IRoleService, RoleService}