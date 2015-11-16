angular.module('Songs.User')
  .controller('UserCtrl', ['$scope', 'Auth', function($scope, Auth) {

      $scope.createUser = function() {
        $scope.message = null;
        $scope.error = null;

        Auth.$createUser({
          email: $scope.email,
          password: $scope.password
        }).then(function(userData) {
          $scope.message = "User created with uid: " + userData.uid;
        }).catch(function(error) {
          $scope.error = error;
        });
      };

      $scope.removeUser = function() {
        $scope.message = null;
        $scope.error = null;

        Auth.$removeUser({
          email: $scope.email,
          password: $scope.password
        }).then(function() {
          $scope.message = "User removed";
        }).catch(function(error) {
          $scope.error = error;
        });
      };

      $scope.loginUser = function() {
        Auth.$authWithPassword({
          email: $scope.email,
          password: $scope.password,
        }).then(function(authData) {
          console.log("Logged in as:", authData);
          $scope.authData = authData;
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      };
    }
  ]);
