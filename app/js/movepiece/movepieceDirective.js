var app = angular.module("DDBoard");

app.directive("movepiece", function(){
  return {
    scope:{
      title:"@title"
    },
    transclude:true,
    restrict:"E",
    templateUrl:"app/js/movepiece/movepiece_template.html",
    link:function(scope, elem, atts){   
        scope.dimensions = {x:0,y:0,width:100,height:100}
    
      //scope.dimensions.x = scope.dimensions.x?scope.dimensions.x:0;
      //scope.dimensions.y = scope.dimensions.y?scope.dimensions.y:0;
      var startX;
      var startY;

      scope.startDrag =  function(event) {
        event.preventDefault();
        startX = event.pageX - scope.dimensions.x;
        startY = event.pageY - scope.dimensions.y;
        document.documentElement.addEventListener('mousemove', mousemove);
        document.documentElement.addEventListener('mouseup', mouseup);
      }
    

      function mousemove(event) {
        //console.log("Drag Event");
        //console.log("y", event.pageY + " " + startY);
        scope.dimensions.y = event.pageY - startY;
        scope.dimensions.x = event.pageX - startX;
        elem.css({
          'position':'relative',
          'top': scope.dimensions.y + 'px',
          'left':  scope.dimensions.x + 'px',
        });
      }

      function mouseup() {
        //console.log("Stop Dragging");
        document.documentElement.removeEventListener('mousemove', mousemove);
        document.documentElement.removeEventListener('mouseup', mouseup);
      }
    }
  };
})