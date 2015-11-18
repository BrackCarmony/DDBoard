var app = angular.module("DDBoard",['firebase','ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when("/worlds",{
    templateUrl:"app/js/views/worlds/worlds_template.html",
    controller:"worldsController",
    resolve:{
      worlds:function(firebaseService){
        return firebaseService.getAssets("worlds").$loaded();
      },
      maps:function(firebaseService){
        return firebaseService.getAssets("maps").$loaded();
      }
    }
  }).when("/world/:worldId",{
    templateUrl:"app/js/views/world/world_template.html",
    controller:"worldController",
    resolve:{
      world:function(firebaseService, $route){
        return firebaseService.getWorld($route.current.params.worldId).$loaded();
      },
      characters:function(firebaseService){
        return firebaseService.getAssets("characters").$loaded();
      }
    }
  }).when("/assets/maps",{
    templateUrl:"app/js/views/mapassets/maps_template.html",
    controller:"mapAssetController",
    resolve:{
      assets:function(firebaseService){
        return firebaseService.getAssets("maps").$loaded();
      }
    }
  }).when("/assets/characters",{
    templateUrl:"app/js/views/characterassets/character_template.html",
    controller:"characterAssetController",
    resolve:{
      assets:function(firebaseService){
        return firebaseService.getAssets("characters").$loaded();
      }
    }

  }).otherwise({
    redirectTo:"/worlds"
  })
}); 