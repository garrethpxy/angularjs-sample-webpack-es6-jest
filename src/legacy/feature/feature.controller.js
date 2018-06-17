(function () {
    angular
        .module('app')
        .controller('FeatureController', FeatureController);

    FeatureController.$inject = ['$scope', '$stateParams', '$timeout', '$window'];

    function FeatureController($scope, $stateParams, $timeout, $window) {
        const vm = this;
        console.log('FeatureController loaded!');
    }
}());
