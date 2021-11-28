var GenFuel = {
	coolFuel: [],
	heatFuel: [],
	
	addHeatFuel: function(id, RF, cool, cost){
		this.heatFuel.push({id: id, product: RF, coolCost: cool, amount: cost});
	},
	
	addCoolFuel: function(id, cost){
		this.coolFuel.push({id: id, amount: cost});
	}
}