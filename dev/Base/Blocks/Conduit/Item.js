/*function setupWireRender(id, width, groupName, preventSelfAdd) {
  var render = new ICRender.Model();
  BlockRenderer.setStaticICRender(id, 0, render);

  var boxes = [
    { side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2] },
    { side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2] },
    { side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2] },
    { side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2] },
    { side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1] },
    { side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2] },
    ]

  var group = ICRender.getGroup(groupName);
  if (!preventSelfAdd) {
    group.add(id, -1);
  }

  for (var i in boxes) {
    var box = boxes[i];

    var model = BlockRenderer.createModel();
    model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);

    render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
  }

  var model = BlockRenderer.createModel();
  model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
  render.addEntry(model);

  width = Math.max(width, 0.5);
  Block.setBlockShape(id, { x: 0.5 - width / 2, y: 0.5 - width / 2, z: 0.5 - width / 2 }, { x: 0.5 + width / 2, y: 0.5 + width / 2, z: 0.5 + width / 2 });
}

*/

canTileBeReplaced = ModAPI.requireGlobal("canTileBeReplaced");

IDRegistry.genBlockID("itemConduit");
Block.createBlock("itemConduit", [
  { name: "Item Conduit", texture: [["item_conduit_core", 0]], inCreative: true }
]);


IDRegistry.genBlockID("itemConduitEx");
Block.createBlock("itemConduitEx", [
  { name: "Item Conduit Extractor", texture: [["item_conduit_core_ex", 0]], inCreative: true }
]);

IDRegistry.genBlockID("itemConduitIn");
Block.createBlock("itemConduitIn", [
  { name: "Item Conduit Input", texture: [["item_conduit_core_in", 0]], inCreative: true }
]);

Callback.addCallback("ItemUse", function(coords, item, block) {
  if (item.id == ItemID.itemYetaWrench && block.id == BlockID.itemConduit && Entity.getSneaking(Player.get())) {

    World.setBlock(coords.x, coords.y, coords.z, BlockID.itemConduitEx, 0);

  }
});;

Callback.addCallback("ItemUse", function(coords, item, block) {
  if (item.id == ItemID.itemYetaWrench && block.id == BlockID.itemConduitEx && Entity.getSneaking(Player.get())) {

    World.setBlock(coords.x, coords.y, coords.z, BlockID.itemConduitIn, 0);

  }
});

Callback.addCallback("ItemUse", function(coords, item, block) {
  if (item.id == ItemID.itemYetaWrench && block.id == BlockID.itemConduitIn && Entity.getSneaking(Player.get())) {

    World.setBlock(coords.x, coords.y, coords.z, BlockID.itemConduit, 0);

  }
});
// Transport
ItemPipe.register(BlockID.itemConduit, 0.1);
TileRenderer.setupWireModel(BlockID.itemConduit, 1, 0.35, "transport-item-pipe");


ICRender.getGroup("classify-item-pipe").add(BlockID.itemConduit, -1)
ICRender.getGroup("transport-item-pipe").add(BlockID.itemConduit, -1)
ICRender.getGroup("output-item-pipe").add(BlockID.itemConduit, -1)
ICRender.getGroup("input-item-pipe").add(BlockID.itemConduit, -1)
/*
ICRender.addGroupFor(BlockID.itemConduit, [
    "classify-item-pipe",
    "input-item-pipe",
    "output-item-pipe",
    "transport-item-pipe"
]);*/

Block.setBlockShape(BlockID.itemConduit, { x: 0.25, y: 0.25, z: 0 }, { x: 0.75, y: 0.75, z: 1 }, 0);

Block.registerPlaceFunction("itemConduit", function(coords, item, block) {
  var place = coords;
  if (!canTileBeReplaced(block.id, block.data)) {
    place = coords.relative;
    block = World.getBlock(place.x, place.y, place.z);
    if (!canTileBeReplaced(block.id, block.data)) return;
  }

  World.setBlock(place.x, place.y, place.z, item.id, 1);
  World.addTileEntity(place.x, place.y, place.z);
  Player.decreaseCarriedItem(1);
});

