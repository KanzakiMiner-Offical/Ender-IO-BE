var currentUIscreen;
Callback.addCallback("NativeGuiChanged", function(screenName) {
  currentUIscreen = screenName;
  if (screenName != "in_game_play_screen" && UIbuttons.container) {
    UIbuttons.container.close();
  }
});

var button_scale = 55 //__config__.getNumber("button_scale");
var UIbuttons = {
  funcs: 0,
  data: {},
  onSwitch: {},
  onUpdate: {},
  isEnabled: false,
  container: null,
  Window: new UI.Window({
    location: {
      x: 1000 - button_scale,
      y: UI.getScreenHeight() / 2 - button_scale * 2,
      width: button_scale,
      height: button_scale * 5
    },
    drawing: [{ type: "background", color: 0 }],
    elements: {}
  }),

  setArmorButton: function(id, name) {
    var data = { type: 0, name: name };
    if (!this.data[id]) {
      this.data[id] = [data]
    } else {
      this.data[id].push(data);
    }
  },

  setToolButton: function(id, name, notHidden) {
    var data = { type: 1, name: name, hidden: !notHidden };
    if (!this.data[id]) {
      this.data[id] = [data]
    } else {
      this.data[id].push(data);
    }
  },

  getButtons: function(id) {
    return this.data[id];
  },

  registerButton: function(name, properties) {
    buttonContent[name] = properties;
    buttonMap[name] = false;
  },

  registerSwitchFunction: function(id, func) {
    this.onSwitch[id] = func;
  },

  onButtonUpdate: function(name, func) {
    this.onUpdate[name] = func;
  }
}

var buttonMap = {
  button_nightvision: false,
  button_fly: false,
  button_jump: false,
  button_function: false,
  button_tele: false,
}

var buttonContent = {
  button_nightvision: {
    y: 0,
    type: "button",
    bitmap: "button_nightvision_on",
    bitmap2: "button_nightvision_off",
    scale: 50,
    clicker: {
      onClick: function() {
        var armor = Player.getArmorSlot(0);
        var extra = armor.extra;
        if (extra) {
          var nightvision = extra.getBoolean("nv");
        }
        else {
          var nightvision = false;
          extra = new ItemExtraData();
        }
        if (nightvision) {
          extra.putBoolean("nv", false);
          Game.message("§4" + Translation.translate("Nightvision mode disabled"));
        }
        else {
          extra.putBoolean("nv", true);
          Game.message("§2" + Translation.translate("Nightvision mode enabled"));
        }
        Player.setArmorSlot(0, armor.id, 1, armor.data, extra);
      }
    }
  },
  button_fly: {
    y: 1000,
    type: "button",
    bitmap: "button_fly_on",
    bitmap2: "button_fly_off",
    scale: 50
  },
  
  button_jump: {
    y: 3000,
    type: "button",
    bitmap: "button_jump_on",
    bitmap2: "button_jump_off",
    scale: 50,
    clicker: {
      onClick: function() {
        var armor = Player.getArmorSlot(3);
        var energyStored = ChargeItemRegistry.getEnergyStored(armor);
        if (energyStored >= 1000 && Player.getVelocity().y.toFixed(4) == fallVelocity) {
          Player.addVelocity(0, 1.4, 0);
          ChargeItemRegistry.setEnergyStored(armor, energyStored - 1000);
          Player.setArmorSlot(3, armor.id, 1, armor.data, armor.extra);
        }
      }
    }
  },
  button_switch: {
    y: 4000,
    type: "button",
    bitmap: "button_switch",
    bitmap2: "button_switch_touched",
    scale: 25,
    clicker: {
      onClick: function() {
        var item = Player.getCarriedItem();
        if (UIbuttons.onSwitch[item.id]) {
          UIbuttons.onSwitch[item.id](item);
        }
      }
    }
  },
  button_tele: {
    y: 2000,
    type: "button",
    bitmap: "button_tele",
    bitmap2: "empty_button_up",
    scale: 50,
    clicker: {
      onClick: function() {
        var item = Player.getCarriedItem();
        let energyStored = ChargeItemRegistry.getEnergyStored(item);
        if (energyStored >= 15000) {
          let pos = Player.getPosition();
          let vec = Entity.getLookVector(Player.get());
          let crd = {};
          for (let t = 1; t <= 16; t++) {
            crd.x = pos.x + vec.x * t;
            crd.y = pos.y + vec.y * t;
            crd.z = pos.z + vec.z * t;
           // if (!GenerationUtils.isTransparentBlock(World.getBlockID(crd.x, crd.y, crd.z))) {
              Game.tipMessage("Teleport at: X: " + Math.round(crd.x) + " Y: " + Math.round(crd.y) + " Z: " + Math.round(crd.z));
              Entity.setPosition(Player.get(), crd.x, crd.y, crd.z);
              
              ChargeItemRegistry.setEnergyStored(item, Math.max(energyStored - 15000, 0));

           // }
          }
        } else { //debug
        	alert("Error");
            alert(item.id);
        }
        
      }
    }
  },
  button_function: {
		y: 5000,
		type: "button",
		bitmap: "armor_f_off",
		bitmap2: "armor_f_on",
		scale: 25,
		clicker: {
			onClick: function(){
				UIbuttons.funcs = (UIbuttons.funcs+1)%2;
			switch(UIbuttons.funcs){
			case 0:
				Game.message("Armor Functions Diasbled");
			break;
			case 1:
				Game.message("Armor Functions Enabled");
			break;
}}}}

}

UIbuttons.Window.setAsGameOverlay(true);

function updateUIbuttons() {
  var elements = UIbuttons.Window.content.elements;
  for (var name in buttonMap) {
    if (buttonMap[name]) {
      if (!elements[name]) {
        elements[name] = buttonContent[name];
      }
      var element = elements[name];
      var func = UIbuttons.onUpdate[name];
      if (func) func(element);
      element.x = 0;
      buttonMap[name] = false;
    }
    else {
      elements[name] = null;
    }
  }
}

Callback.addCallback("LocalTick", function() {
  var armor = [Player.getArmorSlot(0), Player.getArmorSlot(1), Player.getArmorSlot(2), Player.getArmorSlot(3)];
  for (var i in armor) {
    var buttons = UIbuttons.getButtons(armor[i].id);
    for (var i in buttons) {
      var button = buttons[i];
      if (button.type == 0) {
        buttonMap[button.name] = true;
        UIbuttons.isEnabled = true;
      }
    }
  }
  var item = Player.getCarriedItem();
  var buttons = UIbuttons.getButtons(item.id);
  for (var i in buttons) {
    var button = buttons[i];
    if (button.type == 1 && (!button.hidden || Entity.getSneaking(Player.get()))) {
      buttonMap[button.name] = true;
      UIbuttons.isEnabled = true;
    }
  }
  if (UIbuttons.isEnabled && currentUIscreen == "in_game_play_screen") {
    updateUIbuttons();
    if (!UIbuttons.container || !UIbuttons.container.isOpened()) {
      UIbuttons.container = new UI.Container();
      UIbuttons.container.openAs(UIbuttons.Window);
    }

  }
  else if (UIbuttons.container) {
    UIbuttons.container.close();
    UIbuttons.container = null;
  }
  UIbuttons.isEnabled = false;
});