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
//mod_tip(BlockID[id])
};
Block.createChassisBlock("Chassi", "Industrial Machine");
Block.createChassisBlock("ChassiSimple", "Simple Machine");
Block.createChassisBlock("ChassiSoul", "Soul Machine");
Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.machineChassiSimple, count: 1, data: 0 }, [
  	"aba",
  	"bcb",
	  "aba"
], ['a', VanillaBlockID.iron_bars, 0, 'b', VanillaItemID.iron_ingot, 0, 'c', ItemID.dustInfinity, 0]);

});

ModAPI.addAPICallback("ICore", function(api) {
Callback.addCallback("PreLoaded", function() {
  Recipes.addShaped({ id: BlockID.machineChassiSimple, count: 1, data: 0 }, [
  	"aba",
  	"bcb",
	  "aba"
], ['a', VanillaBlockID.iron_bars, 0, 'b', ItemID.ingotCopper, 0, 'c', ItemID.dustInfinity, 0]);

});

});
