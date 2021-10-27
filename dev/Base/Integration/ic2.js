ModAPI.addAPICallback("ICore", function(api) {
	Callback.addCallback("PostLoaded", function(){
	
RecipeRegistry.addSmelter({
  ingridient1: { id: ItemID.ingotCopper, data: 0, count: 3 },
  ingridient2: { id: ItemID.ingotTin, data: 0 },
  ingridient3: { id: 0, data: 0 },
  result: { id: ItemID.ingotBronze, count: 4, data: 0 },
  time: 500
});

RecipeRegistry.addSmelter({
  ingridient1: { id: VanillaItemID.iron_ingot, data: 0},
  ingridient2: { id: VanillaItemID.coal, data: 0 },
  ingridient3: { id: 0, data: 0 },
  result: { id: ItemID.ingotSteel, count: 4, data: 0 },
  time: 700
});

RecipeRegistry.addCrusher({
  ingridient: { id: BlockID.oreSilver, data: 0 },
  result0: { id: ItemID.dustSilver, data: 0, chance: 1 },
  result1: { id: ItemID.dustSilver, data: 0, chance: 1 },
  result2: { id: ItemID.dustLead, data: 0, chance: 0.1 },
  result3: { id: 4, data: 0, chance: 0.15 },
  time: 180
});

RecipeRegistry.addCrusher({
  ingridient: { id: BlockID.oreLead, data: 0 },
  result0: { id: ItemID.dustLead, data: 0, chance: 1 },
  result1: { id: ItemID.dustLead, data: 0, chance: 1 },
  result2: { id: ItemID.dustSilver, data: 0, chance: 0.1 },
  result3: { id: 4, data: 0, chance: 0.15 },
  time: 180
});

});
});