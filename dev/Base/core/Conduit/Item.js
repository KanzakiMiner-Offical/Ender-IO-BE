// Helper(From Util+)
if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function (target, firstSource) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
}

const newSides = [
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
	[-1, 0, 0],
	[1, 0, 0]
]

const reverseSides = [1,0,3,2,5,4];

const newSides_ = [
	'0_-1_0',
	'0_1_0',
	'0_0_-1',
	'0_0_1',
   	'-1_0_0',
	'1_0_0'
]

const createAnim = function(_values, _duration, _updateFunc){
	var animation = JAVA_ANIMATOR.ofInt(_values);
	animation.setDuration(_duration);
	if(_updateFunc)animation.addUpdateListener({
		onAnimationUpdate : function(updatedAnim){
			_updateFunc(updatedAnim.getAnimatedValue(), updatedAnim);
		}
	});
	JAVA_HANDLER_THREAD.post({
		run: function(){
			animation.start();
		}
	})
	return animation;
}

const stopAnim = function(_animation){
	if(_animation && _animation.end && _animation.isStarted())JAVA_HANDLER_THREAD.post({
		run: function(){
			_animation.end();
		}
	})
}

const numberWithCommas = function(_num) {
    return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getItemUid(item){
	return item.id + '_' + item.data + (item.extra && item.extra.getValue() != 0 ? '_' + item.extra.getValue() : '');
}

function parseItemUid(itemUid){
	var splits = itemUid.split('_');
	return {
		id: Number(splits[0]),
		data: Number(splits[1]),
		extra: splits[2] ? Number(splits[2]) : null
	}
}

function eventToScriptable(_event){
	return {y:_event.y, x: _event.x, type: _event.type + "", _x: _event._x, _y:_event._y, localY: _event.localY, localX: _event.localX};
}

function compareSlots(slot1, slot2, extraToString){
	if(slot1.id == slot2.id && slot1.data == slot2.data && slot1.count == slot2.count && (extraToString && slot1.extra && slot2.extra ? fullExtraToString(slot1.extra) == fullExtraToString(slot2.extra) : slot1.extra == slot2.extra)) return true;
	return false;
}

function compareCoords(_coords1, _coords2){
	if(_coords1.x == _coords2.x && _coords1.y == _coords2.y && _coords1.z == _coords2.z) return true;
	return false;
}

function cutNumber(num, forGrid){
	return num > 999 ? (num > 999999 ? (num > 999999999 ? ((num3 = (num/1000000000))%1 && (!forGrid || num3 <= 9.95) ? num3.toFixed(1) : Math.round(num3)) + 'B' : ((num2 = (num/1000000))%1 && (!forGrid || num2 <= 9.95) ? num2.toFixed(1) : Math.round(num2)) + 'M') : ((num2 = (num/1000))%1 && (!forGrid || num2 <= 9.95) ? num2.toFixed(1) : Math.round(num2)) + 'K') : num;
}

var mineColorsMap = {
	'0': android.graphics.Color.rgb(0, 0, 0),
	'1': android.graphics.Color.rgb(0, 0, 170),
	'2': android.graphics.Color.rgb(0, 170, 0),
	'3': android.graphics.Color.rgb(0, 170, 170),
	'4': android.graphics.Color.rgb(170, 0, 0),
	'5': android.graphics.Color.rgb(170, 0, 170),
	'6': android.graphics.Color.rgb(255, 170, 0),
	'7': android.graphics.Color.rgb(170, 170, 170),
	'8': android.graphics.Color.rgb(85, 85, 85),
	'9': android.graphics.Color.rgb(85, 85, 255),
	'a': android.graphics.Color.rgb(85, 255, 85),
	'b': android.graphics.Color.rgb(85, 255, 255),
	'c': android.graphics.Color.rgb(255, 85, 85),
	'd': android.graphics.Color.rgb(255, 85, 255),
	'e': android.graphics.Color.rgb(255, 255, 85),
	'f': android.graphics.Color.rgb(255, 255, 255),
	'g': android.graphics.Color.rgb(221, 214, 5)
}
function parseMineColor(symbol){
	if(symbol[0] == '§') symbol = symbol[1];
	var answ = mineColorsMap[symbol] || android.graphics.Color.WHITE;
	return answ;
}

function fullExtraToString(extra, usenbt){
	if(!extra) return "";
	var str = "";
	if(jsonExtra = extra.asJson()){
		if((_value = jsonExtra.opt('data')) && _value.length() == 0) jsonExtra.remove('data');
		if((_value = jsonExtra.opt('name')) && _value.length() == 0) jsonExtra.remove('name');
		str += jsonExtra.toString();
	}
	//if(usenbt && (tag__1 = extra.getCompoundTag()))str += JSON.stringify(tag__1.toScriptable());
	return str;
}

function checkBlocksOnSides(_blockSource, _coords, _blocks, _toList, _func){
	if(typeof(_coords) != "object"){
		_func = _toList;
		_toList = _blocks;
		_blocks = _coords;
		_coords = _blockSource;
		_blockSource = _coords._blockSource;
	}
	var list = [];
	for (var i in newSides) {
		var coords = {
			x: _coords.x + newSides[i][0],
			y: _coords.y + newSides[i][1],
			z: _coords.z + newSides[i][2]
		}
		var block = _blockSource.getBlock(coords.x, coords.y, coords.z);
		if((!_func || _func(_blockSource, coords, block, _toList ? list : undefined)) && (Array.isArray(_blocks) ? _blocks.indexOf(block.id) != -1 : _blocks == block.id || (_blocks == -1 && block.id != 0)))
			if(_toList)
				list.push(coords); 
			else 
				return coords;
	}
	return _toList ? list : false;
}

function getTextElementWidth(_textElement, drawScale){
	var _font = new JavaFONT_(_textElement.font);
	var width = _font.getBounds(_textElement.text, _textElement.x * drawScale, _textElement.y * drawScale, parseFloat(1.0)).width();
	return width;
}


var allGroups = {};
var ignored = {}

var regionGroups = {};
var networkTiles = {};
const regionChunkSize = 3;

var BlocksAddToGroup = [];
var NewBlocksAddToGroup = [];
var updateBlocksAddToGroup = false;

const cts = function (coords) {
	return coords.x + (coords.y != undefined ? "," + coords.y : "") + "," + coords.z;
}

const createBitmap = function(__bitmap){
	if (typeof (__bitmap) == 'string') {
		var options = new BitmapFactory.Options();
		options.inPreferredConfig = Bitmap.Config.ARGB_8888;
		__bitmap = BitmapFactory.decodeFile(__dir__ + __bitmap, options);
		return Bitmap.createBitmap(__bitmap, 0, 0, __bitmap.getWidth(), __bitmap.getHeight());
	}
}

const cutBitmap = function(__bitmap, x, y, width, height){
	if (typeof (__bitmap) == 'string') {
		var options = new BitmapFactory.Options();
		options.inPreferredConfig = Bitmap.Config.ARGB_8888;
		__bitmap = BitmapFactory.decodeFile(__dir__ + __bitmap, options);
	}
	return Bitmap.createBitmap(__bitmap, x, y, width, height);
}

function calculateCentre(coords, notignoreY){
    var _object = {
		x: coords.x - coords.x%(regionChunkSize*16) + (coords.x >= 0 ?  0.5 + (regionChunkSize*16)/2 : - 0.5 - (regionChunkSize*16)/2), 
		z: coords.z - coords.z%(regionChunkSize*16) + (coords.z >= 0 ?  0.5 + (regionChunkSize*16)/2 : - 0.5 - (regionChunkSize*16)/2)
	};
	if(notignoreY) _object.y = coords.y;
	return _object;
}

var checkClients = {};
const wireNetworkEntityType = new NetworkEntityType('enderio.conduit');
wireNetworkEntityType.setClientListSetupListener(function(list, target, networkEntity){
	//Logger.Log('SetupNetworkEntity on: ' + cts(target.coords));
	list.setupDistancePolicy(target.coords.x, target.coords.y || 70, target.coords.z, target.blockSource.getDimension(), 128, 128, 1000);
}).addClientPacketListener("updateBlock", function(target, networkEntity, packetData){
	if(!target) {
		networkEntity.send("fixTarget", {});
		return ;//Logger.Log('No target: ' + JSON.stringify(target));
	}
	if(packetData.ignored) ignored = packetData.ignored;
	if(packetData.regionGroup)target.regionGroup = packetData.regionGroup;
	if(packetData.updateGroup)for(var i in packetData.updateGroup)target.regionGroup[i] = packetData.updateGroup[i];
	var coords = packetData.coords;
	if(packetData.groupAdd){
		for(var i in packetData.groupAdd){
			var name = packetData.groupAdd[i][0];
			var blockId = Network.serverToLocalId(packetData.groupAdd[i][1]);
			ICRender.getGroup(name).add(blockId, -1);
		}
	}
	//alert('updateBlock: ' + JSON.stringify(packetData.updateGroup) + " : " + JSON.stringify(target.regionGroup));
	if(!packetData.destroy)mapGetter(coords, packetData.meta, target.regionGroup, true);
	else {
		BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
		BlockRenderer.unmapCollisionAndRaycastModelAtCoords(target.dim, coords.x, coords.y, coords.z);
	}
}).addServerPacketListener("fixTarget", function(target, networkEntity, client, packetData, _str){
	//Logger.Log('Server get fixTarget packet');
	var __type = networkEntity.getType();
	var netName = networkEntity.getName();
	var data = __type.newClientAddPacket(networkEntity, client);
	var clientsArray = checkClients[netName] || (checkClients[netName] = []);
	if(clientsArray.indexOf(client) == -1)clientsArray.push(client);
	networkEntity.send(client, "fixTarget", data);
}).addServerPacketListener("successChecked", function(target, networkEntity, client, packetData, _str){
	//Logger.Log('Server get successChecked| Client: ' + client);
	var netName = networkEntity.getName();
	if(!checkClients[netName] || checkClients[netName].indexOf(client) == -1) return;
	checkClients[netName].splice(checkClients[netName].indexOf(client), 1);
}).addClientPacketListener("fixTarget", function(target, networkEntity, packetData, _str){
	//Logger.Log('Client get fixTarget packet');
	var __type = networkEntity.getType();
	__type.onClientEntityAdded(networkEntity, packetData);
}).addClientPacketListener("checkTarget", function(target, networkEntity, packetData, _str){
	//Logger.Log('Client get checkTarget packet');
	if(!target) {
		networkEntity.send("fixTarget", {});
		return ;//Logger.Log('No target: ' + JSON.stringify(target));
	} else {
		networkEntity.send("successChecked", {});
	}
}).setClientAddPacketFactory(function(target, networkEntity, client){
	//Logger.Log('SendInitPacketToClient| Client: ' + client + " |data: " + JSON.stringify({coords: target.coords, dim: target.blockSource.getDimension(), regionGroup: (regionGroups['d'+target.blockSource.getDimension()] || {})[cts(target.coords)]}));
	//checkClients.push({time: World.getThreadTime() + 40, networkEntity: networkEntity});
	var netName = networkEntity.getName();
	var clientsArray = checkClients[netName] || (checkClients[netName] = []);
	if(clientsArray.indexOf(client) == -1)clientsArray.push(client);
	return {coords: target.coords, dim: target.blockSource.getDimension(), regionGroup: (regionGroups['d'+target.blockSource.getDimension()] || {})[cts(target.coords)]};
}).setClientEntityRemovedListener(function(target, networkEntity){
	//Logger.Log('ClientEntityRemoved: ' + JSON.stringify(packetData));
	for (var i in target.regionGroup) {
		var splited = i.split(",");
		var coords = {
			x: Number(splited[0]),
			y: Number(splited[1]),
			z: Number(splited[2])
		};
		BlockRenderer.unmapAtCoords(coords.x, coords.y, coords.z);
		BlockRenderer.unmapCollisionAndRaycastModelAtCoords(target.dim, coords.x, coords.y, coords.z);
	}
}).setClientEntityAddedListener(function(networkEntity, packetData){
	//Logger.Log('ClientEntityAdded: ' + JSON.stringify(packetData));
	for (var i in packetData.regionGroup) {
		if(!packetData.regionGroup) continue;
		var splited = i.split(",");
		var coords = {
			x: Number(splited[0]),
			y: Number(splited[1]),
			z: Number(splited[2])
		};
		if (packetData.regionGroup[i].not) {
			for (var d in packetData.regionGroup[i].not) {
				ICRender.getGroup("not" + coords.x + "," + coords.y + "," + coords.z + ":" + packetData.regionGroup[i].not[d].x + "," + packetData.regionGroup[i].not[d].y + "," + packetData.regionGroup[i].not[d].z + "itemConduit" + packetData.dim).add(World.getBlock(packetData.regionGroup[i].not[d].x, packetData.regionGroup[i].not[d].y, packetData.regionGroup[i].not[d].z).id, -1);
			}
		};
		mapGetter(coords, packetData.regionGroup[i].meta, packetData.regionGroup, true);
	}
	return packetData;
});

Callback.addCallback('tick', function(){
	if(World.getThreadTime()%100 == 0)for(var i in checkClients){
		//alert('Network entity: ' + i);
		for(var k in checkClients[i]){
			var client = checkClients[i][k];
			//alert('Player: ' + client.getPlayerUid());
			client.send("system.entity.packet#" + i + "#" + "checkTarget", {});
		}
	}
	if(World.getThreadTime()%40 != 0) return;
	for(var dim in networkTiles){
		if(!networkTiles[dim]) continue;
		for(var i in networkTiles[dim]){
			var networkTile = networkTiles[dim][i]
			if(!networkTile) continue;
			networkTile.refreshClients();
		}
	}
}, -50);

function createTargetData(coords, blockSource){
	var returnData = {
		coords: {x: coords.x, z: coords.z},
		blockSource: blockSource || coords.blockSource
	}
	if(coords.y != undefined) returnData.coords.y = coords.y;
	return returnData;
}

Saver.addSavesScope("itemConduit",
	function read(scope) {
		allGroups = scope ? scope.allGroups || {} : {};
	},
	function save() {
		return {allGroups: allGroups || {}};
	}
);

function getDataOnSide(side) {
	var blockDaata = [4, 5, 1, 0, 2, 3];
	return blockDaata[side];
}

function getSideOnData(data) {
	var blockDaata = [4, 5, 1, 0, 2, 3];
	return blockDaata.indexOf(data);
}

Callback.addCallback("LevelLeft", function () {
	allGroups = {};
	ignored = {}
	regionGroups = {};
	networkTiles = {};
});

Callback.addCallback('LevelLoaded', function(){
	for(var dim in allGroups){
		var fixedDim = Number(dim.substr(1));
		if(!fixedDim && fixedDim != 0) continue;
		var groups = allGroups[dim] || (allGroups[dim] = {});
		var blockSource = BlockSource.getDefaultForDimension(fixedDim);
		var createNetworkTiles = [];
		for (var i in groups) {
			var splited = i.split(",");
			var coords = {
				x: Number(splited[0]),
				y: Number(splited[1]),
				z: Number(splited[2])
			};
			var regionCentreCoords = calculateCentre(coords);
			var string_regionCentreCoords = cts(regionCentreCoords);
			((_regionGroup = (regionGroups[dim] || (regionGroups[dim] = {})))[string_regionCentreCoords] || (_regionGroup[string_regionCentreCoords] = {}))[i] = groups[i];
			createNetworkTiles.push([string_regionCentreCoords, regionCentreCoords]);
			mapGetter(coords, groups[i].meta, groups, true, blockSource);
		}
		if(!networkTiles[dim])networkTiles[dim] = {};
		for(var k in createNetworkTiles){
			var string_regionCentreCoords = createNetworkTiles[k][0];
			var regionCentreCoords = createNetworkTiles[k][1];
			if(!networkTiles[dim][string_regionCentreCoords]){
				networkTiles[dim][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
			}
		}
	}
});

Block.registerPlaceFunction('itemConduitExtract', function (coords, item, block, _player, blockSource){
	//Game.prevent();
	var set_coords = coords;
    if(!World.canTileBeReplaced(block.id, block.data)){
		var relBlock = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
		if (World.canTileBeReplaced(relBlock.id, relBlock.data)){
			set_coords = coords.relative;
		} else return;
	}
	blockData = getDataOnSide(coords.side);
	blockSource.setBlock(set_coords.x, set_coords.y, set_coords.z, BlockID.itemConduitExtract, blockData);
	World.addTileEntity(set_coords.x, set_coords.y, set_coords.z, blockSource);
	if(item.count == 0) item = {id:0,count:1,data:0,extra:null}
	Entity.setCarriedItem(_player, item.id, item.count - 1, item.data, item.extra);
});
Block.registerPlaceFunction('itemConduit', function (coords, item, block, _player, blockSource){
	//Game.prevent();
	var set_coords = coords;
    if(!World.canTileBeReplaced(block.id, block.data)){
		var relBlock = blockSource.getBlock(coords.relative.x, coords.relative.y, coords.relative.z);
		if (World.canTileBeReplaced(relBlock.id, relBlock.data)){
			set_coords = coords.relative;
		} else return;
	}
	blockSource.setBlock(set_coords.x, set_coords.y, set_coords.z, BlockID.itemConduit, 0);
	if(item.count == 0) item = {id:0,count:1,data:0,extra:null}
	Entity.setCarriedItem(_player, item.id, item.count - 1, item.data, item.extra);
});

function onItemGetterWireCreated(coords, blockSource, blockData){
	var currentDimension = blockSource.getDimension();
	var idcurrentDimension = 'd' + currentDimension;
	if(!allGroups[idcurrentDimension]) allGroups[idcurrentDimension] = {};
	var groups = allGroups[idcurrentDimension];
	var regionCentreCoords = calculateCentre(coords);
	var string_regionCentreCoords = cts(regionCentreCoords);
	var _regionGroup = ((_regionDimGroup = (regionGroups[idcurrentDimension] || (regionGroups[idcurrentDimension] = {})))[string_regionCentreCoords] || (_regionDimGroup[string_regionCentreCoords] = {}));
	var groupCoordsId = cts(coords);
	var updateGroup = {};
	groups[groupCoordsId] = updateGroup[groupCoordsId] = _regionGroup[groupCoordsId] = {
		meta: blockData
	};
	if(!networkTiles[idcurrentDimension])networkTiles[idcurrentDimension] = {};
	if(!(_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords])){
		_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
	}
	_networkTile.send("updateBlock", {coords: coords, meta: blockData, updateGroup: updateGroup});
	mapGetter(coords, blockData, groups, true, blockSource);
};
function onWireCreated(coords, blockSource){
	var currentDimension = blockSource.getDimension();
	var idcurrentDimension = 'd' + currentDimension;
	if(!allGroups[idcurrentDimension]) allGroups[idcurrentDimension] = {};
	var groups = allGroups[idcurrentDimension];
	var regionCentreCoords = calculateCentre(coords);
	var string_regionCentreCoords = cts(regionCentreCoords);
	var _regionGroup = ((_regionDimGroup = (regionGroups[idcurrentDimension] || (regionGroups[idcurrentDimension] = {})))[string_regionCentreCoords] || (_regionDimGroup[string_regionCentreCoords] = {}));
	var groupCoordsId = cts(coords);
	var updateGroup = {};
	groups[groupCoordsId] = updateGroup[groupCoordsId] = _regionGroup[groupCoordsId] = {};
	if(!networkTiles[idcurrentDimension])networkTiles[idcurrentDimension] = {};
	if(!(_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords])){
		_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
	}
	_networkTile.send("updateBlock", {coords: coords, updateGroup: updateGroup});
	mapGetter(coords, undefined, groups, true, blockSource);
	Threading.initThread('searchContainersThread', function(){
		searchContainers(coords, coords, blockSource);
	}, -1);
};
function onDestroyWireBlock(coords, blockSource){
	var regionCentreCoords = calculateCentre(coords);
	var string_regionCentreCoords = cts(regionCentreCoords);
	var groupCoordsId = cts(coords);
	var currentDimension = blockSource.getDimension();
	var idcurrentDimension = 'd' + currentDimension;
	if(!allGroups[idcurrentDimension]) allGroups[idcurrentDimension] = {};
	if(!regionGroups[idcurrentDimension]) regionGroups[idcurrentDimension] = {};
	delete allGroups[idcurrentDimension][groupCoordsId];
	if(regionGroups[idcurrentDimension][string_regionCentreCoords])delete regionGroups[idcurrentDimension][string_regionCentreCoords][groupCoordsId];
	BlockRenderer.unmapCollisionAndRaycastModelAtCoords(blockSource.getDimension(), coords.x, coords.y, coords.z);
	if(!networkTiles[idcurrentDimension])networkTiles[idcurrentDimension] = {};
	if(!(_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords])){
		_networkTile = networkTiles[idcurrentDimension][string_regionCentreCoords] = new NetworkEntity(wireNetworkEntityType, createTargetData(regionCentreCoords, blockSource));
	}
	var updateGroup = {};
	updateGroup[groupCoordsId] = undefined;
	_networkTile.send("updateBlock", {coords: coords, updateGroup: updateGroup, destroy: true});
}; 
World.registerBlockChangeCallback([BlockID.itemConduit, BlockID.itemConduitExtract], function(coords, oldBlock, newBlock, blockSource){
	if(oldBlock.id == newBlock.id) return;
	if(oldBlock.id == BlockID.itemConduit || oldBlock.id == BlockID.itemConduitExtract)onDestroyWireBlock(coords, blockSource);
	if(newBlock.id == BlockID.itemConduit)onWireCreated(coords, blockSource);
	if(newBlock.id == BlockID.itemConduitExtract)onItemGetterWireCreated(coords, blockSource, newBlock.data);
});


