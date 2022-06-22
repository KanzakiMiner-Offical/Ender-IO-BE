IDRegistry.genBlockID("simpleWirelessTranfer");
Block.createBlockWithRotation("simpleWirelessTranfer", [
  {
    name: "Simple Wireless Tranfer",
    texture: [
	   ["simple_machine_bottom", 0], ["simple_machine_top", 0], ["simple_machine_side", 0], ["simpleWirelessTranfer", 0], ["simple_machine_side", 0], ["simple_machine_side", 0]
	 ],
    inCreative: true
  }
], "opaque");

var swtGUI = new UI.StandartWindow({
  standart: {
    header: { text: { text: "Simple Wireless Tranfer" } },
    inventory: { standart: true },
    background: { standart: true }
  },
  drawing: [
    { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
  ],
  elements: {
    "energyScale": { type: "scale", x: 335, y: 140, direction: 1, bitmap: "redflux_bar1", scale: 3.2 },
    "textInfo": { type: "text", x: 500, y: 140, width: 350, height: 30, text: "0/" }
    /*
        "slotCharge0": {type: "slot", x: 480, y: 300, bitmap: "chargeSlot"},
        "slotCharge1": {type: "slot", x: 580, y: 300, bitmap: "chargeSlot"},
        "slotCharge2": {type: "slot", x: 680, y: 300, bitmap: "chargeSlot"},
        "slotCharge3": {type: "slot", x: 780, y: 300, bitmap: "chargeSlot"},*/
  }
});

Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.simpleWirelessTranfer, count: 1, data: 0 }, [
    	"ici",
    	"crc",
	   "ici"
  ], ['i', ItemID.conductiveIron, 0, 'c', ItemID.dustInfinity, 0, "r", BlockID.machineChassiSimple, 0]);
});

MachineRegistry.registerRFStorage(BlockID.simpleWirelessTranfer, {
  defaultValues: {
    meta: 0,
    x: -5,
    y: -5,
    z: -5
  },
  getTier: function() {
    return 1;
  },
  getGuiScreen: function() {
    return swtGUI;
  },
  scan: function() {
    this.data.x++;
    if (this.data.x > 5) {
      this.data.x = -5;
      this.data.z++;
      if (this.data.z > 5) {
        this.data.z = -5;
        this.data.y++;
        if (this.data.y > 5) {
          this.data.y = -5;
        }
      }
    }
    let tile = World.getTileEntity(this.x + this.data.x, this.y + this.data.y, this.z + this.data.z);
    if (tile && this.data.energy > 770 && tile.data.energy + 770 <= tile.getEnergyStorage()) {
      this.data.energy -= 770;
      tile.data.energy += 770;
    }
    let direct = [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
      { x: 0, y: 2, z: 0 },
      { x: 0, y: -2, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: -2, y: 0, z: 0 },
      { x: 0, y: 0, z: 2 },
      { x: 0, y: 0, z: -2 },
	   	];
    for (i in direct) {
      let dir = direct[i];
      let tile = World.getTileEntity(this.x + dir.x, this.y + dir.y, this.z + dir.z);
      if (tile && this.data.energy >= 770 && tile.data.energy + 770 <= tile.getEnergyStorage()) {
        this.data.energy -= 770;
        tile.data.energy += 770;
      }
    }
  },

  tick: function() {
    this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
    this.container.setText("textInfo", this.data.energy + "/" + this.getEnergyStorage() + " RF");
    if (this.data.energy >= 770) {
      this.scan();
    }

  },
  getEnergyStorage: function() {
    return 770000;
  },
  energyTick: function(type, src) {
    var output = Math.min(770, this.data.energy);
    this.data.energy += src.add(output) - output;
  },
  destroyBlock: function(coords, player) {
    var extra;
    if (this.data.energy > 0) {
      extra = new ItemExtraData();
      extra.putInt("energy", this.data.energy);
    }
    World.drop(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.simpleWirelessTranfer, 1, 0, extra);
  }
});