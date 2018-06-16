import angular from "angular"
import AppCtrl from "./app.controller";
import template from "./app.html";

export default angular.module("index.routes", [])
.config($stateProvider => {
    $stateProvider
    .state('app',{
        template,
        url:'',
        controller: AppCtrl
    })
}).name;
