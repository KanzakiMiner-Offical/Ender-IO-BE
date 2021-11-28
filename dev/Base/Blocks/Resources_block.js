Block.createResourceBlock = function(id, name) {
  var bid = "block" + id;
  IDRegistry.genBlockID(bid);
  Block.createBlock(bid, [
    { name: name + " Block", texture: [[id + "Block", 0]], inCreative: true }
	 ], "opaque");

  Callback.addCallback("PostLoaded", function() {
    Recipes.addShaped({ id: BlockID[bid], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[id], 0]);
    Recipes.addShapeless({ id: ItemID[id], count: 9, data: 0 }, [{ id: BlockID[bid], data: 0 }]);
  });
  mod_tip(BlockID[id + "Block"])
};

Block.createResourceBlock("ConductiveIron", "Conductive Iron");
Block.createResourceBlock("DarkSteel", "Dark Steel");
Block.createResourceBlock("ElectricalSteel", "Electrical Steel");
Block.createResourceBlock("Soularium", "Soularium Alloy");
Block.createResourceBlock("RedstoneAlloy", "Redstone Alloy");

Block.createResourceBlock("EndSteel", "End Steel");
Block.createResourceBlock("EnergeticAlloy", "Energetic Alloy");
Block.createResourceBlock("PulsatingIron", "Pulsating Iron");




