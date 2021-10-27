/*var EnderBook = {
  SagMill: function() {
    for (let i = 1; i <= a.length; i++) {
    IDRegistry.genItemID("enderBook0");
    Item.createItem("enderBook0", "SAGMill's Guide", { name: "book", meta: 0 }, { stack: 1 });
    var container = new UI.Container();

    Callback.addCallback("ItemUse", function(coords, item) {
      if (item.id == ItemID.enderBook0) {
        container.openAs(SagHelp1);
      }
    });
      let next = i + 1;
      let pre = i - 1;
      var SagHelp + i = new UI.Window({
        standart: {
          header: { text: { text: "SAG Mill" } },
          inventory: { standart: false },
          background: { standart: true }
        },
        elements: {
          "progressScale": {
            type: "scale",
            x: 595,
            y: 250,
            direction: 3,
            bitmap: "bar_progress_down1",
            scale: 4.2,
            clicker: {
              onClick: function(container) {
                RecipeViewer && RecipeViewer.RecipeTypeRegistry.openRecipePage("enderio_sag", container);
              }
            }
          },
          "ingredient": { type: "slot", x: 602, y: 170, source: { id: 0, count: 1 } },
          "result0": { type: "slot", x: 505, y: 340, source: { id: 0, count: 1 } },
          "result1": { type: "slot", x: 570, y: 340, source: { id: 0, count: 1 } },
          "result2": { type: "slot", x: 635, y: 340, source: { id: 0, count: 1 } },
          "result3": { type: "slot", x: 700, y: 340, source: { id: 0, count: 1 } },
          "textChance0": { type: "text", x: 505, y: 300 },
          "textChance1": { type: "text", x: 570, y: 300 },
          "textChance3": { type: "text", x: 635, y: 300 },
          "textChance4": { type: "text", x: 700, y: 300 },
          "textTime": { type: "text", x: 700, y: 200 },
          "btnNext": {
            type: "button",
            x: 860,
            y: 620,
            bitmap: "btn_achievements_next",
            scale: 3,
            clicker: {
              onClick: function() {
                container.openAs(SagHelp + next);
              }
            }
          },
          "btnPrevious": {
            type: "button",
            x: 640,
            y: 620,
            bitmap: "btn_achievements_previous",
            scale: 3,
            clicker: {
              onClick: function() {
                container.openAs(SagHelp + pre);
              }
            }
          }
        }
      });
      let elements = getElements();
      let elem;
      //var TimeContainer = new UI.Container();
      var rec = RecipeRegistry.reqCrusher(true)
      let a = i - 1;
      let recipe = rec[a];
      let input = recipe.ingredient;
      let result0 = recipe.result0;
      let result1 = recipe.result1;
      let result2 = recipe.result2;
      let result3 = recipe.result3;

      elem = elements.get("textChance0");
      elem.onBindingUpdated("textChance0", result0.chance * 100 + "%");
      elem = elements.get("textChance1");
      elem.onBindingUpdated("textChance1", result1.chance * 100 + "%");
      elem = elements.get("textChance2");
      elem.onBindingUpdated("textChance2", result2.chance * 100 + "%");
      elem = elements.get("textChance3");
      elem.onBindingUpdated("textChance3", result3.chance * 100 + "%");

      elem = elements.get("ingredient");
      elem.source.id = input.id;
      elem = elements.get("result0");
      elem.source.id = result0.id;
      elem = elements.get("result1");
      elem.source.id = result1.id;
      elem = elements.get("result2");
      elem.source.id = result2.id;
      elem = elements.get("result3");
      elem.source.id = result3.id;
    }
    
  }
}

EnderBook.SagMill();*/