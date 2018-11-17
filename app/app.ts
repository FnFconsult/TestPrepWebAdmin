/// <reference path="../typings/tsd.d.ts" />

import { PartialViews, Routes, AppServices, AppControllers } from './helpers/config_keys';
import { AppRoutes } from "./app_routes"
import { RequestInterceptor } from './services/request_interceptor';
import { MainCtrl } from "./main/main_ctrl"
import { DashboardCtrl } from "./main/dashboard_ctrl"
import { LoginCtrl } from "./authentication/login_ctrl"
import { UserProfileCtrl } from "./user_profile/user_profile_ctrl"
import { AuthService, IAuthService } from "./authentication/auth_service"
import { Authorize, UnAuthorize } from './authentication/authorize'
import { SettingsCtrl } from './settings/settings_ctrl';
import { SettingCtrl } from './settings/settings_ctrl';
import { UsersCtrl } from './admin/users_ctrl';
import { RolesCtrl } from './admin/roles_ctrl';
import { UserService } from './admin/user_service';
import { RoleService } from './admin/role_service';
import { QuestionDetailCtrl } from './questions/question_detail_ctrl';
import { QuestionFormCtrl } from './questions/question_form_ctrl';
import { QuestionsCtrl } from './questions/questions_ctrl';
import { QuestionsUploadCtrl } from './questions/questions_upload_ctrl';
import { PlansCtrl } from './plans/plans_ctrl';
import { PlanFormCtrl } from './plans/plan_form_ctrl';
import { PlanDetailsCtrl } from './plans/plan_detail_ctrl';
import { ReportViewerCtrl } from './reports/report_viewer_ctrl';
import { ReportsCtrl } from './reports/reports_ctrl';
import { ReportsConfig } from './reports/report_config';
import { ReportService } from "./reports/report_service";
import { LookUpService } from './settings/lookup_service';
import { QuestionService } from "./questions/questions_service";
import { PlanService } from "./plans/plans_service";
import { AuthRun, TemplatesConfig, XeditableConfig, DatePickerConfig, ChartConfig, HotKeysConfig, AutoValidateConfig } from "./app_config";

let app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ui.select2', 'ngAnimate', 'ngSanitize', 'alcoder.components', 'alcoder.services', 'xeditable', 'chart.js', 'cfp.hotkeys', 'jcs-autoValidate'])
	.directive(Authorize.Name, Authorize.Factory())
	.directive(UnAuthorize.Name, UnAuthorize.Factory())
	.controller(AppControllers.LoginCtrl, LoginCtrl)
	.controller(AppControllers.UserProfileCtrl, UserProfileCtrl)
	.controller(AppControllers.MainCtrl, MainCtrl)
	.controller(AppControllers.DashboardCtrl, DashboardCtrl)
	.controller(AppControllers.SettingsCtrl, SettingsCtrl)
	.controller(AppControllers.SettingCtrl, SettingCtrl)
	.controller(AppControllers.UsersCtrl, UsersCtrl)
	.controller(AppControllers.RolesCtrl, RolesCtrl)
	.controller(AppControllers.ReportsCtrl, ReportsCtrl)
	.controller(AppControllers.ReportViewerCtrl, ReportViewerCtrl)
	.controller(AppControllers.QuestionsCtrl, QuestionsCtrl)
	.controller(AppControllers.QuestionFormCtrl, QuestionFormCtrl)
	.controller(AppControllers.QuestionDetailCtrl, QuestionDetailCtrl)
	.controller(AppControllers.QuestionsUploadCtrl, QuestionsUploadCtrl)
	.controller(AppControllers.PlansCtrl, PlansCtrl)
	.controller(AppControllers.PlanFormCtrl, PlanFormCtrl)
	.controller(AppControllers.PlanDetailsCtrl, PlanDetailsCtrl)
	.service(AppServices.RequestInterceptor, RequestInterceptor)
	.service(AppServices.AuthService, AuthService)
	.service(AppServices.UserService, UserService)
	.service(AppServices.RoleService, RoleService)
	.service(AppServices.LookUpService, LookUpService)
	.service(AppServices.ReportsConfig, ReportsConfig)
	.service(AppServices.ReportService, ReportService)
	.service(AppServices.QuestionService, QuestionService)
	.service(AppServices.PlanService, PlanService)


app.config(AppRoutes);

app.value("BASEAPI", "api");
app.run(AuthRun);
app.run(TemplatesConfig);
app.run(XeditableConfig);
app.run(AutoValidateConfig);

app.config(DatePickerConfig);
app.config(ChartConfig);
app.config(HotKeysConfig)


//Hide Preloader
$("#preloader-body").hide();

export { app }