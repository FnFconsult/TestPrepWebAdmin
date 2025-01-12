import { IUser } from "../schemas/entity_set";
import { IRequestResult } from "../schemas/structure";
import { StoreKeys, Routes, AngularServices, AppServices } from "../helpers/config_keys"
let _ = require("underscore")

interface ILoginParams {
	username: string
	password: string
	rememberMe: boolean
}

interface IChangePasswordParams {
	currentPassword: string
	newPssword: string
	confirmPassword: string
}

interface IAuthService {
	isLogin(): boolean
	login(params: ILoginParams): angular.IPromise<IRequestResult<IUser>>
	changePassword(params: IChangePasswordParams): angular.IPromise<IRequestResult<any>>
	checkLogin(): void
	logOut(): angular.IPromise<IRequestResult<any>>
	setUser(user: IUser): void
	isAuthorize(privilege: string): boolean
	currentUser: IUser
}

class AuthService implements IAuthService {
	currentUser: IUser;

	static $inject = [AngularServices.Q, AngularServices.Http, AngularServices.State, AppServices.BaseApi];

	constructor(private $q: angular.IQService,
		private $http: angular.IHttpService,
		private $state: angular.ui.IStateService,
		private baseUrl: string) {
		if (localStorage.getItem(StoreKeys.CurrentUser)) {
			this.currentUser = JSON.parse(localStorage.getItem(StoreKeys.CurrentUser))
		}
	}

	login(loginDetails: ILoginParams) {
		let defer = this.$q.defer<IRequestResult<IUser>>()

		 this.$http.post(`${this.baseUrl}/admin/login`,
		 	loginDetails).then((response: IRequestResult<IUser>) => {
		 		defer.resolve(response)
		 	})
		return defer.promise
	}

	changePassword(passwordDetails: IChangePasswordParams) {
		let defer = this.$q.defer<any>()
		this.$http.post(`${this.baseUrl}/admin/changepassword`,
			passwordDetails).then((response) => {
				defer.resolve(response)
			})
		return defer.promise
	}

	logOut() {
		let defer = this.$q.defer<IRequestResult<any>>()		
		 this.$http.get(`${this.baseUrl}/admin/logout`).then((response: IRequestResult<any>) => {
		 	if (response.success) {
		 		localStorage.removeItem(StoreKeys.CurrentUser)
		 		this.currentUser = null
			}
		 	defer.resolve(response)
		 });
		return defer.promise
	}

	checkLogin() {
		if (!this.isLogin()) { this.$state.go(Routes.Login) }
	}

	isLogin() { return !!this.currentUser }

	setUser(user: IUser) {
		this.currentUser = user
		localStorage.setItem(StoreKeys.CurrentUser, JSON.stringify(user))
	}

	isAuthorize(privilege: string) {
		let privs = privilege.split("|")
		let res = _.intersection(this.currentUser.role.privileges, privs)
		return (res.length > 0)
	}


}

export { AuthService, IAuthService, ILoginParams, IChangePasswordParams }