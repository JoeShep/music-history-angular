var app = angular.module("SongApp",
  [
    'firebase',
    'ngRoute',
    'Songs.User'
  ]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/user/partials/user-login.html',
        controller: 'UserCtrl'
      })
      .when('/register', {
        templateUrl: 'app/user/partials/user-new.html',
        controller: 'UserCtrl'
      })
      .when('/songs/list', {
        templateUrl: 'partials/song-list.html',
        controller: 'SongListCtrl'
      })
      .when('/songs/new', {
        templateUrl: 'partials/song-form.html',
        controller: 'AddSongCtrl'
      })
      // Here we set the route with the `:songId` parameter, which gets matched in the controller
      .when('/songs/:songId', {
        templateUrl: 'partials/song-detail.html',
        controller: 'SongDetailCtrl'
      })
      .otherwise({ redirectTo: '/songs/list' });

  }]);

app.controller("SongListCtrl",
  [
    "$scope",
    "$firebaseArray",
    "Auth",
    function($scope, $songsArray, Auth ) {
      var ref = new Firebase("https://nss-nc02-ng-music.firebaseio.com/songs");
      var auth = ref.getAuth();
      var user = auth.uid;

      $scope.songs_list = $songsArray(ref);
      // get initial list of songs on page load, filtered by userID. showSong is called from ng-if in song-list partial
      $scope.showSong = function(song) {
        return song.userId === user;
      };
    }
  ]
);

app.controller("AddSongCtrl",
  [
    "$scope",
    "$firebaseArray",
    "Auth",
    function($scope, $songsArray, Auth ) {
      var ref = new Firebase("https://nss-nc02-ng-music.firebaseio.com/songs");
      $scope.songs = $songsArray(ref);
      $scope.newSong = {};
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        $scope.userData = authData.uid;
      });

      $scope.addSong = function() {
        $scope.songs.$add({
          artist: $scope.newSong.artist,
          title: $scope.newSong.title,
          album: $scope.newSong.album,
          year: $scope.newSong.year,
          albumUrl: $scope.newSong.albumUrl + "?raw=1",
          userId: $scope.userData
        });
      };
    }
  ]
);

app.controller("SongDetailCtrl",
  [
    "$scope",
    "$routeParams",
    "$firebaseArray",
    function($scope, $routeParams, $songsArray ) {
      $scope.selectedSong = {};
      // $routeParams allows you to grab the value of the current route parameters. So, here we can pluck out the id of the particular song, becasue we set it in the href of the link from song-list partial
      $scope.songId = $routeParams.songId;

      var ref = new Firebase("https://nss-nc02-ng-music.firebaseio.com/songs");
      $scope.songs = $songsArray(ref);

      // Make sure you use the $loaded promise handler, which waits
      // for all songs to be loaded from the reference before you try
      // to grab the record the user wanted.
      $scope.songs.$loaded()
        .then(function() {
          // The $getRecord method on a $firebaseArray is very useful
          $scope.selectedSong = $scope.songs.$getRecord($scope.songId);
          console.log($scope.selectedSong);
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    }
  ]
);
