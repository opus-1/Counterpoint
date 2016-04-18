var app = angular.module('counterpoint', [
  'angular-meteor',
  'ui.router',
  'ngMaterial'
]);

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $stateProvider
    .state('main', {
      url: '',
      templateUrl: 'client/templates/main.html',
      controller: 'MainCtrl',
      abstract: true
    })
    .state('main.home', {
      url: '/home',
      templateUrl: 'client/templates/home.html',
      controller: 'HomeCtrl'
    });

  $urlRouterProvider.otherwise("/home");

  $mdIconProvider.icon('user', 'images/user.svg', 64);

 $mdThemingProvider.theme('dark').dark();

 $mdThemingProvider.theme('default')
   .primaryPalette('pink', {
     'default': '400',
     'hue-1': '100',
     'hue-2': '600',
     'hue-3': 'A100'
   })
   .accentPalette('purple', {
     'default': '200'
   });

 $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
 $mdThemingProvider.setDefaultTheme('default');
 $mdThemingProvider.alwaysWatchTheme(true);
});