const width = 0.1875;
const centerWidth = 0.3125;
const sideSize = 0.03;

var boxesWire = [
	[0.5 - width / 2, 0.5 - width / 2, 0 + sideSize, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2], //left
	[0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1 - sideSize], //right
	[0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1 - sideSize, 0.5 + width / 2, 0.5 + width / 2], //forward
	[0 + sideSize, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2], //back
	[0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1 - sideSize, 0.5 + width / 2], //up
	[0.5 - width / 2, 0 + sideSize, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2] //down
];

var boxes1 = [{
	side: [1, 0, 0],
	box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]
},
{
	side: [-1, 0, 0],
	box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]
},
{
	side: [0, 1, 0],
	box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]
},
{
	side: [0, -1, 0],
	box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]
},
{
	side: [0, 0, 1],
	box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]
},
{
	side: [0, 0, -1],
	box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]
}];

var clickBoxes = [{
	side: 5,
	box: [0.5 + centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 1, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2]
},
{
	side: 4,
	box: [0, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2]
},
{
	side: 1,
	box: [0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 1, 0.5 + centerWidth / 2]
},
{
	side: 0,
	box: [0.5 - centerWidth / 2, 0, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2]
},
{
	side: 3,
	box: [0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 1]
},
{
	side: 2,
	box: [0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 - centerWidth / 2]
}];

