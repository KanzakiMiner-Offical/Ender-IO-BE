Item.setItems = function(id, types) {
  for (i in types) {
    IDRegistry.genItemID(id + types[i]);
    Item.createItem(id + types[i], types[i] + " " + id, { name: id + types[i] }, { stack: 64 });
    var this_id = id + types[i];
    //mod_tip(ItemID[this_id])
  }
}

Item.createResourceItem = function(id, name) {
  var nugg = name + " Nugget";
  var ingot = name + " Ingot";
  var nug = id + "Nugget";
  IDRegistry.genItemID(id);
  Item.createItem(id, ingot, { name: id }, { stack: 64 });

  IDRegistry.genItemID(nug);
  Item.createItem(nug, nugg, { name: nug }, { stack: 64 });

  Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({ id: ItemID[id], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[nug], 0]);
    Recipes.addShapeless({ id: ItemID[nug], count: 9, data: 0 }, [{ id: ItemID[id], data: 0 }]);
  });
  //mod_tip(ItemID[id]);
  //mod_tip(ItemID[nug]);
};

Item.createResourceItem("endSteel", "End Steel");
Item.createResourceItem("darkSteel", "Dark Steel");
Item.createResourceItem("conductiveIron", "Conductive Iron");
Item.createResourceItem("pulsatingIron", "Pulsating Iron");
Item.createResourceItem("soularium", "Soularium Alloy");
Item.createResourceItem("electricalSteel", "Electrical Steel");
Item.createResourceItem("energeticAlloy", "Energetic Alloy");
Item.createResourceItem("redstoneAlloy", "Redstone Alloy");

IDRegistry.genItemID("dustPulsating");
Item.createItem("dustPulsating", "Grains of Piezallity", { name: "dustPulsating" }, { stack: 64 });

IDRegistry.genItemID("dustInfinity");
Item.createItem("dustInfinity", "Grains of Infinity", { name: "dustInfinity" }, { stack: 64 });

KEX.ItemsModule.setFireResistant(ItemID.dustInfinity, true);

IDRegistry.genItemID("pulsatingCrystal");
Item.createItem("pulsatingCrystal", "Pulsating Crustal", { name: "pulsatingCrystal" }, { stack: 64 });


IDRegistry.genItemID("basicCapacitor");
Item.createItem("basicCapacitor", "Basic Capacitor", { name: "basicCapacitor" }, { stack: 64 });

Item.setItems("dust", ["Copper", "Wheat", "Iron", "Tin", "Coal", "Gold", "Ender", "Obsidian"]);

Recipes.addIngotRecipe = function(src, out) {
  if (ItemID[out]) {
    Recipes.addFurnace(src, ItemID[out], 0);
  }
}

IDRegistry.genItemID("binderComposite");
Item.createItem("binderComposite", "Binder Composite", { name: "binderComposite" }, { stack: 64 });

IDRegistry.genItemID("conduitBinder");
Item.createItem("conduitBinder", "Conduit Binder", { name: "conduitBinder" }, { stack: 64 });

IDRegistry.genItemID("itemYetaWrench");
Item.createItem("itemYetaWrench", "Yeta Wrench", { name: "itemYetaWrench" }, { stack: 1 });

IDRegistry.genItemID("silicon");
Item.createItem("silicon", "Silicon", { name: "silicon" }, { stack: 64 });
/*
IDRegistry.genItemID("soulariumIngot");
Item.createItem("soulariumIngot", "Soularium", { name: "soularium" }, { stack: 64 });
IDRegistry.genItemID("conductiveIron");
Item.createItem("conductiveIron", "Conductive Iron", { name: "conductiveIron" }, { stack: 64 });
IDRegistry.genItemID("");
Item.createItem("pulsatingIron", "Pulsating Iron", { name: "pulsatingIron" }, { stack: 64 });

IDRegistry.genItemID("darkSteel");
Item.createItem("darkSteel", "Dark Steel", { name: "darkSteel" }, { stack: 64 });
*/

IDRegistry.genItemID("vibrantAlloy");
Item.createItem("vibrantAlloy", "Vibrant Alloy", { name: "vibrantAlloy" }, { stack: 64 });

IDRegistry.genItemID("vibrantNugget");
Item.createItem("vibrantNugget", "Vibrant Nugget", { name: "vibrantNugget" }, { stack: 64 });

IDRegistry.genItemID("vibrantCrystal");
Item.createItem("vibrantCrystal", "Vibrant Crystal", { name: "vibrantCrystal" }, { stack: 64 });

IDRegistry.genItemID("enderCrystal");
Item.createItem("enderCrystal", "Ender Crystal", { name: "enderCrystal" }, { stack: 64 });
Item.setGlint(ItemID.enderCrystal, true);

IDRegistry.genItemID("zombieSkull");
Item.createItem("zombieSkull", "Zombie Skull", { name: "zombieSkull" }, { stack: 64 });

IDRegistry.genItemID("endermanSkull");
Item.createItem("endermanSkull", "Enderman Skull", { name: "endermanSkull" }, { stack: 64 });

IDRegistry.genItemID("creeperSkull");
Item.createItem("creeperSkull", "Creeper Skull", { name: "creeperSkull" }, { stack: 64 });

IDRegistry.genItemID("skeletonSkull");
Item.createItem("skeletonSkull", "Skeleton Skull", { name: "skeletonSkull" }, { stack: 64 });

IDRegistry.genItemID("doublelayerCapacitor");
Item.createItem("doublelayerCapacitor", "Double-layer Capacitor", { name: "doublelayerCapacitor" }, { stack: 64 });

