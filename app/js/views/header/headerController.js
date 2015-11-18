var app = angular.module("DDBoard")

app.controller("headerController", function($scope, firebaseService, $location){
  $scope.routeTo = function(link){
    $location.path(link);
  }
})