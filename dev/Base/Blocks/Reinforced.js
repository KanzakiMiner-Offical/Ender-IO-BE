var BLOCK_TYPE_ANTI_EXPLO = Block.createSpecialType({
  destroytime: 100,
  explosionres: 18000000,
  renderlayer: 3,
  rendertype: 0,
  translucency: 0,
  lightopacity: 15,
  base: 99,
  sound: "anvil"
});

IDRegistry.genBlockID("darkSteelBars");
Block.createBlock("darkSteelBars", [
  { name: "Dark Bars", texture: [["darkSteelBars", 0]], inCreative: true }
]);

Callback.addCallback("PostLoaded", function() {
  Recipes.addShaped({ id: BlockID.darkSteelBars, count: 1, data: 0 }, [
	"bcb",
	"cac",
	"bcb"
], ['a', ItemID.darkSteel, 0]);
});

function setBarsRender(id, groupName, xsize, zsize) {
  var render = new ICRender.Model();
  BlockRenderer.setStaticICRender(id, 0, render);
  var boxes = [
    { side: [1, 0, 0], box: [xsize, 0, zsize, 1, 1, xsize] },
    { side: [-1, 0, 0], box: [0, 0, zsize, zsize, 1, xsize] },
    { side: [0, 0, 1], box: [zsize, 0, xsize, xsize, 1, 1] },
    { side: [0, 0, -1], box: [zsize, 0, 0, xsize, 1, zsize] },
    ];
  ICRender.getGroup(groupName).add(id, -1);
  for (var i in boxes) {
    var box = boxes[i];
    var model = BlockRenderer.createModel();
    model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
    render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], ICRender.getGroup(groupName), 0);
  }
  var model = BlockRenderer.createModel();
  render.addEntry(model);
}

setBarsRender(BlockID.darkSteelBars, "ender-bars", 0.54, 0.46);
ICRender.getGroup("ender-bars").add(1, -1);
ICRender.getGroup("ender-bars").add(2, -1);
ICRender.getGroup("ender-bars").add(3, -1);
ICRender.getGroup("ender-bars").add(4, -1);
ICRender.getGroup("ender-bars").add(5, -1);
ICRender.getGroup("ender-bars").add(17, -1);
ICRender.getGroup("ender-bars").add(20, -1);
ICRender.getGroup("ender-bars").add(49, -1);

IDRegistry.genBlockID("reinforcedObsidian");
Block.createBlock("reinforcedObsidian", [
  { name: "Reinfirced Obsidian", texture: [["reinforcedObsidian", 0]], inCreative: true }
], BLOCK_TYPE_ANTI_EXPLO)
ToolAPI.registerBlockMaterial(BlockID.reinforcedObsidian, "stone")
Recipes.addShaped({ id: BlockID.reinforcedObsidian, count: 1, data: 0 }, [
	"bab",
	"aca",
	"bab"
], ['a', ItemID.darkSteel, 0, 'b', BlockID.darkSteelBars, 0, 'c', 49, 0]);
Block.registerDropFunction("reinforcedObsidian", function(coords, blockID, blockData, level) {
  if (level > 3) {
    return [[BlockID.reinforcedObsidian, 1, 0]]
  }
  return [];
}, 2);