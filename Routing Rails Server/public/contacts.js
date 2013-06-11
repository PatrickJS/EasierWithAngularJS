angular
  .module('contacts', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // config your routes
    $locationProvider.html5Mode(true);
    $routeProvider
      // Edit contact
      .when('/contact/:index', {
        templateUrl: 'edit.html',
        controller: 'EditCtrl'
      })
      .when('/', {
        // List all contacts
        templateUrl: '/list.html'
      });
  }])
  .controller('ContactsCtrl', ['$scope', function($scope) {
    // Contacts is the parent controller, so
    // $scope.contacts is avaible in all children
    $scope.contacts = [
      {
        name: 'Tom',
        number: '23489234'
      },
      {
        name: 'Jeffrey',
        number: '29384723'
      },
      {
        name: 'Joe',
        number: '987657890'
      }
    ];
  }])
  .controller('EditCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.contact = $scope.contacts[$routeParams.index];
    $scope.index = $routeParams.index;
  }]);
