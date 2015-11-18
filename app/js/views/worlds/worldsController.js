var app = angular.module("DDBoard")
app.controller("worldsController", function($scope, firebaseService, worlds, maps, $location){


    $scope.worlds = worlds
    console.log(worlds);
    $scope.maps = maps;
    
    initNewWorld();

    $scope.addFavorite = function(e,world){

    }

    function initNewWorld(){
      $scope.newWorld ={
        favorites:0
      };
    }

    $scope.gotoWorld = function(world){
      $location.path("/world/"+world.$id)
    }
    $scope.addNewWorld = function(){
      console.log("Hmmm");
      console.log($scope.newWorld);
      var newWorldRef = worlds.$add($scope.newWorld).then(function(ref){
        firebaseService.addNewWorld($scope.newWorld, ref);
        worlds.$save();
        
      });
      
    }



})