/**
 * Created by rory on 2016/12/28.
 * 11:32
 */

/* root element font-size calculate*/
/*module.exports = */(function () {
    //iphone 4 :width=320px; 1rem = 100px; dpr = 2;
    var doc = document.documentElement; //获取根元素的dom节点;
    var curDeviceWidth = doc.clientWidth || window.innerWidth; //拿到当前设备的宽度
    //动态的改变根元素字体大小：
    doc.style.fontSize = curDeviceWidth/2 * (100/320) + 'px';
})();