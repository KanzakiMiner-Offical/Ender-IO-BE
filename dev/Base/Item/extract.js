IDRegistry.genBlockID("itemConduitExtract");
Block.createBlock("itemConduitExtract", [
  {
    name: "Item Conduit Extractor",
    texture: [
		["conduit_connector", 0]
	],
    inCreative: false
}, //left
  {
    name: "Item Conduit Extractor",
    texture: [
		["conduit_connector", 0]
	],
    inCreative: false
}, //right
  {
    name: "Item Conduit Extractor",
    texture: [
		["conduit_connector", 0]
	],
    inCreative: true
}, //forward
  {
    name: "Item Conduit Extractor",
    texture: [
		["conduit_connector", 0]
	],
    inCreative: false
}, //back
  {
    name: "Item Conduit Extractor",
    texture: [
		["conduit_connector", 0]
	],
    inCreative: false
}, //up
  {
    name: "Item Conduit Extractor",
    texture: [
		["conduit_connector", 0]
	],
    inCreative: false
} //down
]);





/*
Recipes.addShaped({
	id: BlockID.utilsconduit,
	count: 16,
	data: 0
}, [
	"sss",
	"iii",
	"sss"
], ['i', 265, 0, 's', 1, 0]);
Recipes.addShaped({
	id: BlockID.utilsItemGetter,
	count: 1,
	data: 2
}, [
	"ssi",
	"iih",
	"ssi"
], ['i', 265, 0, 's', 1, 0, 'h', 410, 0]);
*/

function _whiteList(element) {
  if (element.id == this.item.id && (this.ignore_item_data || element.data == -1 || element.data == this.item.data)) return true;
}

function searchExportSlot(tile1, conduitTile) {
  var container = tile1.container;
  var slots = tile1.slots;
  for (var i in slots) {
    if (container.getSlot(slots[i]).id != 0 && (!tile1.SI || !tile1.TileEntity.interface.slots[slots[i]].canOutput || tile1.TileEntity.interface.slots[slots[i]].canOutput(container.getSlot(slots[i]), tile1.side, tile1.TileEntity))) {
      //devLog("True slot: " + slots[i]);
      var item = container.getSlot(slots[i]);
      if ((conduitTile.data.black_list.length == 0 || !conduitTile.data.black_list.find(_whiteList, { item: item, ignore_item_data: conduitTile.data.ignore_item_data })) && (conduitTile.data.white_list.length == 0 || conduitTile.data.white_list.find(_whiteList, { item: item, ignore_item_data: conduitTile.data.ignore_item_data })))
        return slots[i];
      else
        continue;
    } else {
      //devLog("Slot not found");
      continue;
    }
  }
  return 'not found';
}

function searchImportSlot(containers, item) {
  for (var cont in containers) {
    for (var slot in containers[cont].slots) {
      var item2 = containers[cont].container.getSlot(containers[cont].slots[slot]);
      if ((item2.id == 0 || (item2.id == item.id && item2.extra == item.extra && item2.data == item.data && item2.count < Item.getMaxStack(item.id))) && (!containers[cont].SI || ((!containers[cont].TileEntity.interface.isValidInput || containers[cont].TileEntity.interface.isValidInput(item, containers[cont].side, containers[cont].TileEntity)) && (!containers[cont].TileEntity.interface.slots[containers[cont].slots[slot]].isValid || containers[cont].TileEntity.interface.slots[containers[cont].slots[slot]].isValid(item, containers[cont].side, containers[cont].TileEntity))))) {
        return {
          slot: containers[cont].slots[slot],
          container: containers[cont].container
        };
      } else {
        continue;
      }
    }
  }
  return false;
}

function pay(container1, container2, slot1, slot2, item) {
  var item1 = container1.getSlot(slot1);
  if (item1.count != item.count) return;
  var item2 = container2.getSlot(slot2);
  var count = Math.min(item2.count + item.count, 64);
  var other = Math.max(item2.count + item.count - 64, 0);
  container2.setSlot(slot2, item.id, count, item.data, item.extra || null);
  container1.setSlot(slot1, item1.id, other, item1.data, item1.extra || null)
  if (container1.validateSlot) container1.validateSlot(slot1);
  if (container2.validateSlot) container2.validateSlot(slot2);
}

