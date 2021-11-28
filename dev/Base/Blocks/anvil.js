var BLOCK_TYPE_ANVIL = Block.createSpecialType({
  destroytime: 20,
  explosionres: 999,
  base: 99,
  sound: "anvil"
});
IDRegistry.genBlockID("darkSteelAnvil");
Block.createBlock("darkSteelAnvil", [{
    name: "Dark Anvil",
    texture: [
	 ["darkSteelBlock", 0]],
    inCreative: true
  }
], BLOCK_TYPE_ANVIL);

function setDarkAnvilRender(id, tex){
  var anvilRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(id, 0, anvilRender);
  var model = BlockRenderer.createModel();
  
  model.addBox(2/16, 0/16, 1/16, 14/16, 4/16, 15/16, tex, 0);
  model.addBox(4/16, 4/16, 2/16, 12/16, 5/16, 14/16, tex, 0);
  model.addBox(7/16, 5/16, 3/16, 10/16, 10/16, 13/16, tex, 0);
  model.addBox(3/16, 10/16, 0/16, 13/16, 16/16, 16/16, tex, 0);
  
  anvilRender.addEntry(model);
}

setDarkAnvilRender(BlockID.darkSteelAnvil, "darkSteelBlock");

/**/

var darkAnvilGUI = new UIRegistry({
	standart: {
		header: {text: "Dark Anvil"}
	},
	
	drawing: [
	  	{type: "bitmap", x: 500, y: 180, bitmap: "anvil_plus", scale: 3.2},
	  	{type: "bitmap", x: 700, y: 180, bitmap: "bar_progress1", scale: 3.2}
	],
	
	elements: {
	   "slotItem": {type: "slot", x: 400, y: 180},
	   "slotSecond": {type: "slot", x: 600, y: 180},
	   "slotOutput": {type: "slot", x: 800, y: 180},
  	}
});

var Anvil = {
  repairValues: {},
  toolMaterials: {},
  recipes: [],
  addRepairItem: function(id, data, value, material){
    this.repairValues[id+":"+data] = {value: value, material: material}
  },
  getRepairValue: function(id, data){
    return this.repairValues[id+":"+data]
  },
  registerToolMaterial: function(id, material){
    this.toolMaterials[id] = material
  },
  getToolMaterial: function(id){
    return this.toolMaterials[id]
  },
  addRecipe: function(input, item, result, data){
    this.recipes.push({input: input, item: item, result: result, data: data})
  }/*
  getRecipe: function(id){
    return this.recipes[id]
  }*/
};

Anvil.addRepairItem(280, 0, 5, "wood");
Anvil.addRepairItem(264, 0, 80, "diamond");
Anvil.addRepairItem(265, 0, 70, "iron");
Anvil.addRepairItem(266, 0, 30, "gold");
Anvil.addRepairItem(ItemID.darkSteel, 0, 200, "dark_steel");
Anvil.addRecipe(ItemID.pickaxeDarkSteel, ItemID.vibrantCrystal, ItemID.pickaxeDarkSteelEmpowered1, Item.getMaxDamage(ItemID.pickaxeDarkSteelEmpowered)-1);
var woodenTools = [268, 269, 270, 271, 290];

for(let i in woodenTools){
  Anvil.registerToolMaterial(woodenTools[i], "wood");
}

var stoneTools = [272, 273, 274, 275, 291];

for(let i in stoneTools){
  Anvil.registerToolMaterial(stoneTools[i], "stone");
}

var ironTools = [256, 257, 258, 267, 292];

for(let i in ironTools){
  Anvil.registerToolMaterial(ironTools[i], "iron");
}

var goldenTools = [283, 284, 285, 286, 294];

for(let i in goldenTools){
  Anvil.registerToolMaterial(goldenTools[i], "gold");
}

var diamondTools = [276, 277, 278, 279, 293];

for(let i in diamondTools){
  Anvil.registerToolMaterial(diamondTools[i], "diamond");
}


TileEntity.registerPrototype(BlockID.darkSteelAnvil, {
  defaultValues: {
    canTake: false
  },
  getGuiScreen: function(){
    return darkAnvilGUI;
  },
  tick: function(){
    let slotItem = this.container.getSlot("slotItem");
    let slotSecond = this.container.getSlot("slotSecond");
    let slotOutput = this.container.getSlot("slotOutput");
    let toolMaterial = Anvil.getToolMaterial(slotItem.id);
    let repair = Anvil.getRepairValue(slotSecond.id, slotSecond.data);
    
    if(toolMaterial && repair && slotOutput.id == 0 && slotItem.count == 1 && slotItem.data + repair.value <= Item.getMaxDamage(slotItem.id) && toolMaterial == repair.material && !this.data.canTake){
      slotOutput.id = slotItem.id
      slotOutput.count = 1;
      slotOutput.data = slotItem.data-repair.value
      this.data.canTake = true;
    } else if(!recipe){
      slotOutput.id = 0
    }
    
    if(toolMaterial && repair && slotOutput.count == 0 && this.data.canTake){
      slotItem.id = 0;
      slotSecond.count--;
      this.container.validateAll();
      this.data.canTake = false;
    }
    
    if(slotOutput.data < 0){
      slotOutput.data = 0
    }
    for(let i in Anvil.recipes){
    	let recipe = Anvil.recipes[i]
    if(recipe){
      if(slotSecond.id == recipe.item && slotOutput.id == 0 && !this.data.canTake){
        this.data.canTake = true
        slotOutput.id = recipe.id
        slotOutput.count = 1
        slotOutput.data = recipe.data
      } else if(slotOutput.id!=0){
        slotOutput.id = 0
      }
      if(World.getThreadTime()%2 == 0 && (slotOutput.id != recipe.id || slotOutput.id == 0) && this.data.canTake){
        slotItem.id = 0;
        slotSecond.count--;
        this.container.validateAll();
        this.data.canTake = false;
      }
    }
    }
  }
});
