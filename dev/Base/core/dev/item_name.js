var ItemName = {
	
	showBlockStorage: function(item, name, capacity){
		//var tierText = "§7" + Translation.translate("Power Tier: ") + tier;
		
		var energy = 0;
		if(item.extra){
			energy = item.extra.getInt("energy");
		}
		var energyText = this.displayEnergy(energy) + "/" + capacity + " RF";
		
		return name +/* "\n" + tierText + */ "\n" +energyText;
	},
	
	getTooltip: function(name, tooltip){
		return "\n" + tooltip;
	},
	
	getItemStorageText: function(item){
		var capacity = ChargeItemRegistry.getMaxCharge(item.id);
		var energy = ChargeItemRegistry.getEnergyStored(item);
		return "§e" + this.displayEnergy(energy) + "/" + this.displayEnergy(capacity) + " RF";
	},
	
	displayEnergy: function(energy){
		if(!Config.debugMode){
			if(energy >= 1e6){
				return Math.floor(energy / 1e5) / 10 + "M";
			}
			if(energy >= 1000){
				return Math.floor(energy / 100) / 10 + "K";
			}
		}
		return energy;
	}
}
