ModAPI.addAPICallback("EquivalentAPI", function(api) {
	// Recipe to Calc: Input Item EMC + (Work Time/4) (For Machine recipe)
  let System = api.System;
  Callback.addCallback("PostLoaded", function() {
  	//Other
  	System.setValue(ItemID.silicon, 0, 2);
      System.setValue(ItemID.dustInfinity, 0, 4);
      System.setValue(ItemID.binderComposite, 0, 84);
      System.setValue(ItemID.conduitBinder, 0, 92);
      //Ingot
      //System.setValue(ItemID.conduitBinder, 0, 92);
      System.setValue(ItemID.conductiveIron, 0, 382);
  });
});