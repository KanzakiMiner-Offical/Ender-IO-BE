IDRegistry.genBlockID("theVat");
Block.createBlock("theVat", [{ "name": "The Vat", "texture": [["machineBottom", 0]], "inCreative": true }]);

function setVatRender() {
  var vatRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(BlockID.theVat, 0, vatRender);
  var model = BlockRenderer.createModel();

  model.addBox(0 / 16, 0 / 16, 0 / 16, 16 / 16, 4 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(9 / 16, 4 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(0 / 16, 4 / 16, 0 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 4 / 16, 4 / 16, 9 / 16, 11 / 16, 12 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 8 / 16, 4 / 16, 9 / 16, 10 / 16, 18 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 12 / 16, 4 / 16, 9 / 16, 14 / 16, 12 / 16, "machineBottom", 0);

  vatRender.addEntry(model);
}

Block.setBlockShape(BlockID.theVat, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });

setVatRender()

var VatGUI = new UI.StandartWindow({
  standart: {
    header: {text: {text: "The Vat" }},
    inventory: {standart: true},
    background: {standart: true}
  },
  drawing: [
    {type: "bitmap", x: 281, y: -190, bitmap: "backgroundVat", scale: 3.3},
  ],
  elements: {
    "energyScale": {type: "scale", x: 446, y: 131, direction: 1, bitmap: "redflux_bar1", scale: 2.75},
    "slotInput0": {type: "slot", x: 590, y: 130, bitmap: "empty", isTransparentBackground: true},
    "slotInput1": {type: "slot", x: 753, y: 130, bitmap: "empty", isTransparentBackground: true},
    "liquidScale1": {type: "scale", x: 508, y: 130, direction: 1, bitmap: "fluid_scale", scale: 3},
    "liquidScale2": {type: "scale", x: 856, y: 130, direction: 1, bitmap: "fluid_scale", scale: 3},
    "progressScale": {type: "scale", x: 679, y: 304, direction: 1, bitmap: "fire_scale1", scale: 3.3, clicker: {
            onClick: function(){
                RecipeViewer && RecipeViewer.RecipeTypeRegistry.openRecipePage("enderio_vat");
            }
        }}, 
    "slot1": {type: "slot",  x: 502, y: 296, size: 60, bitmap: "slot_fluid_full"},
    "slot3": {type: "slot", x: 842, y: 296, size: 60, bitmap: "slot_fluid_empty",},
    "slot2": {type: "slot", x: 502, y: 366, size: 60, bitmap: "slot_fluid_empty"},
    "slot4": {type: "slot", x: 842, y: 359, size: 60, bitmap: "slot_fluid_full"},
  }
});

Callback.addCallback("PostLoaded", function() {
  Recipes.addShaped({ id: BlockID.theVat, count: 1, data: 0 }, [
      	"ici",
      	"rmr",
	     "ifi"
    ], ['i', ItemID.electricalSteel, 0, 'c', 380, 0, "r", BlockID.reservoir, 0, 'f', 61, 0, "m", BlockID.machineChassi, 0
  ]);

  RecipeRegistry.addVat({
    input1: { id: 296, data: 0 },
    input2: { id: 353, data: 0 },
    liquidOut: { id: "hootch", count: 1 },
    liquidIn: { id: "water", count: 1 },
    time: 100
  });
  
  RecipeRegistry.addVat({
    input1: { id: 295, data: 0 },
    input2: { id: 353, data: 0 },
    liquidOut: { id: "hootch", count: 1 },
    liquidIn: { id: "water", count: 1 },
    time: 100
  });
  
  RecipeRegistry.addVat({
    input1: { id: 392, data: 0 },
    input2: { id: 353, data: 0 },
    liquidOut: { id: "hootch", count: 1 },
    liquidIn: { id: "water", count: 1 },
    time: 100
  });
  /*
    MachineRecipe.addVatRecipe([[363, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
    MachineRecipe.addVatRecipe([[365, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
    MachineRecipe.addVatRecipe([[319, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
    MachineRecipe.addVatRecipe([[367, 0], [353, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
    
    MachineRecipe.addVatRecipe([[296, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
    MachineRecipe.addVatRecipe([[295, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
    MachineRecipe.addVatRecipe([[392, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
    
    MachineRecipe.addVatRecipe([[377, 0], [331, 0]], {liquid: "fireWater", usedLiquid: "hootch"});
    
    MachineRecipe.addVatRecipe([[289, 0], [331, 0]], {liquid: "rocketFuel", usedLiquid: "hootch"});
    */
});


MachineRegistry.registerElectricMachine(BlockID.theVat, {
  defaultValues: {
    power_tier: 2,
    progress: 0,
    mode: 0,
    work_time: 0,
    speed: 1,
    energy_consumption: 30,
    energy_storage: 100000,
    isActive: false,
    
    // Fluid :>
    
    resultFluid: null,
    inputFluid: null

  },
  oldValues: {
    speed: 1,
    energy_consumption: 30,
    energy_storage: 100000
  },

  upgrades: ["capacitor"],
  
  getTier: function() {
    return this.data.power_tier;
  },

  getGuiScreen: function() {
    return VatGUI;
  },

  getLiquidFromItem: MachineRegistry.getLiquidFromItem,
  addLiquidToItem: MachineRegistry.addLiquidToItem,

  resetValues: function() {
    this.data.energy_storage = this.oldValues.energy_storage;
    this.data.energy_consumption = this.oldValues.energy_consumption;
    this.data.speed = this.oldValues.speed;
  },
  init: function() {
  	// for (let i in EnderIOLiquid){
    this.liquidStorage.setLimit("water", 4);
    this.liquidStorage.setLimit("hootch", 4);
    this.liquidStorage.setLimit("nutrientDistillation", 4);
  },
  tick: function() {
    this.resetValues();
    UpgradeAPI.executeUpgrades(this);

    let i0 = this.container.getSlot("slotInput0")
    let i1 = this.container.getSlot("slotInput1")
    let storage = this.liquidStorage;
    let newActive = false;

    for (var i in RecipeRegistry.theVat) {
      var recipe = RecipeRegistry.theVat[i];
      var input1 = recipe.input1;
      var input2 = recipe.input2;
      var liquid1 = recipe.liquidIn;
      var liquid2 = recipe.liquidOut;
      var time = recipe.time;
        let inputFluid = this.data.inputFluid;
        let resultFluid = this.data.resultFluid;
     
      if (i0.id == input1.id && i1 == input2.id && (inputFluid == liquid1.id && this.liquidStorage.getAmount(inputFluid) == liquid1.count && this.liquidStorage.getAmount(inputFluid) >= 1) && (this.liquidStorage.getAmount(resultFluid) == liquid2.count && this.liquidStorage.getAmount(resultFluid) <= 3 || !resultFluid)) {
        if (this.data.energy >= this.data.energy_consumption) {
          newActive = true;
          this.data.energy -= this.data.energy_consumption;
          this.data.progress += this.data.speed;
          this.data.work_time = time;
          if (this.data.progress >= this.data.work_time) {
            i0.count--;
            i1.count--;
            storage.getLiquid(liquid1.id, 1);
            storage.addLiquid(liquid2.id, 1);
            this.data.resultFluid = liquid2.id
            this.container.validateAll();
            this.data.progress = 0;
          }
        } else {
          this.data.progress = 0;
        }
      }
      
      if (!newActive)
        // this.stopPlaySound(true);
        this.setActive(newActive);
        

        if(!this.data.inputFluid || this.data.inputFluid == liquid1.id){
        var slot1 = this.container.getSlot("slot1");
		var slot2 = this.container.getSlot("slot2");
		this.getLiquidFromItem(liquid1.id, slot1, slot2);
		this.data.inputFluid = liquid1.id
		}
		if(this.data.resultFluid){
		var slot3 = this.container.getSlot("slot3");
		var slot4 = this.container.getSlot("slot4");
		this.addLiquidToItem(this.data.resultFluid, slot3, slot4);
		}
		
		this.liquidStorage.updateUiScale("liquidScale1", this.data.inputFluid);
		this.liquidStorage.updateUiScale("liquidScale2", this.data.resultFluid);
    }
    
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    //  this.container.setText("text", this.data.energy + "/" + energyStorage);
  },
  getEnergyStorage: function() {
    return this.data.energy_storage;
  }
  
});