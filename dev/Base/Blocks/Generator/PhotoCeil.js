IDRegistry.genItemID("platePhotovoltaic");
Item.createItem("platePhotovoltaic", "Photovoltaic Plate", { name: "item_material_plate_photovoltaic" }, { stack: 64 });

IDRegistry.genItemID("dustPhotovoltaic");
Item.createItem("dustPhotovoltaic", "Photovoltaic Composite", { name: "item_material_powder_photovoltaic" }, { stack: 64 });

IDRegistry.genBlockID("photovoltaicCell");
Block.createBlock("photovoltaicCell", [
  {
    name: "Photovoltaic Cell",
    texture: [
	["solarPanelSide", 0], ["solarPanelTop", 0], ["solarPanelSide", 0]],
    inCreative: true
  }
]);
Block.setBlockShape(BlockID.photovoltaicCell, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });

Callback.addCallback("PostLoaded", function() {
  Recipes.addShaped({ id: BlockID.advancedPhotovoltaicCell, count: 1, data: 0 },
    ["aga",
     "sgs",
     "epe"],
  ['e', ItemID.energeticAlloy, 0, 'a', ItemID.vibrantCrystal, 0, 's', ItemID.pulsatingIron, 0, 'p', 151, 0, 'g', BlockID.fusedQuartz, 0]);

  Recipes.addShaped({ id: BlockID.photovoltaicCell, count: 1, data: 0 },
    ["aga",
     "ppp",
     "ese"],
  ['e', ItemID.basicCapacitor, 0, 'a', ItemID.energeticAlloy, 0, 's', 151, 0, 'p', ItemID.platePhotovoltaic, 0, 'g', BlockID.fusedQuartz, 0]);

  Recipes.addShaped({ id: BlockID.photovoltaicCell, count: 1, data: 0 },
    ["aga",
     " p ",
     "ese"],
  ['e', ItemID.basicCapacitor, 0, 'a', ItemID.energeticAlloy, 0, 's', 151, 0, 'p', BlockID.simplePhotovoltaicCell, 0, 'g', BlockID.fusedQuartz, 0]);

  Recipes.addShaped({ id: ItemID.dustPhotovoltaic, count: 1, data: 0 },
    ["   ",
     "sgp",
     "   "],
  ['s', ItemID.silicon, 0, 'p', ItemID.dustLapis, 0, 'g', ItemID.dustCoal, 0]);
  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.dustPhotovoltaic, data: 0, count: 2 },
    ingredient2: { id: 0, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0 },
    result: { id: ItemID.platePhotovoltaic, count: 6, data: 0 },
    time: 500
  });
});

MachineRegistry.registerGenerator(BlockID.photovoltaicCell, {
  defaultValues: {
    canSeeSky: false
  },

  tick: function() {
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    if (World.getThreadTime() % 100 == 0) {
      this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
    }
    if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == 15) {
      this.data.energy += 40;
    }
  },

  getEnergyStorage: function() {
    return 400;
  },
  energyTick: function(type, src) {
    let output = Math.min(40, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});


IDRegistry.genBlockID("advancedPhotovoltaicCell");
Block.createBlock("advancedPhotovoltaicCell", [
  {
    name: "Advanced Photovoltaic Cell",
    texture: [
	["solarPanelAdvancedSide", 0], ["solarPanelAdvancedTop", 0], ["solarPanelAdvancedSide", 0]],
    inCreative: true
  }
]);
Block.setBlockShape(BlockID.advancedPhotovoltaicCell, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });

MachineRegistry.registerGenerator(BlockID.advancedPhotovoltaicCell, {
  defaultValues: {
    canSeeSky: false
  },

  tick: function() {
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    if (World.getThreadTime() % 100 == 0) {
      this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
    }
    if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == 15) {
      this.data.energy += 80;
    }
  },

  getEnergyStorage: function() {
    return 800;
  },

  energyTick: function(type, src) {
    let output = Math.min(80, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});





IDRegistry.genBlockID("vibrantPhotovoltaicCell");
Block.createBlock("vibrantPhotovoltaicCell", [
  {
    name: "Vibrant Photovoltaic Cell",
    texture: [
	["solarPanelVibrantSide", 0], ["solarPanelVibrantTop", 0], ["solarPanelVibrantSide", 0]],
    inCreative: true
  }
]);
Block.setBlockShape(BlockID.vibrantPhotovoltaicCell, { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });


MachineRegistry.registerGenerator(BlockID.vibrantPhotovoltaicCell, {
  defaultValues: {
    canSeeSky: false
  },

  tick: function() {
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    if (World.getThreadTime() % 100 == 0) {
      this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
    }
    if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == 15) {
      this.data.energy += 160;
    }
  },

  getEnergyStorage: function() {
    return 1600;
  },

  energyTick: function(type, src) {
    let output = Math.min(160, this.data.energy);
    this.data.energy += src.add(output) - output;
  }
});

// Export API 
function CreatePhotovoltaicCell(id, energyCre, Stor, lightMax) {
  var LightReq;
  if (lightMax) {
    LightReq = lightMax
  } else {
    LightReq = 15
  }
  Block.setBlockShape(BlockID[id], { x: 0, y: 0, z: 0 }, { x: 1, y: 0.2, z: 1 });


  MachineRegistry.registerGenerator(BlockID[id], {
    defaultValues: {
      canSeeSky: false
    },

    tick: function() {
      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      if (World.getThreadTime() % 100 == 0) {
        this.data.canSeeSky = GenerationUtils.canSeeSky(this.x, this.y + 1, this.z);
      }
      if (this.data.canSeeSky && World.getLightLevel(this.x, this.y + 1, this.z) == LightReq) {
        this.data.energy += energyCre;
      }
    },

    getEnergyStorage: function() {
      return Stor;
    },

    energyTick: function(type, src) {
      let output = Math.min(energyCre, this.data.energy);
      this.data.energy += src.add(output) - output;
    }
  });

}