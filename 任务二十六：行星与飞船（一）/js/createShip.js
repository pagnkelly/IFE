
	function createShip(orbitId){
		 Mediator.spaceShipList[orbitId]= new SpaceShip(orbitId);
	        //创建飞船主体div
        var spaceshipDiv = document.createElement("div");
       
        spaceshipDiv.id = "ship" + orbitId;
        //创建能量条div
        var energyDiv = document.createElement("div");
        energyDiv.className = "energy";
        spaceshipDiv.appendChild(energyDiv);
        //创建能量文本div
       	var textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.innerHTML = "100%";
       	spaceshipDiv.appendChild(textDiv);
       
        //将飞船显示到页面上
        var path=document.getElementById("pathway"+orbitId);
        path.appendChild(spaceshipDiv);
        //飞船飞行
     	  Mediator.spaceShipList[orbitId].fly();
	}