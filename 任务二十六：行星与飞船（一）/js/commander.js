var commander={
	orbitStatus:[false, false, false, false],
        //各个轨道的状态
       
    

	createSpaceShip:function(orbitId){
        //记录中该轨道没有飞船
		 if(this.orbitStatus[orbitId]) {
            Mediator.log("轨道" + (orbitId + 1) + "上已经存在飞船！", "blue");
            return;
        }
        //改变轨道状态
        this.orbitStatus[orbitId] = true;
        Mediator.log("在轨道" + (orbitId + 1) + "上创建飞船！", "yellow");
        Mediator.createSpaceShip(orbitId);
	},
	start: function(orbitId) {
        //记录中该轨道没有飞船

        if(!this.orbitStatus[orbitId]) {
            Mediator.log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        Mediator.log("向轨道" + (orbitId + 1) + "发送开始飞行指令！", "yellow");
        //发送广播消息
        Mediator.sendMessage({
            id: orbitId,
            command: 'start'
        });
    },
    stop: function(orbitId) {
        //记录中该轨道没有飞船

        if(!this.orbitStatus[orbitId]) {
            Mediator.log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        Mediator.log("向轨道" + (orbitId + 1) + "发送停止飞行指令！", "yellow");
        //发送广播消息
        Mediator.sendMessage({
            id: orbitId,
            command: 'stop'
        });
    },
    destroy: function(orbitId) {
        //记录中该轨道没有飞船

        if(!this.orbitStatus[orbitId]) {
            Mediator.log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        //从记录中删除飞船
        this.orbitStatus[orbitId] = false;
        Mediator.log("向轨道" + (orbitId + 1) + "发送销毁指令！", "yellow");
        //发送广播消息
        Mediator.sendMessage({
            id: orbitId,
            command: 'destroy'
        });
    },
}