var myApp = angular.module('myApp', ['btford.socket-io',
  'myApp.MyCtrl']).
  factory('mySocket', function (socketFactory) {
  return socketFactory();
}).
myApp.controller('MyCtrl', function (mySocket) {
  // ...
  socket.addListener()
});
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
}]);
