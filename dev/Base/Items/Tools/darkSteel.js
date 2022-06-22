//Pickaxe


   //enchantType: Native.EnchantType.pickaxe,
/*
ToolType.darkPick = {

   isWeapon: false,
   damage: 2,
   baseDamage: 4,
   enchantability: 14,
   blockTypes: ["stone", "dirt"],
   onDestroy: function(item) {
      let energyStored = ChargeItemRegistry.getEnergyStored(item);
      if (energyStored >= 80) {
         if (Block.getDestroyTime(block.id) > 0) {
            ChargeItemRegistry.setEnergyStored(item, energyStored - 80);
         }
         return true;
      } else {
         return false;
      }
   },

   onAttack: function(item, mob) {
      let energyStored = ChargeItemRegistry.getEnergyStored(item);
      if (energyStored >= 80) {
         if (Block.getDestroyTime(block.id) > 0) {
            ChargeItemRegistry.setEnergyStored(item, energyStored - 80);
            return true;
         }
      } else {
         return false;
      }
   },

   onBroke: function(item) {
      return true;
   },
   calcDestroyTime: function(item, coords, block, params, destroyTime, enchant) {
      let energyStored = ChargeItemRegistry.getEnergyStored(item);
      if (energyStored >= 80) {
         if (block.id == 49) {
            return 1
         }
         let material = ToolAPI.getBlockMaterial(block.id) || {};
         material = material.name;
         if (material == "stone") {
            return destroyTime * 5
         }
      }
      return params.base / 5
   }
};
*/
ItemRegistry.addToolMaterial("darkSteel", {
    durability: 765,
    level: 5,
    efficiency: 20,
    damage: 9,
    enchantability: 14,
    repairMaterial: ItemID.darkSteel
});
ItemRegistry.createTool("pickaxeDarkSteel", { name: "dark_steel_pickaxe", icon: "darkSteel_pickaxe", material: "darkSteel" }, ToolType.PICKAXE);
ItemRegistry.createTool("swordDarkSteel", { name: "dark_steel_sword", icon: "darkSteel_sword", material: "darkSteel" }, ToolType.SWORD);
/*
IDRegistry.genItemID("swordDarkSteel");
Item.createItem("swordDarkSteel", "The Ender", { name: "darkSteel_sword" }, { stack: 1 });
ToolAPI.setTool(ItemID.swordDarkSteel, "darkSteel", ToolType.sword);

IDRegistry.genItemID("pickaxeDarkSteel");
Item.createItem("pickaxeDarkSteel", "Dark Pick", { name: "darkSteel_pickaxe" }, { stack: 1 });
ToolAPI.setTool(ItemID.pickaxeDarkSteel, "darkSteel", ToolType.pickaxe);
*/
Item.registerNameOverrideFunction(ItemID.pickaxeDarkSteel, function(item, name) {
   return name + "\n" + "§7You can empower this\nwith Vibrant Crystal in Dark Anvil"
});

//empowered
/*
IDRegistry.genItemID("pickaxeDarkSteelEmpowered1");
Item.createItem("pickaxeDarkSteelEmpowered1", "Dark Pick", { name: "darkSteel_pickaxe" }, { isTech: true, stack: 1 });
ToolAPI.setTool(ItemID.pickaxeDarkSteelEmpowered1, "darkSteel", ToolType.darkPick);

ChargeItemRegistry.registerItem(ItemID.pickaxeDarkSteelEmpowered1, "Rf", 100000, 100, 2, true, true);

Item.registerNameOverrideFunction(ItemID.pickaxeDarkSteelEmpowered1, function(item, name) {
   return name + "\n" + "§7Empowered: Breaks obisdian faster.\n§a Explosive: §cNot Empowered \n  " + ItemName.getItemStorageText(item)
});
*/

//THE ENDER

Item.registerNameOverrideFunction(ItemID.swordDarkSteel, function(item, name) {
   return name + "\n" + "§7Increased skull and ender pearl drops"
});

Callback.addCallback("EntityDeath", function(ent, attacker, damageType) {
   let c = Entity.getPosition(ent);
   let item = Player.getCarriedItem();
   if (item.id == ItemID.swordDarkSteel && Entity.getType(attacker) == 63) {
      if (Entity.getType(ent) == 32 && Math.random() <= 0.4) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.zombieSkull, 1, 0);
      }
      if (Entity.getType(ent) == 33 && Math.random() <= 0.4) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.creeperSkull, 1, 0);
      }
      if (Entity.getType(ent) == 34 && Math.random() <= 0.4) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.skeletonSkull, 1, 0);
      }
      if (Entity.getType(ent) == 38 && Math.random() <= 0.8) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, ItemID.endermanSkull, 1, 0);
         World.drop(c.x + .5, c.y + .5, c.z + .5, 368, 1 + Math.floor(Math.random() * 3), 0);
      }
      if (Entity.getType(ent) == 48 && Math.random() <= 0.6) {
         World.drop(c.x + .5, c.y + .5, c.z + .5, 397, 1, 1);
      }
   }
});