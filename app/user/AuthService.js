angular.module("Songs.User")
  .factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      var ref = new Firebase("https://nss-nc02-ng-music.firebaseio.com/");
      return $firebaseAuth(ref);
    }
  ]);