(function () {

	var group = ICRender.getGroup("itemConduit");
	group.add(BlockID.itemConduitExtract, -1);
	group.add(BlockID.itemConduit, -1);

	var boxes = [
		[
			[0.2, 0.2, 0, 0.8, 0.8, sideSize] //left
		],
		[
			[0.8, 0.8, 1 - sideSize, 0.2, 0.2, 1] //right
		],
		[
			[1 - sideSize, 0.8, 0.8, 1, 0.2, 0.2] //forward
		],
		[
			[0, 0.2, 0.2, sideSize, 0.8, 0.8] //back
		],
		[
			[0.8, 1 - sideSize, 0.8, 0.2, 1, 0.2] //up
		],
		[
			[0.2, 0, 0.2, 0.8, sideSize, 0.8] //down
		]
	];

	for (var meta = 0; meta < 6; meta++) {
		var boxe = boxes[meta];
		var wire = boxesWire[meta]

		var Dmodel = new ICRender.CollisionShape();
		var render = new ICRender.Model();
		var model = BlockRenderer.createModel();
		for (var n in boxe) {
		  var box = boxe[n];
		  //var model = BlockRenderer.createModel();
		  model.addBox(box[0], box[1], box[2], box[3], box[4], box[5], "conduit_connector", 0);
		  //render.addEntry(model);
		}
		model.addBox(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5], conduitTextureSet);
		model.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, conduitTextureSet);
		render.addEntry(model);

		var entry = Dmodel.addEntry();
		entry.addBox(0.2, 0.2, 0.2, 0.8, 0.8, 0.8);
		BlockRenderer.setCustomCollisionShape(BlockID.itemConduitExtract, meta, Dmodel)
		BlockRenderer.enableCoordMapping(BlockID.itemConduitExtract, meta, render);
	}
	var Dmodel = new ICRender.CollisionShape();
	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	model.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, conduitTextureSet);
	render.addEntry(model);
	var entry = Dmodel.addEntry();
	entry.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2);
	BlockRenderer.setCustomCollisionShape(BlockID.itemConduit, -1, Dmodel);
	BlockRenderer.enableCoordMapping(BlockID.itemConduit, -1, render);
})();

