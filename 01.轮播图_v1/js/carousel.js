/**
 * Created by dasxx on 2017-08-18.
 */
;(function () {
  
  var carousel = document.getElementById("carousel");
  
  //找图片对象
  var imgBox = document.getElementById("imgBox");
  var imgLis = imgBox.children;
  
  //找箭头对象
  var arrow = document.getElementById("arrow");
  var arrowR = arrow.children[1];
  var arrowL = arrow.children[0];
  
  //找小圆点
  var pointBox = document.getElementById("pointBox");
  var pointLis = pointBox.children;
  
  //追加一张假图片
  imgBox.appendChild(imgLis[0].cloneNode(true));
  //标准长度,定时器id,初始下标
  var imgWidth = carousel.offsetWidth;
  var timerId = null;
  var index = 0;
  //节流阀
  var flag = true;
  //遍历所有小圆点,并注实现点击轮播效果
  for(var i = 0; i < pointLis.length; i++) {
    pointLis[i].index = i;
    pointLis[i].onclick = function () {
      for(var i = 0; i < pointLis.length; i++) {
        pointLis[i].className = "";
      }
      this.className = "current";
      if(index == imgLis.length - 1){
        index = 0;
        imgBox.style.left = 0;
      }
      index = this.index;
      var target = - this.index * imgWidth;
      animate(imgBox,{left:target});
    }
  }
  //鼠标移动到效果图范围时显示左右箭头
  carousel.onmouseover = function () {
    arrow.style.display = "block";
    clearInterval(timerId);
  }
  //鼠标移出效果图范围时隐藏左右箭头
  carousel.onmouseout = function () {
    arrow.style.display = "none";
    //再次开启轮播图定时器
    timerId = setInterval(function () {
      arrowR.onclick();
    },1000);
  }
  //右箭头点击轮播事件
  arrowR.onclick =function () {
    if(flag){
      flag = false;
      if(index == imgLis.length-1){
        index = 0;
        imgBox.style.left = 0;
      }
      index++;
      var target = -index * imgWidth;
      animate(imgBox, {left:target},function () {
        flag = true;
      });
      for(var i = 0; i < pointLis.length; i++) {
        pointLis[i].className = "";
      }
      if(index == imgLis.length - 1){
        pointLis[0].className = "current";
      }else{
        pointLis[index].className = "current";
      }
    }
  }
  //左箭头点击轮播事件
  arrowL.onclick =function () {
    if(flag){
      flag = false;
      if(index == 0){
        index = imgLis.length-1;
        imgBox.style.left = - index * imgWidth + "px";
      }
      index--;
      var target = -index * imgWidth;
      animate(imgBox, {left:target},function () {
        flag = true;
      });
      for(var i = 0; i < pointLis.length; i++) {
        pointLis[i].className = "";
      }
      pointLis[index].className = "current";
    }
  }
  //实现定时轮播
  timerId = setInterval(function () {
    arrowR.onclick();
  },1000);
  
})();