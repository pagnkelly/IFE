	//介质
	var  Mediator={
		spaceShipList:[],//记录已经创建的飞船
		//广播系统
		log: function(message,colors){
			var consoleLog = document.getElementById("log");
			var p=document.createElement('p');
			p.style.color=colors;
			p.innerHTML=message;
			consoleLog.appendChild(p);
			consoleLog.scrollTop=consoleLog.scrollHeight;
		},
		
		createSpaceShip: function(orbitId) {
        //创建飞船对象并保存到数组
        	setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    Mediator.log("向轨道" + (orbitId + 1) + "发送的 create 指令丢包了！", "red");
                    return ;
                }
                if( !Mediator.spaceShipList[orbitId]){
                	 createShip(orbitId);
                }
               Mediator.log("向轨道" + (orbitId + 1) + "发送 create 指令成功！", "green");
               
            }, 1000);
	       

	    },
	    sendMessage: function(message) {
            //1秒后发送消息
            setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    Mediator.log("向轨道" + (message.id + 1) + "发送的 " + message.command + " 指令丢包了！", "red");
                    return;
                }
                Mediator.log("向轨道" + (message.id + 1) + "发送 " + message.command + " 指令成功！", "green");
               
                    //已销毁的飞船不处理
                if(Mediator.spaceShipList[message.id]._destroyed){
                	return;
                }else{
                    Mediator.spaceShipList[message.id].sendMessage(message);
                  
                    //向飞船发送消息
                 }   
               
            }, 1000);
        },

	}
