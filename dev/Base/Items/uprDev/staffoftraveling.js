IDRegistry.genItemID("itemTravelStaff");
Item.createItem("itemTravelStaff", "Staff of Traveling", { name: "itemTravelStaff" }, { isTech: true, stack: 1 });

ChargeItemRegistry.registerExtraItem(ItemID.itemTravelStaff, "Rf", 250000, 100, 1, true, true);

Item.registerNameOverrideFunction(ItemID.itemTravelStaff, function(item, name) {
  return name + "\n" + ItemName.getItemStorageText(item);
});


UIbuttons.setToolButton(ItemID.itemTravelStaff, "button_tele");