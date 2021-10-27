ModAPI.addAPICallback("RecipeViewer", function(api) {

  RecipeViewer = api.Core;

  const Bitmap = android.graphics.Bitmap;
  const Canvas = android.graphics.Canvas;
  const Rect = android.graphics.Rect;

  let bmp, cvs, source;
  let x = y = 0;


  RecipeViewer.registerRecipeType("enderio_alloy", {
    title: "Alloy Smelter",
    contents: {
      icon: BlockID.alloySmelter,
      drawing: [
        { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
        { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
            ],
      elements: {
        input0: { type: "slot", x: 520, y: 170 },
        input1: { type: "slot", x: 600, y: 140 },
        input2: { type: "slot", x: 680, y: 170 },
        output0: { type: "slot", x: 600, y: 320 },
        textTime: { type: "text", x: 680, y: 200 }
      },
      moveItems: {
        x: 630,
        y: 330,
        slots: ["ingredient1", "ingredient2", "ingredient3"]
      }
    },
    getList: function(id, data, isUsage) {
      let list = [];
      if (isUsage) {
        var rec = RecipeRegistry.reqSmelter(true)
        for (let i in rec) {
          let recipe = rec[i]
          let result0 = recipe.result;
          let input0 = recipe.ingredient1;
          let input1 = recipe.ingredient2;
          let input2 = recipe.ingredient3;
          if (input1.id == id || input0.id == id || input2.id == id) {
            list.push({
              input: [
                { id: input0.id, data: input0.data, count: input1.count || 1 },
                { id: input1.id, data: input1.data, count: 1 },
                { id: input2.id, data: input2.data, count: input2.count || 1 }
                 ],
              output: [{ id: result0.id, data: result0.data, count: result0.count }]
              //     time: recipe.time
            });
          } else if (result0.id == id) {
            list.push({
              input: [
                { id: input0.id, data: input0.data, count: input1.count || 1 },
                { id: input1.id, data: input1.data, count: 1 },
                { id: input2.id, data: input2.data, count: input2.count || 1 }
                                         ],
              output: [{ id: result0.id, data: result0.data, count: result0.count }]
              //    time: recipe.time
            });
          }
        }
      } else {
        var rec = RecipeRegistry.reqSmelter(true)
        for (let i in rec) {
          let recipe = rec[i]
          let result0 = recipe.result;
          let input0 = recipe.ingredient1;
          let input1 = recipe.ingredient2;
          let input2 = recipe.ingredient3;
          if (result0.id == id) {
            list.push({
              input: [
                { id: input0.id, data: input0.data, count: input1.count || 1 },
                { id: input1.id, data: input1.data, count: 1 },
                { id: input2.id, data: input2.data, count: input2.count || 1 }
                               ],
              output: [{ id: result0.id, data: result0.data, count: result0.count }]
              //    time: recipe.time
            });
          }
        }

      }
      return list;
    },
    getAllList: function() {
      const list = [];

      var rec = RecipeRegistry.reqSmelter(true)
      for (let i in rec) {
        let recipe = rec[i]
        let result0 = recipe.result;
        let input0 = recipe.ingredient1;
        let input1 = recipe.ingredient2;
        let input2 = recipe.ingredient3;
        list.push({
          input: [
            { id: input0.id, data: input0.data, count: input1.count || 1 },
            { id: input1.id, data: input1.data, count: 1 },
            { id: input2.id, data: input2.data, count: input2.count || 1 }
                               ],
          output: [{ id: result0.id, data: result0.data, count: result0.count }]
          //    time: recipe.time
        });

      }
      return list;
    }
    /*
        onOpen: function(elements, data) {
          let elem = elements.get("textTine");
          elem.onBindingUpdated("text", data ? Translation.translate("Time: ") + data.time : "");
        }*/
  });
  //RecipeRegistry.showCrusher(RecipeViewer);
  //RecipeRegistry.show(RecipeViewer);
  RecipeViewer.registerRecipeType("enderio_sag", {
    title: "SAG Mill",
    contents: {
      icon: BlockID.sagmill,
      drawing: [
        { type: "bitmap", x: 595, y: 250, bitmap: "bar_progress_down0", scale: 4.2 },
			],
      elements: {
        input0: { type: "slot", x: 602, y: 170, size: 65 },
        output0: { type: "slot", x: 505, y: 340, size: 65 },
        output1: { type: "slot", x: 570, y: 340, size: 65 },
        output2: { type: "slot", x: 635, y: 340, size: 65 },
        output3: { type: "slot", x: 700, y: 340, size: 65 },
        textChance0: { type: "text", x: 505, y: 300 },
        textChance1: { type: "text", x: 570, y: 300 },
        textChance2: { type: "text", x: 635, y: 300 },
        textChance3: { type: "text", x: 700, y: 300 }
        //   textTime: { type: "text", x: 700, y: 200 }
      },
      moveItems: {
        x: 730,
        y: 375,
        slots: ["ingredient"]
      }
    },
    getList: function(id, data, isUsage) {
      let list = [];

      if (isUsage) {
        var rec = RecipeRegistry.reqCrusher(true)
        for (let i in rec) {
          let recipe = rec[i];
          let input = recipe.ingredient;
          let result0 = recipe.result0;
          let result1 = recipe.result1;
          let result2 = recipe.result2;
          let result3 = recipe.result3;
          if (input.id == id) {
            list.push({
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
            });
          }
        }
      } else {
        var rec = RecipeRegistry.reqCrusher(true)
        for (let i in rec) {
          let recipe = rec[i];
          let input = recipe.ingredient;
          let result0 = recipe.result0;
          let result1 = recipe.result1;
          let result2 = recipe.result2;
          let result3 = recipe.result3;
          if (result0.id == id || result1.id == id || result2.id == id || result3.id == id) {
            list.push({
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
            });
          }
        }
      }
      return list;

    },

    getAllList: function() {
      const list = [];
      var rec = RecipeRegistry.reqCrusher(true)
      for (let i in rec) {
        let recipe = rec[i];
        let input = recipe.ingredient;
        let result0 = recipe.result0;
        let result1 = recipe.result1;
        let result2 = recipe.result2;
        let result3 = recipe.result3;
        list.push({
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
        });
      }
      return list;

    },

    onOpen: function(elements, data) {
      let elem = elements.get("textChance2");
      elem.onBindingUpdated("text", data ? data.chance[2] * 100 + "%" : "");

      let elem2 = elements.get("textChance3");
      elem2.onBindingUpdated("text", data ? data.chance[3] * 100 + "%" : "");

      let elem3 = elements.get("textChance0");
      elem3.onBindingUpdated("text", data ? data.chance[0] * 100 + "%" : "");

      let elem4 = elements.get("textChance1");
      elem4.onBindingUpdated("text", data ? data.chance[1] * 100 + "%" : "");
    }
  });

  RecipeViewer.registerRecipeType("enderio_vat", {
    title: "Vat",
    contents: {
      icon: BlockID.theVat,
      drawing: [
        { type: "bitmap", x: 281, y: -190, bitmap: "backgroundVat", scale: 3.3 },
        { type: "bitmap", x: 679, y: 304, bitmap: "fire_scale1", scale: 3.3 },
			],
      elements: {
        input0: { type: "slot", x: 590, y: 130, size: 65 },
        input1: { type: "slot", x: 753, y: 130, size: 65 },
        scaleInputLiquid: {
          type: "scale",
          x: 508,
          y: 130,
          scale: 5,
          direction: 1,
          bitmap: "fluid_scale",
          overlay: "fluid_scale"
        },
        scaleResultLiquid: {
          type: "scale",
          x: 856,
          y: 130,
          scale: 5,
          direction: 1,
          bitmap: "fluid_scale",
          overlay: "fluid_scale"
        },
      },
      moveItems: {
        x: 730,
        y: 316,
        slots: ["slotInput0", "slotInput1"]
      }
    },
    getList: function(id, data, isUsage) {
      let list = [];

      if (isUsage) {

        for (let i in RecipeRegistry.theVat) {
          let recipe = RecipeRegistry.theVat[i];
          let input1 = recipe.input1;
          let input2 = recipe.input2;
          let liqInput = recipe.liquidIn;
          let liqOut = recipe.liquidOut;
          if (input1.id == id || input2.id == id) {
            list.push({
              input: [{ id: input1.id, count: 1, data: input1.data || 0 },
                { id: input2.id || 0, count: 1, data: input2.data || 0 }
              ],
              liquidInput: liqInput.id,
              liquidOutput: liqOut.id
            });
          }
        }
      }
      /*else {
             for (let i in RecipeRegistry.theVat) {
               let recipe = RecipeRegistry.theVat[i];
               let input1 = recipe.input1;
               let input2 = recipe.input2;
               let liqInput = recipe.liquidIn;
               let liqOut = recipe.liquidOut;
               if (liqOut.id == id || liqInput.id == id) {
                 list.push({
                   input: [
                     { id: input1.id, count: 1, data: input1.data || 0 },
                     { id: input2.id || 0, count: 1, data: input2.data || 0 }
                   ],
                   liquidInput: liqInput.id,
                   liquidOutput: liqOut.id
                 });
               }

             }
           }*/

      return list;

    },

    onOpen: function(elements, data) {
      let scaleInputLiquid = elements.get("scaleInputLiquid");
      let scaleResultLiquid = elements.get("scaleResultLiquid");

      scaleInputLiquid.onBindingUpdated("texture",
        LiquidRegistry.getLiquidUITexture(data.liquidInput, 16, 58));
      scaleInputLiquid.onBindingUpdated("value", 1 / 4);

      scaleResultLiquid.onBindingUpdated("texture",
        LiquidRegistry.getLiquidUITexture(data.liquidOutput, 16, 58));
      scaleResultLiquid.onBindingUpdated("value", 1 / 4);

    }
  });


  RecipeViewer.registerRecipeType("enderio_sas", {
    title: "Slice And Splice",
    contents: {
      icon: BlockID.sliceAndSplice,
      drawing: [
        { type: "bitmap", x: 630, y: 235, bitmap: "bar_progress2", scale: 3.2 },
			],
      elements: {
        input0: { type: "slot", x: 400, y: 200 },
        input1: { type: "slot", x: 460, y: 200 },
        input2: { type: "slot", x: 520, y: 200 },
        input3: { type: "slot", x: 400, y: 260 },
        input4: { type: "slot", x: 460, y: 260 },
        input5: { type: "slot", x: 520, y: 260 },
        output0: { type: "slot", x: 720, y: 230 },
        //slotAxe: { type: "slot", x: 430, y: 140 },
        //slotShears: { type: "slot", x: 490, y: 140 },
      }
      /*
            moveItems: {
              x: 730,
              y: 375,
              slots: ["ingredient"]
            }*/
    },
    getList: function(id, data, isUsage) {
      let list = [];

      if (isUsage) {
        var rec = RecipeRegistry.sliceAndSplice
        for (let i in rec) {
          let recipe = rec[i]
          let output0 = recipe.output;
          let input0 = recipe.input0
          let input1 = recipe.input1
          let input2 = recipe.input2
          let input3 = recipe.input3
          let input4 = recipe.input4
          let input5 = recipe.input5
          if (input1.id == id || input0.id == id || input2.id == id || input3.id == id || input4.id == id || input5.id == id) {
            list.push({
              input: [
                { id: input0.id, data: input0.data, count: 1 },
                { id: input1.id, data: input1.data, count: 1 },
                { id: input2.id, data: input2.data, count: 1 },
                { id: input3.id, data: input3.data, count: 1 },
                { id: input4.id, data: input4.data, count: 1 },
                { id: input5.id, data: input5.data, count: 1 }
                 ],
              output: [{ id: output0.id, data: output0.data, count: output0.count || 1 }],
              //     time: recipe.time
            });
          }
        }
      } else {
        var rec = RecipeRegistry.sliceAndSplice
        for (let i in rec) {
          let recipe = rec[i]
          let output0 = recipe.output;
          let input0 = recipe.input0
          let input1 = recipe.input1
          let input2 = recipe.input2
          let input3 = recipe.input3
          let input4 = recipe.input4
          let input5 = recipe.input5
          if (output0.id == id) {
            list.push({
              input: [
                { id: input0.id, data: input0.data, count: 1 },
                { id: input1.id, data: input1.data, count: 1 },
                { id: input2.id, data: input2.data, count: 1 },
                { id: input3.id, data: input3.data, count: 1 },
                { id: input4.id, data: input4.data, count: 1 },
                { id: input5.id, data: input5.data, count: 1 }
                 ],
              output: [{ id: output0.id, data: output0.data, count: 1 }],
              //    time: recipe.time
            });
          }
        }

      }
      return list;
    },
    getAllList: function() {
      const list = [];
      var rec = RecipeRegistry.sliceAndSplice
      for (let i in rec) {
        let recipe = rec[i]
        let output0 = recipe.output;
        let input0 = recipe.input0
        let input1 = recipe.input1
        let input2 = recipe.input2
        let input3 = recipe.input3
        let input4 = recipe.input4
        let input5 = recipe.input5
        list.push({
          input: [
            { id: input0.id, data: input0.data, count: 1 },
            { id: input1.id, data: input1.data, count: 1 },
            { id: input2.id, data: input2.data, count: 1 },
            { id: input3.id, data: input3.data, count: 1 },
            { id: input4.id, data: input4.data, count: 1 },
            { id: input5.id, data: input5.data, count: 1 }
                 ],
          output: [{ id: output0.id, data: output0.data, count: 1 }],

        });
      }
      return list;
    }
  });

});