function mapGetter(coords, meta, groups, atach, blockSource) {
	coords.x = Number(coords.x);
	coords.y = Number(coords.y);
	coords.z = Number(coords.z);

	var boxes = [
		[
			[0.2, 0.2, 0, 0.8, 0.8, sideSize] //left
		],
		[
			[0.8, 0.8, 1 - sideSize, 0.2, 0.2, 1] //right
		],
		[
			[1 - sideSize, 0.8, 0.8, 1, 0.2, 0.2] //forward
		],
		[
			[0, 0.2, 0.2, sideSize, 0.8, 0.8] //back
		],
		[
			[0.8, 1 - sideSize, 0.8, 0.2, 1, 0.2] //up
		],
		[
			[0.2, 0, 0.2, 0.8, sideSize, 0.8] //down
		]
	];

	var boxe = [];
	if (meta >= 0) {
		boxe = boxes[meta];
		var wire = boxesWire[meta]
	}

	var Dmodel = new ICRender.CollisionShape();
	var render = new ICRender.Model();
	var model = BlockRenderer.createModel();
	var _entry = Dmodel.addEntry();
	for (var n in boxe) {
		var box = boxe[n];
		//var model = BlockRenderer.createModel();
		if(!blockSource)model.addBox(box[0], box[1], box[2], box[3], box[4], box[5], "conduit_connector", 0);
		_entry.addBox(box[0], box[1], box[2], box[3], box[4], box[5]);
		//render.addEntry(model);
	}
	if (meta >= 0 && !blockSource) model.addBox(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5], conduitTextureSet);
	if (meta >= 0) _entry.addBox(wire[0], wire[1], wire[2], wire[3], wire[4], wire[5]);
	if(!blockSource)model.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, conduitTextureSet);
	render.addEntry(model);
	_entry.addBox(0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 - centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2, 0.5 + centerWidth / 2);
	var _dimension = blockSource ? blockSource.getDimension() : Player.getDimension();
	for (var l in boxes1) {
		var box = boxes1[l];
		var blockg = groups[(coords.x + box.side[0]) + "," + (coords.y + box.side[1]) + "," + (coords.z + box.side[2])];
		if (!atach && blockg) {
			//if(!blockSource)BlockRenderer.unmapAtCoords(coords.x + box.side[0], coords.y + box.side[1], coords.z + box.side[2]);
			var crds = {
				x: coords.x + box.side[0],
				y: coords.y + box.side[1],
				z: coords.z + box.side[2]
			}
			mapGetter(crds, blockg.meta, groups, true, blockSource)
		}
		if(!blockSource)var model = BlockRenderer.createModel();
		if(!blockSource)model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], fixedConduitTextureSet);
		var gp = "not" + coords.x + "," + coords.y + "," + coords.z + ":" + (coords.x + box.side[0]) + "," + (coords.y + box.side[1]) + "," + (coords.z + box.side[2]) + "itemConduit" + _dimension;
		//var gp2 = "not" + (coords.x + box.side[0]) + "," + (coords.y + box.side[1]) + "," + (coords.z + box.side[2]) + ":" + coords.x + "," + coords.y + "," + coords.z + "itemConduit";
		if(!blockSource)render.addEntry(model).setCondition(ICRender.AND(ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup(gp + (ignored[gp] >= 0 ? ignored[gp] : '')), true), ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup("itemConduit"), false)));
		var entry = Dmodel.addEntry();
		entry.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
		entry.setCondition(ICRender.AND(ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup(gp + (ignored[gp] >= 0 ? ignored[gp] : '')), true), ICRender.BLOCK(box.side[0], box.side[1], box.side[2], ICRender.getGroup("itemConduit"), false)));
	}
	if(!blockSource)BlockRenderer.mapAtCoords(coords.x, coords.y, coords.z, render);
	BlockRenderer.mapCollisionAndRaycastModelAtCoords(_dimension, coords.x, coords.y, coords.z, Dmodel);
}