// Input
ItemPipe.register(BlockID.itemConduitIn, 0);
TileRenderer.setupWireModel(BlockID.itemConduitIn, 1, 0.5, "input-item-pipe", true);
Block.setBlockShape(BlockID.itemConduitIn, { x: 0.25, y: 0.25, z: 0 }, { x: 0.75, y: 0.75, z: 1 }, 0);

ICRender.getGroup("classify-item-pipe").add(BlockID.itemConduitIn, -1)
ICRender.getGroup("transport-item-pipe").add(BlockID.itemConduitIn, -1)
ICRender.getGroup("output-item-pipe").add(BlockID.itemConduitIn, -1)
/*
ICRender.addGroupFor(BlockID.itemConduitIn, [
	"classify-item-pipe",
	"transport-item-pipe",
	"output-item-pipe"
]);
*/
Block.registerPlaceFunction("itemConduitIn", function(coords, item, block) {
  var place = coords;
  if (!canTileBeReplaced(block.id, block.data)) {
    place = coords.relative;
    block = World.getBlock(place.x, place.y, place.z);
    if (!canTileBeReplaced(block.id, block.data)) return;
  }

  World.setBlock(place.x, place.y, place.z, item.id, 1);
  World.addTileEntity(place.x, place.y, place.z);
  Player.decreaseCarriedItem(1);
});

MachineRegistry.registerPrototype(BlockID.itemConduitIn, {
  defaultValues: {
    index: 0
  },

  getTransportingDirections: function(item) {
    var output = [],
      res = ItemPipe.filterDirections(ItemPipe.findDirections(item.position.x, item.position.y, item.position.z), item.direction);
    for (let i in res)
      if (World.getBlockID(this.x + res[i].x, this.y + res[i].y, this.z + res[i].z) != this.id) output.push(res[i]);
    return output;
  },

  tick: function() {
    if (World.getThreadTime() % 20 == 0) {
      var containerData = this.findContainer();
      if (containerData && containerData.container) {
        var item = this.getItemFrom(containerData.container, 1);
        if (item) {
          var trans = ItemPipe.item.deploy();
          trans.setPosition(containerData.position);
          trans.setItem(item);
          trans.setTarget(this);
          trans.setFriction(-0.3);
        } else {
          this.data.index++;
        }
      }
    }
  },

  findContainer: function() {
    var directions = ItemPipe.findContainers(this.x, this.y, this.z),
      dir = directions[this.data.index % directions.length];
    if (dir) return {
      direction: dir,
      position: { x: this.x + dir.x, y: this.y + dir.y, z: this.z + dir.z },
      container: World.getContainer(this.x + dir.x, this.y + dir.y, this.z + dir.z)
    };
  },

  getItemFrom: function(container, maxCount) {
    var slots = [],
      slotsInitialized = false;

    if (container.tileEntity) {
      if (container.tileEntity.getTransportedItem) container.tileEntity.getTransportedItem();
      if (container.tileEntity.getTransportSlots) {
        slots = container.tileEntity.getTransportSlots().output || [];
        slotsInitialized = true;
      }
    }

    if (!slotsInitialized) {
      if (container.isContainer) {
        for (let name in container.slots) slots.push(name);
      } else {
        for (let index = 0; index < container.getSize(); index++) slots.push(index);
      }
    }

    var item = null;
    for (let i in slots) {
      var slot = container.getSlot(slots[i]);
      if (slot.id > 0) {
        var count = Math.min(maxCount, slot.count);
        item = { id: slot.id, count: count, data: slot.data };
        slot.count -= count;

        if (!container.isContainer) container.setSlot(i, slot.id, slot.count, slot.data);

        break;
      }
    }

    if (container.isContainer) container.validateAll();

    return item;
  }
});

