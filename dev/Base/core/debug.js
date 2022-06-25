IDRegistry.genItemID("EIODebug");
Item.createItem("EIODebug", "Debug Tool?", { name: "itemConduitProbe" }, { stack: 1 });

Item.registerUseFunction("EIODebug", function(coords, item, block) {
   for (let i in RecipeRegistry.theVat) {
      let recipe = RecipeRegistry.theVat[i]
      Game.message("Recipe:" + recipe.input1.id + ":" + recipe.input1.data + " and " + recipe.input2.id + ":" + recipe.input2.data + " .Liquid:" + recipe.inputLiquid + ":" + recipe.inputAmount + " and " + recipe.outputLiquid + ":" + recipe.outputAmount);

   }
});