/**
 * Created by bear_Yiii on 2017-08-18.
 */

//获取元素属性
function getStyle(element, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element, null)[attr];
  } else {
    return element.currentStyle[attr];
  }
}
//动画函数
function animate(element, obj, fn) {
  clearInterval(element.timer);
  element.timer = setInterval(function () {
    var flag = true;
    for (var k in obj) {
      var attr = k;
      var target = obj[k];
      //判断attr是不是opacity
      if (attr == "opacity") {
        
        //透明度是0~1之间的浮点数
        var leader = getStyle(element, attr);
        leader = parseFloat(leader) || 0;
        //放大一千倍方便计算透明度
        leader = leader * 1000;
        target = target * 1000;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        //设置的时候，不能设置left，应该设置attr
        element.style[attr] = leader / 1000;
        if (leader != target) {
          flag = false;
        }
      } else if (attr == "zIndex") {
        element.style.zIndex = target;
      } else {
        
        //offsetLeft:获取的是left值， 获取attr对应的值
        var leader = getStyle(element, attr);
        //leader是一个字符串，带单位, 如果发现转换失败的时候，给一个默认值：0
        leader = parseInt(leader) || 0;
        
        
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader += step;
        
        //设置的时候，不能设置left，应该设置attr
        element.style[attr] = leader + "px";
        
        if (leader != target) {
          flag = false;
        }
      }
      
      
    }
    
    if (flag) {
      clearInterval(element.timer);
      //fn：传递了才调用    清除定时器才调用
      fn && fn();
    }
  }, 15);
}


