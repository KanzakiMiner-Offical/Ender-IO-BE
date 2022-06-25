var RecipeRegistry = {
   crusher: [],
   smelter: [],
   sliceAndSplice: [],
   theVat: [],
   soulBinder: [],

   addSliceAndSplice: function(obj) {
      this.sliceAndSplice.push(obj);
   },
   addSmelter: function(obj) {
      this.smelter.push(obj);
   },
   addCrusher: function(obj) {
      this.crusher.push(obj);
   },
   addVat: function(obj) {
      this.theVat.push(obj)
   },
   isIngr1: function(id, data) {
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingre1 = Recipe.ingredient1;
         if (id == ingre1.id && data == ingre1.data) {
            return true;
         }
      }
   },

   isIngr2: function(id, data) {
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingre2 = Recipe.ingredient2;
         if (id == ingre2.id && data == ingre2.data) {
            return true
         }
      }
   },
   isIngr3: function(id, data) {
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingre3 = Recipe.ingredient3;
         if (id == ingre3.id && data == ingre3.data) {
            return true
         }
      }
   },
   getInCrusher: function(id, data) {
      for (let i in RecipeRegistry.crusher) {
         var Recipe = RecipeRegistry.crusher[i];
         var ingre = Recipe.ingredient;
         if (id == ingre.id && data == ingre.data) {
            return true
         }
      }
   },
   getInVat1: function(id, data) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var ingre1 = Recipe.input1;
         if (id == ingre1.id && data == ingre1.data) {
            return true
         }
      }
   },
   getInVat2: function(id, data) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var ingre2 = Recipe.input2;
         if (id == ingre2.id && data == ingre2.data) {
            return true
         }
      }
   },
   getLiquidVat1: function(liquid) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var liquidIn = Recipe.inputLiquid;
         if (liquid == liquidIn) {
            return true
         }
      }
   },
   getLiquidVat2: function(liquid) {
      for (let i in RecipeRegistry.theVat) {
         var Recipe = RecipeRegistry.theVat[i];
         var liquidOut = Recipe.outputLiquid;
         if (liquid == liquidOut) {
            return true
         }
      }
   }
};
/*
RecipeRegistry.addCrusher({
    ingredient: { id: 296, data: 0 },
    result0: { id: ItemID.dustWheat, data: 0, chance: 1 },
    result1: { id: VanillaItemID.wheat_seed, data: 0, chance: 0.45 },
    result2: { id: 0, data: 0, chance: 0 },
    result3: { id: 0, data: 0, chance: 0 },
    time: 100,
    by: "EnderIO"
  });

isValid: function(item) {
        return RecipeRegistry.getInCrusher(item.id); 
      }

RecipeRegistry.addSmelter({
    ingredient1: { id: 331, data: 0, count: 1 },
    ingredient2: { id: ItemID.silicon, data: 0 },
    ingredient3: { id: 0, data: 0, count: 0, count: 1 },
    result: { id: ItemID.redstoneAlloy, count: 1, data: 0 },
    time: 250
  });
*/