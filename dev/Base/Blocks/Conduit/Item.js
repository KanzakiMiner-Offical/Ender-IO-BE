function setupWireRender(id, width, groupName, preventSelfAdd) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
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
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
}


IDRegistry.genBlockID("itemConduit");
Block.createBlock("itemConduit", [
  { name: "Item Conduit", texture: [["item_conduit_core", 0]], inCreative: true }
]);

setupWireRender(BlockID.itemConduit, 0.35, "item-pipe");

ItemTransportingHelper.registerItemPipe(BlockID.itemConduit, "item-pipe");

TileEntity.registerPrototype(BlockID.itemConduit, {
	defaultValues: {
		containerIndex: 0,
	},
	
	getTransportSlots: function(){
		return {};
	},
	
	tick: function(){
		var containerData = this.findContainer();
		if (containerData && containerData.container){
			var item = this.getItemFrom(containerData.container, 1);
			if (item){
				var transportedItem = TransportingItem.deploy();
				transportedItem.setPosition(containerData.position.x + .5, containerData.position.y + .5, containerData.position.z + .5);
				transportedItem.setItem(item.id, item.count, item.data);
				transportedItem.setTarget(this.x, this.y, this.z);
			}
			else{
				this.data.containerIndex++;
			}
		}
	},
	
	findContainer: function(){
		var directions = ItemTransportingHelper.findNearbyContainers(this);
		var dir = directions[this.data.containerIndex % directions.length];
		
		if (dir){
			var container = World.getContainer(this.x + dir.x, this.y + dir.y, this.z + dir.z);
			return {
				container: container,
				direction: dir,
				position: {x: this.x + dir.x, y: this.y + dir.y, z: this.z + dir.z}
			};
		}
	},
	
	getItemFrom: function(container, maxCount){
		container.refreshSlots();
		var tileEntity = container.tileEntity;
		var slots = [];
		var slotsInitialized = false;
		if (tileEntity){
			if (tileEntity.getTransportedItem){
				tileEntity.getTransportedItem();
			}
			if (tileEntity.getTransportSlots){
				slots = tileEntity.getTransportSlots().output || [];
				slotsInitialized = true;
			}
		}
		if (!slotsInitialized){
			for (var name in container.slots){
				slots.push(name);
			}
		}
		
		var item = null;
		for (var i in slots){
			var slot = container.getSlot(slots[i]);
			if (slot.id > 0){
				var count = Math.min(maxCount, slot.count);
				item = {id: slot.id, count: count, data: slot.data};
				slot.count -= count;
				break;
			}
		}
		container.validateAll();
		container.applyChanges();
		return item;
	}
});
/*
IDRegistry.genBlockID("itemConduitEx");
Block.createBlock("itemConduitEx", [
  { name: "Item Conduit Extractor", texture: [["item_conduit_core_ex", 0]], inCreative: true }
]);

Callback.addCallback("ItemUse", function(coords, item, block) {
  if (item.id == ItemID.itemYetaWrench && block.id == BlockID.itemConduit && Entity.getSneaking(Player.get())) {

    World.setBlock(coords.x, coords.y, coords.z, BlockID.itemConduitEx, 0);

  }
});;
Callback.addCallback("ItemUse", function(coords, item, block) {
  if (item.id == ItemID.itemYetaWrench && block.id == BlockID.itemConduitEx && Entity.getSneaking(Player.get())) {

    World.setBlock(coords.x, coords.y, coords.z, BlockID.itemConduit, 0);

  }
});

FactAPI.render.setupWireasRender(BlockID.itemConduitEx, 0.35, [
  { name: "item-pipe", add: true }
]);

Pipe.registerTile(BlockID.itemConduit, {});

TileEntity.registerPrototype(BlockID.itemConduit, {
  defaultValues: {
    containerIndex: 0
  },

  getTransportSlots: function() {
    return {};
  },

  getTransportingDirections: function(item) {
    var pos = item.position;
    var dir = item.direction;
    var list = Pipe.findDirections(pos.x, pos.y, pos.z);
    var res = Pipe.filterDirections(list, dir);
    var cur = [];
    for (var i in res) {
      var d = res[i];
      if (World.getBlockID(this.x + d.x, this.y + d.y, this.z + d.z) != BlockID.itemConduit) {
        cur.push(d)
      }
    }
    return cur;
  },

  tick: function() {
    if (World.getThreadTime() % 20 != 0) return
    var containerData = this.findContainer();
    if (containerData && containerData.container) {
      var item = this.getItemFrom(containerData.container, 1);
      if (item) {
        var transportedItem = Pipe.item.deploy();
        transportedItem.setPosition(containerData.position);
        transportedItem.setItem(item);
        transportedItem.setTarget(this);
        transportedItem.setFriction(-0.003);
      }
      else {
        this.data.containerIndex++;
      }
    }
  },

  findContainer: function() {
    var directions = Pipe.findContainers(this.x, this.y, this.z);
    var dir = directions[this.data.containerIndex % directions.length];

    if (dir) {
      var container = World.getContainer(this.x + dir.x, this.y + dir.y, this.z + dir.z);
      return {
        container: container,
        direction: dir,
        position: { x: this.x + dir.x, y: this.y + dir.y, z: this.z + dir.z }
      };
    }
  },

  getItemFrom: function(container, maxCount) {

    var tileEntity = container.tileEntity;
    var slots = [];
    var slotsInitialized = false;
    var notNative = container.isContainer;

    if (tileEntity) {
      if (tileEntity.getTransportedItem) {
        tileEntity.getTransportedItem();
      }
      if (tileEntity.getTransportSlots) {
        slots = tileEntity.getTransportSlots().output || [];
        slotsInitialized = true;
      }
    }

    if (!slotsInitialized) {
      if (notNative) {
        for (var name in container.slots) {
          slots.push(name);
        }
      } else {
        for (var index = 0; index < container.getSize(); index++) {
          slots.push(index);
        }
      }
    }

    var item = null;
    for (var i in slots) {
      var slot = container.getSlot(slots[i]);
      if (slot.id > 0) {
        var count = Math.min(maxCount, slot.count);
        item = { id: slot.id, count: count, data: slot.data };
        slot.count -= count;

        if (!notNative)
          container.setSlot(i, slot.id, slot.count, slot.data);
        break;
      }
    }
    if (notNative)
      container.validateAll();

    return item;
  }
});



FactAPI.render.setupWireasRender(BlockID.itemConduit, 0.35, [
  { name: "item-pipe", add: true }
]);
Pipe.registerTile(BlockID.itemConduit, {
  friction: -0.005
});
*/