import angular from "angular"
import ctrl from "./dashboard.controller";
import dashboardMainTpl from "./dashboard.html";
import dashboardTabOneTpl from "./dashboard-tab-one/dashboard-tab-one.html";
import dashboardTabTwoTpl from "./dashboard-tab-two/dashboard-tab-two.html";

export default angular.module("app.dashboard.routes", [])
.config($stateProvider => {
    $stateProvider
    .state('app.dashboard',{
        template: dashboardMainTpl,
        url:'/dashboard',
        controller: ctrl
    })
    .state('app.dashboard.one',{
        template: dashboardTabOneTpl,
        url:'/one'
    })
    .state('app.dashboard.two',{
        template: dashboardTabTwoTpl,
        url:'/two'
    })
}).name;
