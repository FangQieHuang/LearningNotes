/**
 * Created by boss on 2017/5/24.
 */
window.onload = function() {

    //获取元素
    function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");//获取最大的盒子
    var slider_main_block = $("slider_main_block");//图片的父亲
    var imgs = slider_main_block.children;
    var slider_ctrl = $("slider_ctrl");
    //操作元素

    for(var i=0;i<imgs.length;i++)
    {
        var span = document.createElement("span");
        span.className = "slider-ctrl-con";
        span.innerHTML = imgs.length-i;
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }

    var spans = slider_ctrl.children;
    spans[1].setAttribute("class","slider-ctrl-con current");

    var scrollWidth = js_slider.clientWidth;

    for(var i=1;i<imgs.length;i++)
    {
        imgs[i].style.left = scrollWidth + "px";
    }


    var iNow = 0;  //用来控制播放张数
    for(var k in spans)
    {
        spans[k].onclick = function(){
            //alert(this.innerHTML);
            if(this.className == "slider-ctrl-prev")
            {
                //alert("你点击了左侧按钮");
                animate(imgs[iNow],{left: scrollWidth});
                --iNow < 0  ? iNow=imgs.length-1 : iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow],{left:0});
                setSqure();
            }
            else if(this.className == "slider-ctrl-next")
            {
                //alert("你点击了右侧按钮");
                autoplay();
            }
            else
            {
                //alert("你点击了下面的按钮");
                //alert(this.innerHTML);
                var that = this.innerHTML -1;
                //console.log(typeof that);
                if(that > iNow)
                {
                    //做法等同于右侧按钮
                    animate(imgs[iNow],{left:-scrollWidth});
                    imgs[that].style.left = scrollWidth + "px";
                    animate(imgs[that],{left:0});
                }
                else if(that < iNow)
                {
                    //做法等同于左侧按钮
                    animate(imgs[iNow],{left: scrollWidth});
                    imgs[that].style.left = -scrollWidth + "px";
                    animate(imgs[that],{left:0});
                }
                iNow = that;
                animate(imgs[iNow],{left:0});
                setSqure();
            }
        }
    }


    function setSqure(){
        for(var i=1;i<spans.length-1;i++)
        {
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";
    }

    //定时器开始  其实就是右侧按钮
    var timer = null;
    timer = setInterval(autoplay,2000);
    function autoplay() {
        animate(imgs[iNow],{left:-scrollWidth});
        ++iNow > imgs.length-1 ? iNow=0 : iNow;
        imgs[iNow].style.left = scrollWidth + "px";
        animate(imgs[iNow],{left:0});
        setSqure();
    }
    //鼠标经过清除定时器
    js_slider.onmouseover= function() {
        clearInterval(timer);
    }
    js_slider.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(autoplay,2000);
    }
}