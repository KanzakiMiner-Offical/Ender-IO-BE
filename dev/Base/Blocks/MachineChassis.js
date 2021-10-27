Block.createChassisBlock = function(type, name) {
let id = "machine" + type;
IDRegistry.genBlockID(id);
Block.createBlock(id, [
  {
    name: name + " Chassis",
    texture: [
	   [id, 0]
  ],
    inCreative: true
  }
]);
mod_tip(BlockID[id])
};
Block.createChassisBlock("Chassi", "Industrial Machine");
Block.createChassisBlock("ChassiSimple", "Simple Machine");
Callback.addCallback("PostLoaded", function() {
  Recipes.addShaped({ id: BlockID.machineChassiSimple, count: 1, data: 0 }, [
  	"aba",
  	"bcb",
	  "aba"
], ['a', VanillaBlockID.iron_bars, 0, 'b', VanillaItemID.iron_ingot, 0, 'c', ItemID.dustInfinity, 0]);

});