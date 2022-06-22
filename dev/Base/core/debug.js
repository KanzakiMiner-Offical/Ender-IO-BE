/**/Item.registerUseFunction("skullZombieElectrode", function(coords, item, block){
	//Game.message(block.id+":"+block.data);
	/*Game.message("Smelter:"  + RecipeRegistry.smelter);
	Game.message("Crusher:"  + RecipeRegistry.crusher);*/
	for(let i in RecipeRegistry.crusher){
	Game.message("input:"  + RecipeRegistry.crusher[i].ingredient.id + ":" + RecipeRegistry.crusher[i].ingredient.data );
	Game.message("isGrinding" + RecipeRegistry.crusher[i].isGrinding)
	Game.message("_-End-_");
}
});