function coordsOnBlockData(blockData, coords) {
	var retCoords = [{
		x: coords.x,
		y: coords.y,
		z: coords.z - 1
	},
	{
		x: coords.x,
		y: coords.y,
		z: coords.z + 1
	},
	{
		x: coords.x + 1,
		y: coords.y,
		z: coords.z
	},
	{
		x: coords.x - 1,
		y: coords.y,
		z: coords.z
	},
	{
		x: coords.x,
		y: coords.y + 1,
		z: coords.z
	},
	{
		x: coords.x,
		y: coords.y - 1,
		z: coords.z
	}]

	return retCoords[blockData];
}

Network.addClientPacket('EnderIO.updateGroups', function(packetData){
	for(var i in packetData.NewBlocksAddToGroup){
		ICRender.getGroup("itemConduit").add(Network.serverToLocalId(packetData.NewBlocksAddToGroup[i]), -1);
	}
});

Callback.addCallback('tick', function(){
	if(updateBlocksAddToGroup){
		updateBlocksAddToGroup = false;
		Network.sendToAllClients('EnderIO.updateGroups', {NewBlocksAddToGroup: NewBlocksAddToGroup});
		NewBlocksAddToGroup = [];
	}
});

Callback.addCallback('ServerPlayerLoaded', function(player__){
	var client = Network.getClientForPlayer(player__);
	if(client)client.send('EnderIO.updateGroups', {NewBlocksAddToGroup: BlocksAddToGroup})
});

