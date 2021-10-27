/*Item.registerUseFunction("skullZombieElectrode", function(coords, item, block){
	Game.message(block.id+":"+block.data);
	var tile = World.getTileEntity(coords.x, coords.y, coords.z);
	if(tile){
		var liquid = tile.liquidStorage.getLiquidStored();
		if(liquid){
			Game.message(liquid + " - " + tile.liquidStorage.getAmount(liquid)*1000 + "mB");
		}
		for(var i in tile.data){
			if(i != "energy_storage"){
				if(i == "__liquid_tanks"){
					var tanks = tile.data[i];
					Game.message(tanks.input.liquid + ": "+ tanks.input.amount*1000 + "mB");
					Game.message(tanks.output.liquid + ": "+ tanks.output.amount*1000 + "mB");
				}
				else if(i == "energy"){
					Game.message("energy: " + tile.data[i] + "/" + tile.getEnergyStorage());
				}
				else try {
					Game.message(i + ": " + tile.data[i]);
				} catch(e){
					Game.message(i);
				}
			}
		}
	}

	     var client = Network.getClientForPlayer(Player.get());
        var node = EnergyNet.getNodeOnCoords(block.id, coords.x, coords.y, coords.z);
        if (node)
            client.sendMessage(node.toString());
});
*/