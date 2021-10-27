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
    "progressScale0": { type: "scale", x: 527, y: 235, direction: 1, bitmap: "fire_scale1", scale: 3.2, clicker: {
            onClick: function(){
                RecipeViewer && RecipeViewer.RecipeTypeRegistry.openRecipePage("enderio_alloy");
            }
        }},
    "progressScale1": { type: "scale", x: 687, y: 235, direction: 1, bitmap: "fire_scale1", scale: 3.2, clicker: {
            onClick: function(){
                RecipeViewer && RecipeViewer.RecipeTypeRegistry.openRecipePage("enderio_alloy");
            }
        }},
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    "ingridient1": { type: "slot", x: 520, y: 170 },
    "ingridient2": { type: "slot", x: 600, y: 140 },
    "ingridient3": { type: "slot", x: 680, y: 170 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "resultSlot": { type: "slot", x: 600, y: 320 }
  }
});
Callback.addCallback("PostLoaded", function(){

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
    energy_storage: 2000,
    isActive: false
  },
  
  getGuiScreen: function() {
    return simpleAlloyUI;
  },

  tick: function() {
        let ingridient1 = this.container.getSlot("ingridient1");
    let ingridient2 = this.container.getSlot("ingridient2");
    let ingridient3 = this.container.getSlot("ingridient3");
    let resultSlot = this.container.getSlot("resultSlot");

    let newActive = false;
    for (let i in RecipeRegistry.smelter) {
      var Recipe = RecipeRegistry.smelter[i];
      var ingri1 = Recipe.ingridient1;
      var ingri2 = Recipe.ingridient2;
      var ingri3 = Recipe.ingridient3;
      var time = Recipe.time*2;
      var result = Recipe.result
      if (ingridient1.id == ingri1.id && ingridient1.data == ingri1.data && ingridient2.id == ingri2.id && ingridient2.data == ingri2.data && ingridient3.id == ingri3.id && ingridient3.data == ingri3.data) {
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
            ingridient1.count--;
            ingridient2.count--;
            ingridient3.count--;
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