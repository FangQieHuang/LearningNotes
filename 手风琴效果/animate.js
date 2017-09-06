/**
 * Created by andy on 2017/05/24.
 */
//多个属性运动框架 添加回调函数
function animate(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;
        for(var attr in json){
            //开始遍历
            var current = 0;
            if(attr == "opacity")
            {
                current = parseInt(getStyle(obj,attr)*100);
            }
            else
            {
                current = parseInt(getStyle(obj,attr));
            }
            var step = (json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断透明度
            if(attr == "opacity")
            {
                if("opacity" in obj.style)
                {
                    obj.style.opacity = (current + step) / 100;
                }
                else
                {
                    obj.style.filter = "alpha(opacity = "+(current + step)+")";
                    console.log(current);
                }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current + step + "px";
            }
            if(current != json[attr])
            {
                flag = false;
            }
        }
        if(flag)
        {
            clearInterval(obj.timer);
            if(fn)
            {
                fn();
            }
        }
    },5)
}
function getStyle(obj,attr) {
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];
    }
}