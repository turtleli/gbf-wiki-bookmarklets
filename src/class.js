const job = Game.view.job.attributes.job;
const CLASS = job.master.name;
const WEAPON1 = job.proudly_weapons['1'].name;
const WEAPON2 = job.proudly_weapons['2'].name;
const DESC = job.master.comment;
const ID = (() => {
  const id = job.master.id;
  switch (WEAPON1) {
    case 'Sabre': return id + '_sw';
    case 'Dagger': return id + '_kn';
    case 'Spear': return id + '_sp';
    case 'Axe': return id + '_ax';
    case 'Staff': return id + '_wa';
    case 'Gun': return id + '_gu';
    case 'Melee': return id + '_me';
    case 'Bow': return id + '_bw';
    case 'Harp': return id + '_mc';
    case 'Katana': return id + '_kt';
    default: return id + '_??';
  }
})();
const FAMILY = (() => {
  switch (job.master.domain) {
    case '10': return 'fighter';
    case '11': return 'knight';
    case '12': return 'priest';
    case '13': return 'wizard';
    case '14': return 'thief';
    case '15': return 'enhancer';
    case '16': return 'grappler';
    case '17': return 'ranger';
    case '18': return 'harpist';
    case '19': return 'lancer';
    case '20': return 'alchemist';
    case '21': return 'ninja';
    case '22': return 'samurai';
    case '23': return 'swordmaster';
    case '24': return 'gunslinger';
    case '25': return 'mystic';
    case '26': return 'assassin';
    case '27': return 'drummaster';
    case '28': return 'dancer';
    case '29': return 'mechanic';
    case '30': return 'gladiator';
    case '31': return 'lumberjack';
    case '32': return 'cavalier';
    case '33': return 'monk';
    case '34': return 'robinhood';
    case '35': return 'relicbuster';
    case '36': return 'yamato';
    default: return '???';
  }
})();
const ROW = (() => {
  switch (job.master.class) {
    case '1': return '1';
    case '2': return '2';
    case '3': return '3';
    case '4': return '4';
    case '7': return '5';
    case '5': return '11';
    case '6': return '12';
    default: return '??';
  }
})();
const STYLE = (() => {
  switch (job.master.type) {
    case '1': return 'Balanced';
    case '2': return 'Attack';
    case '3': return 'Defense';
    case '4': return 'Heal';
    case '5': return 'Special';
    default: return '???';
  }
})();
const SUPPORT_ABILITIES = (() => {
  let list = [];
  for (const n in job.support_ability) {
    list.push(`|sup${n}=${job.support_ability[n].name}\n|sup${n}_desc=${job.support_ability[n].comment}`);
  }
  return list.join('\n');
})();

const convert_bonus = kind => {
  switch (kind) {
    case 'bonus_1': return 'ATK';
    case 'bonus_2': return 'DEF';
    case 'bonus_3': return 'Debuff Resistance';
    case 'bonus_4': return 'Debuff Success';
    case 'bonus_5': return 'Inhibit overdrive';
    case 'bonus_6': return 'Bounty success rate';
    case 'bonus_13': return 'Heal';
    case 'bonus_14': return 'HP';
    case 'bonus_15': return 'Charge Bar';
    case 'bonus_18': return 'Skill DMG';
    case 'bonus_20': return 'DA';
    case 'bonus_21': return 'TA';
  }
  return '???';
};
const LVL_BONUS = (() => {
    let list = [];
    for (const bonus of job.level_up_bonus) {
      const icon = convert_bonus(bonus.kind);
      list.push(`{{ClassBonus|${icon}|+${bonus.value}${bonus.is_percent == '1'? '%': ''}}}`);
    }
    return list.join('<br />');
  })();

const MASTER_BONUS = (() => {
  let list = [];
  for (const bonus of job.master_bonus_of_job) {
    const icon = convert_bonus(bonus.kind);
    list.push(`{{ClassBonus|${icon}|${bonus.name} +${bonus.param}${bonus.is_percent_master == '1'? '%': ''}}}`);
  }
  return list.join(' and ');
})();

const ability_info = ability => {
  const NAME = ability.name;
  const DESC = ability.comment.replace(/\<\/?span.*?\>/g, '');;
  const ID = 'Ability_m_' + ability.class_name + '.png';
  const COLOR = (() => {
    switch (ability.class_name.slice(-1)) {
      case "1": return "red";
      case "2": return "green";
      case "3": return "yellow";
      case "4": return "blue";
      case "5": return "purple";
    }
  })();
  const COOLDOWN = (() => {
    const cooldown = ability.recast != '9999'? ability.recast: '';
    const ready = ability.start_recast;
    return ready != '' ? `{{ReadyIn|${ready}${cooldown != ''? '|' + cooldown: ''}}}`: (cooldown != '' ? cooldown + 'T': '-');
  })();

  return [NAME, DESC, ID, COLOR, COOLDOWN];
};

const [ABILITY1_NAME, ABILITY1_DESC, ABILITY1_ID, ABILITY1_COLOR, ABILITY1_COOLDOWN] = ability_info(job.ability['1'])

const result =`{{Class
|id=${ID}
|class=${CLASS}
|family=${FAMILY}
|row=${ROW}
|desc=${DESC}
|style=${STYLE}
|wep1=${WEAPON1}
|wep2=${WEAPON2}
|release_date=
|link_jpwiki=
|link_gamewith=
|link_kamigame=
|prereq=
|lvlbonus=${LVL_BONUS}
|masterbonus=${MASTER_BONUS}
|class_weapon=
|class_weapon_v2=
${SUPPORT_ABILITIES}
|s1_icon=${ABILITY1_ID}
|s1_color=${ABILITY1_COLOR}
|s1_name=${ABILITY1_NAME}
|s1_desc=${ABILITY1_DESC}
|s1_cd=${ABILITY1_COOLDOWN}
|s1_dur=
|s1_notes=
|ex1_icon=
|ex1_color=
|ex1_name=
|ex1_desc=
|ex1_cd=
|ex1_dur=
|ex1_cost=
|ex1_notes=
|ex2_icon=
|ex2_color=
|ex2_name=
|ex2_desc=
|ex2_dur=
|ex2_cd=
|ex2_cost=
|ex2_notes=
|ex3_icon=
|ex3_color=
|ex3_name=
|ex3_desc=
|ex3_cd=
|ex3_dur=
|ex3_cost=
|ex3_notes=
|ex4_icon=
|ex4_color=
|ex4_name=
|ex4_desc=
|ex4_cd=
|ex4_dur=
|ex4_cost=
|ex4_notes=
|ex5_icon=
|ex5_color=
|ex5_name=
|ex5_desc=
|ex5_cd=
|ex5_dur=
|ex5_cost=
|ex5_notes=
|recmast=
|recsub=
}}`;

copyToClipboard(result);
