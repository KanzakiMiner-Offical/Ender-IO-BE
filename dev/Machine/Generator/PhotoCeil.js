
IDRegistry.genBlockID("simplePhotovoltaicCell");
Block.createBlock("simplePhotovoltaicCell", [
  {
    name: "Simple Photovoltaic Cell",
    texture: [
	["solar_panel_simple_side", 0], ["solar_panel_simple_top", 0], ["solar_panel_simple_side", 0]],
    inCreative: true
  }
]);
CreatePhotovoltaicCell("simplePhotovoltaicCell", 20, 200);

Callback.addCallback("PostLoaded", function() {
	  Recipes.addShaped({ id: BlockID.simplePhotovoltaicCell, count: 1, data: 0 },
    ["aga",
     "sss",
     "epe"],
  ['e', ItemID.dustInfinity, 0, 'a', ItemID.electricalSteel, 0, 's', ItemID.platePhotovoltaic, 0, 'p', ItemID.ironGear, 0, 'g', BlockID.fusedQuartz, 0]);

});