function searchContainers(coordsf, outCoordsf, blockSource) {
	var containers = [];
	var outCoords = [];
	var started = [];
	function asdds(coords) {
		if (started.indexOf(cts(coords)) != -1) return;
		started.push(cts(coords));
		var tc;
		var bon_wires = [];
		for (var i in newSides) {
			var coordss = {};
			var bonus;

			coordss.x = coords.x + newSides[i][0];
			coordss.y = coords.y + newSides[i][1];
			coordss.z = coords.z + newSides[i][2];
			coordss_string = cts(coordss);
			if(outCoords.indexOf(coordss_string) != -1) continue;
			var block = blockSource.getBlock(coordss.x, coordss.y, coordss.z);
			if (blockSource.getBlockId(coords.x, coords.y, coords.z) == BlockID.itemConduitExtract && (_bonusTile = World.getTileEntity(coords.x, coords.y, coords.z, blockSource))) bonus = _bonusTile.data.target;
			var not = false;
			if(!allGroups[0]) allGroups[0] = {};
			var groups = allGroups['d' + blockSource.getDimension()];
			if (groups && groups[cts(coords)] && groups[cts(coords)].not && groups[cts(coords)].not.map(function (d) {
				return d.x + ',' + d.y + ',' + d.z
			}).indexOf(coordss_string) != -1) not = true;
			if (coordss_string != (bonus ? cts(bonus) : '') && !not) {
				var cont = World.getContainer(coordss.x, coordss.y, coordss.z, blockSource);
				var tile = World.getTileEntity(coordss.x, coordss.y, coordss.z, blockSource) || World.addTileEntity(coordss.x, coordss.y, coordss.z, blockSource);
				if (cont) {
					//devLog("Tile found");
					tc = {
						container: cont,
						type: "vanilla",
						side: i
					};
					if (!tile) {
						//devLog("Vanilla tile");
						tc.size = cont.size;
						tc.slots = [];
						for (var k = 0; k < tc.size; k++) {
							tc.slots.push(k);
						}
					} else if (tile && ((tile.getTransportSlots && tile.getTransportSlots().input) || tile.interface)) {
						//devLog("Mod tile");
						tc.type = "modded";
						tc.TileEntity = tile;
						if (tile.interface) tc.SI = true;
						if (tc.SI) tc.slots = tile.interface.getInputSlots(reverseSides[i]);
						else if(tile.getTransportSlots) tc.slots = tile.getTransportSlots().input;
						tc.size = tc.slots.length;
					} else if (tile && !tile.getTransportSlots && !tile.interface) {
						//devLog("Container not have slots");
						tc = false;
					}
				}
				if (tc && (containers && !containers.find(function (element, index, array) {
					if (element.x == coordss.x && element.y == coordss.y && element.z == coordss.z) return index;
				}))) {
					tc.x = coordss.x;
					tc.y = coordss.y;
					tc.z = coordss.z;
					if (tc.size > 0) {
						if(block.id != 0 && BlocksAddToGroup.indexOf(block.id) == -1){
							BlocksAddToGroup.push(block.id);
							NewBlocksAddToGroup.push(block.id);
							updateBlocksAddToGroup = true;
						}
					}
					containers.push(tc);
					tc = false;
				}
				if (block.id == BlockID.itemConduit || block.id == BlockID.itemConduitExtract) {
					bon_wires.push({ coordss: coordss, out: coords });
				}
			}
		}
		for (var i in bon_wires) {
			outCoords.push(cts(bon_wires[i].out));
			asdds(bon_wires[i].coordss);
		}
	}
	outCoords.push(cts(outCoordsf));
	asdds(coordsf);
	return containers;

}

