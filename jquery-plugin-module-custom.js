/**
 * Created by LiYonglei on 2016/2/19.
 */
(function($){
    var setMethods={
        save:save,
        update:update,
        destory:destory
    };
    var getMethods={
        getName:getName
    }
    $.fn.func=function(){
        var params;
        var method;
        if(!arguments.length|| typeof arguments[0] == 'object'){
            this.data('func',$.extend({},$.fn.func.default,arguments[0]));
            params=this.data('func');
            return this.each(function(idx,item){
                var _this=init.call(item,params);
                render.call(_this);
            });
        }else{
            if(!$(this).data('func')){
                throw new Error('没初始化');
            }
            params=Array.prototype.slice.call(arguments,1);
            if (setMethods.hasOwnProperty(arguments[0])){
                method=setMethods[arguments[0]];
                return this.each(function(idx,item){
                    var _this=method.apply(item,params);
                    render.call(_this);
                });
            }else if(getMethods.hasOwnProperty(arguments[0])){
                method=getMethods[arguments[0]];
                return method.apply(this,params);
            }else{
                throw new Error('没有这个方法');
            }
        }
    };
    $.fn.func.default={
        name:'liqiang',
        age:'20',
        'class':'',
        afterRender:function(item){
            console.info(item);
            console.info('afterRender');
        }
    };
    function init(params){
        return this;
    }
    function save(name){
        $.extend($(this).data('func'),{name:name});
        return this;
    }
    function update(params){
        $.extend($(this).data('func'),params);
        return this;
    }
    function destory(b){
        var params=$(this).data('func');
        $(this).removeClass(params.class).removeData('func');
        if(b){
            $(this).remove();
        }else{
            return this;
        }
    }
    function render(){
        var params=$(this).data('func');
        $(this).addClass(params.class).text(params.name);
        params.afterRender(this);
    }
    function getName(params){
        console.info(params);
        return this.data('func').name;
    }
}(jQuery))