// Output
MachineRegistry.registerPipeOutputRenderModel = function(id, data, texture, groups) {
  var textures = [
		[texture[0], texture[0], texture[0], texture[0], texture[0], texture[1]],
		[texture[0], texture[0], texture[0], texture[0], texture[1], texture[0]],
		[texture[0], texture[1], texture[0], texture[0], texture[0], texture[0]],
		[texture[1], texture[0], texture[0], texture[0], texture[0], texture[0]],
		[texture[0], texture[0], texture[0], texture[1], texture[0], texture[0]],
		[texture[0], texture[0], texture[1], texture[0], texture[0], texture[0]]
	];

  var boxes = [
    { side: [1, 0, 0], box: [0.75, 0.25, 0.25, 1, 0.75, 0.75] },
    { side: [-1, 0, 0], box: [0, 0.25, 0.25, 0.25, 0.75, 0.75] },
    { side: [0, 1, 0], box: [0.25, 0.75, 0.25, 0.75, 1, 0.75] },
    { side: [0, -1, 0], box: [0.25, 0, 0.25, 0.75, 0.25, 0.75] },
    { side: [0, 0, 1], box: [0.25, 0.25, 0.75, 0.75, 0.75, 1] },
    { side: [0, 0, -1], box: [0.25, 0.25, 0, 0.75, 0.75, 0.25] }
	];

  for (let count = 0; count < 6; count++) {
    var render = new ICRender.Model(),
      model = BlockRenderer.createModel();
    model.addBox(0.25, 0.25, 0.25, 0.75, 0.75, 0.75, id, 0);
    render.addEntry(model);

    for (let i in boxes) {
      model = BlockRenderer.createModel();
      model.addBox(boxes[i].box[0], boxes[i].box[1], boxes[i].box[2], boxes[i].box[3], boxes[i].box[4], boxes[i].box[5], [textures[count][i]]);

      if (groups) {
        for (let n in groups) {
          var group = groups[n];
          render.addEntry(model).asCondition(boxes[i].side[0], boxes[i].side[1], boxes[i].side[2], ICRender.getGroup(group), 0);
        }
      }

      for (let g in groups) {
        ICRender.getGroup(groups[g]).add(id, data);
      }
   // TileRenderer.registerRenderModel(id, data + count, render);
    }
  }

  Block.setBlockShape(id, { x: 0.25, y: 0.25, z: 0.25 }, { x: 0.75, y: 0.75, z: 0.75 }, data);
}


ItemPipe.register(BlockID.itemConduitEx, 0);
Block.setBlockShape(BlockID.itemConduitEx, { x: 0.25, y: 0.25, z: 0 }, { x: 0.75, y: 0.75, z: 1 }, 0);
MachineRegistry.registerPipeOutputRenderModel(BlockID.itemConduitEx, 1, [["input_item_pipe", 0], ["output_item_pipe", 0]], [
	"classify-item-pipe",
	"input-item-pipe",
	"output-item-pipe",
	"transport-item-pipe"
]);

Block.registerPlaceFunction("itemConduitEx", function(coords, item, block) {
  var place = coords;
  if (!canTileBeReplaced(block.id, block.data)) {
    place = coords.relative;
    block = World.getBlock(place.x, place.y, place.z);
    if (!canTileBeReplaced(block.id, block.data)) return;
  }

  World.setBlock(place.x, place.y, place.z, item.id, 1);
  World.addTileEntity(place.x, place.y, place.z);
  Player.decreaseCarriedItem(1);
});

MachineRegistry.registerPrototype(BlockID.itemConduitEx, {
  defaultValues: {
    meta: 0
  },

  click: function(id, count, data) {
    if (id == ItemID.itemYetaWrench) {
      if (this.data.meta < 5) {
        this.data.meta++;
      } else {
        this.data.meta = 0;
      }
    }

    this.renderer();
  },

  getTransportingDirections: function(item) {
    var output = [],
      directions = [{ x: 0, y: 0, z: -1 }, { x: 0, y: 0, z: 1 }, { x: -1, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 0, y: 1, z: 0 }];
    output.push(directions[this.data.meta]);
    return output;
  },
  
  renderer: function() {
    TileRenderer.mapAtCoords(this.x, this.y, this.z, this.id, this.data.meta + 1);
  }
});