function targetIsContainer(coords, _item_data, blockSource) {
	var tc = false;
	var coordss = coords;
	var __container = World.getContainer(coordss.x, coordss.y, coordss.z, blockSource);
	var __tileentity = World.getTileEntity(coordss.x, coordss.y, coordss.z, blockSource) || World.addTileEntity(coordss.x, coordss.y, coordss.z, blockSource);
	if (__container) {
		//devLog("target found");
		var _side = getSideOnData(_item_data);
		tc = {
			container: __container,
			type: "vanilla",
			side: reverseSides[_side]
		};
		if (!__tileentity) {
			//devLog("target vanilla tile");
			tc.size = __container.size;
			tc.slots = [];
			for (var k = 0; k < tc.size; k++) {
				tc.slots.push(k);
			}
		} else if (__tileentity && ((__tileentity.getTransportSlots && __tileentity.getTransportSlots().output) || __tileentity.interface)) {
			//devLog("target mod tile");
			tc.type = "modded";
			tc.TileEntity = __tileentity;
			if (tc.TileEntity.interface) tc.SI = true;
			if (tc.SI) tc.slots = tc.TileEntity.interface.getOutputSlots(_side);
			else if(__tileentity.getTransportSlots) tc.slots = __tileentity.getTransportSlots().output;
			tc.size = tc.slots.length;
		} else if (__tileentity && !__tileentity.getTransportSlots && !__tileentity.interface) {
			tc = false;
		}
	}

	return tc;
}