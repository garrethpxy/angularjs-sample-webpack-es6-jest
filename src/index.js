// AngularJS
import angular from "angular"
import 'angular-ui-router'

// Components
import AppRoutes from "./pages/app/app.state";
import dummyComponent from "./components/dummy/dummy.component"

// SCSS
import './components/scss/index.scss';

angular.module("app", [
    'ui.router',
    AppRoutes,
    dummyComponent
]);
