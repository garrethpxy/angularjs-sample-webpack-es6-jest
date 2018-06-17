(function () {
    angular
        .module('app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app.legacy', {
            url: '/legacy',
            controller: "FeatureController",
            controllerAs: "vm",

            /**
             * Note: legacy HTML templates are copied to an output folder which is
             *  served via http by webpack-dev-server. Please note that:
             *
             * - To make your template retrievable, you should always prefix the templateUrl
             *   with the output folder's path (i.e. `/legacy-tpls`)
             *
             * - We flatten all the templates inside the output folder, so only take the name of the template file
             *      /src/legacy/feature/feature.html --> /legacy-tpls/feature.html
             *      /src/legacy/component/acme/acme.html --> /legacy-tpls/acme.html
             *
             * - To avoid naming collisions, please namespace your template filenames well
             *      tab-one.html --- BAD
             *      dashboard-tab-one.html --- GOOD
             */
            templateUrl: "/legacy-tpls/feature.html"
        })
    }
}());
