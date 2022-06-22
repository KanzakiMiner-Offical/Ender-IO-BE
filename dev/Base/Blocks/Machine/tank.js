IDRegistry.genBlockID("eioTank");
Block.createBlock("eioTank", [
   { name: "Fluid Tank", texture: [["basic_tank", 0]], inCreative: true }
], "machine");

let EIOTank = {
   setStoragePlaceFunction: function(id) {

      Block.registerPlaceFunction(BlockID[id], function(coords, item, block) {
         var place = World.canTileBeReplaced(block.id, block.data) ? coords : coords.relative;
         World.setBlock(place.x, place.y, place.z, item.id, 0);
         World.playSound(place.x, place.y, place.z, "dig.stone", 1, 0.8)
         var tile = World.addTileEntity(place.x, place.y, place.z);
         if (item.extra) {
            let name_fluid = item.extra.getString("fluid")
            let amount_fluid = item.extra.getInt("amount")
            if (amount_fluid > 0) {
               tile.liquidStorage.addLiquid(name_fluid, amount_fluid);
            }
         }
      });
   }
}

Callback.addCallback("PreLoaded", function() {
   Recipes.addShaped({ id: BlockID.eioTank, count: 1, data: 0 }, [
      	"iri",
      	"rmr",
	     "iri"
    ], ['i', VanillaItemID.iron_ingot, 0, "r", VanillaTileID.iron_bars, 0, "m", VanillaBlockID.glass, -1
  ]);
});
var guiTank = new UI.StandartWindow({
   standart: {
      header: { text: { text: Translation.translate("Fluid Tank") } },
      inventory: { standart: true },
      background: { standart: true }
   },

   drawing: [
      { type: "bitmap", x: 611, y: 88, bitmap: "liquid_bar", scale: GUI_SCALE },
	],

   elements: {
      "liquidScale": { type: "scale", x: 400 + 70 * GUI_SCALE, y: 50 + 16 * GUI_SCALE, direction: 1, value: 0.5, bitmap: "gui_water_scale", overlay: "gui_liquid_storage_overlay", scale: GUI_SCALE },
      "slotLiquid1": {
         type: "slot",
         x: 400 + 94 * GUI_SCALE,
         y: 50 + 16 * GUI_SCALE,
         isValid: function(id, count, data) {
            return (LiquidRegistry.getFullItem(id, data, "water") || LiquidLib.getEmptyItem(id, data)) ? true : false;
         }
      },
      "slotLiquid2": { type: "slot", x: 470 + 94 * GUI_SCALE, y: 50 + 16 * GUI_SCALE },
      "slotOut": { type: "slot", x: 400 + 94 * GUI_SCALE, y: 50 + 40 * GUI_SCALE, isValid: function() { return false; } },

   }
});

StorageInterface.createInterface(BlockID.eioTank, {
   slots: {
      "slotLiquid1": { input: true },
      "slotLiquid2": { input: true },
      "slotOut": { output: true }
   },
   isValidInput: function(item) {
      return LiquidRegistry.getFullItem(item.id, item.data, "water") || LiquidLib.getEmptyItem(item.id, item.data);
   },
   canReceiveLiquid: function(liquid, side) { return true; },
   canTransportLiquid: function(liquid, side) { return true; }
});

MachineRegistry.registerPrototype(BlockID.eioTank, {


   getGuiScreen: function() {
      return guiTank;
   },

   init: function() {
      this.liquidStorage.setLimit(null, 16);
   },


   getLiquidFromItem: MachineRegistry.getLiquidFromItem,
   addLiquidToItem: MachineRegistry.addLiquidToItem,


   click: function(id, count, data, coords) {
      if (Entity.getSneaking(Player.get())) {
         var liquid = this.liquidStorage.getLiquidStored();
         return this.getLiquidFromItem(liquid, { id: id, count: count, data: data }, null, true);
      }
   },

   tick: function() {
      UpgradeAPI.executeUpgrades(this);

      var storage = this.liquidStorage;
      var liquid = storage.getLiquidStored();
      var slot1 = this.container.getSlot("slotLiquid1");
      var slot2 = this.container.getSlot("slotLiquid2");
      var out = this.container.getSlot("slotOut");
      this.getLiquidFromItem(liquid, slot1, out);
      if (liquid) {
         this.addLiquidToItem(liquid, slot2, out);
      }
      this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());
   },
   destroyBlock: function(coords, player) {
      var extra;
      var liquid = this.liquidStorage.getLiquidStored()
      if (liquid) {
         extra = new ItemExtraData();
         extra.putString("fluid", liquid);
         extra.putInt("amount", this.liquidStorage.getAmount(liquid));
         //alert(extra);
      }
      World.drop(coords.x + .5, coords.y + .5, coords.z + .5, BlockID.eioTank, 1, 0, extra);
      //debug;

   }

});

EIOTank.setStoragePlaceFunction("eioTank");