function apply() {
  var target = targetIsContainer(this.data.target, this.data.blockData, this.blockSource);
  if (!target) return; //devLog("!target");
  var exportSlot = searchExportSlot(target, this);
  if (exportSlot == 'not found') return; //devLog("export slot not found");
  var containers = searchContainers(this, this.data.target, this.blockSource);
  if (containers.length == 0) return; // devLog("no containers");
  var importData = searchImportSlot(containers, target.container.getSlot(exportSlot));
  if (!importData) return; //devLog("no import slot");
  pay(target.container, importData.container, exportSlot, importData.slot, target.container.getSlot(exportSlot));
}

var conduitGuiData = {
  list_mode: false,
  ignore_item_data: false
};

var conduitGUI_elements = {};

function init_conduitGUI_elements() {

  conduitGUI_elements["text"] = {
    type: "text",
    x: 420,
    y: 130 / 575.5 * UI.getScreenHeight(),
    font: {
      size: 20 / 575.5 * UI.getScreenHeight(),
      color: android.graphics.Color.DKGRAY
    },
    text: "Частота обновления (в тиках) : 0"
  }
  /*
  conduitGUI_elements["DellayScroll"] = {
		type: "scroll",
		x: 100 + 225,
		y: 180/575.5*UI.getScreenHeight(),
		length: 800 - 225,
		min: 5,
		max: 120,
		isInt: true,
		value: 0,
		onNewValue: function (value, itemContainerUiHandler, element) {
			if(!itemContainerUiHandler || !wireGuiData.networkData || wireGuiData.networkData.getInt('updateFreq', 0) == value) return;
			wireGuiData.networkData.putInt('updateFreq', value);
			wireGuiData.networkData.putBoolean('update', true);
			itemContainerUiHandler.setBinding('text', 'text', Translation.translate("Update frequency (in ticks)") + " : " + value);
		}
	}
  /*
  conduitGUI_elements["text2"] = {
  	type: "text",
  	x: 1000 - 225,
  	y: 30/575.5*UI.getScreenHeight(),
  	font: {
  		color: android.graphics.Color.DKGRAY,
  		//shadow: 0.5,
  		size: 15
  	},
  	text: Translation.translate("1 second = 20 ticks")
  }
  */
  var slot_size = 60 / 575.5 * UI.getScreenHeight();
  var slots_count = 20;
  var slotsXSstart = 350;
  var slotsYSstart = 300 / 575.5 * UI.getScreenHeight()
  slot_size = Math.min(slot_size, (950 - slotsXSstart) / (slots_count / 2));
  for (var i = 0; i < slots_count; i++) {
    conduitGUI_elements['slot' + i] = {
      id: i,
      type: "slot",
      x: slotsXSstart + slot_size * (i % (slots_count / 2)),
      y: slotsYSstart + slot_size * Math.floor(i / (slots_count / 2)),
      z: 100,
      size: slot_size
    }
  }

  conduitGUI_elements["speed"] = {
    type: "slot",
    x: 100 + 225,
    y: 250 / 575.5 * UI.getScreenHeight(),
    z: 100,
    size: slot_size,
    isInt: true,
    value: 0,
    onNewValue: function(value, itemContainerUiHandler, element) {
      if (!itemContainerUiHandler || !conduitGuiData.networkData || conduitGuiData.networkData.getInt('speed', 0) == value) return;
      conduitGuiData.networkData.putInt('speed', value);
      conduitGuiData.networkData.putBoolean('update', true);
    }
  }
  //  conduitGUI_elements["DellayScroll"].length = slotsXSstart + slot_size * parseInt(slots_count / 2) - 25 / 575.5 * UI.getScreenHeight() - conduitGUI_elements["DellayScroll"].x;
  var filter_cons = 10 / 575.5 * UI.getScreenHeight();
  var image_cons = 5 / 575.5 * UI.getScreenHeight();
  conduitGUI_elements["list_mode"] = {
    type: "button",
    x: 0,
    y: conduitGUI_elements['slot0'].y,
    bitmap: 'RS_empty_button',
    bitmap2: 'RS_empty_button_pressed',
    scale: (slot_size * 2 - filter_cons) / 2 / 24,
    clicker: {
      onClick: function(itemContainerUiHandler, container, element) {
        container.sendEvent("updateListMode", { list_mode: conduitGuiData.list_mode = !conduitGuiData.list_mode });
      },
      onLongClick: function(itemContainerUiHandler, container, element) {

      }
    }
  }
  conduitGUI_elements["list_mode"].x = conduitGUI_elements['slot0'].x - filter_cons - (20 * conduitGUI_elements["list_mode"].scale);

  conduitGUI_elements["image_list_mode"] = {
    type: "image",
    x: 0,
    y: 0,
    z: 1000,
    bitmap: "conduit_black_list",
    scale: 1,
  }
  conduitGUI_elements["image_list_mode"].scale = (20 * conduitGUI_elements["list_mode"].scale - image_cons) / 30 / 575.5 * UI.getScreenHeight();
  conduitGUI_elements["image_list_mode"].x = conduitGUI_elements["list_mode"].x + image_cons;
  conduitGUI_elements["image_list_mode"].y = conduitGUI_elements["list_mode"].y + (conduitGUI_elements["list_mode"].scale * 20 - conduitGUI_elements["image_list_mode"].scale * 24) / 2,

    conduitGUI_elements["ignore_item_data"] = {
      type: "button",
      x: conduitGUI_elements["list_mode"].x,
      y: conduitGUI_elements["list_mode"].y + (conduitGUI_elements["list_mode"].scale * 20) + filter_cons,
      bitmap: 'RS_empty_button',
      bitmap2: 'RS_empty_button_pressed',
      scale: conduitGUI_elements["list_mode"].scale,
      clicker: {
        onClick: function(itemContainerUiHandler, container, element) {
          container.sendEvent("updateIgnoreItemData", { ignore_item_data: conduitGuiData.ignore_item_data = !conduitGuiData.ignore_item_data });
        },
        onLongClick: function(itemContainerUiHandler, container, element) {

        }
      }
    }

  conduitGUI_elements["image_ignore_item_data"] = {
    type: "image",
    x: 0,
    y: 0,
    z: 1000,
    bitmap: "item_data_not_ignore",
    scale: 1 / 575.5 * UI.getScreenHeight(),
  }
  conduitGUI_elements["image_ignore_item_data"].scale = (20 * conduitGUI_elements["ignore_item_data"].scale - image_cons) / 24 / 575.5 * UI.getScreenHeight();
  conduitGUI_elements["image_ignore_item_data"].x = conduitGUI_elements["ignore_item_data"].x + (conduitGUI_elements["ignore_item_data"].scale * 20 - conduitGUI_elements["image_ignore_item_data"].scale * 24) / 2
  conduitGUI_elements["image_ignore_item_data"].y = conduitGUI_elements["ignore_item_data"].y + (conduitGUI_elements["ignore_item_data"].scale * 20 - conduitGUI_elements["image_ignore_item_data"].scale * 24) / 2
}
init_conduitGUI_elements();

