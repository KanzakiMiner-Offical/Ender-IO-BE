IDRegistry.genBlockID("farmStation");
Block.createBlockWithRotation("farmStation", [
  {
    name: "Farming Station",
    texture: [
	   ["farm_hat_bottom", 0], ["farm_base_top", 0], ["farm_side", 0], ["farm_side", 0], ["farm_side", 0], ["farm_side", 0]
	 ],
    inCreative: true
  }
]);

function setFarm() {
  var farmRender = new ICRender.Model();
  BlockRenderer.setStaticICRender(BlockID.farmStation, 0, farmRender);
  var model = BlockRenderer.createModel();

  model.addBox(0, 0, 0, 16 / 16, 11 / 16, 16 / 16, "farm_side", 0);
  model.addBox(0, 15 / 16, 0, 15 / 16, 1 / 16, 15 / 16, "farm_hat_bottom", 0);
  model.addBox(0, 11 / 16, 0, 13 / 16, 3 / 16, 14 / 16, "farm_side", 0);
  /*
  model.addBox(9 / 16, 4 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(0 / 16, 4 / 16, 0 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 4 / 16, 4 / 16, 9 / 16, 11 / 16, 12 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 8 / 16, 4 / 16, 9 / 16, 10 / 16, 18 / 16, "machineBottom", 0);
  model.addBox(7 / 16, 12 / 16, 4 / 16, 9 / 16, 14 / 16, 12 / 16, "machineBottom", 0);
 */

  farmRender.addEntry(model);
}
setFarm();


Block.setBlockShape(BlockID.farmStation, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });


var farmUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Farming Station" } },
    background: { color: android.graphics.Color.parseColor("#b3b3b3") },
    inventory: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 320, y: 70, bitmap: "FarmingStationInterface", scale: 1.95 },
    { type: "bitmap", x: 373, y: 106, bitmap: "redflux_bar0", scale: 4.1 },
    { type: "bitmap", x: 925, y: 91, bitmap: "empty_button_up", scale: 3.75 },
    ],
  elements: {
    // "text": { type: "text", x: 370, y: 100, width: 100, height: 30, text: "Progress" },
    "energyScale": { type: "scale", x: 373, y: 106, bitmap: "redflux_bar1", scale: 3.9, value: 0.5, direction: 1 },
    //Capacitor
    "slotCapacitor": { type: "slot", x: 367, y: 316, size: 60, bitmap: "empty" },

    "button_0": { type: "button", x: 925, y: 91, scale: 3.75, bitmap: "empty_button_up" },
    // Tools
    "slotHoe": { type: "slot", x: 838, y: 142, size: 66, bitmap: "empty" },
    "slotAxe": { type: "slot", x: 768, y: 142, size: 66, bitmap: "empty" },
    "slotShear": { type: "slot", x: 558, y: 142, size: 66, bitmap: "empty" },
    // Bone Meal
    "slotBone0": { type: "slot", x: 628, y: 142, size: 66, bitmap: "empty" },
    "slotBone1": { type: "slot", x: 490, y: 142, size: 66, bitmap: "empty" },

    // Input
    "slotSeed1": { type: "slot", x: 520, y: 240, size: 70, bitmap: "empty" },
    // "slot_7": { type: "slot", x: 520, y: 240, size: 70, bitmap: "empty" },
    "slotSeed3": { type: "slot", x: 520, y: 310, size: 70, bitmap: "empty" },

    "slotSeed2": { type: "slot", x: 590, y: 240, size: 70, bitmap: "empty" },
    "slotSeed4": { type: "slot", x: 590, y: 310, size: 70, bitmap: "empty" },
    // Output
    "output1": { type: "slot", x: 730, y: 240, size: 68, bitmap: "empty" },
    "output2": { type: "slot", x: 730, y: 310, size: 70, bitmap: "empty" },
    "output3": { type: "slot", x: 730, y: 240, size: 68, bitmap: "empty" },
    "output4": { type: "slot", x: 730, y: 310, size: 70, bitmap: "empty" },
    "output5": { type: "slot", x: 730, y: 240, size: 68, bitmap: "empty" },
    "output6": { type: "slot", x: 730, y: 310, size: 70, bitmap: "empty" }
  }
});


