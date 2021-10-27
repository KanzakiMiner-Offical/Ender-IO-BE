IDRegistry.genBlockID("powerConduit");
Block.createBlock("powerConduit", [
  { name: "Conductive Iron Conduit", texture: [["powerConduitCore", 0]], inCreative: true }
]);
/*
RF.registerWire(BlockID.powerConduit);

setupConduitRender(BlockID.powerConduit, "conduitOther", "rf-wire", 0.15);

Block.setBlockShape(BlockID.powerConduit, { x: 0.2, y: 0.2, z: 0.2 }, { x: 0.8, y: 0.8, z: 0.8 });
*/
IDRegistry.genBlockID("powerConduitAdv");
Block.createBlock("powerConduitAdv", [
  { name: "Enhanced Energy Conduit", texture: [["powerConduitCoreEnhanced", 0]], inCreative: true }
]);

IDRegistry.genBlockID("powerConduitEnd");
Block.createBlock("powerConduitEnd", [
  { name: "Ender Power Conduit", texture: [["powerConduitCoreEnder", 0]], inCreative: true }
]);

Callback.addCallback("PostLoaded", function() {
    Recipes.addShaped({ id: BlockID.powerConduit, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.conductiveIron, 0 ]);
  
  Recipes.addShaped({ id: BlockID.powerConduitAdv, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.energeticAlloy, 0 ]);
 
 Recipes.addShaped({ id: BlockID.powerConduitEnd, count: 8, data: 0 }, [
	  "bbb",
	  "ccc",
	  "bbb"
  ], ['b', ItemID.conduitBinder, 0, 'c', ItemID.vibrantAlloy, 0 ]);

});
var ConduitWidth = 0.375
ConduitRegistry.registerCable("powerConduit", 640);
ConduitRegistry.setupModel(BlockID.powerConduit, ConduitWidth);

ConduitRegistry.registerCable("powerConduitAdv", 2560);
ConduitRegistry.setupModel(BlockID.powerConduitAdv, ConduitWidth);

ConduitRegistry.registerCable("powerConduitEnd", 10240);
ConduitRegistry.setupModel(BlockID.powerConduitEnd, ConduitWidth);

Item.registerNameOverrideFunction(BlockID.powerConduit, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 640 + " RF/t";
});
Item.registerNameOverrideFunction(BlockID.powerConduitAdv, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 2560 + " RF/t";
});
Item.registerNameOverrideFunction(BlockID.powerConduitEnd, function(item, name) {
  return name + "\n§7" + Translation.translate("Max Tranfer: ") + 10240 + " RF/t";
});