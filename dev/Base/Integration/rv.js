/*var RecipeViewerSupport = {
	info: [],
	
	addInfo: function(obj) {
		let input = obj
	    let item = obj.item;
        if (!item || !item.id)
            return;

        item.data = item.data || 0;
        input.line3 = input.line3 || " ";
        input.line4 = input.line4 || " ";
        
       this.info.push(obj);
  }
}

RecipeViewerSupport.addInfo({
	item: { id: ItemID.dustInfinity },
	line1: "Grain Of Infinity is an indispensable item ",
	line2: "when starting Ender IO. To get it, use",
	line3: "Flint and Steel to burn Bedrock",
	line4: "Note: It can't Anti-Fire"
});
*/
ModAPI.addAPICallback("RecipeViewer", function(api) {

   RV = api.Core;

   /* const Bitmap = android.graphics.Bitmap;
    const Canvas = android.graphics.Canvas;
    const Rect = android.graphics.Rect;

    let bmp, cvs, source;*/
   let x = y = 0;
   /*
   
     RV.registerRecipeType("enderio_info", {
       title: "Infomation",
       contents: {
         icon: ItemID.enderCapacitor,
         description: "Infomation",
         drawing: [],
         elements: {
           input0: { type: "slot", x: 520, y: 170 },
           line1: { type: "text", x: 200, y: 200, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
           line2: { type: "text", x: 200, y: 230, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
           line3: { type: "text", x: 200, y: 260, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
           line4: { type: "text", x: 200, y: 290, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
         }
       },
       getList: function(id, data, isUsage) {
         let list = [];
         if (isUsage) {
           for (let i in RecipeViewerSupport.info) {
             let info = RecipeViewerSupport.info[i];
             let Item = info.item
             if (Item.id == id) {
               list.push({
                 input: [{ id: item.id, count: 1, data: item.data }],
                 line: [
                 info.line1,
                 info.line2,
                 info.line3,
                 info.line4
               ]
               });
             }
           }
         }
         return list;
       },
       getAllList: function() {
         const list = [];

         for (let i in RecipeViewerSupport.info) {
           let info = RecipeViewerSupport.info[i];
           let Item = info.item
           if (Item.id == id) {
             list.push({
               input: [{ id: item.id, count: 1, data: item.data }],
               line: [
                         info.line1,
                         info.line2,
                         info.line3,
                         info.line4
                       ]
             });
           }
         }
         return list;
       },
       onOpen: function(elements, data) {
         let line1 = elements.get("line1");
         line1.onBindingUpdated("text", data ? data.line[0] : "");

         let line2 = elements.get("line2");
         line2.onBindingUpdated("text", data ? data.line[1] : "");

         let line3 = elements.get("line3");
         line3.onBindingUpdated("text", data ? data.line[2] : "");

         let line4 = elements.get("line4");
         line4.onBindingUpdated("text", data ? data.line[3] : "");

       }
     });*/


   RV.registerRecipeType("enderio_alloy", {
      title: "Alloy Smelter",
      contents: {
         icon: BlockID.alloySmelter,
         description: "alloy",
         drawing: [
            { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
            { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
            ],
         elements: {
            input0: { type: "slot", x: 520, y: 170 },
            input1: { type: "slot", x: 600, y: 140 },
            input2: { type: "slot", x: 680, y: 170 },
            output0: { type: "slot", x: 600, y: 320 },
            textTime: { type: "text", x: 750, y: 200 }
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
            var rec = RecipeRegistry.smelter
            for (let i in rec) {
               let recipe = rec[i]
               let result0 = recipe.result;
               let input0 = recipe.ingredient1;
               let input1 = recipe.ingredient2;
               let input2 = recipe.ingredient3;
               if (input1.id == id || input0.id == id || input2.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: input0.count || 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: input2.count || 1 }
                 ],
                     output: [{ id: result0.id, data: result0.data, count: result0.count }],
                     time: recipe.time
                  });
               } else if (result0.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: input0.count || 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: input2.count || 1 }
                                         ],
                     output: [{ id: result0.id, data: result0.data, count: result0.count }],
                     time: recipe.time
                  });
               }
            }
         } else {
            var rec = RecipeRegistry.smelter
            for (let i in rec) {
               let recipe = rec[i]
               let result0 = recipe.result;
               let input0 = recipe.ingredient1;
               let input1 = recipe.ingredient2;
               let input2 = recipe.ingredient3;
               if (result0.id == id) {
                  list.push({
                     input: [
                        { id: input0.id, data: input0.data, count: input0.count || 1 },
                        { id: input1.id, data: input1.data, count: 1 },
                        { id: input2.id, data: input2.data, count: input2.count || 1 }
                               ],
                     output: [{ id: result0.id, data: result0.data, count: result0.count }],
                     time: recipe.time
                  });
               }
            }

         }
         return list;
      },
      getAllList: function() {
         const list = [];

         var rec = RecipeRegistry.smelter
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
               output: [{ id: result0.id, data: result0.data, count: result0.count }],
               time: recipe.time
            });

         }
         return list;
      },
      onOpen: function(elements, data) {
         let elem = elements.get("textTime");
         elem.onBindingUpdated("text", data ? Translation.translate("Time: ") + data.time : "");
      }
   });
   //RecipeRegistry.showCrusher(RV);
   //RecipeRegistry.show(RV);
   RV.registerRecipeType("enderio_sag", {
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
            textChance0: { type: "text", x: 505, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textChance1: { type: "text", x: 570, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textChance2: { type: "text", x: 635, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textChance3: { type: "text", x: 700, y: 300, font: { size: 10, color: Color.WHITE, shadow: 0.25 } },
            textBy: { type: "text", x: 600, y: 420, font: { size: 15, color: Color.WHITE, shadow: 0.25 } }
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
            var rec = RecipeRegistry.crusher
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
                                  ],
                     by: recipe.by
                  });
               }
            }
         } else {
            var rec = RecipeRegistry.crusher
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
                                  ],
                     by: recipe.by
                  });
               }
            }
         }
         return list;

      },

      getAllList: function() {
         const list = [];
         var rec = RecipeRegistry.crusher
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
                                 ],
               by: recipe.by
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

         let by = elements.get("textBy");
         by.onBindingUpdated("text", data ? Translation.translate("Recipe add by: ") + data.by : "");
      }
   });


   RV.registerRecipeType("enderio_vat", {
      title: "The Vat",
      contents: {
         icon: BlockID.theVat,
         drawing: [
            { type: "bitmap", x: 281, y: -190, bitmap: "backgroundVat", scale: 3.3 },
            { type: "bitmap", x: 679, y: 304, bitmap: "fire_scale1", scale: 3.3 },
   			],
         elements: {
            input0: { type: "slot", x: 590, y: 130, size: 65 },
            input1: { type: "slot", x: 753, y: 130, size: 65 },

            inputLiq0: { x: 502, y: 130, width: 50, height: 200 },
            outputLiq0: { x: 842, y: 130, width: 50, height: 200 },
            textTime: { type: "text", x: 780, y: 200 },
         },
         tankLimit: 10000,
      },


      getList: function(id, data, isUsage) {
         let list = [];
         if (isUsage) {
            for (var i in RecipeRegistry.theVat) {
               let recipe = RecipeRegistry.theVat[i];
               let input1 = recipe.input1;
               let input2 = recipe.input2;
               let liqIn = recipe.inputLiquid;
               let liqOut = recipe.outputLiquid;
               let amountIn = recipe.inputAmount;
               let amountOut = recipe.outputAmount;
               let time = recipe.time;
               if (input1.id == id || input2.id == id) {
                  list.push({
                     input: [{ id: input1.id, count: 1, data: input1.data || 0 },
                        { id: input2.id || 0, count: 1, data: input2.data || 0 }
                 ],
                     inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
                     outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }],
                     time: time
                  });
               } else if (liqIn == id) {
                  list.push({
                     input: [{ id: input1.id, count: 1, data: input1.data || 0 },
                        { id: input2.id || 0, count: 1, data: input2.data || 0 }
                 ],
                     inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
                     outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }],
                     time: time
                  });
               }
            }
         } else {
            for (var i in RecipeRegistry.theVat) {
               let recipe = RecipeRegistry.theVat[i];
               let input1 = recipe.input1;
               let input2 = recipe.input2;
               let liqIn = recipe.inputLiquid;
               let liqOut = recipe.outputLiquid;
               let amountIn = recipe.inputAmount;
               let amountOut = recipe.outputAmount;
               let time = recipe.time;
               if (liqOut == id) {
                  list.push({
                     input: [
                        { id: input1.id, count: 1, data: input1.data || 0 },
                        { id: input2.id || 0, count: 1, data: input2.data || 0 }
                      ],
                     inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
                     outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }]
                  });
               }
            }
         }
         return list;
      },

      getAllList: function() {
         const list = [];
         for (var i in RecipeRegistry.theVat) {
            let recipe = RecipeRegistry.theVat[i];
            let input1 = recipe.input1;
            let input2 = recipe.input2;
            let liqIn = recipe.inputLiquid;
            let liqOut = recipe.outputLiquid;
            let amountIn = recipe.inputAmount;
            let amountOut = recipe.outputAmount;
            let time = recipe.time;
            list.push({
               input: [{ id: input1.id, count: 1, data: input1.data || 0 },
                  { id: input2.id || 0, count: 1, data: input2.data || 0 }
                 ],
               inputLiq: [{ liquid: liqIn, amount: amountIn * 1000 }],
               outputLiq: [{ liquid: liqOut, amount: amountOut * 1000 }]
            });
         }
         return list
      }/*
      onOpen: function(elements, data) {
         let scaleInputLiquid = elements.get("scaleInputLiquid");
         let scaleResultLiquid = elements.get("scaleResultLiquid");

         scaleInputLiquid.onBindingUpdated("texture",
            LiquidRegistry.getLiquidUITexture(data.inputLiquid.liquid, 16, 58));
         scaleInputLiquid.onBindingUpdated("value", 1 / 4);

         scaleResultLiquid.onBindingUpdated("texture",
            LiquidRegistry.getLiquidUITexture(data.outputLiquid.liquid, 16, 58));
         scaleResultLiquid.onBindingUpdated("value", 1 / 4);

      }*/
   });

   RV.registerRecipeType("enderio_sas", {
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