// import values
function randomInt(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;

}

var Color = android.graphics.Color;
var PotionEffect = Native.PotionEffect;
var ParticleType = Native.ParticleType;
var BlockSide = Native.BlockSide;
var EntityType = Native.EntityType;
// RECIPE VIEWER SUPPORT
var RV;
//var RecipeViewer;
// load lib
alert("EnderIO BE \n Remake By KanzakiMiner");
var DataGroup = ICRender.getGroup("data-conduit");

IMPORT("ConnectedTexture");
IMPORT("SoundAPI");
IMPORT("UIAPI")
IMPORT("BlockEngine");
IMPORT("StorageInterface");
IMPORT("flags");
IMPORT("BlockEngine");
IMPORT("EnergyNet");
IMPORT("ChargeItem");
IMPORT("MachineRender");
IMPORT("TileRender");
IMPORT("LiquidLib");
IMPORT("ToolLib");
IMPORT("PipesAPI");
//IMPORT("bakeModel");
IMPORT("Pipe");

ICRender.addGroupFor = function(id, groups, data) {
  for (let i in groups) ICRender.getGroup(groups[i]).add(id, data || -1);
}

canTileBeReplaced = ModAPI.requireGlobal("canTileBeReplaced");

World.getRelativeCoords = function(x, y, z, side) {
  var dir = [[0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1], [-1, 0, 0], [1, 0, 0]];
  return { x: x + dir[side][0], y: y + dir[side][1], z: z + dir[side][2], side: side }
}

World.isAirBlock = function(x, y, z) {
  if (World.getBlockID(x, y, z) == 0) return true;
  return false;
}