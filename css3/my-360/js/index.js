/**
 * Created by boss on 2017/7/9.
 */
$(function(){
    $('#dowebok').fullpage({
        //设置每一屏的颜色
        sectionsColor:['#0da5d6', '#2AB561', '#DE8910', '#16BA9D', '#0DA5D6'],
        //滚到某一屏之后调用
        afterLoad : function (link,index) {
            //index 当前section的编号
            //console.log(index);
            //current类加给谁谁就做动画
            $('.section').removeClass('current');
            //让动画 延迟执行100ms
            setTimeout(function(){
                $('.section').eq(index-1).addClass('current');
            },100);


    }
    });
});