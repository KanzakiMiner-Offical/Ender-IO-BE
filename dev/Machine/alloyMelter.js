IDRegistry.genBlockID("simpleAlloySmelter");
Block.createBlockWithRotation("simpleAlloySmelter", [
  {
    name: "Simple Alloy Smelter",
    texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
    inCreative: true
  }
]);
TileRenderer.setStandartModel(BlockID.simpleAlloySmelter, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleAlloySmelter, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleAlloySmelter, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["alloy_smelter_front_on_simple", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simpleAlloySmelter);
/*
function setSimpleAlloyRender() {
  var simpleAlloyRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(BlockID.simpleAlloySmelter, 0, simpleAlloyRender);
  var model = BlockRenderer.createModel();
  //model.addBox(x, y, z, x, y, z, texture, 0);
  model.addBox(1 / 16, 12 / 16, 14.75 / 16, 15 / 16, 15 / 16, 15.75 / 16, "machineBottom", 0);
  model.addBox(9 / 16, 4 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(0 / 16, 4 / 16, 0 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 4 / 16, 4 / 16, 9 / 16, 11 / 16, 12 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 8 / 16, 4 / 16, 9 / 16, 10 / 16, 18 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 12 / 16, 4 / 16, 9 / 16, 14 / 16, 12 / 16, "machineBottom", 0);

  simpleAlloyRender.addEntry(model);
}

setSimpleAlloyRender();*/

var simpleAlloyUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Alloy Smelter" } },
    inventory: { standart: true },
    background: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        //{type: "bitmap", x: 600, y: 170, bitmap: "bar_alloy", scale: 4.5},
    ],
  elements: {
    "progressScale0": {
      type: "scale",
      x: 527,
      y: 235,
      direction: 1,
      bitmap: "fire_scale1",
      scale: 3.2,
      clicker: {
        onClick: function() {
          RV && RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
        }
      }
    },
    "progressScale1": {
      type: "scale",
      x: 687,
      y: 235,
      direction: 1,
      bitmap: "fire_scale1",
      scale: 3.2,
      clicker: {
        onClick: function() {
          RV && RV.RecipeTypeRegistry.openRecipePage("enderio_alloy");
        }
      }
    },
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    "ingredient1": { type: "slot", x: 520, y: 170 },
    "ingredient2": { type: "slot", x: 600, y: 140 },
    "ingredient3": { type: "slot", x: 680, y: 170 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "resultSlot": { type: "slot", x: 600, y: 320 }
  }
});
Callback.addCallback("PostLoaded", function() {

  Recipes.addShaped({ id: BlockID.simpleAlloySmelter, count: 1, data: 0 }, [
    	"bbb",
    	"fmf",
	   "ici"
  ], ['i', ItemID.stoneGear, 0, 'f', 61, 0, "m", BlockID.machineChassiSimple, 0, "c", VanillaItemID.bucket, 0, "b", VanillaItemID.iron_ingot, 0]);

});
MachineRegistry.registerElectricMachine(BlockID.simpleAlloySmelter, {
  defaultValues: {
    power_tier: 1,
    progress: 0,
    mode: 0,
    work_time: 0,
    speed: 1,
    energy_consumption: 15,
    energy_storage: 3000,
    isActive: false
  },

  getGuiScreen: function() {
    return simpleAlloyUI;
  },

  tick: function() {
    let ingredient1 = this.container.getSlot("ingredient1");
    let ingredient2 = this.container.getSlot("ingredient2");
    let ingredient3 = this.container.getSlot("ingredient3");
    let resultSlot = this.container.getSlot("resultSlot");

    let newActive = false;
    for (let i in RecipeRegistry.smelter) {
      var Recipe = RecipeRegistry.smelter[i];
      var ingri1 = Recipe.ingredient1;
      var ingri2 = Recipe.ingredient2;
      var ingri3 = Recipe.ingredient3;
      var time = Recipe.time * 2;
      var result = Recipe.result
      if (ingredient1.id == ingri1.id && ingredient1.data == ingri1.data && (ingredient1.count >= ingri1.count) && ingredient2.id == ingri2.id && ingredient2.data == ingri2.data && ingredient3.id == ingri3.id && ingredient3.data == ingri3.data && (ingredient3.count >= ingri3.count) && (resultSlot.id == result.id && resultSlot.count < 64 && resultSlot.data == result.data || resultSlot.id == 0)) {
        this.data.work_time = time;
        if (this.data.energy >= this.data.energy_consumption) {
          newActive = true;
          this.data.energy -= this.data.energy_consumption;
          this.data.progress += this.data.speed;
          Particles.addParticle(Native.ParticleType.smoke, this.x, this.y, this.z, 0, 0, 0);
          Particles.addParticle(Native.ParticleType.flame, this.x, this.y, this.z, 0, 0, 0);
          if (this.data.progress >= this.data.work_time) {
            resultSlot.id = result.id;
            resultSlot.data = result.data;
            resultSlot.count += result.count;
            ingredient1.count -= ingri1.count;
            ingredient2.count--;
            ingredient3.count -= ingri3.count;
            this.container.validateAll();
            this.data.progress = 0;
          }
        } else {
          this.data.progress = 0;
        }
        if (!newActive)
          // this.stopPlaySound(true);
          this.setActive(newActive);
      }
      this.container.setScale("progressScale0", this.data.progress / time);
      this.container.setScale("progressScale1", this.data.progress / time);
    }

    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    this.container.setText("text", this.data.energy + "/" + energyStorage);
  },
  getEnergyStorage: function() {
    return this.data.energy_storage;
  }


});