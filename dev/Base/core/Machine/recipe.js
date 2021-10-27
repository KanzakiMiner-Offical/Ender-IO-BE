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
  /*
  compileSmelter: function(createIfNotFound) {
    if (createIfNotFound && this.smelter[0] == undefined) {
      this.smelter = [];
      return false;
    } else {
      var rec = this.reqSmelter(true)
      for (let i in rec) {
        let recipe = rec[i]
        let result0 = recipe.result;
        let input0 = recipe.ingredient1;
        let input1 = recipe.ingredient2;
        let input2 = recipe.ingredient3;
        return {
          input: [
            { id: input0.id, data: input0.data, count: 1 },
            { id: input1.id, data: input1.data, count: 1 },
            { id: input2.id, data: input2.data, count: 1 }
                 ],
          output: [{ id: result0.id, data: result0.data, count: result0.count }],
        };
      }
    }
  },
  compileCrusher: function(createIfNotFound) {
    if (createIfNotFound && this.crusher[0] == undefined) {
      this.crusher = [];
      return false;
    } else {
      var rec = RecipeRegistry.reqCrusher(true)
      for (let i in rec) {
        let recipe = rec[i];
        let input = recipe.ingredient;
        let result0 = recipe.result0;
        let result1 = recipe.result1;
        let result2 = recipe.result2;
        let result3 = recipe.result3;
        return {
          input: [{ id: input.id, count: 1, data: input.data }],
          output: [
            { id: result0.id || 0, count: 1, data: result0.data || 0 },
            { id: result1.id || 0, count: 1, data: result1.data || 0 },
            { id: result2.id || 0, count: 1, data: result2.data || 0 },
            { id: result3.id || 0, count: 1, data: result3.data || 0 },
					],

          chance: [
                result0.chance,
                result1.chance,
                result2.chance,
                result3.chance
          ]
        };
      }
    }
  },
  */
  getSmelter: function(id1, id2, id3) {
    var data = this.reqSmelter(true);
    if (data) {
      if (id1 == data.ingredient1.id && id2 == data.ingredient2.id && d3 == data.ingredient3.id) {
        return this.smelter
      } else {
        return null;
      }
    }
  },
  reqSmelter: function(createIfNotFound) {
    if (createIfNotFound && this.smelter[0] == undefined) {
      this.smelter = [];
      return false;
    }
    return this.smelter;
  },

  getCrusher: function(id) {
    var data = reqCrusher(true);
    if (data) {
      if (id == data.ingredient.id) {
        return this.crusher
      } else {
        return null;
      }
    }
  },
  getInCrusher: function(id) {
    var data = reqCrusher(true);
    if (data) {
      if (id == data.ingredient.id) {
        for (let i in this.crusher) {
          var recipe = this.crusher[i]
          return recipe.ingredient.id;
        }
      } else {
        return null;
      }
    }
  },
  reqCrusher: function(createIfNotFound) {
    if (createIfNotFound && this.smelter[0] == undefined) {
      this.smelter = [];
      return false;
    }
    return this.crusher;
  }
  /*
    getSmelter: function(id, data){
      for(let i in this.smelter){
      var recipe = this.smelter[i];
        if(id == recipe.input && data == recipe.output){
        return 
      }
    }}
    */
};