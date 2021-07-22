var titleFade = null;
function NewAbility(data){
    var passiveName = data.ability.replace("passive_", "");

    // Creates the container for the ability
    var abilityContainer = $.CreatePanel('Panel', $('#PassiveAbilityNoticeBar'), '');
    abilityContainer.BLoadLayoutSnippet("NewPassive");
    abilityContainer.FindChildTraverse("AbilityVisual").abilityname = passiveName;
    GameEvents.SendCustomGameEventToClient("AbilityBarStore",Players.GetLocalPlayer(), {passiveName: passiveName} )
    NoticeTextUpdate();

    // Fade in ability
    AnimatePanel(FindDotaHudElement("PassiveAbilityNoticeTitle"), {"opacity": "1"}, 1, "ease-in", 0);
    AnimatePanel(abilityContainer, {"opacity": "1"}, 1, "ease-in", 0);

    // Fade out
    $.Schedule(4, function(){
        AnimatePanel(abilityContainer, {"opacity": "0"}, 1, "ease-in", 0);
        $.Schedule(1, function(){
            // Making sure the text updates correctly
            abilityContainer.DeleteAsync(0);
            $.Schedule(0.1, function(){
                NoticeTextUpdate();
            });
        });
    });

    // Title fade
    if(titleFade != null){
        $.CancelScheduled(titleFade)
    }
    titleFade = $.Schedule(4, function(){
        titleFade = null;
        AnimatePanel(FindDotaHudElement("PassiveAbilityNoticeTitle"), {"opacity": "0"}, 1, "ease-in", 0);
    });
}

// Flavor
function NoticeTextUpdate(){
    if(FindDotaHudElement("PassiveAbilityNoticeBar").GetChildCount() > 1){
        FindDotaHudElement("PassiveAbilityNoticeText").text = "You have gained the following passives";
    }
    else{
        FindDotaHudElement("PassiveAbilityNoticeText").text = "You have gained the following passive";
    }
}

function debug(){
    NewAbility({ability: "passive_sven_gods_strength"});
}
//debug();

GameEvents.Subscribe("ability_gain", NewAbility);