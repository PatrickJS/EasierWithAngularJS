angular
  .module('contacts', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // config your routes
    // $locationProvider.html5Mode(true);
    $routeProvider
      // Edit contact
      .when('/contact/:index', { // opens inside /contact/edit.html
        templateUrl: 'edit.html', // added ../
        controller: 'EditCtrl'
      })
      .when('/add', {
        // Add contact
        templateUrl: 'edit.html',
        controller: 'AddCtrl'
      })
      .when('/delete/:index', {
        templateUrl: 'edit.html',
        controller: 'DeleteCtrl'
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
    // Load in a contact form the route (/contact/:index)
    $scope.contact = $scope.contacts[$routeParams.index];
    $scope.index = $routeParams.index;
  }])
  .controller('AddCtrl', ['$scope', function($scope) {
    // inside parent ContactsCtrl scope
    var length = $scope.contacts.push({ // returns length
      name: 'New Contact',
      number: ''
    });
    $scope.contact = $scope.contacts[length -1];
    $scope.index = length -1;
  }])
  .controller('DeleteCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.contacts.splice($routeParams.index, 1);
    $location.path('/').replace();
    // replace in user history so when they press the
    // back button they wont delete another contact
  }]);