Callback.addCallback("PostLoaded", function() {

  Recipes.addShaped({ id: BlockID.farmStation, count: 1, data: 0 }, [
    	"ifi",
    	"imi",
	   "cac"
  ], ['i', ItemID.electricalSteel, 0, 'f', VanillaItemID.diamond_hoe, 0, "m", BlockID.machineChassi, 0, "c", ItemID.pulsatingCrystal, 0, "a", ItemID.skullZombieController, 0]);
});
MachineRegistry.registerElectricMachine(BlockID.farmStation, {
  defaultValues: {
    // Values
    power_tier: 2,
    progress: 0,
    mode: 0,
    // work_time: 20,
    speed: 1,
    energy_consumption: 40,
    energy_storage: 25000,
    isActive: false,

    // Scan
    scanX: -3,
    scanY: 0,
    scanZ: -3,
    range: 3
  },
  oldValues: {
    speed: 1,
    energy_consumption: 40,
    energy_storage: 25000,
    range: 3
  },

  upgrades: ["capacitor"],

  getTier: function() {
    return this.data.power_tier;
  },

  getGuiScreen: function() {
    return farmUI;
  },

  resetValues: function() {
    this.data.energy_storage = this.oldValues.energy_storage;
    this.data.energy_consumption = this.oldValues.energy_consumption;
    this.data.speed = this.oldValues.speed;
    this.data.range = this.oldValues.range;
  },

  harvest: function(x, y, z) {
    for (let o = 1; o++; o <= 6) {
      var slot = this.container.getSlot("output" + o);
      var block = World.getBlock(x, this.y, z);
      //var putItem = this.putItem
      if (block.id == 86) {
        this.addItemBySlot(slot, 86, 1, 0);
        World.destroyBlock(x, this.y, z);
      }

      if (block.id == 103) {
        this.addItemBySlot(slot, 360, Math.floor(Math.random() * 5 + 3), 0);
        World.destroyBlock(x, this.y, z);
      }

      var isHarvest = false;

      if (block.data == 7) {
        if (block.id == 59) {
          this.addItemBySlot(slot, 295, Math.floor(Math.random() * 3 + 1), 0);
          this.addItemBySlot(slot, 296, 1, 0);

          isHarvest = true;
        }

        if (block.id == 141) {
          this.addItemBySlot(slot, 391, Math.floor(Math.random() * 3 + 1), 0);
          isHarvest = true;
        }
      }

      if (block.data == 3) {
        if (block.id == 142) {
          this.addItemBySlot(slot, 392, Math.floor(Math.random() * 3 + 1), 0);
          if (Math.random() < 0.02) this.addItemBySlot(slot, 394, 1, 0);
          isHarvest = true;
        }

        if (block.id == 244) {
          this.addItemBySlot(slot, 458, Math.floor(Math.random() * 3), 0);
          this.addItemBySlot(slot, 457, Math.floor(Math.random() * 2 + 1), 0);
          isHarvest = true;
        }
      }

      if (isHarvest) World.destroyBlock(x, this.y, z);

    }
  },

  growCrop: function(x, y, z) {
    var seed1 = this.container.getSlot("slotSeed1");
    var seed2 = this.container.getSlot("slotSeed2");
    var seed3 = this.container.getSlot("slotSeed3");
    var seed4 = this.container.getSlot("slotSeed4");
    var x = this.x + x;
    var y = this.y + y;
    var z = this.z + z;

    var seeds = {
      295: 59, // 7
      361: 104, // 7
      362: 105, // 7
      391: 141, // 3
      392: 142, // 3
      458: 244, // 3
    }
    //Grow

    if (World.getBlockID(x, this.y, z) == 0) {
      if (seeds[seed1.id] && World.getBlockID(x, this.y - 1, z) == 60) {
        if (x < 0 && z <= 0) {
          World.setBlock(x, this.y, z, seeds[seed1.id], 0)
          seed1.count--
          this.container.validateAll();
        }
      } else if (seeds[seed2.id] && World.getBlockID(x, this.y - 1, z) == 60) {
        if (x >= 0 && z < 0) {
          World.setBlock(x, this.y, z, seeds[seed2.id], 0)
          seed2.count--
          this.container.validateAll();
        }
      } else if (seeds[seed3.id] && World.getBlockID(x, this.y - 1, z) == 60) {
        if (x <= 0 && z > 0) {
          World.setBlock(x, this.y, z, seeds[seed3.id], 0)
          seed3.count--;
          this.container.validateAll();
        }
      } else if (seeds[seed4.id] && World.getBlockID(x, this.y - 1, z) == 60) {
        if (x > 0 && z >= 0) {
          World.setBlock(x, this.y, z, seeds[seed4.id], 0)
          seed4.count--;
          this.container.validateAll();
        }
      }
    }

    // Sapling

    if (World.getBlockID(x, this.y - 1, z).id == 2 || World.getBlockID(x, this.y - 1, z).id == 3) {
      if (seed1.id == 6) {
        if (x < 0 && z <= 0) {
          if (World.getBlockID(x, this.y, z).id == 0) {
            World.setBlock(x, this.y, z, seed1.id, seed1.data)
            seed1.count--;
            this.container.validateAll();
            Game.message("Grow At: " + x + "+" + y + "+" + z);
          }
        }
      } else if (seed2.id == 6) {
        if (x >= 0 && z < 0) {
          if (World.getBlockID(x, this.y, z).id == 0) {
            World.setBlock(x, this.y, z, seed2.id, seed2.data)
            seed2.count--
            this.container.validateAll();
          }
        }
      } else if (seed3.id == 6) {
        if (x <= 0 && z > 0) {
          if (World.getBlockID(x, this.y, z).id == 0) {
            World.setBlock(x, this.y, z, seed3.id, seed3.data)
            seed3.count
            this.container.validateAll();
          }
        }
      } else if (seed4.id == 6) {
        if (x > 0 && z >= 0) {
          if (World.getBlockID(x, this.y, z) == 0) {
            World.setBlock(x, this.y, z, seed4.id, seed4.data)
            seed4.count
            this.container.validateAll();
          }
        }
      }


    }
  },

  onUseBoneMeal: function(x, y, z) {
    var x = this.x + x;
    var y = this.y + y;
    var z = this.z + z;

    var block = World.getBlock(x, y, z);
    if ((block.id == 59 || block.id == 104 || block.id == 105 || block.id == 141 || block.id == 142 || block.id == 244) && block.data < 7) {
      for (let i = 0; i < 2; i++) {
        var slot = this.container.getSlot("slotBone" + i);
        if (slot.id == VanillaItemID.bone_meal) {
          World.setBlock(x, y, z, block.id, Math.min(block.data + (3 + Math.random() * 3), 7));
          slot.count--;
          this.container.validateAll();
          return;
        }
      }
    }
  },

  hoeDirt: function(x, y, z) {
    var x = this.x + x;
    var y = this.y + y;
    var z = this.z + z;

    //Hoe Dirt
    var slotHoe = this.container.getSlot("slotHoe");
    if (slotHoe.id == VanillaItemID.stone_hoe || slotHoe.id == VanillaItemID.iron_hoe || slotHoe.id == VanillaItemID.wooden_hoe || slotHoe.id == VanillaItemID.diamond_hoe || slotHoe.id == VanillaItemID.netherite_hoe) {
      if ((World.getBlockID(x, this.y - 1, z).id == 3 || World.getBlockID(x, this.y - 1, z).id == 2) && World.getBlockID(x, y, z) == 0) {
        slotHoe.data++;
        World.setBlock(x, this.y - 1, z, 60, 1);
        return;
      }
    }
  },
  axeOak: function(x, y, z) {
    var slotAxe = this.container.getSlot("slotAxe");
    if (slotAxe.id == VanillaItemID.stone_axe || slotAxe.id == VanillaItemID.iron_axe || slotAxe.id == VanillaItemID.wooden_axe || slotAxe.id == VanillaItemID.diamond_axe || slotAxe.id == VanillaItemID.netherite_axe) {
      var block = World.getBlock(this.x + x, this.y + y, this.z + z);
      if (block.id == 17 || block.id == 126 || block.id == 16 || block.id == 161) {
        for (let i = 1; i++; i <= 6) {
          this.addItemBySlot("output" + i, block.id, block.count, block.data)
          World.destroyBlock(this.x + x, this.y + y, this.z + z);
          return;
        }
      }
    }
  },

  MachineDelop: function() {
    var range = this.data.range
    var rangeNegative = 0 - range
    this.data.scanX++;
    if (this.data.scanX >= range) {
      this.data.scanZ++;
      this.data.scanX = rangeNegative;
      if (this.data.scanZ >= range) {
        this.data.scanY++;
        this.data.scanZ = rangeNegative
        if (this.data.scanY >= range) {
          this.data.scanY = 0;
        }
      }
    }
    this.axeOak(this.data.x, this.data.y, this.data.z);
    this.onUseBoneMeal(this.data.x, this.data.y, this.data.z);
    this.hoeDirt(this.data.x, this.data.y, this.data.z);
    this.growCrop(this.data.x, this.data.y, this.data.z);
  },


  tick: function() {
    this.resetValues();
    UpgradeAPI.executeUpgrades(this);

    let newActive = false;

    if (this.data.energy >= this.data.energy_consumption) {
      newActive = true
      this.MachoneDelop()
      this.data.energy -= this.data.energy_consumption
    }
    if (!newActive)
      // this.stopPlaySound(true);
      this.setActive(newActive);
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    //  this.container.setText("text", "Progress" + this.data.progress);
  },

  addItemBySlot: function(slots, id, count, data) {
    if (count > 0) {
      for (let i in slots) {
        var slot = slots[i];

        var maxStack = Item.getMaxStack(slot.id);
        if (slot.id == 0 || slot.id == id && slot.data == data && slot.count < maxStack) {
          slot.id = id;
          slot.data = data;

          var minCount = maxStack - slot.count;
          if (minCount < count) {
            slot.count += Math.min(minCount, count);
            this.addItemBySlot(slot, id, count - minCount, data);
            return;
          } else {
            slot.count += count;
            return;
          }
        }
      }

      //World.drop(this.x + 0.5, this.y + 1.5, this.z + 0.5, id, count, data);
    }
  },

  putItem: function(item) {
    for (var i = 1; i <= 6; i++) {
      var slot = this.container.getSlot("outSlot" + i);
      if (!slot.id || slot.id == item.id && slot.count < Item.getMaxStack(item.id)) {
        var add = Math.min(Item.getMaxStack(item.id) - slot.count, item.count);
        slot.id = item.id;
        slot.count += add;
        slot.data = item.data;
        item.count -= add;
      }
    }
  },

  isInvFull: function() {
    for (var i = 1; i <= 6; i++) {
      var slot = this.container.getSlot("output" + i);
      var maxStack = Item.getMaxStack(slot.id);
      if (!slot.id || slot.count < maxStack) return false;
    }
    return true;
  },

  getEnergyStorage: function() {
    return this.data.energy_storage;
  }
});