ModAPI.addAPICallback("ENR", function (Ex) {
 Ex.Sieve.addSieved(13, ItemID.dustInfinity, 0, 1, 3, 25);
 Ex.Sieve.addSieved(13, ItemID.dustPulsating, 0, 1, 2, 5);
 
Callback.addCallback("PostLoaded", function() {

    RecipeRegistry.addCrusher({
      ingredient: { id: 4, data: 0 },
      result0: { id: 13, data: 0, chance: 1 },
      result1: { id: 12, data: 0, chance:0.35 },
      result2: { id: VanillaItemID.flint, data: 0, chance: 0.1 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });

    RecipeRegistry.addCrusher({
      ingredient: { id: 13, data: 0 },
      result0: { id: 12, data: 0, chance: 1 },
      result1: { id: BlockID.ex_dust, data: 0, chance: 1 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });
    
    RecipeRegistry.addCrusher({
      ingredient: { id: 12, data: 0 },
      result0: { id: BlockID.ex_dust, data: 0, chance: 1 },
      result1: { id: 0, data: 0, chance: 0 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });
    
    RecipeRegistry.addCrusher({
      ingredient: { id: 87, data: 0 },
      result0: { id: BlockID.ex_gravelNether, data: 0, chance: 1 },
      result1: { id: 0, data: 0, chance: 0 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });
    
    RecipeRegistry.addCrusher({
      ingredient: { id: 121, data: 0 },
      result0: { id: BlockID.ex_gravelEnder, data: 0, chance: 1 },
      result1: { id: 0, data: 0, chance: 0 },
      result2: { id: 0, data: 0, chance: 0 },
      result3: { id: 0, data: 0, chance: 0 },
      time: 180,
      by: "Ex Nihilo Origin"
    });

  });

});