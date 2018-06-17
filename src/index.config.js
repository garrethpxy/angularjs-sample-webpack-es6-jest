export default ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/dashboard');
    console.log('config loaded')
}
