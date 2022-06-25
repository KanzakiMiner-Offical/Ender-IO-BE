IDRegistry.genBlockID("theVat");
Block.createBlock("theVat", [{ "name": "The Vat", "texture": [["machineBottom", 0]], "inCreative": true }]);

function setVatRender() {
   var vatRender = new ICRender.Model();
   BlockRenderer.setStaticICRender(BlockID.theVat, 0, vatRender);
   var model = BlockRenderer.createModel();

   model.addBox(0 / 16, 0 / 16, 0 / 16, 16 / 16, 4 / 16, 16 / 16, "machineBottom", 0);
   model.addBox(9 / 16, 4 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
   model.addBox(0 / 16, 4 / 16, 0 / 16, 7 / 16, 16 / 16, 16 / 16, "machineBottom", 0);
   model.addBox(7 / 16, 4 / 16, 4 / 16, 9 / 16, 11 / 16, 12 / 16, "machineBottom", 0);
   model.addBox(7 / 16, 8 / 16, 4 / 16, 9 / 16, 10 / 16, 18 / 16, "machineBottom", 0);
   model.addBox(7 / 16, 12 / 16, 4 / 16, 9 / 16, 14 / 16, 12 / 16, "machineBottom", 0);

   vatRender.addEntry(model);
}

Block.setBlockShape(BlockID.theVat, { "x": 0, "y": 0, "z": 0 }, { "x": 1, "y": 1, "z": 1 });

setVatRender();

var VatGUI = new UI.StandartWindow({
   standart: {
      header: { text: { text: "The Vat" } },
      inventory: { standart: true },
      background: { standart: true }
   },
   drawing: [
      { type: "bitmap", x: 350, y: -80, bitmap: "backgroundVat", scale: 3.4 },
  ],
   elements: {
      "energyScale": { type: "scale", x: 446, y: 131, direction: 1, bitmap: "redflux_bar1", scale: 2.75 },
      "slotInput0": {
         type: "slot",
         x: 560,
         y: 140,
         size: 60,
         bitmap: "empty",
         isTransparentBackground: true,
         isValid: function(id, count, data) {
            return RecipeRegistry.getInVat1(id, data);
         }
      },
      "slotInput1": {
         type: "slot",
         x: 728,
         y: 140,
         size: 60,
         bitmap: "empty",
         isTransparentBackground: true,
         isValid: function(id, count, data) {
            return RecipeRegistry.getInVat2(id, data);
         }
      },
      "liquidScale1": { type: "scale", x: 473, y: 132, direction: 1, bitmap: "fluid_scale", scale: 2.9 },
      "liquidScale2": { type: "scale", x: 824, y: 132, direction: 1, bitmap: "fluid_scale", scale: 2.9 },
      "progressScale": {
         type: "scale",
         x: 646,
         y: 317,
         direction: 1,
         bitmap: "fire_scale1",
         scale: 3.3,
         clicker: {
            onClick: function() {
               RV && RV.openRecipePage("enderio_vat");
            }
         }
      },
      "slot1": { type: "slot", x: 470, y: 320, size: 60, bitmap: "slot_fluid_full" },
      "slot3": { type: "slot", x: 820, y: 320, size: 60, bitmap: "slot_fluid_empty", },
      "slot2": { type: "slot", x: 470, y: 380, size: 60, bitmap: "slot_fluid_empty" },
      "slot4": { type: "slot", x: 820, y: 380, size: 60, bitmap: "slot_fluid_full" },
   }
});

StorageInterface.createInterface(BlockID.theVat, {
   slots: {
      "slotInput0": {
         input: true,
         isValid: function(item) {
            return RecipeRegistry.getInVat1(item.id, item.data);
         }
      },
      "slotInput1": {
         input: true,
         isValid: function(item) {
            return RecipeRegistry.getInVat2(item.id, item.data);
         }
      },
      "slot1": {
         input: true,
         isValid: function(item) {
            var empty = LiquidLib.getEmptyItem(item.id, item.data);
            if (!empty) return false;
            return RecipeRegistry.getLiquidVat1(empty.liquid);;
         }
      },
      "slot2": {
         output: true,
         isValid: function(item) {
            return item.id == VanillaItemID.bucket;
         }
      },
      "slot3": {
         input: true,
         isValid: function(item) {
            return item.id == VanillaItemID.bucket;
         }
      },
      "slot4": {
         output: true
         /*
                  isValid: function(item) {
                     var empty = LiquidLib.getEmptyItem(item.id, item.data);
                     if (!empty) return false;
                   return RecipeRegistry.getLiquidVat2(empty.liquid);;
                  }*/
      },

      canReceiveLiquid: function(liquid, side) { return true; },
      canTransportLiquid: function(liquid, side) { return true; }
   }
});


Callback.addCallback("PreLoaded", function() {

   Recipes.addShaped({ id: BlockID.theVat, count: 1, data: 0 }, [
         	"ici",
         	"rmr",
   	     "gfg"
       ], ['i', ItemID.electricalSteel, 0, 'c', VanillaTileID.cauldron, 0, "r", BlockID.eioTank, 0, 'f', VanillaBlockID.furnace, 0, "m", BlockID.machineChassi, 0, "c", ItemID.darkSteel, 0
     ]);

   RecipeRegistry.addVat({
      input1: { id: 296, data: 0 }, //wheat
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 3,
      outputLiquid: "hootch",
      outputAmount: 0.75,
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.poisonous_potato, data: 0 }, //poison potato
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 8,
      outputLiquid: "hootch",
      outputAmount: 2,
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.potato, data: 0 }, //potato
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 4,
      outputLiquid: "hootch",
      outputAmount: 1,
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.rotten_flesh, data: 0 }, //rotten_flesh
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 1.5, //1500mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.375, //375mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.rotten_flesh, data: 0 }, //rotten_flesh
      input2: { id: VanillaItemID.fermented_spider_eye, data: 0 }, //fermented_spider_eye
      inputLiquid: "water",
      inputAmount: 3, //3000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.75, //750mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: VanillaItemID.rotten_flesh, data: 0 }, //rotten_flesh
      input2: { id: VanillaTileID.nether_wart, data: 0 }, //nether_wart
      inputLiquid: "water",
      inputAmount: 2.25, //3000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.5625, //5625mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: 397, data: 0 }, //skull
      input2: { id: VanillaItemID.sugar, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 2, //2000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 0.5, //500mb
      time: 300
   });

   RecipeRegistry.addVat({
      input1: { id: 397, data: 0 }, //skull
      input2: { id: VanillaItemID.fermented_spider_eye, data: 0 }, //sugar
      inputLiquid: "water",
      inputAmount: 4, //4000mb
      outputLiquid: "nutrientDistillation",
      outputAmount: 1, //100mb
      time: 300
   });


   /*
     RecipeRegistry.addVat({
       input1: { id: 296, data: 0 },
       input2: { id: 353, data: 0 },
       liquidOut: { id: "hootch", count: 1 },
       liquidIn: { id: "water", count: 1 },
       time: 100
     });

     RecipeRegistry.addVat({
       input1: { id: 295, data: 0 },
       input2: { id: 353, data: 0 },
       liquidOut: { id: "hootch", count: 1 },
       liquidIn: { id: "water", count: 1 },
       time: 100
     });

     RecipeRegistry.addVat({
       input1: { id: 392, data: 0 },
       input2: { id: 353, data: 0 },
       liquidOut: { id: "hootch", count: 1 },
       liquidIn: { id: "water", count: 1 },
       time: 100
     });
     
       MachineRecipe.addVatRecipe([[363, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[365, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[319, 0], [376, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[367, 0], [353, 0]], {liquid: "nutrientDistillation", usedLiquid: "water"});
       
       MachineRecipe.addVatRecipe([[296, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[295, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
       MachineRecipe.addVatRecipe([[392, 0], [353, 0]], {liquid: "hootch", usedLiquid: "water"});
       
       MachineRecipe.addVatRecipe([[377, 0], [331, 0]], {liquid: "fireWater", usedLiquid: "hootch"});
       
       MachineRecipe.addVatRecipe([[289, 0], [331, 0]], {liquid: "rocketFuel", usedLiquid: "hootch"});
       */
});


