IDRegistry.genBlockID("sagmill");
Block.createBlockWithRotation("sagmill", [
  {
    name: "SAG Mill",
    texture: [
	   ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]
	 ],
    inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.sagmill, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sagmill, 0, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sagmill, 4, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["crusherFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.sagmill);

/*
ICRender.getGroup("bc-container").add(BlockID.sagmill, -1);
ICRender.getGroup("item-pipe").add(BlockID.sagmill, -1);

*/
var SAGGui = new UI.StandartWindow({
  standart: {
    header: { text: { text: "SAG Mill" } },
    inventory: { standart: true },
    background: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
    { type: "bitmap", x: 595, y: 250, bitmap: "bar_progress_down0", scale: 4.2 },
    { type: "bitmap", x: 765, y: 165, bitmap: "bar_silicon0", scale: 6.8 },
    ],
  elements: {
    "progressScale": { type: "scale", x: 595, y: 250, direction: 3, bitmap: "bar_progress_down1", scale: 4.2, clicker: {
            onClick: function(){
                RecipeViewer && RecipeViewer.RecipeTypeRegistry.openRecipePage("enderio_sag");
            }
        }},
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
    "siliconScale": { type: "scale", x: 765, y: 165, direction: 1, value: 0.5, bitmap: "bar_silicon1", scale: 6.8 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "ingridient": { type: "slot", x: 602, y: 170 },
    "slotSilicon": { type: "slot", x: 700, y: 170 },
    "slotCapacitor": { type: "slot", x: 325, y: 310 },
    "result0": { type: "slot", x: 505, y: 340 },
    "result1": { type: "slot", x: 570, y: 340 },
    "result2": { type: "slot", x: 635, y: 340 },
    "result3": { type: "slot", x: 700, y: 340 }
  }
});

MachineRegistry.registerElectricMachine(BlockID.sagmill, {

  defaultValues: {
    power_tier: 2,
    progress: 0,
    silicon: 0,
    speed: 1,
    energy_consumption: 30,
    energy_storage: 100000,
    work_time: 0,
    isActive: false
  },
  oldValues: {
    speed: 1,
    energy_consumption: 20,
    energy_storage: 100000
  },

  upgrades: ["capacitor"],

  getGuiScreen: function() {
    return SAGGui;
  },

  getTier: function() {
    return this.data.power_tier;
  },

  resetValues: function() {
    this.data.energy_storage = this.oldValues.energy_storage;
    this.data.energy_consumption = this.oldValues.energy_consumption;
    this.data.speed = this.oldValues.speed;
  },

  tick: function() {
    this.resetValues();
    UpgradeAPI.executeUpgrades(this);

    let ingridient = this.container.getSlot("ingridient");
    let res0 = this.container.getSlot("result0");
    let res1 = this.container.getSlot("result1");
    let res2 = this.container.getSlot("result2");
    let res3 = this.container.getSlot("result3");
    let newActive = false;

    let silicon = this.container.getSlot("slotSilicon");
    if (silicon.id == 318 && this.data.silicon == 0) {
      silicon.count--;
      this.data.silicon += 10;
      this.container.validateAll();
    }
    
    if (this.data.silicon < 0){
    	this.data.silicon = 0
    }
    
    for (let i in RecipeRegistry.crusher) {
      let recipe = RecipeRegistry.crusher[i];
      var time = recipe.time;
      if (this.data.silicon > 0) {
        time = Math.round(recipe.time / 1.25);
      }
      // KTRA ĐIỆN NĂNG VÀ OUTPUT
      if (ingridient.id == recipe.ingridient.id && ingridient.data == recipe.ingridient.data) {
        this.data.work_time = time;
        if (this.data.energy >= this.data.energy_consumption) {
        	Particles.addParticle(Native.ParticleType.itemBreak, this.x, this.y+.1, this.z, 0, 0, 0)
          newActive = true;
          this.data.energy -= this.data.energy_consumption;
          this.data.progress += this.data.speed;
          if (this.data.progress >= this.data.work_time) {
            ingridient.count--;
            var RDM = Math.random() * 1;
            /*
            var Chance0 = recipe.result0.chance;
            var Chance1 = recipe.result1.chance
            var Chance2 = recipe.result2.chance;
            var Chance3 = recipe.result3.chance
            switch (RDM){
            	 case Chance0:
              res0.id = recipe.result0.id;
              res0.data = recipe.result0.data;
              res0.count++;
              break;
                 case Chance1:
              res1.id = recipe.result1.id;
              res1.data = recipe.result1.data;
              res1.count++;
              break;
                 case Chance2:
              res2.id = recipe.result2.id;
              res2.data = recipe.result2.data;
              res2.count++;
              break;
                 case Chance3:
              res3.id = recipe.result3.id;
              res3.data = recipe.result3.data;
              res3.count++;
              break;
            }
            */
            if (RDM <= recipe.result0.chance) {
              res0.id = recipe.result0.id;
              res0.data = recipe.result0.data;
              res0.count++;
            }
            if (RDM <= recipe.result1.chance) {
              res1.id = recipe.result1.id;
              res1.data = recipe.result1.data;
              res1.count++;
            }
            if (RDM <= recipe.result2.chance) {
              res2.id = recipe.result2.id;
              res2.data = recipe.result2.data;
              res2.count++;
            }
            if (RDM <= recipe.result3.chance) {
              res3.id = recipe.result3.id;
              res3.data = recipe.result3.data;
              res3.count++;
            }
            this.container.validateAll();
            this.data.progress = 0;
            this.data.silicon--;

          }
                } else {
        this.data.progress = 0;
      }
        }
        if (!newActive)
          // this.stopPlaySound(true);
          this.setActive(newActive);
          
      this.container.setScale("progressScale", this.data.progress / this.data.work_time);
    }

    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    this.container.setScale("siliconScale", this.data.silicon / 10);

    this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);

  },
  getEnergyStorage: function() {
    return this.data.energy_storage;
  }
  
});

Callback.addCallback("PostLoaded", function(){
	// Ifn't have Machine Addon 
	/*
Recipes.addShaped({ id: BlockID.sagmill, count: 1, data: 0 }, [
    	"fff",
    	"imi",
	     " p "
  ], ['i', ItemID.darkSteel, 0, 'f', VanillaItemID.flint 0, "m", BlockID.machineChassi, 0, "p", VanillaItemID.piston, 0]);
  */
 Recipes.addShaped({ id: BlockID.sagmill, count: 1, data: 0 }, [
    	"fff",
    	"ipi",
	     " m "
  ], ['i', ItemID.darkSteel, 0, 'f', VanillaItemID.flint, 0, "m", BlockID.simplesagmill, 0, "p", BlockID.machineChassi, 0]);
/*
RecipeRegistry.addCrusher({
  ingridient: { id: BlockID.oreAluminum, data: 0 },
  result0: { id: ItemID.dustAluminum, data: 0, chance: 1 },
  result1: { id: ItemID.dustAluminum, data: 0, chance: 1 },
  result2: { id: 0, data: 0, chance: 0 },
  result3: { id: 4, data: 0, chance: 0.15 },
  time: 180
});
*/
RecipeRegistry.addCrusher({
  ingridient: { id: 49, data: 0 },
  result0: { id: ItemID.dustObsidian, data: 0, chance: 1 },
  result1: { id: ItemID.dustObsidian, data: 0, chance: 1 },
  result2: { id: ItemID.dustObsidian, data: 0, chance: 1 },
  result3: { id: ItemID.dustObsidian, data: 0, chance: 1 },
  time: 200
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaBlockID.gold_ore, data: 0 },
  result0: { id: ItemID.dustGold, data: 0, chance: 1 },
  result1: { id: ItemID.dustGold, data: 0, chance: 1 },
  result2: { id: ItemID.dustSilver, data: 0, chance: 0.4 },
  result3: { id: ItemID.dustCopper, data: 0, chance: 0.2 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaBlockID.iron_ore, data: 0 },
  result0: { id: ItemID.dustIron, data: 0, chance: 1 },
  result1: { id: ItemID.dustIron, data: 0, chance: 1 },
  result2: { id: ItemID.dustTin, data: 0, chance: 0.05 },
  result3: { id: ItemID.dustNickel, data: 0, chance: 1 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: ItemID.pulsatingCrystal, data: 0 },
  result0: { id: ItemID.dustPulsating, data: 0, chance: 1 },
  result1: { id: 0, data: 0, chance: 0 },
  result2: { id: 0, data: 0, chance: 0 },
  result3: { id: 0, data: 0, chance: 0 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaBlockID.coal_ore, data: 0 },
  result0: { id: 263, data: 0, chance: 1 },
  result1: { id: 263, data: 0, chance: 1 },
  result2: { id: 264, data: 0, chance: 0.01 },
  result3: { id: ItemID.dustCoal, data: 0, chance: 0.75 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaBlockID.sand, data: 0 },
  result0: { id: ItemID.silicon, data: 0, chance: 0.5 },
  result1: { id: 0, data: 0, chance: 1 },
  result2: { id: 0, data: 0, chance: 1 },
  result3: { id: 0, data: 0, chance: 1 },
  time: 80
});

RecipeRegistry.addCrusher({
  ingridient: { id: 4, data: 0 },
  result0: { id: 13, data: 0, chance: 0.7 },
  result1: { id: 13, data: 0, chance: 0.3 },
  result2: { id: 12, data: 0, chance: 0.1 },
  result3: { id: 318, data: 0, chance: 0.05 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaBlockID.quartz_ore, data: 0 },
  result0: { id: ItemID.dustQuarzt, data: 0, chance: 1 },
  result1: { id: ItemID.dustQuarzt, data: 0, chance: 0.75 },
  result2: { id: VanillaBlockID.netherrack, data: 0, chance: 0.6 },
  result3: { id: VanillaItemID.quartz, data: 0, chance: 0.5 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaItemID.quartz, data: 0 },
  result0: { id: ItemID.dustQuarzt, data: 0, chance: 1 },
  result1: { id: ItemID.dustQuarzt, data: 0, chance: 0.1 },
  result2: { id: 0, data: 0, chance: 0 },
  result3: { id: 0, data: 0, chance: 0 },
  time: 100
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaBlockID.lapis_ore, data: 0 },
  result0: { id: ItemID.dustLapis, data: 0, chance: 1 },
  result1: { id: ItemID.dustLapis, data: 0, chance: 0.75 },
  result2: { id: 4, data: 0, chance: 0.6 },
  result3: { id: VanillaItemID.lapis_lazuli, data: 0, chance: 0.5 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: VanillaItemID.lapis_lazuli, data: 0 },
  result0: { id: ItemID.dustLapis, data: 0, chance: 1 },
  result1: { id: ItemID.dustLapis, data: 0, chance: 0.1 },
  result2: { id: 0, data: 0, chance: 0 },
  result3: { id: 0, data: 0, chance: 0 },
  time: 100
});

RecipeRegistry.addCrusher({
  ingridient: { id: 296, data: 0 },
  result0: { id: ItemID.dustWheat, data: 0, chance: 1 },
  result1: { id: VanillaItemID.wheat_seed, data: 0, chance: 0.45 },
  result2: { id: 0, data: 0, chance: 0 },
  result3: { id: 0, data: 0, chance: 0 },
  time: 100
});

});

StorageInterface.createInterface(BlockID.sagmill, {
	slots: {
		"ingridient": {input: true,
			isValid: function(item){
				return RecipeRegistry.getInCrusher(item.id);
			}
		},
		"result0": {output: true},
		"result1": {output: true},
		"result2": {output: true}
	}
});