IDRegistry.genBlockID("energyConduit");
Block.createBlock("energyConduit", [
  { name: "Conductive Iron Conduit", texture: [["powerConduitCore", 0]], inCreative: true }
]);
/*
RF.registerWire(BlockID.energyConduit);

setupConduitRender(BlockID.energyConduit, "conduitOther", "rf-wire", 0.15);

Block.setBlockShape(BlockID.energyConduit, { x: 0.2, y: 0.2, z: 0.2 }, { x: 0.8, y: 0.8, z: 0.8 });
*/
IDRegistry.genBlockID("energyConduitAdv");
Block.createBlock("energyConduitAdv", [
  { name: "Enhanced Energy Conduit", texture: [["powerConduitCoreEnhanced", 0]], inCreative: true }
]);

IDRegistry.genBlockID("energyConduitEnd");
Block.createBlock("energyConduitEnd", [
  { name: "Ender Power Conduit", texture: [["powerConduitCoreEnder", 0]], inCreative: true }
]);

Callback.addCallback("PostLoaded", function() {
    Recipes.addShaped({ id: BlockID.energyConduit, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.conductiveIron, 0 ]);
  
  Recipes.addShaped({ id: BlockID.energyConduitAdv, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.energeticAlloy, 0 ]);
 
 Recipes.addShaped({ id: BlockID.energyConduitEnd, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.vibrantAlloy, 0 ]);

});
var ConduitWidth = 0.1875//0.375
ConduitRegistry.registerCable("energyConduit", 640);
ConduitRegistry.setupModel(BlockID.energyConduit, ConduitWidth);

ConduitRegistry.registerCable("energyConduitAdv", 2560);
ConduitRegistry.setupModel(BlockID.energyConduitAdv, ConduitWidth);

ConduitRegistry.registerCable("energyConduitEnd", 10240);
ConduitRegistry.setupModel(BlockID.energyConduitEnd, ConduitWidth);

Item.registerNameOverrideFunction(BlockID.energyConduit, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 640 + " RF/t";
});
Item.registerNameOverrideFunction(BlockID.energyConduitAdv, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 2560 + " RF/t";
});
Item.registerNameOverrideFunction(BlockID.energyConduitEnd, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 10240 + " RF/t";
});