angular
  .module('contacts', [])
  .config(function($routeProvider) {
    // config your routes
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
  })
  .controller('ContactsCtrl', ['$scope', function($s) {
    // Contacts is the parent controller, so
    // $scope.contacts is avaible in all children
    $s.contacts = [
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
  .controller('EditCtrl', ['$scope', '$routeParams', function($s, $rP) {
    $s.contact = $s.contacts[$rP.index];
    $s.index = $rP.index;
  }]);
