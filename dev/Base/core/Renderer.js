var Renderer = {
  models: {},

  initRenderModel: function(id, data, model) {
    if (!this.models[id]) {
      this.models[id] = {};
    }
    BlockRenderer.enableCoordMapping(id, (data ? data : -1), model);
  },

  registerRenderModel: function(id, data, model) {
    if (!this.models[id]) {
      this.initRenderModel(id, data, model);
    }
    this.models[id][data] = model;
  },

  getRenderModel: function(id, data) {
    var renderer = this.models[id];
    if (renderer) {
      return renderer[data];
    }
    return 0;
  },

  mapAtCoords: function(x, y, z, id, data) {
    var render = this.getRenderModel(id, data);
    if (render) {
      BlockRenderer.mapAtCoords(x, y, z, render);
    }
  }
}