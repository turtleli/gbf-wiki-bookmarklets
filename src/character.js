(function(){

// Check page correctness
if (!location.hash.match("#gacha/chara")) {
  const answer = confirm("You don't seem to be in #gacha/chara page. Run anyway?");
  if (answer === false) return;
}

const ID = document.querySelector('.btn-char-zoom[data-image-id]').getAttribute("data-image-id").replace("_01", "");
const NAME = document.querySelector(".prt-chara-info > div:first-child").textContent;

const RARITY = (() => {
  if (document.querySelector(".prt-rarity-4")) return "SSR";
  if (document.querySelector(".prt-rarity-3")) return "SR";
  if (document.querySelector(".prt-rarity-2")) return "R";
  return "?";
})();

const ELEMENT = (() => {
  if (document.querySelector(".ico-type1")) return "Fire";
  if (document.querySelector(".ico-type2")) return "Water";
  if (document.querySelector(".ico-type3")) return "Earth";
  if (document.querySelector(".ico-type4")) return "Wind";
  if (document.querySelector(".ico-type5")) return "Light";
  if (document.querySelector(".ico-type6")) return "Dark";
  return "?";
})();

const TYPE = (() => {
  if (document.querySelector(".ico-chara-type-short1")) return "Balanced";
  if (document.querySelector(".ico-chara-type-short2")) return "Attack";
  if (document.querySelector(".ico-chara-type-short3")) return "Defense";
  if (document.querySelector(".ico-chara-type-short4")) return "Heal";
  if (document.querySelector(".ico-chara-type-short5")) return "Special";
  return "?";
})();

const RACE = (() => {
  if (document.querySelector(".ico-mini-race-txt1")) return "Human";
  if (document.querySelector(".ico-mini-race-txt2")) return "Erune";
  if (document.querySelector(".ico-mini-race-txt3")) return "Draph";
  if (document.querySelector(".ico-mini-race-txt4")) return "Harvin";
  if (document.querySelector(".ico-mini-race-txt5")) return "Other";
  if (document.querySelector(".ico-mini-race-txt6")) return "Primal";
  return "?";
})();

const SERIES = (() => {
  const list = [];
  if (document.querySelector(".ico-series-type1")) list.push("summer");
  if (document.querySelector(".ico-series-type2")) list.push("yukata");
  if (document.querySelector(".ico-series-type3")) list.push("valentine");
  if (document.querySelector(".ico-series-type4")) list.push("halloween");
  if (document.querySelector(".ico-series-type5")) list.push("holiday");
  if (document.querySelector(".ico-series-type6")) list.push("12generals");
  if (document.querySelector(".ico-series-type7")) list.push("grand");
  if (document.querySelector(".ico-series-type8")) list.push("fantasy");
  if (document.querySelector(".ico-series-type9")) list.push("tie-in");
  if (document.querySelector(".ico-series-type10")) list.push("eternals");
  if (document.querySelector(".ico-series-type11")) list.push("evokers");
  return list.join(";");
})();

const VOICE_ACTOR = document.querySelector(".txt-acter-name").innerText.split("\n").join(", ");

const JOIN_WEAPON = document.querySelector(".txt-weapon-name").textContent;

const PROFICIENCY = (() => {
  const list = [];
  if (document.querySelector(".ico-weapon-1")) list.push("Sabre");
  if (document.querySelector(".ico-weapon-2")) list.push("Dagger");
  if (document.querySelector(".ico-weapon-3")) list.push("Spear");
  if (document.querySelector(".ico-weapon-4")) list.push("Axe");
  if (document.querySelector(".ico-weapon-5")) list.push("Staff");
  if (document.querySelector(".ico-weapon-6")) list.push("Gun");
  if (document.querySelector(".ico-weapon-7")) list.push("Melee");
  if (document.querySelector(".ico-weapon-8")) list.push("Bow");
  if (document.querySelector(".ico-weapon-9")) list.push("Harp");
  if (document.querySelector(".ico-weapon-10")) list.push("Katana");
  return list.join(",");
})();

const MAX_HP = document.querySelector(".txt-hp-value").textContent;
const MAX_ATK = document.querySelector(".txt-atk-value").textContent;

const ougi_flexboxes = document.querySelectorAll(".prt-detail-special .prt-box-flexible");
const OUGI_COUNT = ougi_flexboxes.length;
const ougi_info = (ougi) => {
  return {NAME: ougi?.querySelector(".name-m")?.textContent, DESC: ougi?.querySelector(".comment-m")?.textContent};
}
const OUGI_ONE = ougi_info(ougi_flexboxes[0]);
const OUGI_TWO = ougi_info(ougi_flexboxes[1]);
const OUGI_THREE = ougi_info(ougi_flexboxes[2]);
const OUGI_FOUR = ougi_info(ougi_flexboxes[3]);

const ability_flexboxes = document.querySelectorAll(".prt-detail-action .prt-box-flexible");
const ABILITY_COUNT = ability_flexboxes.length;
const ability_info = ability => {
  const NAME = ability?.querySelector(".name-m")?.textContent;
  const DESC = ability?.querySelector(".comment-m")?.textContent;
  const ID = ability?.querySelector(".img-ability-icon")?.getAttribute("src")?.replace(/.*\//, "Ability_m_");
  const COLOR = (() => {
    switch (ID?.match(/(\d)\.png$/)?.[1]) {
      case "1": return "red";
      case "2": return "green";
      case "3": return "yellow";
      case "4": return "blue";
      case "5": return "purple";
      default: return "";
    }
  })();
  const COOLDOWN = ability?.querySelector(".txt-recast")?.textContent.match(/\d+/)?.[0];
  const OBTAIN = ability?.querySelector(".prt-condition")?.textContent.match(/\d+/)?.[0];

  return {NAME, DESC, ID, COLOR, COOLDOWN, OBTAIN};
};

const ABILITY_ONE = ability_info(ability_flexboxes[0]);
const ABILITY_TWO = ability_info(ability_flexboxes[1]);
const ABILITY_THREE = ability_info(ability_flexboxes[2]);
const ABILITY_FOUR = ability_info(ability_flexboxes[3]);

const support_ability_flexboxes = document.querySelectorAll(".prt-detail-support .prt-box-flexible");
const SUPPORT_ABILITY_COUNT = support_ability_flexboxes.length;
const support_ability_info = (ability) => {
  return {NAME: ability?.querySelector(".name-m")?.textContent, DESC: ability?.querySelector(".comment-m")?.textContent};
}

const SUPPORT_ABILITY_ONE = support_ability_info(support_ability_flexboxes[0])
const SUPPORT_ABILITY_TWO = support_ability_info(support_ability_flexboxes[1])

const result = nonEmpty`{{CharacterTabs|base={{BASENAME}}}}
{{Character
|id=${ID}
|charid=
|series=${SERIES}
|jpname=
|jptitle=
|jpva=
|name=${NAME}
|release_date=
|link_gamewith=
|link_jpwiki=
|link_kamigame=
|gender=
|obtain=
|title=
|title_source=
|5star=
|5star_date=
|base_evo=4
|max_evo=4
|uncap_type=${RARITY}
|expedition_type=
|blush_value=
|art1={{PAGENAME}} A.png
|art2={{PAGENAME}} B.png
|art3=
|art_story1=
|sprite1={{PAGENAME}} SDA.png
|sprite2={{PAGENAME}} SDB.png
|sprite3=
|rarity=${RARITY}
|element=${ELEMENT}
|type=${TYPE}
|race=${RACE}
|va=${VOICE_ACTOR}
|join=
|join_weapon=${JOIN_WEAPON}
|weapon=${PROFICIENCY}
|min_atk=
|max_atk=${MAX_ATK}
|flb_atk=
|bonus_atk=
|min_hp=
|max_hp=${MAX_HP}
|flb_hp=
|bonus_hp=
|ougi_count=${OUGI_COUNT}
|ougi_name=${OUGI_ONE.NAME}
|ougi_desc=${OUGI_ONE.DESC}
|ougi2_name=${OUGI_TWO.NAME}
|ougi2_desc=${OUGI_TWO.DESC}
|ougi3_name=${OUGI_THREE.NAME}
|ougi3_desc=${OUGI_THREE.DESC}
|ougi4_name=${OUGI_FOUR.NAME}
|ougi4_desc=${OUGI_FOUR.DESC}
|abilitysubtitle=
|abilitycount=${ABILITY_COUNT}
|a1_icon=${ABILITY_ONE.ID}
|a1_color=${ABILITY_ONE.COLOR}
|a1_name=${ABILITY_ONE.NAME}
|a1_cd={{InfoCd|num=0|cooldown=${ABILITY_ONE.COOLDOWN}|cooldown1=|level1=55}}
|a1_dur={{InfoDur|type=t|duration=}}
|a1_oblevel={{InfoOb|obtained=1|enhanced=55}}
|a1_effdesc={{InfoDes|num=0|des=${ABILITY_ONE.DESC}}}
|a2_icon=${ABILITY_TWO.ID}
|a2_color=${ABILITY_TWO.COLOR}
|a2_name=${ABILITY_TWO.NAME}
|a2_cd={{InfoCd|num=0|cooldown=${ABILITY_TWO.COOLDOWN}|cooldown1=|level1=75}}
|a2_dur={{InfoDur|type=t|duration=}}
|a2_oblevel={{InfoOb|obtained=1|enhanced=75}}
|a2_effdesc={{InfoDes|num=0|des=${ABILITY_TWO.DESC}}}
|a3_icon=${ABILITY_THREE.ID}
|a3_color=${ABILITY_THREE.COLOR}
|a3_name=${ABILITY_THREE.NAME}
|a3_cd={{InfoCd|num=0|cooldown=${ABILITY_THREE.COOLDOWN}}}
|a3_dur={{InfoDur|type=t|duration=}}
|a3_oblevel={{InfoOb|obtained=${ABILITY_THREE.OBTAIN}}}
|a3_effdesc={{InfoDes|num=0|des=${ABILITY_THREE.DESC}}}
|a4_icon=${ABILITY_FOUR.ID}
|a4_color=${ABILITY_FOUR.COLOR}
|a4_name=${ABILITY_FOUR.NAME}
|a4_cd={{InfoCd|num=0|cooldown=${ABILITY_FOUR.COOLDOWN}}}
|a4_dur={{InfoDur|type=t|duration=}}
|a4_oblevel={{InfoOb|obtained=${ABILITY_FOUR.OBTAIN}}}
|a4_effdesc={{InfoDes|num=0|des=${ABILITY_FOUR.DESC}}}
|s_abilitycount=${SUPPORT_ABILITY_COUNT}
|sa_name=${SUPPORT_ABILITY_ONE.NAME}
|sa_level={{InfoOb|obtained=1}}
|sa_desc=${SUPPORT_ABILITY_ONE.DESC}
|sa2_name=${SUPPORT_ABILITY_TWO.NAME}
|sa2_level={{InfoOb|obtained=1}}
|sa2_desc=${SUPPORT_ABILITY_TWO.DESC}
|sa_emp_desc=
|perk11=
|perk12=
|perk13=
|perk14=
|perk15=
|a1_mimic=
|a1_mimic_notes=
|a2_mimic=
|a2_mimic_notes=
|a3_mimic=
|a3_mimic_notes=
|a4_mimic=
|a4_mimic_notes=
|profile=
}}

==Gameplay Notes==
<!-- Gameplay Notes end here! Don't touch lines below! -->{{#var: character_template_bottom | }}

==References==
<references />
`;

copyToClipboard(result);

})();
