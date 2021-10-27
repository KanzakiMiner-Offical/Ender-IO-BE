Block.createResourceBlock = function(id, name) {
  IDRegistry.genBlockID(id + "Block");
  Block.createBlock(id + "Block", [
    { name: name + " Block", texture: [[id + "Block", 0]], inCreative: true }
	 ], "opaque");

  Callback.addCallback("PostLoaded", function() {
    Recipes.addShaped({ id: BlockID[id + "Block"], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[id], 0]);
    Recipes.addShapeless({ id: ItemID[id], count: 9, data: 0 }, [{ id: BlockID[id + "Block"], data: 0 }]);
  });
  mod_tip(BlockID[id + "Block"])
};

Block.createResourceBlock("conductiveIron", "Conductive Iron");
Block.createResourceBlock("darkSteel", "Dark Steel");
Block.createResourceBlock("electricalSteel", "Electrical Steel");
Block.createResourceBlock("soulariumIngot", "Soularium");
Block.createResourceBlock("redstoneAlloy", "Redstone Alloy");

