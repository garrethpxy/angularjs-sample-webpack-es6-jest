// AngularJS
import angular from "angular"
import 'angular-ui-router'

// Route Definitions
import AppRoutes from "./pages/app/app.state";
import DashboardRoutes from './pages/dashboard/dashboard.state';

// Components
import dummyComponent from "./components/dummy/dummy.component"

// Config
import IndexConfig from "./index.config";

// SCSS
import './components/scss/index.scss';

angular.module("app", [
    'ui.router',
    AppRoutes,
    dummyComponent,
    DashboardRoutes
])
.config(IndexConfig);