IDRegistry.genItemID("octadicCapacitor");
Item.createItem("octadicCapacitor", "Octadic Capacitor", { name: "octadicCapacitor" }, { stack: 64 });

IDRegistry.genItemID("enderCapacitor");
Item.createItem("enderCapacitor", "Ender Capacitor", { name: "enderface" }, { stack: 64 });
var capacitorObj = [];

function regUpgrade(id, type, storage, usage, speed, bonus, range) {
  UpgradeAPI.registerUpgrade(id, type, function(item, machine, container, data) {
    data.energy_storage += storage;
    data.speed = data.speed * speed;
    data.energy_consumption += usage;
    if(data.bonus){
     data.bonus += bonus;
    }
    if(data.range){
     data.range += range;
    }
  });

  capacitorObj.push(id);
}
regUpgrade(ItemID.basicCapacitor, "capacitor", 100000, 40, 1.15, 0, 4);
regUpgrade(ItemID.doublelayerCapacitor, "capacitor", 200000, 80, 2, 2, 8);
regUpgrade(ItemID.octadicCapacitor, "capacitor", 400000, 160, 4, 4, 12);
regUpgrade(ItemID.enderCapacitor, "capacitor", 800000, 640, 10, 10, 16);


/*
UpgradeAPI.registerUpgradeItem(ItemID.doublelayerCapacitor, {
  speed: 2, storage: 200000, usage: 80, energyBonus: 2
});

UpgradeAPI.registerUpgradeItem(ItemID.octadicCapacitor, {
  speed: 4, storage: 500000, usage: 160, energyBonus: 4
});
*/
Callback.addCallback("PreLoaded", function() {

  Recipes.addShapeless({ id: 397, count: 1, data: 0 }, [{ id: ItemID.skeletonSkull, data: 0 }]);
  Recipes.addShapeless({ id: 397, count: 1, data: 2 }, [{ id: ItemID.zombieSkull, data: 0 }]);
  Recipes.addShapeless({ id: 397, count: 1, data: 4 }, [{ id: ItemID.creeperSkull, data: 0 }]);

  Recipes.addShapeless({ id: ItemID.skeletonSkull, count: 1, data: 0 }, [{ id: 397, data: 0 }]);
  Recipes.addShapeless({ id: ItemID.zombieSkull, count: 1, data: 0 }, [{ id: 397, data: 2 }]);
  Recipes.addShapeless({ id: ItemID.creeperSkull, count: 1, data: 0 }, [{ id: 397, data: 4 }]);



  Recipes.addShapeless({ id: ItemID.vibrantNugget, count: 9, data: 0 }, [{ id: ItemID.vibrantAlloy, data: 0 }]);

  Recipes.addShaped({ id: ItemID.vibrantCrystal, count: 1, data: 0 }, [
  	"aaa",
  	"aea",
	 "aaa"
], ['a', ItemID.vibrantNugget, 0, 'e', 388, 0]);

  Recipes.addShaped({ id: ItemID.pulsatingCrystal, count: 1, data: 0 }, [
  	"aaa",
  	"aea",
	 "aaa"
], ['a', ItemID.pulsatingIronNugget, 0, 'e', VanillaItemID.diamond, 0]);

  Recipes.addShaped({ id: ItemID.vibrantAlloy, count: 1, data: 0 }, [
  	"aaa",
  	"aaa",
	 "aaa"
], ['a', ItemID.vibrantNugget, 0]);

  Recipes.addShaped({ id: ItemID.basicCapacitor, count: 1, data: 0 }, [
  	" rn",
  	"rir",
	 "nr "
], ['r', VanillaItemID.gold_nugget, 0, 'n', ItemID.dustInfinity, 0, 'i', VanillaItemID.redstone, 0]);


  Recipes.addShaped({ id: ItemID.doublelayerCapacitor, count: 1, data: 0 }, [
  	" a ",
  	"cpc",
	 " a "
], ['a', ItemID.energeticAlloy, 0, 'c', ItemID.basicCapacitor, 0, 'p', ItemID.dustCoal, 0]);

  Recipes.addShaped({ id: ItemID.octadicCapacitor, count: 1, data: 0 }, [
  	" a ",
  	"cpc",
	 " a "
], ['a', ItemID.vibrantAlloy, 0, 'c', ItemID.doublelayerCapacitor, 0, 'p', 89, 0]);

  Recipes.addShaped({ id: ItemID.binderComposite, count: 8, data: 0 }, [
  	"csc",
  	"scs",
	 "csc"
], ['c', 337, 0, 's', 12, 0]);
  Recipes.addFurnace(ItemID.binderComposite, ItemID.conduitBinder, 0);

  Recipes.addIngotRecipe(ItemID.dustCopper, "ingotCopper");
  Recipes.addIngotRecipe(ItemID.dustTin, "ingotTin");
  Recipes.addFurnace(ItemID.dustIron, 265, 0);
  Recipes.addFurnace(ItemID.dustGold, 266, 0);

});

IDRegistry.genItemID("skullZombieController");
Item.createItem("skullZombieController", "Zombie Controller", { name: "skullZombieController" }, { stack: 64 });

IDRegistry.genItemID("skullZombieElectrode");
Item.createItem("skullZombieElectrode", "Zombie Electrode", { name: "skullZombieElectrode" }, { stack: 64 });

Callback.addCallback("ItemUse", function(coords, item, block) {
  if (World.getBlockID(coords.x, coords.y, coords.z) == VanillaBlockID.bedrock && item.id == 259) {
    if (Math.random() >= 0.5) {
      World.drop(coords.x + .5, coords.y + 1, coords.z, ItemID.dustInfinity, 1);
      //World.setBlock(coords.x, coords.y, coords.z, 0, 0);
    }
  }
});