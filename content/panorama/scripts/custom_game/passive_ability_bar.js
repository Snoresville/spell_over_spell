let abilityBar = FindDotaHudElement("PassiveAbilityBarContainer")
let maxSize = Math.floor(Game.GetScreenWidth()/(60) * 1080/Game.GetScreenHeight())
var bars = []

//$.Msg(Game.GetScreenWidth())
//$.Msg(maxSize)
//$.Msg("how much dota scaled my fucking icons: " + Game.GetScreenHeight()/1080)

function StoreObtainedPassive(data){
    //$.Msg("ping! " + data.ability.replace("passive_", ""));

    // First Time Initialisation
    if(bars.length == 0){
        let currentBar = $.CreatePanel('Panel', abilityBar, '');
        currentBar.BLoadLayoutSnippet("MakeBar");
        bars.push(currentBar)
        //$.Msg(bars[bars.length - 1])
    }

    // Add an ability
    let newPassive = $.CreatePanel('Panel', bars[bars.length - 1], '')
    newPassive.BLoadLayoutSnippet("StorePassive")
    newPassive.FindChildTraverse("AbilityBarVisual").abilityname = data.ability.replace("passive_", "")
    //$.Msg(newPassive.FindChildTraverse("AbilityBarVisual").width)

    // Make a new bar if we have too much abilities
    if(bars[bars.length - 1].GetChildCount() >= maxSize){
        let currentBar = $.CreatePanel('Panel', abilityBar, '');
        currentBar.BLoadLayoutSnippet("MakeBar");
        bars.push(currentBar)
    }
}

function debug(){
    StoreObtainedPassive({ability: "passive_sven_gods_strength"})
}

GameEvents.Subscribe("ability_gain", StoreObtainedPassive);