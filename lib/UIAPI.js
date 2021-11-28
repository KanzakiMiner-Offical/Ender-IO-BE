LIBRARY({
	name: "UIAPI",
	version: 1,
	shared: false,
	api: "CoreEngine"
});
//作者CuiZhenhang
Translation.addTranslation("Inventory", {zh:"物品栏", ru:"Инвентарь"});

var Height = UI.getScreenHeight()-2*30;
var color = android.graphics.Color.rgb(197, 197, 197);

var UIRegistry = function(state){
	try{var TEXT=state.standart.header.text||" "}catch(e){TEXT={text: " "}};
	var drawing1 = [
		{type: "background", color: android.graphics.Color.TRANSPARENT},
		{type: "frame", bitmap: "classic_frame_bg_light", scale: 3, width: 1000, height: 1000, color: color},
		{type: "text", x: 20, y: 60, text: TEXT, font: {color: android.graphics.Color.rgb(74,74,74), size: 40}},
		{type: "text", x: 20, y: 575, text: Translation.translate("Inventory"), font: {color: android.graphics.Color.rgb(74,74,74), size: 40}}
	];
	var element1 = {"close": {type: "closeButton", global: true, scale: 5, bitmap: "classic_close_button", bitmap2: "classic_close_button_down", x: 910, y: 10}}
	for(i=9; i<45; i++){element1["invSlot"+i]={type: "invSlot", x: 95+(i%9)*90, y: 510+Math.floor(i/9)*90+(i>=36 ? 10 : 0), size: 90, index: i}};

	var ui1 = UI.Window({
		location: {x: 500-Height*0.5, y: 30, width: Height*1.0, height: Height},
		params: {slot: "classic_slot", inv_slot: "classic_slot"},
		drawing: drawing1,
		elements: element1
	});
	ui1.setInventoryNeeded(true);
	ui1.setDynamic(true);
	ui1.setBlockingBackground(true);

	state.location={x: 500-Height*0.5+30, y: 30+30, width: Height*1.0-60, height: (Height*1.0-60)*9/16};
	var drawing2=[{type: "background", color: android.graphics.Color.TRANSPARENT}];
	if(state.drawing){state.drawing.map(function(i,ii){drawing2[ii+1]=i})};
	state.drawing=drawing2;
	var ui2 = UI.Window(state);

	var Ui = UI.WindowGroup();
	Ui.addWindowInstance("inventory", ui1)
	Ui.addWindowInstance("main", ui2)
	Ui.setBlockingBackground(true);
	return Ui;
}

EXPORT("UIRegistry", UIRegistry);