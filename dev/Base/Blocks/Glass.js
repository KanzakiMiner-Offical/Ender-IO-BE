IDRegistry.genBlockID("fusedGlass");
Block.createBlock("fusedGlass", [
  {
    name: "Fused Glass",
    texture: [
	 ["fusedGlassItem", 0]],
    inCreative: true
  }
]);

bakeModel(BlockID.fusedGlass, 0, "fusedGlassItem");

IDRegistry.genBlockID("fusedQuartz");
Block.createBlock("fusedQuartz", [
  {
    name: "Fused Quartz",
    texture: [
	 ["fusedQuartzItem", 0]],
    inCreative: true
  }
]);

bakeModel(BlockID.fusedQuartz, 0, "fusedQuartzItem");

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

Callback.addCallback("PostLoaded", function() {
  RecipeRegistry.addSmelter({
    ingredient1: { id: BlockID.fusedGlass, data: 0, count: 2 },
    ingredient2: { id: 406, data: 0 },
    ingredient3: { id: ItemID.silicon, data: 0, count: 1 },
    result: { id: BlockID.reinforcedGlass, count: 1, data: 0 },
    time: 1200
  });
  
  RecipeRegistry.addSmelter({
    ingredient1: { id: 12, data: 0, count: 1 },
    ingredient2: { id: 12, data: 0 },
    ingredient3: { id: 12, data: 0, count: 1 },
    result: { id: BlockID.fusedGlass, count: 1, data: 0 },
    time: 700
  });
  RecipeRegistry.addSmelter({
    ingredient1: { id: 406, data: 0, count: 1 },
    ingredient2: { id: 406, data: 0 },
    ingredient3: { id: 406, data: 0, count: 1 },
    result: { id: BlockID.fusedQuartz, count: 1, data: 0 },
    time: 700
  });
});