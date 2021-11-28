IDRegistry.genBlockID("eioTank");
Block.createBlock("eioTank", [
	{name: "Basic Tank", texture: [["basic_tank", 0]], inCreative: true}
], "machine");



var guiTank = new UI.StandartWindow({
	standart: {
		header: {text: {text: Translation.translate("Basic Tank")}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 611, y: 88, bitmap: "liquid_bar", scale: GUI_SCALE},
	],
	
	elements: {
		"liquidScale": {type: "scale", x: 400 + 70*GUI_SCALE, y: 50 + 16*GUI_SCALE, direction: 1, value: 0.5, bitmap: "gui_water_scale", overlay: "gui_liquid_storage_overlay", scale: GUI_SCALE},
		"slotLiquid1": {type: "slot", x: 400 + 94*GUI_SCALE, y: 50 + 16*GUI_SCALE, isValid: function(id, count, data){
			return (LiquidRegistry.getFullItem(id, data, "water") || LiquidLib.getEmptyItem(id, data))? true : false;
		}},
		"slotLiquid2": {type: "slot", x: 470 + 94*GUI_SCALE, y: 50 + 16*GUI_SCALE},
		"slotOut": {type: "slot", x: 400 + 94*GUI_SCALE, y: 50 + 40*GUI_SCALE, isValid: function(){return false;}},
		
	}
});

StorageInterface.createInterface(BlockID.eioTank, {
	slots: {
		"slotLiquid1": {input: true},
		"slotLiquid2": {input: true},
		"slotOut": {output: true}
	},
	isValidInput: function(item){
		return LiquidRegistry.getFullItem(item.id, item.data, "water") || LiquidLib.getEmptyItem(item.id, item.data);
	},
	canReceiveLiquid: function(liquid, side){ return true; },
	canTransportLiquid: function(liquid, side){ return true; }
});

MachineRegistry.registerPrototype(BlockID.eioTank, {
	
	
	getGuiScreen: function(){
		return guiTank;
	},
	
	init: function(){
		this.liquidStorage.setLimit(null, 16);
	},
	
	
	getLiquidFromItem: MachineRegistry.getLiquidFromItem,
	addLiquidToItem: MachineRegistry.addLiquidToItem,
	
	
	click: function(id, count, data, coords){
		if(Entity.getSneaking(Player.get())){
			var liquid = this.liquidStorage.getLiquidStored();
			return this.getLiquidFromItem(liquid, {id: id, count: count, data: data}, null, true);
		}
	},
	
	tick: function(){
		UpgradeAPI.executeUpgrades(this);
		
		var storage = this.liquidStorage;
		var liquid = storage.getLiquidStored();
		var slot1 = this.container.getSlot("slotLiquid1");
		var slot2 = this.container.getSlot("slotLiquid2");
		var out = this.container.getSlot("slotOut");
		this.getLiquidFromItem(liquid, slot1, out);
		if(liquid){
		this.addLiquidToItem(liquid, slot2, out);
		}
		this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());
	}
});

