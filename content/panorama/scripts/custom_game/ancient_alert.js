var alarmsCurrent = 0
var alarmsMax = 4
var alarmScreen = FindDotaHudElement("ancient_alert_id")

function SetOffAlarm(){
    alarmsCurrent = 0;

    Alarm();
}

function Alarm(){
    Game.EmitSound("AlarmInterval");
    AnimatePanel(alarmScreen, {"opacity": "0.5"}, 0, "ease-in", 0);
    alarmsCurrent++;

    $.Schedule(0.9, function(){
        AnimatePanel(alarmScreen, {"opacity": "0"}, 0, "ease-in", 0);
        if(alarmsCurrent < alarmsMax){
            $.Schedule(0.9, Alarm)
        }
    })
}

GameEvents.Subscribe("TriggerAlarm", SetOffAlarm)