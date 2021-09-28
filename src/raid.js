(function(){

// Check page correctness
if (!location.hash.match("#raid_multi")) {
  const answer = confirm("You don't seem to be in #raid_multi page. Run anyway?");
  if (answer === false) return;
}

// Just to make it sane
const generateEnemyHeader = number => {
  return `
=== Enemy ${number} ===
`;
};

const generateEnemyActionTemplate = trigger => {
  const FORM = trigger.form;
  const NAME = trigger.name;
  const REMAIN_HP_FROM = trigger.remain_hp_from;
  const REMAIN_HP_TO = trigger.remain_hp_to;
  const SPECIAL_ACTION_ID = trigger.special_action_id;
  const SPECIAL_SKILL_TEXT = trigger.special_skill_text;
  const SPECIAL_SKILL_DAMAGE_TEXT = trigger.special_skill_damage_text.replace("<br>", "<br/>");

  return `{{EnemyAction
|special_action_id= ${SPECIAL_ACTION_ID}
|form= ${FORM}
|name= ${NAME}
|remain_hp_from= ${REMAIN_HP_FROM}
|remain_hp_to= ${REMAIN_HP_TO}
|special_skill_text= ${SPECIAL_SKILL_TEXT}
|special_skill_damage_text= ${SPECIAL_SKILL_DAMAGE_TEXT}
|wiki_damage_text=
|wiki_skill_tags=
|wiki_omen=
}}

`;
};

const hp_trigger_action_list = stage.pJsnData?.hp_trigger_action_list;
if (!hp_trigger_action_list) return;

let result = "";
for (const enemyNumber in hp_trigger_action_list) {
  result += generateEnemyHeader(enemyNumber);

  for (const SPECIAL_ACTION_ID in hp_trigger_action_list[enemyNumber]) {
    const trigger = hp_trigger_action_list[enemyNumber][SPECIAL_ACTION_ID];
    result += generateEnemyActionTemplate(trigger);
  }
}

copyToClipboard(result);

})();
