// Helper (From Factory Craft)
MachineRegistry.machineContainer = {
  addItemToContainer: function(container, item, size, prefix, index) {
    if (!size) { s = 28 } else { s = size }!prefix ? prefix = "" : null;
    for (var index = index ? index : 1; index <= s; index++) {
      var slot = container.getSlot("slot" + prefix + index);
      if ((slot.id == item.id && slot.data == item.data) || slot.id == 0) {
        if (slot.count <= Item.getMaxStack(item.id)) {
          var maxcount = Item.getMaxStack(item.id) - slot.count;
          if (item.count <= maxcount) {
            container.setSlot("slot" + prefix + index, item.id, slot.count + item.count, item.data);
            container.validateAll();
            return false
          }
          if (item.count > maxcount) {
            container.setSlot("slot" + prefix + index, item.id, slot.count + maxcount, item.data);
            container.validateAll();
            item.count -= maxcount;
          }
        }
      }
    }
    return item.count
  },
  isItemInContainer: function(container, item, size, prefix, index) {
    if (!size) { s = 28 } else { s = size }!prefix ? prefix = "" : null;
    for (var index = index ? index : 1; index <= s; index++) {
      var slot = container.getSlot("slot" + prefix + index);
      if (slot.id == item.id && (slot.data == item.data || item.data == -1)) {
        item.count = Math.max(item.count - slot.count, 0)
      }
    }
    if (item.count == 0) return true
    return false
  },
  giveItemFromContainer: function(container, item, size, prefix, index) {
    if (!size) { s = 28 } else { s = size }!prefix ? prefix = "" : null;
    for (var index = index ? index : 1; index < s; index++) {
      var slot = container.getSlot("slot" + prefix + index);
      if (slot.id == item.id && (slot.data == item.data || item.data == -1)) {
        if (slot.count >= item.count) {
          container.setSlot("slot" + prefix + index, item.id, slot.count - item.count, item.data);
          container.validateAll();
          return true
        }
        if (slot.count < item.count) {
          item.count -= slot.count;
          container.setSlot("slot" + prefix + index, item.id, 0, item.data);
          container.validateAll();
        }
      }
    }
    return false
  }
}

// 
IDRegistry.genBlockID("crafter");
Block.createBlockWithRotation("crafter", [
  {
    name: "Crafter",
    texture: [
	   ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["block_crafter_solid", 0], ["machineSide", 0], ["machineSide", 0]
	 ],
    inCreative: true
  }
], "opaque");

var craftUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Crafter" } },
    background: { color: android.graphics.Color.parseColor("#b3b3b3") },
    inventory: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 120, y: -160, bitmap: "backgroundCrafter", scale: 2.4 },
	  ],
  elements: {
   "energyScale": { type: "scale", x: 297, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    // Capacitor
    "slotCapacitor": { type: "slot", x: 297, y: 298, size: 52, bitmap: "empty" },
    // Input
    "slot0": { type: "slot", x: 377, y: 146, size: 60, bitmap: "empty" },
    "slot1": { type: "slot", x: 437, y: 146, size: 60, bitmap: "empty" },
    "slot2": { type: "slot", x: 497, y: 146, size: 60, bitmap: "empty" },

    "slot3": { type: "slot", x: 377, y: 206, size: 60, bitmap: "empty" },
    "slot4": { type: "slot", x: 437, y: 206, size: 60, bitmap: "empty" },
    "slot5": { type: "slot", x: 497, y: 206, size: 60, bitmap: "empty" },

    "slot6": { type: "slot", x: 377, y: 266, size: 60, bitmap: "empty" },
    "slot7": { type: "slot", x: 437, y: 266, size: 60, bitmap: "empty" },
    "slot8": { type: "slot", x: 497, y: 266, size: 60, bitmap: "empty" },

    "slotInput": {
      type: "slot",
      x: 575,
      y: 207,
      size: 60,
      bitmap: "empty",
      clicker: {
        onClick: function(position, container, tileEntity) {
          return;
        },
        onLongClick: function(position, container, tileEntity) {
          this.onClick(position, container, tileEntity);
        }
      }
    },
    // Output
    "slotI0": { type: "slot", x: 654, y: 146, size: 60, bitmap: "empty" },
    "slotI1": { type: "slot", x: 714, y: 146, size: 60, bitmap: "empty" },
    "slotI2": { type: "slot", x: 774, y: 146, size: 60, bitmap: "empty" },
    "slotI3": { type: "slot", x: 654, y: 206, size: 60, bitmap: "empty" },
    "slotI4": { type: "slot", x: 714, y: 206, size: 60, bitmap: "empty" },
    "slotI5": { type: "slot", x: 774, y: 206, size: 60, bitmap: "empty" },
    "slotI6": { type: "slot", x: 654, y: 266, size: 60, bitmap: "empty" },
    "slotI7": { type: "slot", x: 714, y: 266, size: 60, bitmap: "empty" },
    "slotI8": { type: "slot", x: 774, y: 266, size: 60/*bitmap: "empty" */},
    
    "slotOutput": { type: "slot", x: 852, y: 207, size: 60, bitmap: "empty" },
  }
});

