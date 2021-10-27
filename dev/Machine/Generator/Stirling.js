IDRegistry.genBlockID("simpleStirlingGen");
Block.createBlockWithRotation("simpleStirlingGen", [
  {
    name: "Simple Stirling Generator",
    texture: [
	["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]],
    inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.simpleStirlingGen, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleStirlingGen, 0, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_off", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);
TileRenderer.registerRotationModel(BlockID.simpleStirlingGen, 4, [["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["block_stirling_gen_simple_front_on", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.simpleStirlingGen);

Callback.addCallback("PostLoaded", function() {
	
  Recipes.addShaped({ id: BlockID.simpleStirlingGen, count: 1, data: 0 },
    ["sas",
     "sfs",
     "gpg"],
    ['s', VanillaBlockID.stonebrick, 0, 'f', BlockID.machineChassiSimple, 0, 'g', ItemID.ironGear, 0, "p", VanillaBlockID.piston, 0, "a", 61, 0]);
    
});

var SimpleStirlingGenGUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Stirling Generator" } },
    inventory: { standart: true },
    background: { standart: true }
  },

  drawing: [
    { type: "bitmap", x: 450, y: 135, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
	],

  elements: {
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
    "burningScale": { type: "scale", x: 450, y: 135, direction: 1, bitmap: "fire_scale1", scale: 3.2 },
    "slotFuel": { type: "slot", x: 441, y: 180 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" }
  }
});



MachineRegistry.registerGenerator(BlockID.simpleStirlingGen, {
  defaultValues: {
    burn: 0,
    burnMax: 0,
    bonus: 1,
    isActive: false
  },
  
  getGuiScreen: function() {
    return SimpleStirlingGenGUI;
  },
  
  getFuel: function(slotName){
		var fuelSlot = this.container.getSlot(slotName);
		if (fuelSlot.id > 0){
			var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
			if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)){
				fuelSlot.count--;
				this.container.validateSlot(slotName);
				
				return burn;
			}
		}
		return 0;
	},

  
	tick: function(){
    this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + ". Bonus energy: x" + this.data.bonus + ".0");

    var energyStorage = this.getEnergyStorage();
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
    if (this.data.burn <= 0 && this.data.energy + 10 * this.data.bonus < energyStorage) {
      this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
    }
    if (this.data.burn > 0 && this.data.energy + 10 * this.data.bonus < energyStorage) {
    	Particles.addFarParticle(Native.ParticleType.smoke, this.x+.5,this.y+1.1,this.z+.5)
        this.data.energy += 10 * this.data.bonus;
            this.data.burn--;
      this.activate();
    } else{
    	this.deactivate();
    }
    this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
  },
  getEnergyStorage: function() {
    return 5000;
  },
  energyTick: function(type, src) {
    let output = Math.min(10 * this.data.bonus, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});

StorageInterface.createInterface(BlockID.simpleStirlingGen, {
	slots: {
		"slotFuel": {input: true}
	},
	isValidInput: function(item){
		return Recipes.getFuelBurnDuration(item.id, item.data) > 0;
	}
});