MachineRegistry.registerElectricMachine(BlockID.theVat, {
   defaultValues: {
      power_tier: 2,
      progress: 0,
      mode: 0,
      work_time: 0,
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000,
      isActive: false,

      // Liquid :>

      outputLiquid: null,
      inputLiquid: null,



   },
   oldValues: {
      speed: 1,
      energy_consumption: 20,
      energy_storage: 100000
   },

   upgrades: ["capacitor"],

   getTier: function() {
      return this.data.power_tier;
   },

   getGuiScreen: function() {
      return VatGUI;
   },

   getLiquidFromItem: MachineRegistry.getLiquidFromItem,
   addLiquidToItem: MachineRegistry.addLiquidToItem,

   resetValues: function() {
      this.data.energy_storage = this.oldValues.energy_storage;
      this.data.energy_consumption = this.oldValues.energy_consumption;
      this.data.speed = this.oldValues.speed;
   },

   init: function() {
      this.liquidStorage.setLimit(null, 10);
   },

   tick: function() {
      let ingredient1 = this.container.getSlot("slotInput0");
      let ingredient2 = this.container.getSlot("slotInput1");
      let threadTime = World.getThreadTime();

      for (var i in RecipeRegistry.theVat) {
         let recipe = RecipeRegistry.theVat[i];
         let input1 = recipe.input1;
         let input2 = recipe.input2;
         let liqIn = recipe.inputLiquid;
         let liqOut = recipe.outputLiquid;
         let amountIn = recipe.inputAmount;
         let amountOut = recipe.outputAmount;
         let time = recipe.time;
         let newActive = false;

         if ((ingredient1.id == input1.id && ingredient1.data == input1.data && ingredient1.count >= 1) &&
            (ingredient2.id == input2.id && ingredient2.data == input2.data && ingredient2.count >= 1)) {
            if ((this.data.inputLiquid == liqIn && this.liquidStorage.getAmount(this.data.inputLiquid) >= amountIn) &&
               (!this.data.outputLiquid || (this.data.outputLiquid == liqOut && this.liquidStorage.getAmount(this.data.outputLiquid) <= 10 - amountOut))) {
               this.data.work_time = time;
               if (this.data.energy >= this.data.energy_consumption) {
                  this.data.progress += this.data.speed;
                  this.data.energy -= this.data.energy_consumption;
                  newActive = true;
                  if (this.data.progress >= this.data.work_time) {
                     ingredient1.count -= 1;
                     ingredient2.count -= 1;
                     this.data.outputLiquid = liqOut;
                     this.liquidStorage.addLiquid(liqOut, amountOut);

                     this.liquidStorage.getLiquid(this.data.inputLiquid, amountIn);

                     this.container.validateAll();
                     this.data.progress = 0;
                  }
               } else {
                  this.data.progress = 0;
               }
            }
         }
         if (!newActive)
            // this.stopPlaySound(true);
            this.setActive(newActive);


         if (!this.data.inputLiquid || this.data.inputLiquid == recipe.inputLiquid && this.liquidStorage.getAmount(this.data.inputLiquid) <= 9) {
            var slot1 = this.container.getSlot("slot1");
            var slot2 = this.container.getSlot("slot2");
            this.getLiquidFromItem(recipe.inputLiquid, slot1, slot2);
            this.data.inputLiquid = recipe.inputLiquid
         }
         if (this.data.outputLiquid && this.liquidStorage.getAmount(this.data.outputLiquid) >= 1) {
            var slot3 = this.container.getSlot("slot3");
            var slot4 = this.container.getSlot("slot4");
            this.addLiquidToItem(this.data.outputLiquid, slot3, slot4);
         }
         if (this.liquidStorage.getAmount(this.data.outputLiquid) <= 0) {
            this.data.outputLiquid = null
         }

         if (this.liquidStorage.getAmount(this.data.inputLiquid) <= 0) {
            this.data.inputLiquid = null
         }

         this.liquidStorage.updateUiScale("liquidScale1", this.data.inputLiquid);
         this.liquidStorage.updateUiScale("liquidScale2", this.data.outputLiquid);
      }
      this.container.setScale("progressScale", (this.data.progress / this.data.work_time) || 0);

      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setScale("energyScale", this.data.energy / energyStorage);
   },

   getEnergyStorage: function() {
      return this.data.energy_storage;
   }

});