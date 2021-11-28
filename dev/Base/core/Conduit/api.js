let ConduitRegistry = {

  registerCable: function(nameID, maxVoltage) {
    let blockID = BlockID[nameID];
    RF.registerWire(blockID, maxVoltage);
  },

  setupModel: function(id, width) {
    var render = new ICRender.Model();
    var shape = new ICRender.CollisionShape();
    BlockRenderer.setStaticICRender(id, 0, render);

    var boxes = [
      { side: [1, 0, 0], box:[0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1 - 0.03, 0.5 + width / 2, 0.5 + width / 2] }, //0
      { side: [-1, 0, 0], box:  [0 + 0.03, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2] }, //1
      { side: [0, 1, 0], box:  [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1 - 0.03, 0.5 + width / 2] }, //2
      { side: [0, -1, 0], box:  [0.5 - width / 2, 0 + 0.03, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2] }, //3
      { side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1 - 0.03] }, //4
      { side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0 + 0.03, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2] }, //5
    ]

    var group = ICRender.getGroup("rf-wire");
    group.add(id, -1);


    for (var i in boxes) {
      var box = boxes[i];

      var model = BlockRenderer.createModel();
      model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
      model.addBox(0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, id, 0);
      render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   // BlockRenderer.setCustomCollisionShape(id, 0, shape);

    var model = BlockRenderer.createModel();
    model.addBox(0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 - 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, 0.5 + 0.3125 / 2, id, 0);
    render.addEntry(model);

    width = Math.max(width, 0.5);
    Block.setBlockShape(id, { x: 0.5 - width / 2, y: 0.5 - width / 2, z: 0.5 - width / 2 }, { x: 0.5 + width / 2, y: 0.5 + width / 2, z: 0.5 + width / 2 });
  }

}