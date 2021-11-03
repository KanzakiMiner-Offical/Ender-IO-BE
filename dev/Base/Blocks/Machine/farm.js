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
let CropFarm = [
  { id: 59, age: 7 },
  { id: 244, age: 3 },
  { id: 142, age: 4 },
  { id: 141, age: 4 },
]

var farmUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Farming Station" } },
    background: { color: android.graphics.Color.parseColor("#b3b3b3") },
    inventory: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 320, y: 70, bitmap: "FarmingStationInterface", scale: 1.95 },
    { type: "scale", x: 373, y: 106, bitmap: "redflux_bar0", scale: 4.1 },
    { type: "bitmap", x: 925, y: 91, bitmap: "empty_button_up", scale: 3.75 },
    ],
  elements: {
    // "text": { type: "text", x: 370, y: 100, width: 100, height: 30, text: "Progress" },
    "energyScale": { type: "scale", x: 373, y: 106, bitmap: "redflux_bar1", scale: 3.9, value: 0.5 },
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
    energy_storage: 250000,
    isActive: false,

    signal: 0,
    // 
    // Scan
    scanX: -3,
    scanY: 0,
    scanZ: -3,
    range: 3
  },
  oldValues: {
    speed: 1,
    energy_consumption: 40,
    energy_storage: 250000,
    range: 3
  },

  upgrades: ["capacitor"],

  getTier: function() {
    return this.data.power_tier;
  },

  getGuiScreen: function() {
    return farmUI;
  },

  redstoneUpdate(signal) {
    this.data.signal = signal.power;
  },

  resetValues: function() {
    this.data.energy_storage = this.oldValues.energy_storage;
    this.data.energy_consumption = this.oldValues.energy_consumption;
    this.data.speed = this.oldValues.speed;
    //  this.data.range = this.oldValues.range;
  },
  getXYZ: function() {
    var range = this.data.range
    var rangeNegative = 0 - range
    this.data.scanX++;
    if (this.data.scanX >= range) {
      this.data.scanZ++;
      this.data.scanX = rangeNegative;
      if (this.data.scanZ >= range) {
        this.data.scanY++;
        if (this.data.scanY >= range) {
          this.data.scanY = 0;
        }
      }
    }
  },

  checkDirt: function(x, y, z) {
    return World.getBlock(x, y, z);
  },

  findCrop: function(x, y, z) {
    let findCropValue = World.getBlock(x, y, z)
    return {
      id: findCropValue.id,
      data: findCropValue.data
    }
  },

  doBone: function(x, y, z) {
    var crop1 = [
      59,
      104,
      105
      ];
    var crop2 = [
      144,
      145,
      244
        ]

    for (let i in crop1) {
      if (this.findCrop(x, this.y, z).id == crop1[i]) {
        if (this.findCrop(x, this.y, z).data < 7) {
          World.setBlock(x, y, z, crop1[i], Math.min(this.findCrop(x, this.y, z).data + (3 + Math.random() * 3), 7));

        }

      }
    }
    for (let i in crop2) {
      if (this.findCrop(x, this.y, z).id == crop2[i]) {
        if (this.findCrop(x, this.y, z).data < 3) {
          World.setBlock(x, y, z, crop2[i], Math.min(this.findCrop(x, this.y, z).data + (1 + Math.random() * 2), 3));
        }

      }
    }
  },

  doHoe: function(x, y, z) {
    //Hoe Dirt

    if (this.checkDirt(x, this.y - 1, z).id == 1) {
      World.setBlock(x, this.y - 1, z, 60, 0)
      this.data.energy -= this.data.energy_consumption

    }

    var seeds = {
      295: 59, // 7
      361: 104, // 7
      362: 105, // 7
      391: 141, // 3
      392: 142, // 3
      458: 244, // 3
    }
    //Grow
    var seed1 = this.container.getSlot("slotSeed1");
    var seed2 = this.container.getSlot("slotSeed2");
    var seed3 = this.container.getSlot("slotSeed3");
    var seed4 = this.container.getSlot("slotSeed4");
    if (seeds[seed1.id]) {
      if (x < 0 && z <= 0) {
        if (this.checkDirt(x, this.y, z).id == 0) {
          World.setBlock(x, this.y, z, seed1.id, seed1.data)
          seed1.count--
          this.container.validateAll();
        }
      }
    } else if (seeds[seed2.id]) {
      if (x >= 0 && z < 0) {
        if (this.checkDirt(x, this.y, z).id == 0) {
          World.setBlock(x, this.y, z, seed2.id, seed2.data)
          seed2.count--
          this.container.validateAll();
        }
      }
    } else if (seeds[seed3.id]) {
      if (x <= 0 && z > 0) {
        if (this.checkDirt(x, this.y, z).id == 0) {
          World.setBlock(x, this.y, z, seed3.id, seed3.data)
          seed3.count--;
          this.container.validateAll();
        }
      }
    } else if (seeds[seed4.id]) {
      if (x > 0 && z >= 0) {
        if (this.checkDirt(x, this.y, z).id == 0) {
          World.setBlock(x, this.y, z, seed4.id, seed4.data)
          seed4.count--;
          this.container.validateAll();
        }
      }
    }
    // Harvest


    var block = this.findCrop(x, y, z)
    //var putItem = this.putItem
    if (block.id == 86) {
      this.putItem(86, 1);
      World.destroyBlock(x, y, z);
    }

    if (block.id == 103) {
      this.putItem(360);
      World.destroyBlock(x, y, z);
    }

    var isHarvest = false;

    if (block.data == 7) {
      if (block.id == 59) {
        this.putItem(295);
        this.putItem(296);

        isHarvest = true;
      }

      if (block.id == 141) {
        this.putItem(391);
        isHarvest = true;
      }
    }

    if (block.data == 3) {
      if (block.id == 142) {
        this.putItem(392);
        if (Math.random() < 0.02) this.putItem(394);
        isHarvest = true;
      }

      if (block.id == 244) {
        this.putItem(458);
        this.putItem(457);
        isHarvest = true;
      }
    }

    if (isHarvest) World.destroyBlock(x, y, z);




  },
  doAxe: function(x, y, z) {

    let GetOak = World.getBlock(x, y, z)


    if (GetOak.id == 16 || 126) {
      this.data.energy -= this.data.energy_consumption


      this.putItem(GetOak.id)
      World.destroyBlock(x, y, z, false)

      // Debug :/
      Game.message("Break At: " + x + "+" + y + "+" + z);


    }

    var seed1 = this.container.getSlot("slotSeed1");
    var seed2 = this.container.getSlot("slotSeed2");
    var seed3 = this.container.getSlot("slotSeed3");
    var seed4 = this.container.getSlot("slotSeed4");
    if (seed1.id == 16) {
      if (x < 0 && z <= 0) {
        if (this.checkDirt(x, this.y, z).id == 0) {
          World.setBlock(x, this.y, z, seed1.id, seed1.data)
          seed1.count--;
          this.container.validateAll();
        }
      }
    } else if (seed2.id == 16) {
      if (x >= 0 && z < 0) {
        if (this.checkDirt(x, this.y, z).id == 0) {
          World.setBlock(x, this.y, z, seed2.id, seed2.data)
          seed2.count--
          this.container.validateAll();
        }
      }
    } else if (seed3.id == 16) {
      if (x <= 0 && z > 0) {
        if (this.checkDirt(x, this.y, z).id == 0) {
          World.setBlock(x, this.y, z, seed3.id, seed3.data)
          seed3.count
          this.container.validateAll();
        }
      }
    } else if (seed4.id == 16) {
      if (x > 0 && z >= 0) {
        if (this.checkDirt(x, this.y, z) == 0) {
          World.setBlock(x, this.y, z, seed4.id, seed4.data)
          seed4.count
          this.container.validateAll();
        }
      }
    }
  },
  tick: function() {
    this.resetValues();
    UpgradeAPI.executeUpgrades(this);
    this.getXYZ();
    for (let i = 0; i++; i <= 1) {
      var slotBone = this.container.getSlot("slotBone" + i);
      var sAxe = this.container.getSlot("slotAxe");
      var sHoe = this.container.getSlot("slotHoe");
      var crX = this.x + this.data.scanX
      var crY = this.y + this.data.scanY
      var crZ = this.z + this.data.scanZ
      let newActive = false;
      /*
          if (this.data.mode === 0) this.alloy();
          if (this.data.mode === 1) this.furnace();

          if (this.container.getGuiContent()) {
            this.container.getGuiContent().elements["changeMode"].bitmap = "alloy" + this.data.mode;
          }
      */

      if (this.data.energy >= this.data.energy_consumption) {
        if (sAxe.id == VanillaItemID.stone_axe || VanillaItemID.iron_axe || VanillaItemID.wooden_axe || VanillaItemID.diamond_axe || VanillaItemID.netherite_axe) {
          newActive = true
          this.doAxe(this.x + this.data.scanX, this.y + this.data.scanY, this.z + this.data.scanZ);
          sAxe.data++;
        }

        if (slotBone.id == VanillaItemID.bone_meal) {
          newActive = true
          this.doBone(this.x + this.data.scanX, this.y + this.data.scanY, this.z + this.data.scanZ);
          slotBone.count--
          this.container.validateAll();
        }
        if (sHoe.id == VanillaItemID.stone_hoe || VanillaItemID.iron_hoe || VanillaItemID.wooden_hoe || VanillaItemID.diamond_hoe || VanillaItemID.netherite_hoe) {
          newActive = true
          this.doHoe(this.x + this.data.scanX, this.y + this.data.scanY, this.z + this.data.scanZ);
          sHoe.data++
        }
      }
      if (!newActive)
        // this.stopPlaySound(true);
        this.setActive(newActive);

    }
    var energyStorage = this.getEnergyStorage();
    this.data.energy = Math.min(this.data.energy, energyStorage);
    this.container.setScale("energyScale", this.data.energy / energyStorage);
    //  this.container.setText("text", "Progress" + this.data.progress);

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