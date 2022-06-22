function setCombustionRender(blockID, textures) {
  Block.setBlockShape(blockID, { x: 0.1, y: 0, z: 0 }, { x: 0.95, y: 0.95, z: 0.95 });
  BlockRenderer.addRenderCallback(blockID, function(api, coords, block) {
    api.renderBoxId(coords.x, coords.y, coords.z, 0, 0, 0, 0.4, 1, 1, blockID, 0);
    api.renderBoxId(coords.x, coords.y, coords.z, 0.4, 0.125, 0, 0.6, 0.875, 1, blockID, 0);
    api.renderBoxId(coords.x, coords.y, coords.z, 0.6, 0, 0, 1, 1, 1, blockID, 0);
  });

  BlockRenderer.enableCustomRender(blockID);
}



IDRegistry.genBlockID("combustionGenerator");
Block.createBlockWithRotation("combustionGenerator", [
  {
    name: "Combustion Generator",
    texture: [
	["machineBottom", 0], ["combustion_gen_top", 0], ["machineSide", 0],
	["combustion_gen_front", 0], ["machineSide", 0], ["machineSide", 0]],
    inCreative: true
  }
]);

setCombustionRender(BlockID.combustionGenerator);

var combustionGenUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Combustion Generator" } },
    inventory: { standart: true },
    background: { standart: true }
  },

  drawing: [
    { type: "bitmap", x: 490, y: 230, bitmap: "fire_scale0", scale: 3.2 },
    { type: "bitmap", x: 300, y: 110, bitmap: "redflux_bar0", scale: 3.2 },
	],

  elements: {

    "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },


    // in
    "slot1": { type: "slot", x: 570, y: 300, bitmap: "slot_fluid_full" },
    "slot3": { type: "slot", x: 400, y: 300, bitmap: "slot_fluid_empty" },
    // out
    "slot2": { type: "slot", x: 570, y: 360, bitmap: "slot_fluid_empty" },
    "slot4": { type: "slot", x: 400, y: 360, bitmap: "slot_fluid_full" },

    // slot capacitor
    "slotCapacitor": { type: "slot", x: 290, y: 290 },

    // scale
    "energyScale": { type: "scale", x: 300, y: 110, direction: 1, bitmap: "redflux_bar1", scale: 3.2, value: 1 },
    "burningScale": { type: "scale", x: 490, y: 230, direction: 1, bitmap: "fire_scale1", scale: 3.2, value: 1 },
    "liquidHeat": { type: "scale", x: 400, y: 120, direction: 1, bitmap: "tankOverlay", scale: 3.2, value: 1 },
    "liquidCool": { type: "scale", x: 570, y: 120, direction: 1, bitmap: "tankOverlay", scale: 3.2, value: 1 },
  }
});


StorageInterface.createInterface(BlockID.combustionGenerator, {  
  slots: {    
    "slot1": { input: true },
    "slot2": { output: true },
    "slot3": { input: true },
    "slot4": { output: true },
  },

  canReceiveLiquid: function(liquid, side) { return true; },

  canTransportLiquid: function(liquid, side) { return true; }
});

GenFuel.addCoolFuel("water", 12);
GenFuel.addHeatFuel("hootch", 60, 8 / 3, 0.007 /* mb / t */ );
MachineRegistry.registerGenerator(BlockID.combustionGenerator, {
  defaultValues: {
    time: 20,
    progress: 0,
    bonus: 1,
    isActive: false,
    heat_fluid: null,
    cool_fluid: null
  },
  oldValues: {
    bonus: 1
  },

  upgrades: ["capacitor"],

  getGuiScreen: function() {
    return combustionGenUI;
  },

  getLiquidFromItem: MachineRegistry.getLiquidFromItem,
  addLiquidToItem: MachineRegistry.addLiquidToItem,

  resetValues: function() {
    this.data.bonus = this.oldValues.bonus
  },

  init: function() {
    // for (let i in EnderIOLiquid){
    this.liquidStorage.setLimit("water", 5);
    this.liquidStorage.setLimit("hootch", 5);
    this.liquidStorage.setLimit("fireWater", 5);
  },

  MachineRun: function() {
    var energyStorage = this.getEnergyStorage();
    // Run;
    for (let i in GenFuel.coolFuel) {
      for (let e in GenFuel.heatFuel) {
        let coolFuel = GenFuel.coolFuel[i]
        let heatFuel = GenFuel.heatFuel[e]
        // check heat fuel
        if (this.data.heal_fluid == heatFuel.id && this.liquidStorage.getAmount(this.data.heal_fluid) >= heatFuel.amount) {
          // check cool fuel;
          if (this.data.cool_fluid == coolFuel.id && this.liquidStorage.getAmount(this.data.cool_fluid) >= coolFuel.amount * heatFuel.coolCost) {
            if (this.data.energy + heatFuel.product < energyStorage) {
              this.data.progress++;
              if (this.data.progress >= this.data.time) {
                this.data.energy += heatFuel.product // * this.data.bonus;
                this.liquidStorage.getLiquid(coolFuel.id, coolFuel.amount);
                this.liquidStorage.getLiquid(heatFuel.id, heatFuel.amount);
                this.data.progress = 0
              }
            }
          }
        }
      }
    }
    // Get Liquid
    if (!this.data.heat_fluid || this.data.heat_fluid == liquid1.id) {
      var slot1 = this.container.getSlot("slot1");
      var slot2 = this.container.getSlot("slot2");
      this.liquidStorage.getLiquidFromItem(liquid1.id, slot1, slot2);
      this.data.heat_fluid = liquid1.id
    }
    if (this.data.cool_fluid) {
      var slot3 = this.container.getSlot("slot3");
      var slot4 = this.container.getSlot("slot4");
      this.liquidStorage.addLiquidToItem(this.data.cool_fluid, slot3, slot4);
    }

    if (this.data.cool_fluid && this.liquidStorage.getAmount(this.data.cool_fluid) <= 0) {
      this.data.cool_fluid = null
    }

    if (this.data.heal_fluid && this.liquidStorage.getAmount(this.data.heal_fluid) <= 0) {
      this.data.heal_fluid = null
    }
    this.liquidStorage.updateUiScale("liquidHeat", this.data.heat_fluid);
    this.liquidStorage.updateUiScale("liquidCool", this.data.cool_fluid);
  },

  tick: function() {
    // this.resetValues();
    //   UpgradeAPI.executeUpgrades(this);
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setText("text", "RF: " + this.data.energy + "/" + this.getEnergyStorage() + "\n Energy Product:");

    let capacitor = this.container.getSlot("slotCapacitor");
    for (let i in capacitorObj) {
      if (capacitor.id == capacitorObj[i]) {

        this.container.setText("textInstall", "Installed");
        this.MachineRun();
      } else {
        this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
      }

    }
    this.container.setScale("burningScale", this.data.progress / this.data.time);
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
  },
  getEnergyStorage: function() {
    return 100000;
  },
  energyTick: function(type, src) {
    let output = Math.min(60, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});