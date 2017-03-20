/**
 * Created by LiYonglei on 2016/2/19.
 */
(function($){
    if($.fn.func){
        return;
    }
    var setMethods={
        save:save,
        update:update,
        destory:destory
    };
    var getMethods={
        getName:getName
    }
    $.fn.func=function(){
        var args=arguments,params,method;
        if(!args.length|| typeof args[0] == 'object'){
            return this.each(function(idx){
                var $self=$(this);
                $self.data('func',$.extend(true,{},$.fn.func.default,args[0]));
                params=$self.data('func');
                _init.call( $self,params);
                _render.call($self);
            });
        }else{
            if(!$(this).data('func')){
                throw new Error('You has not init func!');
            }
            params=Array.prototype.slice.call(args,1);
            if (setMethods.hasOwnProperty(args[0])){
                method=setMethods[args[0]];
                return this.each(function(idx){
                    var $self=$(this);
                    method.apply($self,params);
                    _render.call($self);
                });
            }else if(getMethods.hasOwnProperty(args[0])){
                method=getMethods[args[0]];
                return method.apply(this,params);
            }else{
                throw new Error('There is no such method');
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
    function _init(params){
        var $self=this;
        return $self;
    }
    function save(name){
        var $self=this;
        $.extend($self.data('func'),{name:name});
        return $self;
    }
    function update(params){
        var $self=this;
        $.extend($self.data('func'),params);
        return this;
    }
    function destory(b){
        var $self=this;
        var params=$self.data('func');
        $self.removeClass(params.class).removeData('func');
        if(b){
            $self.remove();
        }else{
            return $self;
        }
    }
    function _render(){
        var $self=this;
        var params=$self.data('func');
        $self.addClass(params.class).text(params.name);
        params.afterRender($self);
    }
    function getName(params){
        var $self=this;
        console.info(params);
        return $self.data('func').name;
    }
}(jQuery))