var app = angular.module("SongApp", ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/songs/list', {
        templateUrl: 'partials/song-list.html',
        controller: 'SongListCtrl'
      })
      .when('/songs/new', {
        templateUrl: 'partials/song-form.html',
        controller: 'AddSongCtrl'
      });
  }]);

app.factory('song_service', function($http, $q) {
  var songList = [];

  function init() {
    return $q(function(resolve, reject) {
    $http
      .get('./data/songs.json')
      .success(
        function(objectFromJSONFile) {
          songList = objectFromJSONFile.songs;
          resolve(songList)
        },function(error) {
          reject(error);
        }
      );
    });
  }

  init();

  function getSongs(){
    return songList;
  }

  function getSingleSong(id) {
    return songList.filter(function(song){
      return song.id === id;
    })[0];
  }

  function addSong(songObj) {
    songList.push(songObj);
    return songList;
  }

  return {
    getSongs: getSongs,
    getSingleSong: getSingleSong,
    addSong: addSong
  };
}); //end factory

app.controller("SongListCtrl",
  [
    "$scope",
    "song_service",
    function($scope, song_service ) {
      // get initial list of songs on page load
      $scope.songs_list = song_service.getSongs();
    }
  ]
);

app.controller("AddSongCtrl",
  [
    "$scope",
    "song_service",
    function($scope, song_service ) {
      $scope.newSong = { title: "", album: "", year: "", artist: "" };

      $scope.addSong = function() {
        song_service.addSong({
          artist: $scope.newSong.artist,
          title: $scope.newSong.title,
          album: $scope.newSong.album,
          year: $scope.newSong.year
        });
      };
    }
  ]
);
