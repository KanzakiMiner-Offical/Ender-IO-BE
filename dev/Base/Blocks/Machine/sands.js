IDRegistry.genBlockID("sliceAndSplice");
Block.createBlockWithRotation("sliceAndSplice", [{ "name": "Slice 'n' splice", "texture": [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]], "inCreative": true }]);

TileRenderer.setStandartModel(BlockID.sliceAndSplice, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sliceAndSplice, 0, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFront", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.sliceAndSplice, 4, [["blockSoulMachineBottom", 0], ["blockSoulMachineTop", 0], ["blockSoulMachineSide", 0], ["sliceAndSpliceFrontOn", 0], ["blockSoulMachineSide", 0], ["blockSoulMachineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.sliceAndSplice);

var SliceAndSpliceGUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Slice 'n' splice" } },
    inventory: { standart: true },
    background: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
    { type: "bitmap", x: 630, y: 235, bitmap: "bar_progress0", scale: 3.2 },
  ],
  elements: {
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    "progressScale": { type: "scale", x: 630, y: 235, bitmap: "bar_progress2", scale: 3.2 },
    "slotInput0": { type: "slot", x: 400, y: 200 },
    "slotInput1": { type: "slot", x: 460, y: 200 },
    "slotInput2": { type: "slot", x: 520, y: 200 },
    "slotInput3": { type: "slot", x: 400, y: 260 },
    "slotInput4": { type: "slot", x: 460, y: 260 },
    "slotInput5": { type: "slot", x: 520, y: 260 },
    "slotOutput": { type: "slot", x: 720, y: 230 },
    "slotAxe": { type: "slot", x: 430, y: 140 },
    "slotShears": { type: "slot", x: 490, y: 140 },
    "slotCapacitor": { type: "slot", x: 325, y: 320 },
    "text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
  }
});

Callback.addCallback("PostLoaded", function() {
  Recipes.addShaped({ id: BlockID.sliceAndSplice, count: 1, data: 0 }, [
    	"shs",
    	"amc",
	   "sss"
  ], ['s', ItemID.soularium, 0, 'h', 397, -1, "a", 258, 0, "c", 359, 0, "m", BlockID.machineChassiSoul, 0]);

  RecipeRegistry.addSliceAndSplice({
    input0: { id: ItemID.soulariumI, data: 0 },
    input1: { id: ItemID.zombieSkull, data: 0 },
    input2: { id: ItemID.soularium, data: 0 },
    input3: { id: ItemID.silicon, data: 0 },
    input4: { id: 331, data: 0 },
    input5: { id: ItemID.silicon, data: 0 },
    output: { id: ItemID.skullZombieController, data: 0 },
    time: 250
  });

  RecipeRegistry.addSliceAndSplice({
    input0: { id: ItemID.energeticAlloy, data: 0 },
    input1: { id: ItemID.zombieSkull, data: 0 },
    input2: { id: ItemID.energeticAlloy, data: 0 },
    input3: { id: ItemID.silicon, data: 0 },
    input4: { id: ItemID.basicCapacitor, data: 0 },
    input5: { id: ItemID.silicon, data: 0 },
    output: { id: ItemID.skullZombieElectrode, data: 0 },
    time: 250
  });
  /*                   
  MachineRecipe.addSliceAndSpliceRecipe(
  [ItemID.soulariumIngot, , ItemID.soulariumIngot,
   ItemID.silicon, 331, ItemID.silicon], {}
  );*/
});

var AXES = {
  258: true,
  271: true,
  274: true,
  279: true,
  286: true,
  "VanillaItemID.netherite_axe": true,
  "ItemID.bronzeAxe": true
}

MachineRegistry.registerElectricMachine(BlockID.sliceAndSplice, {
  defaultValues: {
    power_tier: 2,
    progress: 0,
    work_time: 1000,
    speed: 1,
    energy_consumption: 80,
    energy_storage: 100000,
    isActive: false
  },
  oldValues: {
    speed: 1,
    energy_consumption: 80,
    energy_storage: 100000,
  },
  getGuiScreen: function() {
    return SliceAndSpliceGUI;
  },
  upgrades: ["capacitor"],

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

    let newActive = false;
    let input0 = this.container.getSlot("slotInput0");
    let input1 = this.container.getSlot("slotInput1");
    let input2 = this.container.getSlot("slotInput2");
    let input3 = this.container.getSlot("slotInput3");
    let input4 = this.container.getSlot("slotInput4");
    let input5 = this.container.getSlot("slotInput5");
    let output = this.container.getSlot("slotOutput");
    let slotAxe = this.container.getSlot("slotAxe");
    let slotShears = this.container.getSlot("slotShears");

    let run = false
    for (let i in RecipeRegistry.sliceAndSplice) {
      var recipe = RecipeRegistry.sliceAndSplice[i];
      var in0 = recipe.input0
      var in1 = recipe.input1
      var in2 = recipe.input2
      var in3 = recipe.input3
      var in4 = recipe.input4
      var in5 = recipe.input5
      var out = recipe.output
      var time = recipe.time

      if (input0.id == in0.id && input1.id == in1.id && input2.id == in2.id && input3.id == in3.id && input4.id == in4.id && input5.id == in5.id) {
        run = true;
      }
      this.container.setScale("progressScale", this.data.progress / time)
      if (run && AXES[slotAxe.id] && slotShears.id == 359 && (output.id == out.id && output.count < 64 && output.data == out.data || output.id == 0)) {
        if (this.data.energy >= this.data.energy_consumption) {
          this.data.progress += this.data.speed;
          this.data.energy -= this.data.energy_consumption;
          newActive = true;
          this.data.work_time = time;
          if (this.data.progress >= this.data.work_time) {
            input0.count--;
            input1.count--;
            input2.count--;
            input3.count--;
            input4.count--;
            input5.count--;
            output.id = out.id;
            output.data = out.data;
            output.count++;
            slotAxe.data++;
            slotShears.data++;
            this.data.progress = 0;
            if (Math.random() <= 0.05) {
              if (randomInt(0, 1) == 0) {
                slotAxe.id = 0
              } else slotShears.id = 0;
            }
            this.container.validateAll();

          }

        } else {
          this.data.progress = 0;
        }
      }
    }
    if (!newActive)
      // this.stopPlaySound(true);
      this.setActive(newActive);


    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);

    this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);
  },
  getEnergyStorage: function() {
    return this.data.energy_storage;
  }
});