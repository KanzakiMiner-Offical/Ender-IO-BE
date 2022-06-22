var GrindingBall = {
   idBall: {},

   regItem: function(id, name) {
      // id sample: conductive_iron
      let texture = "item_alloy_ball_" + id;
      let iID = "ball_" + id;
      IDRegistry.genItemID(iID);
      Item.createItem(iID, name + " Grinding Ball", { name: texture }, { stack: 64 });
   },

   regModBall: function(id, name, main, bonus, powUse, dura, recipe) {
      this.regItem(id, name);

      this.idBall[ItemID["ball_" + id]] = { main: (main - 100) / 100, bonus: bonus / 100, use: powUse / 100, durability: dura / 2400 };

      if (recipe) {
         Callback.addCallback("PreLoaded", function() {
            Recipes.addShaped({ id: ItemID["ball_" + id], count: 24, data: 0 }, [
      	" a ",
      	"aaa",
	     " a "
    ], ['a', ItemID[recipe.id], recipe.data]);
         })
      };
   },

   regBall: function(id, main, bonus, powUse, dura) {
      this.idBall[id] = { main: (main - 100) / 100, bonus: bonus / 100, use: powUse / 100, durability: dura / 2400 }
   },

   getBallID: function(id) {
      if (GrindingBall.idBall[id]) {
         return GrindingBall.idBall[id];
      }
      /*else {
              return alert("Undefined id")
           }*/
   }
};
GrindingBall.regBall(VanillaItemID.flint, 120, 125, 85, 24000)
GrindingBall.regModBall("dark_steel", "Dark Steel", 135, 200, 70, 124800, { id: "darkSteel", data: 0 })
GrindingBall.regModBall("conductive_iron", "Conductive Iron", 135, 100, 100, 40800, { id: "conductiveIron", data: 0 })
