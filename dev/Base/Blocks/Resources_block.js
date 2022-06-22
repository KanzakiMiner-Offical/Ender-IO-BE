Block.createResourceBlock = function(id, name) {
  var newID = id.charAt(0).toUpperCase() + id.substr(1);
  var bid = "block" + newID //id;
  IDRegistry.genBlockID(bid);
  Block.createBlock(bid, [
    { name: name + " Block", texture: [[id + "Block", 0]], inCreative: true }
	 ], "opaque");

  Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({ id: BlockID[bid], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[id], 0]);
    Recipes.addShapeless({ id: ItemID[id], count: 9, data: 0 }, [{ id: BlockID[bid], data: 0 }]);
  });
 // mod_tip(BlockID[bid])
};

Block.createResourceBlock("conductiveIron", "Conductive Iron");
Block.createResourceBlock("darkSteel", "Dark Steel");
Block.createResourceBlock("electricalSteel", "Electrical Steel");
Block.createResourceBlock("soularium", "Soularium Alloy");
Block.createResourceBlock("redstoneAlloy", "Redstone Alloy");

Block.createResourceBlock("endSteel", "End Steel");
Block.createResourceBlock("energeticAlloy", "Energetic Alloy");
Block.createResourceBlock("pulsatingIron", "Pulsating Iron");




