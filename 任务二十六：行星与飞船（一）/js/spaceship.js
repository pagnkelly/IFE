
// 飞船类
function SpaceShip(orbit){
	//轨道
	this._orbit=orbit-0;
	//状态 0代表STOP 1代表飞行中
	this._status=0;
	//能源
	this._energy=100;
	//旋转速度
	this._angle=0;
	//是否被销毁 false代表没被销毁 true代表被销毁
	this._destroyed=false;
	

}
SpaceShip.prototype={
	//开始
	start: function(){
		if(this._energy > 0) {
	        this._status = 1;
	    }
	},
	//结束
	stop:function(){
		this._status = 0;
	},
	//运行
	fly:function(){
		var that=this;
		var timer=setInterval(function(){
			var ship=document.getElementById("ship" + that._orbit );
				if(that._status){
					
					that._angle +=20;
				}
				//如果飞船被销毁，页面移除，清除计时器
			    if(that._destroyed){
			    
			    	
                    Mediator.spaceShipList[that._orbit]= null;

                    document.getElementById("pathway"+ that._orbit ).removeChild(ship);
                	
			    	clearInterval(timer);
			    }
			 	//能量增减
			    that.add(2);
			    that.consume(5);
		        ship.style.webkitTransform= "rotate(" + that._angle + "deg)";
		        ship.style.mozTransform = "rotate(" + that._angle + "deg)";
		        ship.style.msTransform = "rotate(" + that._angle + "deg)";
		        ship.style.oTransform = "rotate(" + that._angle + "deg)";
		        ship.style.transform = "rotate(" + that._angle + "deg)";
			        //能源显示

		        ship.firstElementChild.style.width =  that.get_energy() + "%";
		        ship.lastElementChild.innerHTML =  that.get_energy() + "%";
			  
		},1000);
	},
	//能源系统
	add:function(num){
		this._energy += num;
		if(this._energy > 100) {
	        this._energy = 100;
	    }
	},
	consume:function(num){
	
		if(this._status== 1) {
	        this._energy -= num;
	    }
    	if(this._energy <= 0) {
            this._status = 0;
            this._energy = 0;
        }
	},
	get_energy:function(){
		return this._energy;
	},
	//销毁
	destroy: function() {
           
        this._destroyed = true;
           
    },
    //接受信号系统
    sendMessage: function(message) {
        //检查消息是否是发给自己的
        if(message.id != this._orbit) {
            return;
        }
        //执行命令
        switch(message.command) {
            //开始飞行
            case 'start':
                this.start();
              
                break;
            //停止飞行
            case 'stop':
                this.stop();
                break;
            //自爆
            case 'destroy':
                this.destroy();
                break;
            
        }
    }
       
}

	
