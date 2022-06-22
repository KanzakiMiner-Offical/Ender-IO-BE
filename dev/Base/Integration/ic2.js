ModAPI.addAPICallback("ICore", function(api) {
  
  Callback.addCallback("PostLoaded", function() {
  	/*
  SWORD_DAMAGE["ItemID.nanoSaberActive"] = 20;
  SWORD_DAMAGE["ItemID.bronzeSword"] = 6;// maybe 4 :))))
  SWORD_DAMAGE["ItemID.chainsaw"] = 4;
*/
    RecipeRegistry.addSmelter({
      ingredient1: { id: ItemID.ingotCopper, data: 0, count: 3 },
      ingredient2: { id: ItemID.ingotTin, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.ingotBronze, count: 4, data: 0 },
      time: 500
    });

    RecipeRegistry.addSmelter({
      ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
      ingredient2: { id: VanillaItemID.coal, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.ingotSteel, count: 1, data: 0 },
      time: 800
    });
    
    RecipeRegistry.addCrusher({
    	isGrinding: true,
      ingredient: { id: BlockID.oreCopper, data: 0 },
      result0: { id: ItemID.dustCopper, data: 0, chance: 1 },
      result1: { id: ItemID.dustCopper, data: 0, chance: 1 },
      result2: { id: ItemID.dustGold, data: 0, chance: 0.1 },
      result3: { id: 4, data: 0, chance: 0.15 },
      time: 180,
      by: "IC2"
    });

    RecipeRegistry.addCrusher({
    	isGrinding: true,
      ingredient: { id: BlockID.oreUranium, data: 0 },
      result0: { id: ItemID.uranium238, data: 0, chance: 1 },
      result1: { id: ItemID.smallUranium235, data: 0, chance: 1 },
      result2: { id: ItemID.dustLead, data: 0, chance: 0.1 },
      result3: { id: 4, data: 0, chance: 0.15 },
      time: 180,
      by: "IC2"
    });


    RecipeRegistry.addCrusher({
    	isGrinding: true,
      ingredient: { id: BlockID.oreTin, data: 0 },
      result0: { id: ItemID.dustTin, data: 0, chance: 1 },
      result1: { id: ItemID.dustTin, data: 0, chance: 1 },
      result2: { id: ItemID.dustSilver, data: 0, chance: 0.1 },
      result3: { id: 4, data: 0, chance: 0.15 },
      time: 180,
      by: "IC2"
    });

    RecipeRegistry.addCrusher({
    	isGrinding: true,
      ingredient: { id: BlockID.oreLead, data: 0 },
      result0: { id: ItemID.dustLead, data: 0, chance: 1 },
      result1: { id: ItemID.dustLead, data: 0, chance: 1 },
      result2: { id: ItemID.dustSilver, data: 0, chance: 0.1 },
      result3: { id: 4, data: 0, chance: 0.15 },
      time: 180,
      by: "IC2"
    });

  });
});