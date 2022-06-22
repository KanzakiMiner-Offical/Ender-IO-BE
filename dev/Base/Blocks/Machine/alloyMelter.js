IDRegistry.genBlockID("alloySmelter");
Block.createBlockWithRotation("alloySmelter", [
   {
      name: "Alloy Smelter",
      texture: [
	   ["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]
	 ],
      inCreative: true
  }
], "opaque");

TileRenderer.setStandartModel(BlockID.alloySmelter, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.alloySmelter, 0, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFront", 0], ["machineSide", 0], ["machineSide", 0]]);
TileRenderer.registerRotationModel(BlockID.alloySmelter, 4, [["machineBottom", 0], ["machineTop", 0], ["machineSide", 0], ["alloySmelterFrontOn", 0], ["machineSide", 0], ["machineSide", 0]]);

TileRenderer.setRotationPlaceFunction(BlockID.alloySmelter);

/*
 // Generated With Model Converter - Json To ICModel
var render = new ICRender.Model();
var model = BlockRenderer.createModel();
	model.addBox(1/16, 1/16, 14.75/16, 2/16, 15/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(2/16, 12/16, 14.75/16, 15/16, 15/16, 15.75/16, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(2/16, 1/16, 14.75/16, 5/16, 9/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(5/16, 7/16, 14.75/16, 6/16, 12/16, 15.75/16, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(5/16, 1/16, 14.75/16, 15/16, 2/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(6/16, 7/16, 14.75/16, 15/16, 9/16, 15.75/16, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(10/16, 9/16, 14.75/16, 11/16, 12/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(11/16, 2/16, 14.75/16, 15/16, 7/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(14/16, 9/16, 14.75/16, 15/16, 12/16, 15.75/16, [, ["block_alloy_smelter_front", 0], ["block_alloy_smelter_front", 0]]); //undefined
	model.addBox(1/16, 1/16, 13.75/16, 15/16, 15/16, 14.75/16, [, ["block_alloy_smelter_front", 0]]); //undefined
render.addEntry(model);
BlockRenderer.setStaticICRender(BlockID.block_rendered, 0, render);
//Model generated with block id block_rendered, please change id before copy pasting to your code!
*/

var smelterGUI = new UI.StandartWindow({
   standart: {
      header: { text: { text: "Alloy Smelter" } },
      inventory: { standart: true },
      background: { standart: true }
   },
   drawing: [
      { type: "bitmap", x: 527, y: 235, bitmap: "fire_scale0", scale: 3.2 },
      { type: "bitmap", x: 687, y: 235, bitmap: "fire_scale0", scale: 3.2 },
      { type: "bitmap", x: 335, y: 140, bitmap: "redflux_bar0", scale: 3.2 },
        //{type: "bitmap", x: 600, y: 170, bitmap: "bar_alloy", scale: 4.5},
    ],
   elements: {
      "progressBack0": {
         type: "bitmap",
         x: 527,
         y: 235,
         direction: 1,
         bitmap: "fire_scale0",
         scale: 3.2,
         clicker: {
            onClick: function() {
               RV && RV.openRecipePage("enderio_alloy");
            }
         }
      },
      "progressScale0": {
         type: "scale",
         x: 527,
         y: 235,
         direction: 1,
         bitmap: "fire_scale1",
         scale: 3.2,
         clicker: {
            onClick: function(container, tile) {
               let percent = (tile.data.progress / tile.data.work_time) * 100
               if (percent) {
                  alert(percent + " %");
               } else {
                  alert("0 %");
               }
            },
            onLongClick: function() {
               RV && RV.openRecipePage("enderio_alloy");
            }
         }
      },
      "progressScale1": {
         type: "scale",
         x: 687,
         y: 235,
         direction: 1,
         bitmap: "fire_scale1",
         scale: 3.2,
         clicker: {
            onClick: function(container, tile) {
               let percent = (tile.data.progress / tile.data.work_time) * 100
               if (percent) {
                  alert(percent + " %");
               } else {
                  alert("0 %");
               }
            },
            onLongClick: function() {
               RV && RV.openRecipePage("enderio_alloy");
            }
         }
      },
      "energyScale": {
         type: "scale",
         x: 335,
         y: 140,
         direction: 1,
         bitmap: "redflux_bar1",
         scale: 3.2,
         clicker: {
            onClick: function(container, tile) {
               alert(tile.data.energy + " / " + tile.data.energy_storage + " RF");
            },
            onLongClick: function(container, tile) {
               alert("Energy Use: " + tile.data.energy_consumption + " RF/t")
            }
         }
      },
      "ingredient1": {
         type: "slot",
         x: 520,
         y: 170,
         isValid: function(id, count, data) {
            return RecipeRegistry.isIngr1(id, data) || Recipes.getFurnaceRecipeResult(id, "iron") ? true : false;
         }
      },
      "ingredient2": {
         type: "slot",
         x: 600,
         y: 140,
         isValid: function(id, count, data) {
            return RecipeRegistry.isIngr2(id, data)
         }
      },
      "ingredient3": {
         type: "slot",
         x: 680,
         y: 170,
         isValid: function(id, count, data) {
            return RecipeRegistry.isIngr3(id, data)
         }
      },
      //"text": { type: "text", x: 400, y: 100, width: 100, height: 30, text: "RF" },
      "slotCapacitor": { type: "slot", x: 325, y: 320 },
      "textInstall": { type: "text", font: { size: 20, color: Color.YELLOW }, x: 325, y: 50, width: 100, height: 30, text: "" },
      "resultSlot": { type: "slot", x: 600, y: 320 },
      "changeMode": {
         type: "button",
         x: 787,
         y: 300,
         bitmap: "alloy0",
         scale: 2.2,
         clicker: {
            onClick: function(container, tile) {
               tile.data.progress = 0;
               tile.data.work_time = 0;
               tile.data.mode = (tile.data.mode + 1) % 2;
            }
         }
      }
   }
});
Callback.addCallback("PreLoaded", function() {
   Recipes.addFurnace(ItemID.dustLapis, VanillaItemID.lapis_lazuli, 0);
   Recipes.addFurnace(ItemID.dustQuarzt, VanillaItemID.quartz, 0);
   RecipeRegistry.addSmelter({
      ingredient1: { id: ItemID.dustQuarzt, data: 0, count: 1 },
      ingredient2: { id: 0, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: VanillaItemID.quartz, count: 1, data: 0 },
      time: 120
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: ItemID.dustLapis, data: 0, count: 1 },
      ingredient2: { id: 0, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: VanillaItemID.lapis_lazuli, count: 1, data: 0 },
      time: 120
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: 331, data: 0, count: 1 },
      ingredient2: { id: 265, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.conductiveIron, count: 1, data: 0 },
      time: 250
   });
   /*
     RecipeRegistry.addSmelter({
       ingredient1: { id: 331, data: 0, count: 1 },
       ingredient2: { id: 265, data: 0 },
       ingredient3: { id: 0, data: 0, count: 0 },
       result: { id: ItemID.conductiveIron, count: 1, data: 0 },
       time: 500
     });*/
   RecipeRegistry.addSmelter({
      ingredient1: { id: 266, data: 0, count: 1 },
      ingredient2: { id: 331, data: 0 },
      ingredient3: { id: 348, data: 0, count: 1 },
      result: { id: ItemID.energeticAlloy, count: 1, data: 0 },
      time: 250
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: ItemID.energeticAlloy, data: 0, count: 1 },
      ingredient2: { id: 368, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.vibrantAlloy, count: 1, data: 0 },
      time: 280
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: 265, data: 0, count: 1 },
      ingredient2: { id: 368, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0 },
      result: { id: ItemID.pulsatingIron, count: 1, data: 0 },
      time: 250
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
      ingredient2: { id: ItemID.dustCoal, data: 0 },
      ingredient3: { id: 49, data: 0, count: 1 },
      result: { id: ItemID.darkSteel, count: 1, data: 0 },
      time: 500
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: VanillaItemID.iron_ingot, data: 0, count: 1 },
      ingredient2: { id: ItemID.dustCoal, data: 0 },
      ingredient3: { id: ItemID.silicon, data: 0, count: 1 },
      result: { id: ItemID.electricalSteel, count: 1, data: 0 },
      time: 250
   });
   RecipeRegistry.addSmelter({
      ingredient1: { id: 331, data: 0, count: 1 },
      ingredient2: { id: ItemID.silicon, data: 0 },
      ingredient3: { id: 0, data: 0, count: 0, count: 1 },
      result: { id: ItemID.redstoneAlloy, count: 1, data: 0 },
      time: 250
   });
   // Under 1.12 PC/No have Machine Addon
   /*
   Recipes.addShaped({ id: BlockID.alloySmelter, count: 1, data: 0 }, [
       	"ifi",
       	"fmf",
   	   "ici"
     ], ['i', 265, 0, 'f', 61, 0, "m", BlockID.machineChassi, 0, "c", 380, 0]);
    */
   // Machine Addon :>
   Recipes.addShaped({ id: BlockID.alloySmelter, count: 1, data: 0 }, [
    	"i i",
    	"amf",
	   "c c"
  ], ['i', ItemID.darkSteel, 0, 'f', BlockID.simpleAlloySmelter, 0, "m", BlockID.machineChassi, 0, "c", ItemID.darkSteelGear, 0, "a", BlockID.simplePoweredFurnace, 0]);
});
MachineRegistry.registerElectricMachine(BlockID.alloySmelter, {
   defaultValues: {
      power_tier: 2,
      progress: 0,
      mode: 0,
      work_time: 0,
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000,
      isActive: false
   },
   oldValues: {
      speed: 1,
      energy_consumption: 30,
      energy_storage: 100000
   },

   upgrades: ["capacitor"],

   getTier: function() {
      return this.data.power_tier;
   },

   getGuiScreen: function() {
      return smelterGUI;
   },

   alloy: function() {
      let ingredient1 = this.container.getSlot("ingredient1");
      let ingredient2 = this.container.getSlot("ingredient2");
      let ingredient3 = this.container.getSlot("ingredient3");
      let resultSlot = this.container.getSlot("resultSlot");

      let newActive = false;
      for (let i in RecipeRegistry.smelter) {
         var Recipe = RecipeRegistry.smelter[i];
         var ingri1 = Recipe.ingredient1;
         var ingri2 = Recipe.ingredient2;
         var ingri3 = Recipe.ingredient3;
         var time = Recipe.time
         var result = Recipe.result

         if ((ingredient1.id == ingri1.id && (ingredient1.data == ingri1.data || ingredient1.data == 0) && (ingredient1.count >= ingri1.count || ingredient1.count >= 1)) &&
            (ingredient2.id == ingri2.id && (ingredient2.data == ingri2.data || ingredient2.data == 0) && ingredient2.count >= 1) &&
            (ingredient3.id == ingri3.id && (ingredient3.data == ingri3.data || ingredient3.data == 0) && (ingredient3.count >= ingri3.count || ingredient3.count >= 1))) {
            this.data.work_time = time;

            if ((resultSlot.id == result.id && resultSlot.count <= 64 - result.count && (!resultSlot || resultSlot.data == result.data)) || (resultSlot.id == 0)) {

               if (this.data.energy >= this.data.energy_consumption) {
                  this.data.energy -= this.data.energy_consumption;
                  this.data.progress += this.data.speed;
                  for (var i = 0; i < 4; i++) {
                     Particles.addParticle(Native.ParticleType.flame, this.x + Math.random(), this.y + 0.5, this.z + Math.random(), 0, 0, 0);
                  }
                  newActive = true;
               } else {
                  this.data.progress = 0;
               }
               /*
               Particles.addFarParticle(Native.ParticleType.smoke, this.x + .5, this.y + 1.1, this.z + .5)
               Particles.addFarParticle(Native.ParticleType.flame, this.x + .5, this.y + 1.1, this.z + .5)
               */
               if (this.data.progress >= this.data.work_time) {
                  resultSlot.id = result.id;
                  resultSlot.data = result.data;
                  resultSlot.count += result.count;
                  ingredient1.count -= ingri1.count;
                  ingredient2.count--;
                  ingredient3.count -= ingri3.count;
                  this.container.validateAll();
                  this.data.progress = 0;
               }
            }
         }

         if (!newActive) {
            // this.stopPlaySound(true);
            this.setActive(newActive);
         }
         this.container.setScale("progressScale0", this.data.progress / this.data.work_time || 0);
         this.container.setScale("progressScale1", this.data.progress / this.data.work_time || 0);
      }

   },

   furnace: function() {
      let ingredient1 = this.container.getSlot("ingredient1");
      let ingredient2 = this.container.getSlot("ingredient2");
      let ingredient3 = this.container.getSlot("ingredient3");
      let result = this.container.getSlot("resultSlot");
      let rec = Recipes.getFurnaceRecipeResult(ingredient1.id, "iron");

      let newActive = false;
      if (rec) {
         if ((result.id == rec.id && result.data == rec.data && result.count <= 64 || result.id == 0)) {
            this.data.work_time = 100
            if (this.data.energy >= this.data.energy_consumption) {

               this.data.energy -= this.data.energy_consumption;
               this.data.progress += this.data.speed;
               newActive = true;
            }
            if (this.data.progress >= 100) {
               result.id = rec.id;
               result.data = rec.data;
               result.count++;
               this.data.progress = 0;
               ingredient1.count--;
               this.container.validateAll();
            }
         }
      } else {
         this.data.progress = 0;
      }
      if (!newActive) {
         // this.stopPlaySound(true);
         this.setActive(newActive);
      }
      this.container.setScale("progressScale0", this.data.progress / 100 || 0);
      this.container.setScale("progressScale1", this.data.progress / 100 || 0);
   },

   resetValues: function() {
      this.data.energy_storage = this.oldValues.energy_storage;
      this.data.energy_consumption = this.oldValues.energy_consumption;
      this.data.speed = this.oldValues.speed;
   },

   tick: function() {
      this.resetValues();
      UpgradeAPI.executeUpgrades(this);

      let capacitor = this.container.getSlot("slotCapacitor");
      for (let i in capacitorObj) {
         if (capacitor.id == capacitorObj[i]) {
            this.container.setText("textInstall", "Installed");

            if (this.data.mode === 0) this.alloy();
            if (this.data.mode === 1) this.furnace();
         } else if (capacitor.id != capacitorObj[i]) {
            this.container.setText("textInstall", "Please put Capacitor in slot capacitor to install function for machine");
         }
      }


      // if (this.data.mode === 2) {
      // this.furnace();
      // this.alloy();
      // }

      if (this.container.getGuiContent()) {
         this.container.getGuiContent().elements["changeMode"].bitmap = "alloy" + this.data.mode;
      }


      var energyStorage = this.getEnergyStorage();
      this.data.energy = Math.min(this.data.energy, energyStorage);
      this.container.setScale("energyScale", this.data.energy / energyStorage);
      //this.container.setText("text", this.data.energy + "/" + energyStorage);
   },
   getEnergyStorage: function() {
      return this.data.energy_storage;
   }
});
StorageInterface.createInterface(BlockID.alloySmelter, {
   slots: {
      "ingredient1": {
         input: true,
         isValid: function(item, side, tileEntity) {
            return RecipeRegistry.isIngr1(item.id, item.data) || Recipes.getFurnaceRecipeResult(item.id, "iron") ? true : false;
         }
      },
      "ingredient2": {
         input: true,
         isValid: function(item, side, tileEntity) {
            return RecipeRegistry.isIngr2(item.id, item.data);
         }
      },
      "ingredient3": {
         input: true,
         isValid: function(item, side, tileEntity) {
            return RecipeRegistry.isIngr3(item.id, item.data);
         }
      },
      "resultSlot": { output: true }
   }
});