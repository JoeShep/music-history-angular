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
  var songList;

  var getSongData = function() {
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
  };


  function getSongs(){
    return getSongData();
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
      song_service.getSongs().then(function(data) {
        $scope.songs_list = data;
      }).catch(function() {
        $scope.error = "Songs could not be loaded";
      });
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
        $scope.songs_list = song_service.addSong({
          artist: $scope.newSong.artist,
          title: $scope.newSong.title,
          album: $scope.newSong.album
        });
        console.log("Addsong", $scope.songs_list);
      };
    }
  ]
);
