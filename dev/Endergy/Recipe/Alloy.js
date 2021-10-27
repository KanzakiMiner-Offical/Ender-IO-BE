Callback.addCallback("PostLoaded", function(){
RecipeRegistry.addSmelter({
  ingridient1: { id: 13, data: 0 },
  ingridient2: { id: 318, data: 0 },
  ingridient3: { id: 4, data: 0 },
  result: { id: ItemID.crudeSteel, count: 1, data: 0 },
  time: 250
});
RecipeRegistry.addSmelter({
  ingridient1: { id: ItemID.dustPulsating, data: 0 },
  ingridient2: { id: VanillaItemID.gold_ingot, data: 0 },
  ingridient3: { id: 0, data: 0 },
  result: { id: ItemID.crystalline, count: 1, data: 0 },
  time: 500
});
  });