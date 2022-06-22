var GLASS_TYPE_ANTI_EXPLO = Block.createSpecialType({
  destroytime: 1,
  explosionres: 3600000*3,
  sound: "glass"
});

IDRegistry.genBlockID("fusedGlass");
Block.createBlock("fusedGlass", [
  {
    name: "Quite Clear Glass",
    texture: [
	 ["fusedGlassItem", 5]],
    inCreative: true
  }
], GLASS_TYPE_ANTI_EXPLO );

ConnectedTexture.setModelForGlass(BlockID.fusedGlass, -1, "fusedGlassItem");
//bakeModel(BlockID.fusedGlass, 0, "fusedGlassItem");

IDRegistry.genBlockID("fusedQuartz");
Block.createBlock("fusedQuartz", [
  {
    name: "Fused Quartz",
    texture: [
	 ["fusedQuartzItem", 0]],
    inCreative: true
  }
], GLASS_TYPE_ANTI_EXPLO);

ConnectedTexture.setModelForGlass(BlockID.fusedQuartz, -1, "fusedQuartzItem");

Item.addCreativeGroup("glass_modded", Translation.translate("Glass"), [
	BlockID.fusedGlass,
	BlockID.fusedQuartz
]);

//bakeModel(BlockID.fusedQuartz, 0, "fusedQuartzItem");
/*
IDRegistry.genBlockID("reinforcedGlass");
Block.createBlock("reinforcedGlass", [
  {
    name: "Fused Reinforced Glass",
    texture: [
	 ["reinforcedGlass", 0]],
    inCreative: true
  }
]);

bakeModel(BlockID.reinforcedGlass, 0, "reinforcedGlass");
*/
Callback.addCallback("PreLoaded", function() {
 /* RecipeRegistry.addSmelter({
    ingredient1: { id: BlockID.fusedGlass, data: 0, count: 2 },
    ingredient2: { id: 406, data: 0 },
    ingredient3: { id: ItemID.silicon, data: 0, count: 1 },
    result: { id: BlockID.reinforcedGlass, count: 1, data: 0 },
    time: 1200
  });
  */
  RecipeRegistry.addSmelter({
    ingredient1: { id: 12, data: 0, count: 1 },
    ingredient2: { id: 12, data: 0 },
    ingredient3: { id: 12, data: 0, count: 1 },
    result: { id: BlockID.fusedGlass, count: 3, data: 0 },
    time: 700
  });
  RecipeRegistry.addSmelter({
    ingredient1: { id: 406, data: 0, count: 1 },
    ingredient2: { id: 406, data: 0 },
    ingredient3: { id: 406, data: 0, count: 1 },
    result: { id: BlockID.fusedQuartz, count: 3, data: 0 },
    time: 700
  });
});