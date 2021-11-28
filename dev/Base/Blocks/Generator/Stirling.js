IDRegistry.genBlockID("stirlingGen");
Block.createBlockWithRotation("stirlingGen", [
  {
    name: "Stirling Generator",
    texture: [
	["machineBottom", 0], ["machineTop", 0], ["machineSide", 0],
	["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]],
    inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.stirlingGen, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.stirlingGen, 0, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.stirlingGen, 4, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["stirlingGenFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.stirlingGen);

Callback.addCallback("PostLoaded", function() {
  
  Recipes.addShaped({ id: BlockID.stirlingGen, count: 1, data: 0 },
    ["   ",
     "sfs",
     "gpg"],
    ['s', ItemID.darkSteel, 0, 'f', BlockID.machineChassi, 0, 'g', ItemID.darkSteelGear, 0, "p", BlockID.simpleStirlingGen, 0]);
    
});

var stirlingGenGUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Stirling Generator" } },
    inventory: { standart: true },
    background: { standart: true }
  },

  drawing: [
    { type: "bitmap", x: 450, y: 135, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
	],

  elements: {
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, value: 0.5, bitmap: "redflux_bar1", scale: 3.2 },
        "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 50, height: 30, text: "" },
    "burningScale": { type: "scale", x: 450, y: 135, direction: 1, bitmap: "fire_scale1", scale: 3.2 },
    "slotFuel": { type: "slot", x: 441, y: 180 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
    "slotCapacitor": { type: "slot", x: 325, y: 320 }
  }
});



MachineRegistry.registerGenerator(BlockID.stirlingGen, {
  defaultValues: {
    burn: 0,
    burnMax: 0,
    bonus: 1,
    isActive: false
  },
  oldValues: {
    bonus: 1
  },

  upgrades: ["capacitor"],

  getGuiScreen: function() {
    return stirlingGenGUI;
  },

  getFuel: function(slotName) {
    var fuelSlot = this.container.getSlot(slotName);
    if (fuelSlot.id > 0) {
      var burn = Recipes.getFuelBurnDuration(fuelSlot.id, fuelSlot.data);
      if (burn && !LiquidRegistry.getItemLiquid(fuelSlot.id, fuelSlot.data)) {
        fuelSlot.count--;
        this.container.validateSlot(slotName);

        return burn;
      }
    }
    return 0;
  },

  resetValues: function() {
    this.data.bonus = this.oldValues.bonus
  },
  
  MachineRun: function(){
   let energyStorage = this.getEnergyStorage();
    if (this.data.burn <= 0 && this.data.energy + 40 * this.data.bonus < energyStorage) {
      this.data.burn = this.data.burnMax = this.getFuel("slotFuel") / 4;
    }
    if (this.data.burn > 0 && this.data.energy + 20 * this.data.bonus < energyStorage) {
      Particles.addFarParticle(Native.ParticleType.smoke, this.x - .5, this.y + 1.1, this.z + .5)
      this.data.energy += 40 * this.data.bonus;
      this.data.burn--;
      this.activate();
    } else {
      this.deactivate();
    }
    
        var randomXYZ = []
    randomXYZ.push({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10), z: Math.floor(Math.random() * 10) });
    var tempBlockList = {
      10: 2.5,
      11: 3,
      50: 1,
      213: 2
    }
    for (let i in randomXYZ) {
      if (tempBlockList[World.getBlockID(this.x + randomXYZ[i].x, this.y + randomXYZ[i].y, this.z + randomXYZ[i].z).id]) {
        this.data.energy += 30 * this.data.bonus * tempAcces;
      }
     }
    
  },
  
  tick: function() {
    this.resetValues();
    UpgradeAPI.executeUpgrades(this);
    /*  let slotCapacitor = this.container.getSlot("slotCapacitor");
		for(let i in capacitorObj){
			var capac = capacitorObj[i];
    if (slotCapacitor.id != capac) {
      this.data.bonus = this.oldValues.bonus
    }
    }*/
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + ". Bonus energy: x" + this.data.bonus + ".0");

    let capacitor = this.container.getSlot("slotCapacitor");
    for(let i in capacitorObj){
     if(capacitor.id == capacitorObj[i]){
     	this.container.setText("textInstall", "Installed");
     this.MachineRun();
    } else {
    	this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
    }
    
    }
    this.container.setScale("burningScale", this.data.burn / this.data.burnMax || 0);
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
  },
  getEnergyStorage: function() {
    return 100000;
  },
  energyTick: function(type, src) {
    let output = Math.min(40 * this.data.bonus, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});

StorageInterface.createInterface(BlockID.stirlingGen, {
  slots: {
    "slotFuel": { input: true }
  },
  isValidInput: function(item) {
    return Recipes.getFuelBurnDuration(item.id, item.data) > 0;
  }
});