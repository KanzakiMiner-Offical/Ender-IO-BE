IDRegistry.genBlockID("simplePoweredFurnace");
Block.createBlockWithRotation("simplePoweredFurnace", [
  {
    name: "Simple Powered Furnace",
    texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
    inCreative: true
  }
]);
TileRenderer.setStandartModel(BlockID.simplePoweredFurnace, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplePoweredFurnace, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simplePoweredFurnace, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["furnace_simple_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simplePoweredFurnace);
/*
function setSimpleAlloyRender() {
  var simpleAlloyRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(BlockID.simplePoweredFurnace, 0, simpleAlloyRender);
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

var simpleFurnaceUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Powered Furnace" } },
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
    "ingredient1": { type: "slot", x: 600, y: 140 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "resultSlot": { type: "slot", x: 600, y: 320 }
  }
});
Callback.addCallback("PostLoaded", function() {

  Recipes.addShaped({ id: BlockID.simplePoweredFurnace, count: 1, data: 0 }, [
    	"ibi",
    	"fmf",
	   "aca"
  ], ['i', 265, 0, 'f', 98, 0, "m", BlockID.machineChassiSimple, 0, "c", VanillaItemID.bucket, 0, "a", ItemID.stoneGear, 0, "b", 61,0]);

});
MachineRegistry.registerElectricMachine(BlockID.simplePoweredFurnace, {
  defaultValues: {
    power_tier: 1,
    progress: 0,
    mode: 0,
    work_time: 0,
    speed: 0.5,
    energy_consumption: 15,
    energy_storage: 2000,
    isActive: false
  },

  getGuiScreen: function() {
    return simpleFurnaceUI;
  },

  tick: function() {
    let ingredient1 = this.container.getSlot("ingredient1");
    let result = this.container.getSlot("resultSlot");
    let rec = Recipes.getFurnaceRecipeResult(ingredient1.id, "iron");

    let newActive = false;
    if (rec) {
      if ((result.id == rec.id && result.data == rec.data && result.count <= 64 || result.id == 0)) {
        if (this.data.energy >= this.data.energy_consumption) {
          this.data.energy -= this.data.energy_consumption;
          this.data.progress += this.data.speed;
          Particles.addParticle(Native.ParticleType.smoke, this.x, this.y, this.z, 0, 0, 0);
          Particles.addParticle(Native.ParticleType.flame, this.x, this.y, this.z, 0, 0, 0);
          newActive = true;
        }
        if (this.data.progress >= 100) {
          result.id = rec.id;
          result.data = rec.data;
          result.count++;
          this.data.progress = 0;
          ingredient1.count--;
          this.container.validateAll();
        }

      } else {
        this.data.progress = 0;
      }
      if (!newActive) {
        // this.stopPlaySound(true);
        this.setActive(newActive);
      }
    }
    this.container.setScale("progressScale0", this.data.progress / 100 || 0);
    this.container.setScale("progressScale1", this.data.progress / 100 || 0);

    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    this.container.setText("text", this.data.energy + "/" + energyStorage);
  },
  getEnergyStorage: function() {
    return this.data.energy_storage;
  }


});