IDRegistry.genBlockID("dataConduit");
Block.createBlock("dataConduit", [
  { name: "Data Conduit", texture: [["dataConduit", 0]], inCreative: true }
]);

ConduitRegistry.setupModel(BlockID.dataConduit, ConduitWidth);
DataGroup.add(BlockID.dataConduit, -1);
/*
MachineRegistry.registerPrototype(BlockID.energyPlug, {
  defaultValues: {
    containerData: false
  },
  
  tick: function() {

    let direct = [
      { x: 0, y: 1, z: 0 },
      { x: 0, y: -1, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: -1 },
	   	];
    for (i in direct) {
      let dir = direct[i];
      let tile = World.getTileEntity(this.x + dir.x, this.y + dir.y, this.z + dir.z);
      
      if (tile && tile.data.containerData) {
        this.data.containerData = true
      } else {
        this.data.containerData = false
      }
      if(World.getBlockID(this.x + dir.x, this.y + dir.y, this.z + dir.z) == 54){
        this.data.containerData = true
      } else {
        this.data.containerData = false
      }
    }
  }

});*/