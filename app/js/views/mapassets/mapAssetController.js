var app = angular.module("DDBoard")
app.controller("mapAssetController", function($scope, firebaseService, assets){
  
  
  setupNewMap();
  assets.$watch(getMaps);
  getMaps();
  $scope.getImageById = function(imgId){
    return firebaseService.getImageById(imgId);
  }

  $scope.setImage = function(event){
    var regex = /src="([^\s]*)"/;
    var match = regex.exec(event.dataTransfer.getData("text/html"));
    $scope.newMap.url = match[1];
    $scope.$apply();
  }

  $scope.addNewMap = function(){
    console.log("Start New map");
    $scope.newMap.type = "map";
    firebaseService.addNewMap($scope.newMap);
    setupNewMap(); 
  }

  function setupNewMap(){
    $scope.newMap = {
      playerSize:50,
    }
  }

  function getMaps(){
    $scope.maps = _.where(assets, "type","map");
  }
})