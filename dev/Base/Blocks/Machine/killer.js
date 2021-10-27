IDRegistry.genBlockID("killerJoe");
Block.createBlock("killerJoe", [{"name":"Killer Joe","texture":[["machineBottom",0]],"inCreative":true}]);

function setKillerJoeRender(){
var killerJoeRender = new ICRender.Model();
var model = BlockRenderer.createModel();

model.addBox(1/16, 0/16, 1/16, 15/16, 1/16, 15/16, "machineBottom", 0);
model.addBox(1/16, 1/16, 14/16, 2/16, 13/16, 15/16, "machineBottom", 0);
model.addBox(14/16, 1/16, 14/16, 15/16, 13/16, 15/16, "machineBottom", 0);
model.addBox(14/16, 1/16, 1/16, 15/16, 13/16, 2/16, "machineBottom", 0);
model.addBox(1/16, 1/16, 1/16, 2/16, 13/16, 2/16, "machineBottom", 0);
model.addBox(1/16, 13/16, 1/16, 15/16, 14/16, 15/16, "machineBottom", 0);

model.addBox(4/16, 2/16, 3/16, 13/16, 12/16, 13/16, "killerJoeZombieOther", 0);
model.addBox(3/16, 2/16, 3/16, 4/16, 12/16, 13/16, "killerJoeZombie", 0);

model.addBox(1/16, 1/16, 2/16, 2/16, 13/16, 14/16, 20, 0);
model.addBox(2/16, 1/16, 1/16, 14/16, 13/16, 2/16, 20, 0);
model.addBox(2/16, 1/16, 14/16, 14/16, 13/16, 15/16, 20, 0);
model.addBox(14/16, 1/16, 2/16, 15/16, 13/16, 14/16, 20, 0);

killerJoeRender.addEntry(model);
BlockRenderer.setStaticICRender(BlockID.killerJoe, -1, killerJoeRender);
}
setKillerJoeRender()

Block.setBlockShape(BlockID.killerJoe, {"x":0,"y":0,"z":0}, {"x":1,"y":1,"z":1});

var guiKillerJoe = new UI.StandartWindow({
	standart: {
		header: {text: {text: "Killer Joe"}},
		inventory: {standart: true},
		background: {standart: true}
	},
	
	drawing: [
		{type: "bitmap", x: 470, y: 66, bitmap: "fluid_scale", scale: 3.2},
	],
	
	elements: {
	   	"liquidScale": {type: "scale", x: 470, y: 66, direction: 1, bitmap: "fluid_scale", scale: 3.2},
	   	"slotSword": {type: "slot", x: 600, y: 60},
		  "slotLiquid1": {type: "slot", x: 600, y: 240},
		  "slotLiquid0": {type: "slot", x: 600, y: 180},
  	}
});

var SWORD_DAMAGE = {
  "267": 6,
  "268": 4,
  "272": 5,
  "276": 7,
  "283": 4
}

var MOBS = [Native.EntityType.BAT, Native.EntityType.CHICKEN, Native.EntityType.COW, Native.EntityType.MUSHROOM_COW, Native.EntityType.OCELOT, Native.EntityType.PIG, Native.EntityType.RABBIT, Native.EntityType.SHEEP, Native.EntityType.SNOW_GOLEM, Native.EntityType.SQUID, Native.EntityType.VILLAGER, Native.EntityType.WOLF, 23, 24, 25, 26, 27, Native.EntityType.BLAZE, Native.EntityType.CAVE_SPIDER, Native.EntityType.CREEPER, Native.EntityType.ENDERMAN, Native.EntityType.GHAST, Native.EntityType.IRON_GOLEM, Native.EntityType.LAVA_SLIME, Native.EntityType.PIG_ZOMBIE, Native.EntityType.SILVERFISH, Native.EntityType.SKELETON, Native.EntityType.SLIME, Native.EntityType.SPIDER, Native.EntityType.ZOMBIE, Native.EntityType.ZOMBIE_VILLAGER, 45, 46, 47, 48, 49, 52, 55];


/*
TileEntity.registerPrototype(BlockID.killerJoe, {
  getGuiScreen: function(){
    return guiKillerJoe;
  },
  init: function(){
    this.liquidStorage.setLimit("nutrientDistillation", 16);
  },
  tick: function(){
    this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());
    let storage = this.liquidStorage;
		  let liquid = storage.getLiquidStored();
		  let slot0 = this.container.getSlot("slotLiquid0");
	   	let slot1 = this.container.getSlot("slotLiquid1");
	   	let slotSword = this.container.getSlot("slotSword");
		  
		  if(slot0.id == ItemID.bucketNutrient_distillation && storage.getAmount("nutrientDistillation") < 16 && (slot1.id == 325 && slot1.count < 16|| slot1.id == 0)){
		    slot1.id = 325
		    slot1.count++
		    slot0.count--;
		    this.container.validateAll();
		    storage.addLiquid("nutrientDistillation", 1);
		  }
		  
		  if(slotSword.data >= Item.getMaxDamage(slotSword.id)){
		    slotSword.id = 0;
		  }
		  
    for(i in MOBS){
		    let ent = Entity.findNearest({x: this.x, y: this.y, z: this.z}, MOBS[i], 6);
		    if(ent && storage.getAmount("nutrientDistillation") >= 0.02 && World.getThreadTime()%20==0){
				    Entity.damageEntity(ent, SWORD_DAMAGE[slotSword.id] || 1);
        slotSword.data++;
        storage.getLiquid("nutrientDistillation", 0.02);
      }
    }
  }
});
*/

Callback.addCallback("PostLoaded", function(){
  Recipes.addShaped({id: BlockID.killerJoe, count: 1, data: 0}, [
    	"sss",
    	"qzq",
	   "qqq"
  ], ['s', ItemID.darkSteel, 0, 'q', 20, 0, "z", ItemID.skullZombieController, 0]);
});