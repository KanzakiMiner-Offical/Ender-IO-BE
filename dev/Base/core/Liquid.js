LiquidRegistry.registerLiquid("nutrientDistillation", "Nutrient Distillation", ["nutrientDistillation_fluid"]);
LiquidRegistry.registerLiquid("hootch", "Hootch", ["hootch_fluid"]);
LiquidRegistry.registerLiquid("rocketFuel", "Rocket fuel", ["rocketFuel_fluid"]);
LiquidRegistry.registerLiquid("fireWater", "Fire water", ["fireWater_fluid"]);
/*
IDRegistry.genItemID("bucketHootch");
Item.createItem("bucketHootch", "Hootch bucket", { name: "bucketHootch" }, { stack: 1 });*/
LiquidRegistry.registerItem("hootch", { id: 325, data: 0 }, { id: ItemID.bucketHootch, data: 0 });

IDRegistry.genItemID("bucketNutrient_distillation");
Item.createItem("bucketNutrient_distillation", "Nutrient Distillation", { name: "bucketNutrient_distillation" }, { stack: 1 });
LiquidRegistry.registerItem("nutrientDistillation", { id: 325, data: 0 }, { id: ItemID.bucketNutrient_distillation, data: 0 });

IDRegistry.genItemID("bucketFire_water");
Item.createItem("bucketFire_water", "Fire water bucket", { name: "bucketFire_water" }, { stack: 1 });
LiquidRegistry.registerItem("fireWater", { id: 325, data: 0 }, { id: ItemID.bucketFire_water, data: 0 });

IDRegistry.genItemID("bucketRocket_fuel");
Item.createItem("bucketRocket_fuel", "Rocket fuel bucket", { name: "bucketRocket_fuel" }, { stack: 1 });
LiquidRegistry.registerItem("rocketFuel", { id: 325, data: 0 }, { id: ItemID.bucketRocket_fuel, data: 0 });

function clearAll(from) {
  from.id = 0;
  from.count = 0;
  from.data = 0;
}

var EnderIOLiquid = [
     "nutrientDistillation",
     "hootch",
     "rocketFuel",
     "fireWater"
]

IDRegistry.genBlockID("hootch")
Block.createLiquidBlock("hootch", // nameId is used as liquid id in LiquidRegistry
  {
    name: "Hootch",
    tickDelay: 7, // number, delay between liquid spreading steps in game ticks, 10 is default
    still: {
      id: "hootch_still", // optional, name id for static liquid block, by default it is nameId_still
      texture: ["fluid_hootch_still", 0]
    },
    flowing: {
      id: "hootch", // optional, name id for dynamic liquid block, by default it is nameId
      texture: ["fluid_hootch_flow", 0]
    },
    
    // optional section, if added, this will automatically create fully functional (including dispensers) bucket items
    bucket: {
        id: "bucketHootch",// optional, name id for bucket item, by defailt is nameId_bucket,
        name: "Bucket Of Hootch", // optional, item name, default is "Bucket Of <liquid name>"
        texture: { name: "bucketHootch", meta: 0 }, 
    },
    

    // other optional parameters:
    inCreative: true // boolean, add liquid blocks into creative
    //   uiTextures: // list of ui textures for LiquidRegistry
    //  modelTextures: // list of model textures for LiquidRegistry
  }, {
    // block property description, same as Block.createBlock, this parameter is optional
  });
  
  //LiquidRegistry.getBlockByLiquid("hootch", true); 
  // will return id of a dynamic or, if isStatic passed and true, static block for given liquid or 0, if no liquid with this id exists