// Check page correctness
if (!location.hash.match("#raid_multi")) {
  const answer = confirm("You don't seem to be in #raid_multi page. Run anyway?");
  if (answer === false) return;
}

const generateEnemyActionTemplate = trigger => {
  const FORM = trigger.form;
  const NAME = trigger.name;
  const REMAIN_HP_FROM = trigger.remain_hp_from;
  const REMAIN_HP_TO = trigger.remain_hp_to;
  const SPECIAL_ACTION_ID = trigger.special_action_id;
  const SPECIAL_SKILL_TEXT = trigger.special_skill_text;
  const SPECIAL_SKILL_DAMAGE_TEXT = trigger.special_skill_damage_text.replace(/\<br\>/g, "<br />");

  return `
{{EnemyAction
|special_action_id=${SPECIAL_ACTION_ID}
|form=${FORM}
|name=${NAME}
|remain_hp_from=${REMAIN_HP_FROM}
|remain_hp_to=${REMAIN_HP_TO}
|special_skill_text=${SPECIAL_SKILL_TEXT}
|special_skill_damage_text=${SPECIAL_SKILL_DAMAGE_TEXT}
|wiki_damage_text=
|wiki_skill_tags=
|wiki_omen=
}}
`;
};

const generateBattleEnemyTemplate = boss => {
  const ID = boss.enemy_id;
  const [NAME, LVL] = (() => {
    const match = boss.name.en.match(/(?:Lvl ([\d\?]*) )?(.*)/);
    return [match[2], match[1] ?? boss.Lv];
  })();
  const ELEMENT = boss.attribute.toLowerCase();
  const HP = new Intl.NumberFormat("en-US").format(boss.hpmax);
  const CT = boss.recast == "99999"? "0": boss.recast - 1;
  const OD = boss.modeflag == 1? "yes": "no";
  const num = boss.number;

  const hp_trigger_action_list = stage.pJsnData.hp_trigger_action_list[num];

  let result = "";
  for (const SPECIAL_ACTION_ID in hp_trigger_action_list) {
    const trigger = hp_trigger_action_list[SPECIAL_ACTION_ID];
    result += generateEnemyActionTemplate(trigger);
  }

  return `{{
    BattleEnemy
    |id=${ID}
    |name=${NAME}
    |lvl=${LVL}
    |element=${ELEMENT}
    |hp=${HP}
    |ct=${CT}
    |od=${OD}
    |ca_desc=${result}
    |notes=
}}`;
}

let result = "";
const boss_list = stage.pJsnData?.boss.param;
for (const boss of boss_list) {
  result += generateBattleEnemyTemplate(boss);
}

copyToClipboard(result);
