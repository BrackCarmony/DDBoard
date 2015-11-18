var app = angular.module("DDBoard");

app.service("firebaseService", function($firebaseObject, $firebaseArray){
  var baseUrl = "https://bracktestappchat.firebaseio.com/DDBoard"

  this.getAssets = function(type){
    var firebaseRef = new Firebase(baseUrl + "/"+type+"/");
    var assetsArray = $firebaseArray(firebaseRef);

    return assetsArray;
  }

  this.getImageById = function(imgId){
    var firebaseRef = new Firebase(baseUrl + "/images/" + imgId);
    var image = $firebaseObject(firebaseRef);

    return image;
  }

  this.getWorld = function(worldId){
    var firebaseRef = new Firebase(baseUrl + "/world/"+worldId);
    var world = $firebaseObject(firebaseRef);

    return world;
  }
  this.getWorlds = function(){
    var firebaseRef = new Firebase(baseUrl + "/worlds/");
    var worldsArray = $firebaseArray(firebaseRef);

    return worldsArray;
  }

  this.addNewImage = function(img){
    var firebaseRef = new Firebase(baseUrl + "/images/");
    var imagesArray = $firebaseArray(firebaseRef);

    return imagesArray.$add(img);
  }
  this.addNewWorld = function(newWorld, newWorldRef){
    

    console.log(newWorld);
    console.log(newWorldRef);
    delete(newWorld.map.$id);
    delete(newWorld.map.$priority);
    var firebaseRef = new Firebase(baseUrl + "/world/"+newWorldRef.key());
    return firebaseRef.set(newWorld);//*/
  }

  this.addNewMap = function(newMap){

    var firebaseRef = new Firebase(baseUrl + "/maps/");
    var assetsArray = $firebaseArray(firebaseRef);

    assetsArray.$add(newMap);
  }

  this.addNewCharacter = function(newCharacter){

    var firebaseRef = new Firebase(baseUrl + "/characters/");
    var assetsArray = $firebaseArray(firebaseRef);

    assetsArray.$add(newCharacter);
  }




})