var conduitGUI = new UI.StandartWindow({
  standart: {
    header: {
      text: {
        text: Translation.translate('Item Conduit Extractor')
      }
    },
    inventory: {
      padding: 20,
      width: 225
    },
    background: {
      standart: true
    }
  },
  drawing: [],
  elements: conduitGUI_elements
});
conduitGUI.getWindow('main').forceRefresh();

TileEntity.registerPrototype(BlockID.itemConduitExtract, {
  defaultValues: {
    blockData: 0,
    target: { x: 0, y: 0, z: 0 },
    slot: null,
    ticks: 0,
    speed: 40,
    value: 0,
    black_list: [],
    white_list: [],
    list_mode: 'black_list',
    ignore_item_data: false
  },
  useNetworkItemContainer: true,
  click: function(id, count, data, coords, player, extra) {
    if (wrenches.indexOf(id) != -1 || Entity.getSneaking(player)) return false;
    var client = Network.getClientForPlayer(player);
    if (!client) return true;
    if (this.container.getNetworkEntity().getClients().contains(client)) return true;
    this.container.openFor(client, "main");
    return true;
  },
  getScreenByName: function(screenName) {
    if (screenName == 'main') return conduitGUI;
  },
  created: function() {
    if (!this.blockSource) this.blockSource = BlockSource.getDefaultForDimension(this.dimension);
    this.data.blockData = this.blockSource.getBlock(this.x, this.y, this.z).data;
    this.data.target = coordsOnBlockData(this.data.blockData, this);
  },
  update_list_mode: function(mode) {
    if (mode == 'white_list') {
      this.data.white_list = this.data.black_list;
      this.data.black_list = [];
    } else {
      this.data.black_list = this.data.white_list;
      this.data.white_list = [];
    }
    this.data.list_mode = mode;
  },
  tick: function() {
    this.data.ticks++;
    if (this.data.ticks >= this.data.speed) {
      this.data.ticks = 0;
      apply.apply(this);
    }/*
    let speedSlot = this.container.getSlot("speed");
    if (speedSlot.id == ItemID.extractSpeed) {
      var value = speedSlot.count * 2.1875 - 5;
      this.data.speed -= value
      conduitGuiData.networkData.putInt('speed', value);
      conduitGuiData.networkData.putBoolean('update', true);
    }*/
  },
  init: function() {
    if (!this.data.target) this.created();
    if (!this.data.black_list) this.data.black_list = [];
    if (!this.data.white_list) this.data.white_list = [];
    searchContainers(this, this.data.target, this.blockSource);
    this.data.speed = Math.max(5, Math.min(this.data.speed, 120));
    var tile = this;
    this.container.addServerOpenListener({
      onOpen: function(container, client) {
        tile.updateWindow(client);
      }
    });
    this.container.setGlobalAddTransferPolicy({
      transfer: function(itemContainer, slot, id, count, data, extra, player) {
        var thisSlot = itemContainer.getSlot(slot);
        if (thisSlot.id != 0) return 0;
        tile.data[tile.data.list_mode].push({ id: id, data: data });
        itemContainer.setSlot(slot, id, 1, data, extra);
        return 0;
      }
    })
    this.container.setGlobalGetTransferPolicy({
      transfer: function(itemContainer, slot, id, count, data, extra, player) {
        if (id == 0) return 0;
        var index = tile.data[tile.data.list_mode].findIndex(function(elem, index) {
          if (elem.id == id && (elem.data == -1 || elem.data == data)) return true;
        });
        if (index >= 0) {
          tile.data[tile.data.list_mode].splice(index, 1);
        }
        itemContainer.setSlot(slot, 0, 0, 0, null);
        return 0;
      }
    })
  },
  updateWindow: function(client) {
    var _data = {
      name: this.networkData.getName() + '',
      list_mode: this.data.list_mode,
      ignore_item_data: this.data.ignore_item_data,
      speed: this.data.speed
    };
    if (client) {
      if (typeof(client) == "number") client = Network.getClientForPlayer(client);
      this.container.sendEvent(client, "updateWindow", _data);
    } else {
      this.container.sendEvent("updateWindow", _data);
    }
  },
  destroy: function() {
    for (var i in this.container.slots) {
      this.container.clearSlot(i);
    }
  },
  client: {
    tick: function() {
      if (this.networkData.getBoolean('update', false)) {
        this.networkData.putBoolean('update', false);
        this.sendPacket("speed", { speed: this.networkData.getInt('speed') })
      }
    },
    containerEvents: {
      updateWindow: function(container, window, content, eventData) {
        conduitGuiData.networkData = SyncedNetworkData.getClientSyncedData(eventData.name);
        if (!content) content = conduitGUI.getWindow('main').getContent();
        content.elements["image_list_mode"].bitmap = 'conduit_' + eventData.list_mode;
        content.elements["image_ignore_item_data"].bitmap = eventData.ignore_item_data ? 'item_data_ignore' : 'item_data_not_ignore';
        container.setText('text', Translation.translate("Update frequency (in ticks)") + " : " + eventData.speed);
        conduitGuiData.networkData.putInt('speed', eventData.speed);
        // container.setScale('DellayScroll', eventData.speed);
      }
    }
  },
  containerEvents: {
    'updateListMode': function(eventData, connectedClient) {
      this.update_list_mode(eventData.list_mode ? 'white_list' : 'black_list');
      this.updateWindow();
    },
    'updateIgnoreItemData': function(eventData, connectedClient) {
      this.data.ignore_item_data = !!eventData.ignore_item_data;
      this.updateWindow();
    }
  },
  events: {
    speed: function(packetData, packetExtra, connectedClient) {
      this.data.speed = packetData.speed;
      var allClients = this.container.getNetworkEntity().getClients();
      var iterator = allClients.iterator();
      while (iterator.hasNext()) {
        var client = iterator.next();
        if (client != connectedClient) this.updateWindow(client);
      }
    }
  }
})