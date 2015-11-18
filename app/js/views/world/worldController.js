var app = angular.module("DDBoard")
app.controller("worldController", function($scope, firebaseService, world, characters){

  console.log(world);
  $scope.world = world;
  $scope.characters = characters;
  $scope.newPlayer = {};
  $scope.selectedPlayer = {};
  $scope.playerScroll = {};
  initviewSize();
  function initviewSize(){
    var w = Math.round(window.innerWidth*.7);
    var h = Math.round(window.innerHeight*.8);
    $scope.viewDimensions = {
      viewportHeight:h,
      viewportWidth:w,
      canvasScale:1,
    }
  }

  $scope.selectPlayer = function(player){
    
    world.$save()
    
    $scope.selectedPlayer = player;
    
  }

  $scope.addPlayer = function(x,y){
    if (y){
      $scope.newPlayer.x = x;
      $scope.newPlayer.y = y;
    }else{
      $scope.newPlayer.x = 100;
      $scope.newPlayer.y = 100;
    }

    if (world.players){
      world.players.push($scope.newPlayer);
    }else
    {
      world.players = [$scope.newPlayer];
    }
    world.$save();
  }
});