MachineRegistry.registerElectricMachine(BlockID.crafter, {

  defaultValues: {
    power_tier: 2,
    progress: 0,
    speed: 1,
    energy_consumption: 40,
    energy_storage: 100000,
    work_time: 200,
    isActive: false
  },
  oldValues: {
    speed: 1,
    energy_consumption: 40,
    energy_storage: 100000
  },

  upgrades: ["capacitor"],

  getGuiScreen: function() {
    return craftUI;
  },

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

    var res = Recipes.getRecipeResult(this.container);
    if (res) {
      this.container.setSlot("slotInput", res.id, res.count, res.data);
    } else {
      this.container.setSlot("slotInput", 0, 0, 0);
    }

    var resultSlot = this.container.getSlot("slotResult");

    var craft = this.canCraft();

    if (craft && res && this.data.energy >= 5 && ((res.id == resultSlot.id && res.data == resultSlot.data && resultSlot.count < 64 - res.count) || resultSlot.id == 0)) {
      newActive = true;
      this.data.energy -= 5;
      this.data.progress++;
      if (this.data.progress >= this.data.work_time) {
        resultSlot.id = res.id;
        resultSlot.data = res.data;
        resultSlot.count += res.count;

        for (var i in craft) {
          var it = craft[i];
          MachineRegistry.machineContainer.giveItemFromContainer(this.container, { id: it.id, data: it.data, count: it.count }, 11, "I");
        }

        this.container.validateAll();
        this.data.progress = 0;
      }

    } else {
      this.data.progress = 0;
    }
    if (!newActive) {
      // this.stopPlaySound(true);
      this.setActive(newActive);
    }

    this.container.setScale("progressScale", this.data.progress / this.data.work_time);


    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);

    this.container.setText("text", "RF: " + this.data.energy + "/" + energyStorage);

  },
  canCraft: function() {
    var ingredients = {}
    for (var i = 0; i < 9; i++) {
      var slot = this.container.getSlot("slot" + i);
      if (slot.id != 0) ingredients[slot.id + ":" + slot.data] = { id: slot.id, data: slot.data, count: this.getNativeCount(slot.id, slot.data) }
      if (slot.id != 0 && !MachineRegistry.machineContainer.isItemInContainer(this.container, { id: slot.id, data: slot.data, count: this.getNativeCount(slot.id, slot.data) }, 11, "I")) return false;
    }
    return ingredients;
  },

  getNativeCount: function(id, data) {
    var count = 0;
    for (var i = 0; i < 9; i++) {
      var slot = this.container.getSlot("slot" + i);
      if (slot.id == id && slot.data == data) count++;
    }
    return count
  },

  getEnergyStorage: function() {
    return this.data.energy_storage;
  }

});