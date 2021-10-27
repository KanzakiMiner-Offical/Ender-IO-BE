Item.createDyeItem = function(id, name, type) {
  var res = "item_material_organic_" + type + "_dye";
  IDRegistry.genItemID(id);
  Item.createItem(id, name, { name: res }, { stack: 64 });

  mod_tip(ItemID[id]);
};

Item.createPowderItem = function(id, name, type) {
  var res = "item_material_powder_" + type;
  var nam = name + " Powder";
  IDRegistry.genItemID(id);
  Item.createItem(id, nam, { name: res }, { stack: 64 });

  mod_tip(ItemID[id]);
};
Item.createPowderItem("dustLapis", "Lapis Lazuli", "lapis_lazuli")
Item.createPowderItem("dustQuarzt", "Quartz", "quartz")
Item.createDyeItem("greenDye", "Organic Green Dye", "green");
Item.createDyeItem("blackDye", "Organic Black Dye", "black");
Item.createDyeItem("brownDye", "Organic Brown Dye", "brown");

IDRegistry.genItemID("clipAndTrim");
Item.createItem("clipAndTrim", "Clippings and Trimmings", { name: "item_material_plantgreen" }, { stack: 64 });
IDRegistry.genItemID("twigAndPrun");
Item.createItem("twigAndPrun", "Twigs and Prunings", { name: "item_material_plantbrown" }, { stack: 64 });

IDRegistry.genItemID("machineDye");
Item.createItem("machineDye", "Industrial Dye Blend", { name: "item_material_machine_dye" }, { stack: 64 });

IDRegistry.genItemID("soulMachineDye");
Item.createItem("soulMachineDye", "Soul Attuned Powder Coating", { name: "item_material_soul_machine_dye" }, { stack: 64 });



Callback.addCallback("PostLoaded", function() {

  Recipes.addShaped({ id: ItemID.soulMachineDye, count: 6, data: 0 }, [
    	" pi",
    	"pmp",
	     "ip "
  ], ['i', ItemID.brownDye, 0, "m", ItemID.blackDye, 0, "p", ItemID.dustQuarzt, 0]);
  
  Recipes.addShaped({ id: ItemID.machineDye, count: 6, data: 0 }, [
    	"fpi",
    	"pmp",
	     "ipf"
  ], ['i', ItemID.greenDye, 0, 'f', ItemID.dustLapis, 0, "m", ItemID.blackDye, 0, "p", ItemID.dustQuarzt, 0]);

  RecipeRegistry.addCrusher({
    ingredient: { id: 2, data: 0 },
    result0: { id: ItemID.clipAndTrim, data: 0, chance: 0.25 },
    result1: { id: ItemID.clipAndTrim, data: 0, chance: 0.3 },
    result2: { id: 0, data: 0, chance: 0 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100
  });
  RecipeRegistry.addCrusher({
    ingredient: { id: 38, data: 0 },
    result0: { id: VanillaItemID.red_dye, data: 0, chance: 1 },
    result1: { id: VanillaItemID.red_dye, data: 0, chance: 1 },
    result2: { id: VanillaItemID.red_dye, data: 0, chance: 0.95 },
    result3: { id: ItemID.clipAndTrim, data: 0, chance: 0.15 },
    time: 100
  });
  RecipeRegistry.addCrusher({
    ingredient: { id: 37, data: 0 },
    result0: { id: VanillaItemID.yellow_dye, data: 0, chance: 1 },
    result1: { id: VanillaItemID.yellow_dye, data: 0, chance: 1 },
    result2: { id: VanillaItemID.yellow_dye, data: 0, chance: 0.95 },
    result3: { id: ItemID.clipAndTrim, data: 0, chance: 0.15 },
    time: 100
  });
  RecipeRegistry.addCrusher({
    ingredient: { id: 32, data: 0 },
    result0: { id: ItemID.twigAndPrun, data: 0, chance: 0.6 },
    result1: { id: ItemID.twigAndPrun, data: 0, chance: 0.3 },
    result2: { id: ItemID.twigAndPrun, data: 0, chance: 0.1 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: VanillaItemID.green_dye, data: 0, count: 6 },
    ingredient2: { id: VanillaItemID.egg, data: 0 },
    ingredient3: { id: 0, data: 0 },
    result: { id: ItemID.greenDye, count: 2, data: 0 },
    time: 500
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.clipAndTrim, data: 0, count: 12 },
    ingredient2: { id: VanillaItemID.slime_ball, data: 0 },
    ingredient3: { id: 0, data: 0 },
    result: { id: ItemID.greenDye, count: 2, data: 0 },
    time: 500
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.twigAndPrun, data: 0, count: 12 },
    ingredient2: { id: VanillaItemID.slime_ball, data: 0 },
    ingredient3: { id: 0, data: 0 },
    result: { id: ItemID.brownDye, count: 2, data: 0 },
    time: 500
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: ItemID.dustCoal, data: 0, count: 6 },
    ingredient2: { id: VanillaItemID.slime_ball, data: 0 },
    ingredient3: { id: 0, data: 0 },
    result: { id: ItemID.blackDye, count: 2, data: 0 },
    time: 500
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: BlockID.machineChassiSimple, data: 0, count: 1 },
    ingredient2: { id: ItemID.machineDye, data: 0 },
    ingredient3: { id: 0, data: 0 },
    result: { id: BlockID.machineChassi, count: 1, data: 0 },
    time: 240
  });

  RecipeRegistry.addSmelter({
    ingredient1: { id: BlockID.machineChassiSimple, data: 0, count: 1 },
    ingredient2: { id: ItemID.soulMachineDye, data: 0 },
    ingredient3: { id: 0, data: 0 },
    result: { id: BlockID.machineChassiSoul, count: 1, data: 0 },
    time: 240
  });

});