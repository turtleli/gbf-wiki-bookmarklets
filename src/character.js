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

const name_comment_m_info = box => [box?.querySelector(".name-m")?.textContent, box?.querySelector(".comment-m")?.textContent];

const ougi_flexboxes = document.querySelectorAll(".prt-detail-special .prt-box-flexible");
const OUGI_COUNT = ougi_flexboxes.length;
const [OUGI1_NAME, OUGI1_DESC] = name_comment_m_info(ougi_flexboxes[0]);
const [OUGI2_NAME, OUGI2_DESC] = name_comment_m_info(ougi_flexboxes[1]);
const [OUGI3_NAME, OUGI3_DESC] = name_comment_m_info(ougi_flexboxes[2]);
const [OUGI4_NAME, OUGI4_DESC] = name_comment_m_info(ougi_flexboxes[3]);

const support_ability_flexboxes = document.querySelectorAll(".prt-detail-support .prt-box-flexible");
const SUPPORT_ABILITY_COUNT = support_ability_flexboxes.length;
const [SUPPORT_ABILITY1_NAME, SUPPORT_ABILITY1_DESC] = name_comment_m_info(support_ability_flexboxes[0])
const [SUPPORT_ABILITY2_NAME, SUPPORT_ABILITY2_DESC] = name_comment_m_info(support_ability_flexboxes[1])

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
    }
  })();
  const COOLDOWN = ability?.querySelector(".txt-recast")?.textContent.match(/\d+/)?.[0];
  const OBTAIN = ability?.querySelector(".prt-condition")?.textContent.match(/\d+/)?.[0];

  return [NAME, DESC, ID, COLOR, COOLDOWN, OBTAIN];
};

const ability_flexboxes = document.querySelectorAll(".prt-detail-action .prt-box-flexible");
const ABILITY_COUNT = ability_flexboxes.length;
const [ABILITY1_NAME, ABILITY1_DESC, ABILITY1_ID, ABILITY1_COLOR, ABILITY1_COOLDOWN] = ability_info(ability_flexboxes[0]);
const [ABILITY2_NAME, ABILITY2_DESC, ABILITY2_ID, ABILITY2_COLOR, ABILITY2_COOLDOWN] = ability_info(ability_flexboxes[1]);
const [ABILITY3_NAME, ABILITY3_DESC, ABILITY3_ID, ABILITY3_COLOR, ABILITY3_COOLDOWN, ABILITY3_OBTAIN] = ability_info(ability_flexboxes[2]);
const [ABILITY4_NAME, ABILITY4_DESC, ABILITY4_ID, ABILITY4_COLOR, ABILITY4_COOLDOWN, ABILITY4_OBTAIN] = ability_info(ability_flexboxes[3]);

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
|ougi_name=${OUGI1_NAME}
|ougi_desc=${OUGI1_DESC}
|ougi2_name=${OUGI2_NAME}
|ougi2_desc=${OUGI2_DESC}
|ougi3_name=${OUGI3_NAME}
|ougi3_desc=${OUGI3_DESC}
|ougi4_name=${OUGI4_NAME}
|ougi4_desc=${OUGI4_DESC}
|abilitysubtitle=
|abilitycount=${ABILITY_COUNT}
|a1_icon=${ABILITY1_ID}
|a1_color=${ABILITY1_COLOR}
|a1_name=${ABILITY1_NAME}
|a1_cd={{InfoCd|num=0|cooldown=${ABILITY1_COOLDOWN}|cooldown1=|level1=55}}
|a1_dur={{InfoDur|type=t|duration=}}
|a1_oblevel={{InfoOb|obtained=1|enhanced=55}}
|a1_effdesc={{InfoDes|num=0|des=${ABILITY1_DESC}}}
|a2_icon=${ABILITY2_ID}
|a2_color=${ABILITY2_COLOR}
|a2_name=${ABILITY2_NAME}
|a2_cd={{InfoCd|num=0|cooldown=${ABILITY2_COOLDOWN}|cooldown1=|level1=75}}
|a2_dur={{InfoDur|type=t|duration=}}
|a2_oblevel={{InfoOb|obtained=1|enhanced=75}}
|a2_effdesc={{InfoDes|num=0|des=${ABILITY2_DESC}}}
|a3_icon=${ABILITY3_ID}
|a3_color=${ABILITY3_COLOR}
|a3_name=${ABILITY3_NAME}
|a3_cd={{InfoCd|num=0|cooldown=${ABILITY3_COOLDOWN}}}
|a3_dur={{InfoDur|type=t|duration=}}
|a3_oblevel={{InfoOb|obtained=${ABILITY3_OBTAIN}}}
|a3_effdesc={{InfoDes|num=0|des=${ABILITY3_DESC}}}
|a4_icon=${ABILITY4_ID}
|a4_color=${ABILITY4_COLOR}
|a4_name=${ABILITY4_NAME}
|a4_cd={{InfoCd|num=0|cooldown=${ABILITY4_COOLDOWN}}}
|a4_dur={{InfoDur|type=t|duration=}}
|a4_oblevel={{InfoOb|obtained=${ABILITY4_OBTAIN}}}
|a4_effdesc={{InfoDes|num=0|des=${ABILITY4_DESC}}}
|s_abilitycount=${SUPPORT_ABILITY_COUNT}
|sa_name=${SUPPORT_ABILITY1_NAME}
|sa_level={{InfoOb|obtained=1}}
|sa_desc=${SUPPORT_ABILITY1_DESC}
|sa2_name=${SUPPORT_ABILITY2_NAME}
|sa2_level={{InfoOb|obtained=1}}
|sa2_desc=${SUPPORT_ABILITY2_DESC}
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
