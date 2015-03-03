function init(){
  var img = new Image();
  img.src = 'pacman10-hp-sprite.png';

  var canvas = document.getElementById('game_canvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');

      img.onload = function(){
      ctx.drawImage(img, 317, 0, 470, 138, 0, 0, 470, 138);
      ctx.drawImage(img, 78, 21, 17, 17, 38, 30, 15, 15);
      };
   } 
}