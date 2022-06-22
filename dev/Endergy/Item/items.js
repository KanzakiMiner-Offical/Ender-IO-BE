Item.createResourceItem("crudeSteel", "Crude Steel");
Item.createResourceItem("crystalline", "Crystalline");
Item.createResourceItem("vividAlloy", "Vivid Alloy");
/*
endergy_tip(ItemID.crudeSteel);
endergy_tip(ItemID.crudeSteelNugget);
endergy_tip(ItemID.vividAlloy);
endergy_tip(ItemID.vividAlloyNugget)
*/
IDRegistry.genItemID("ingotSilver");
Item.createItem("ingotSilver", "Silver Ingot", {name: "ingot_silver"});
//Recipes.addFurnace(ItemID.dustSilver, ItemID.ingotSilver, 0);
IDRegistry.genItemID("ingotLead");
Item.createItem("ingotLead", "Lead Ingot", {name: "ingot_lead"});

IDRegistry.genItemID("nuggetSilver");
Item.createItem("nuggetSilver", "Silver Nugget", {name: "nugget_silver"});

IDRegistry.genItemID("nuggetLead");
Item.createItem("nuggetLead", "Lead Nugget", {name: "nugget_lead"});

IDRegistry.genItemID("dustSilver");
Item.createItem("dustSilver", "Silver Dust", {name: "dust_silver"});

IDRegistry.genItemID("dustLead");
Item.createItem("dustLead", "Lead Dust", {name: "dust_lead"})

function addRecipeIngot(id, nug){
	Callback.addCallback("PostLoaded", function() {
    Recipes.addShaped({ id: ItemID[id], count: 1, data: 0 }, [
	  "bbb",
	  "bbb",
	  "bbb"
  ], ['b', ItemID[nug], 0]);
    Recipes.addShapeless({ id: ItemID[nug], count: 9, data: 0 }, [{ id: ItemID[id], data: 0 }]);
  });
};

addRecipeIngot("ingotSilver", "ingotSilver")
addRecipeIngot("ingotLead", "nuggetLead")
let IC2Integration = false ;
Callback.addCallback("PostLoaded", function() {
	Recipes.addFurnace(ItemID.dustLead, ItemID.ingotLead, 0);
	Recipes.addFurnace(ItemID.dustSilver, ItemID.ingotSilver, 0);
ModAPI.addAPICallback("ICore", function(api) {
	IC2Integration = true
});
if (IC2Integration){
	Recipes.addShaped({ id: ItemID.silverCapacitor, count: 1, data: 0 }, [
	  " ab",
	  "aca",
	  "ba"
  ], ['b', ItemID.dustInfinity, 0, "a", ItemID.nuggetSilver, 0, "c", ItemID.ingotLead, 0]);
} else {
	Recipes.addShaped({ id: ItemID.silverCapacitor, count: 1, data: 0 }, [
	  " ab",
	  "aca",
	  "ba"
  ], ['b', ItemID.dustInfinity, 0, "a", ItemID.nuggetSilver, 0, "c", ItemID.electricalSteel, 0]);
}
  });


