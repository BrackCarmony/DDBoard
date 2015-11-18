var app = angular.module("DDBoard");

app.directive("droppable", function(){
  return {
    scope:{
      droppable:"&"
    },
    link:function(scope, elem, atts){
      el = elem[0];
      el.addEventListener('drop', function(event){
        event.preventDefault();
        
        scope.droppable({event:event});
        el.classList.remove("over");
      })

      el.addEventListener('dragenter', function(event){
        event.preventDefault();
        
        el.classList.add('over');
      })

      el.addEventListener('dragover', function(event){
        event.dataTransfer.dropEffect = "move";

        if (event.preventDefault) event.preventDefault();
        el.classList.add('over');
        return false;
      },false);

      el.addEventListener('dragleave', function(event){
        event.preventDefault();
        el.classList.remove('over');
      })
    }
  }
})