var app = angular.module("DDBoard")
app.controller("characterAssetController", function($scope, firebaseService, assets){
  
  console.log(assets);
 
  setupNewCharacter();
  assets.$watch(getCharacters);
  getCharacters();
  function getCharacters(){
    $scope.characters = assets;
  }

  $scope.setImage = function(event){
    var regex = /src="([^\s]*)"/;
    var match = regex.exec(event.dataTransfer.getData("text/html"));
    $scope.newCharacter.url = match[1];
    $scope.$apply();
  }

  $scope.addNewCharacter = function(){
    firebaseService.addNewCharacter($scope.newCharacter);
    setupNewCharacter(); 
  }

  function setupNewCharacter(){
    $scope.newCharacter = {
      scale:1,
      opacity:1,
      type:'character',
      characterType:'character',
      gender:'male',
      race:'human'
    }
  }

  $scope.saveCharacter = function(character){
    assets.$save();
    console.log("Saving Character", character); 
  }

})