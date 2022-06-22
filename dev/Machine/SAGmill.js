IDRegistry.genBlockID("simplesagmill");
Block.createBlockWithRotation("simplesagmill", [
  {
    name: "Simple SAG Mill",
    texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
    inCreative: true
  }
]);
TileRenderer.setStandartModel(BlockID.simplesagmill, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplesagmill, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplesagmill, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_simple_sagmill_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simplesagmill);
/*
ICRender.getGroup("bc-container").add(BlockID.simplesagmill, -1);
ICRender.getGroup("item-pipe").add(BlockID.simplesagmill, -1);

*/
ICRender.getGroup("item-pipe").add(BlockID.simplesagmill, -1);
var SimpleSAGGui = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple SAG Mill" } },
    inventory: { standart: true },
    background: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
    { type: "bitmap", x: 595, y: 250, bitmap: "bar_progress_down0", scale: 4.2 },
    { type: "bitmap", x: 765, y: 165, bitmap: "bar_silicon0", scale: 6.8 },
    ],
  elements: {
    "progressScale": {
      type: "scale",
      x: 595,
      y: 250,
      direction: 3,
      bitmap: "bar_progress_down1",
      scale: 4.2,
      clicker: {
        onClick: function() {
          RV && RV.RecipeTypeRegistry.openRecipePage("enderio_sag");
        }
      }
    },
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
    "siliconScale": { type: "scale", x: 765, y: 165, direction: 1, value: 0.5, bitmap: "bar_silicon1", scale: 6.8 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "ingredient": { type: "slot", x: 602, y: 170 },
    "slotSilicon": { type: "slot", x: 700, y: 170 },
    "result0": { type: "slot", x: 505, y: 340 },
    "result1": { type: "slot", x: 570, y: 340 },
    "result2": { type: "slot", x: 635, y: 340 },
    "result3": { type: "slot", x: 700, y: 340 }
  }
});

MachineRegistry.registerElectricMachine(BlockID.simplesagmill, {

  defaultValues: {
    power_tier: 1,
    progress: 0,
    silicon: 0,
    speed: 0.5,
    energy_consumption: 15,
    energy_storage: 2000,
    work_time: 0,
    isActive: false
  },

  getGuiScreen: function() {
    return SimpleSAGGui;
  },

  getTier: function() {
    return this.data.power_tier;
  },

  tick: function() {

    let ingredient = this.container.getSlot("ingredient");
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

    if (this.data.silicon < 0) {
      this.data.silicon = 0
    }

    for (let i in RecipeRegistry.crusher) {
      let recipe = RecipeRegistry.crusher[i];
      var time = recipe.time;
      if (this.data.silicon > 0) {
        time = Math.round(recipe.time / 1.15);
      }
      // KTRA ĐIỆN NĂNG VÀ OUTPUT
      if (ingredient.id == recipe.ingredient.id && ingredient.data == recipe.ingredient.data /*&& ((res0.id = recipe.result0.id || 0) && (res1.id = recipe.result1.id || 0) && (res2.id == recipe.result2.id || 0) && (res3.id == recipe.result3.id || 0))*/) {
        this.data.work_time = time;
        if (this.data.energy >= this.data.energy_consumption) {
          Particles.addFarParticle(Native.ParticleType.itemBreak, this.x, this.y + .1, this.z)
          newActive = true;
          this.data.energy -= this.data.energy_consumption;
          this.data.progress += this.data.speed;
          if (this.data.progress >= this.data.work_time) {
            ingredient.count--;
            var RDM = Math.random() * 1;
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
            
            this.data.progress = 0;
            this.data.silicon--;
            this.container.validateAll();
             
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

Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.simplesagmill, count: 1, data: 0 }, [
    	"fff",
    	"imi",
	     "apa"
  ], ['i', VanillaItemID.iron_ingot, 0, 'f', VanillaItemID.flint, 0, "m", BlockID.machineChassiSimple, 0, "p", VanillaBlockID.piston, 0, "a", ItemID.stoneGear, 0]);

});

StorageInterface.createInterface(BlockID.simplesagmill, {
  slots: {
    "ingredient": {
      input: true,
      isValid: function(item) {
        return RecipeRegistry.getInCrusher(item.id);
      }
    },
    "result0": { output: true },
    "result1": { output: true },
    "result2": { output: true }
  }
});