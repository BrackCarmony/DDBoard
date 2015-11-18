var app = angular.module("DDBoard");

app.directive("battleMap", function(firebaseService){
  return{
    templateUrl:"app/js/battlemap/battle_map_template.html",
    scope:{world:"=", player:"=", dimensions:"="},
    link:function(scope, elem, atts){
      
      var canvas = elem.find("canvas")[0];
      var ctx = canvas.getContext("2d");
      ctx.translate(0.5,0.5);
      var images = {};
      sizeCanvas();

      var unwatchDraw = scope.world.$watch(draw);

      function sizeCanvas(){
        var img = new Image();
        img.src = scope.world.map.url;
        img.addEventListener("load", function(){
          
          canvas.width = img.width;
          canvas.height = img.height;
          scope.dimensions.basewidth = img.width;
          scope.dimensions.baseheight = img.height;
            draw();
        })
      }

      function draw(){
        console.log("Start Draw Cycle");
        drawMap();
        scope.world.players.forEach(function(player){drawPlayer(player);});
       // window.requestAnimationFrame(draw)
      };

      function drawMap(){
        drawImage(scope.world.map.url);
      }

      function drawImage(imgUrl){

        if (images[imgUrl]){
          var argLength = arguments.length;
          
          switch (argLength){
            case 1:
              ctx.drawImage(images[imgUrl],0,0);
              break;
            case 3:
              ctx.drawImage(images[imgUrl],arguments[1],arguments[2]);
              break;
            case 5:
              //ctx.drawImage(images[imgUrl],arguments[1],arguments[2],arguments[3],arguments[4]);
              ctx.drawImage(images[imgUrl],Math.round(arguments[1]),Math.round(arguments[2]),Math.round(arguments[3]),Math.round(arguments[4]));
              break;
            case 9:
              ctx.drawImage(images[imgUrl],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8]);
              break;
          }
        }else{
          images[imgUrl] = new Image();
          images[imgUrl].src = imgUrl;
          images[imgUrl].addEventListener('load', draw)
        }
      }

      function drawPlayer(player){
        
        if(images[player.figure.url]){
          var width = scope.world.map.playerSize * player.figure.scale;
          var height = width * images[player.figure.url].height/images[player.figure.url].width;

          ctx.globalAlpha = player.opacity?player.opacity:1;
          drawImage(player.figure.url, player.x - width/2, player.y-height, width, height);
          ctx.globalAlpha = 1;
          if (player.name){
            drawMessage(player, width, height);
          }
        }else{drawImage(player.figure.url);}
        
      }

      function drawMessage(player, width, height){
        var fontsize = Math.round(scope.world.map.playerSize*.3);
        var textBoxBorder =6;
        var dim = ctx.measureText(player.name).width;
        ctx.font= fontsize+"px Arial";

        ctx.fillStyle = "rgba(30,30,30,.6)"
          ctx.fillRect(player.x - width/2 - textBoxBorder*2, player.y - height - 4 - 2*textBoxBorder - fontsize, dim + 2*textBoxBorder, fontsize + 2*textBoxBorder);
        ctx.fillStyle = "#DDD";
          ctx.fillText(player.name, player.x - width/2 - textBoxBorder, player.y -height - 4 -2*textBoxBorder);
      }

      canvas.addEventListener("mousedown", function(){

      });

      canvas.addEventListener("click", function(event){

        var pos = getClickPos(event);
        console.log("I got clicked!");
        console.log(pos);
        console.log(event);
        if (scope.player)
        {
          scope.player.x = pos.x;
          scope.player.y = pos.y;
          scope.world.$save()
        }
      });

      function getClickPos(event){
        var pos = {};
        pos.x  = (event.offsetX)/(canvas.offsetWidth)*canvas.width;
        pos.y = (event.offsetY)/(canvas.offsetHeight)*canvas.height;
        return pos; 
      }
    }

  }
});