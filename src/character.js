const ID = document.querySelector('.btn-char-zoom[data-image-id]').getAttribute("data-image-id").replace("_01", "");
const NAME = document.querySelector(".prt-chara-info > div:first-child").textContent;

const RARITY = (() => {
  if (document.querySelector(".prt-rarity-4")) return "ssr";
  if (document.querySelector(".prt-rarity-3")) return "sr";
  if (document.querySelector(".prt-rarity-2")) return "r";
  return "?";
})();

const ELEMENT = (() => {
  if (document.querySelector(".ico-type1")) return "fire";
  if (document.querySelector(".ico-type2")) return "water";
  if (document.querySelector(".ico-type3")) return "earth";
  if (document.querySelector(".ico-type4")) return "wind";
  if (document.querySelector(".ico-type5")) return "light";
  if (document.querySelector(".ico-type6")) return "dark";
  return "?";
})();

const TYPE = (() => {
  if (document.querySelector(".ico-chara-type-short1")) return "balanced";
  if (document.querySelector(".ico-chara-type-short2")) return "attack";
  if (document.querySelector(".ico-chara-type-short3")) return "defense";
  if (document.querySelector(".ico-chara-type-short4")) return "heal";
  if (document.querySelector(".ico-chara-type-short5")) return "special";
  return "?";
})();

const RACE = (() => {
  if (document.querySelector(".ico-mini-race1")) return "human";
  if (document.querySelector(".ico-mini-race2")) return "erune";
  if (document.querySelector(".ico-mini-race3")) return "draph";
  if (document.querySelector(".ico-mini-race4")) return "harvin";
  if (document.querySelector(".ico-mini-race5")) return "other";
  if (document.querySelector(".ico-mini-race6")) return "primal";
  return "?";
})();

const VOICE_ACTOR = document.querySelector(".txt-acter-name").innerText.split("\n").join(", ");

const JOIN_WEAPON = document.querySelector(".txt-weapon-name").textContent;

const PROFICIENCY = (() => {
  const list = [];
  if (document.querySelector(".ico-weapon-1")) list.push("sabre");
  if (document.querySelector(".ico-weapon-2")) list.push("dagger");
  if (document.querySelector(".ico-weapon-3")) list.push("spear");
  if (document.querySelector(".ico-weapon-4")) list.push("axe");
  if (document.querySelector(".ico-weapon-5")) list.push("staff");
  if (document.querySelector(".ico-weapon-6")) list.push("gun");
  if (document.querySelector(".ico-weapon-7")) list.push("melee");
  if (document.querySelector(".ico-weapon-8")) list.push("bow");
  if (document.querySelector(".ico-weapon-9")) list.push("harp");
  if (document.querySelector(".ico-weapon-0")) list.push("katana");
  return list.join(",");
})();

const MAX_HP = document.querySelector(".txt-hp-value").textContent;
const MAX_ATK = document.querySelector(".txt-atk-value").textContent;

const OUGI_COUNT = document.querySelectorAll(".prt-detail-special .prt-box").length;
const OUGI_ONE_NAME = (() => {
  if (OUGI_COUNT < 1) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(2) > .name").textContent;
})();
const OUGI_ONE_DESC = (() => {
  if (OUGI_COUNT < 1) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(2) > .comment").textContent;
})();
const OUGI_TWO_NAME = (() => {
  if (OUGI_COUNT < 2) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(3) > .name").textContent;
})();
const OUGI_TWO_DESC = (() => {
  if (OUGI_COUNT < 2) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(3) > .comment").textContent;
})();
const OUGI_THREE_NAME = (() => {
  if (OUGI_COUNT < 3) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(4) > .name").textContent;
})();
const OUGI_THREE_DESC = (() => {
  if (OUGI_COUNT < 3) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(4) > .comment").textContent;
})();
const OUGI_FOUR_NAME = (() => {
  if (OUGI_COUNT < 4) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(5) > .name").textContent;
})();
const OUGI_FOUR_DESC = (() => {
  if (OUGI_COUNT < 4) return "";
  return document.querySelector(".prt-detail-special > .prt-box:nth-child(5) > .comment").textContent;
})();

const ABILITY_COUNT = document.querySelectorAll(".prt-detail-action .prt-box").length;
const ABILITY_ONE_NAME = (() => {
  if (ABILITY_COUNT < 1) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(2) > .name").textContent;
})();
const ABILITY_ONE_DESC = (() => {
  if (ABILITY_COUNT < 1) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(2) > .comment").textContent;
})();
const ABILITY_ONE_COOLDOWN = (() => {
  if (ABILITY_COUNT < 1) return "";
  const text = document.querySelector(".prt-detail-action > .prt-box:nth-child(2) .txt-recast").textContent;
  const match = text.match(/\d+/);
  const result = (match) ? match[0] : "";
  return parseInt(result, 10);
})();

const ABILITY_TWO_NAME = (() => {
  if (ABILITY_COUNT < 2) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(3) > .name").textContent;
})();
const ABILITY_TWO_DESC = (() => {
  if (ABILITY_COUNT < 2) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(3) > .comment").textContent;
})();
const ABILITY_TWO_COOLDOWN = (() => {
  if (ABILITY_COUNT < 2) return "";
  const text = document.querySelector(".prt-detail-action > .prt-box:nth-child(3) .txt-recast").textContent;
  const match = text.match(/\d+/);
  const result = (match) ? match[0] : "";
  return parseInt(result, 10);
})();

const ABILITY_THREE_NAME = (() => {
  if (ABILITY_COUNT < 3) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(4) > .name").textContent;
})();
const ABILITY_THREE_DESC = (() => {
  if (ABILITY_COUNT < 3) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(4) > .comment").textContent;
})();
const ABILITY_THREE_OBTAIN = (() => {
  if (ABILITY_COUNT < 3) return "";
  const text = document.querySelector(".prt-detail-action > .prt-box:nth-child(4) .prt-condition").textContent;
  const match = text.match(/\d+/);
  const result = (match) ? match[0] : "";
  return parseInt(result, 10);
})();

const ABILITY_FOUR_NAME = (() => {
  if (ABILITY_COUNT < 4) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(5) > .name").textContent;
})();
const ABILITY_FOUR_DESC = (() => {
  if (ABILITY_COUNT < 4) return "";
  return document.querySelector(".prt-detail-action > .prt-box:nth-child(5) > .comment").textContent;
})();
const ABILITY_FOUR_OBTAIN = (() => {
  if (ABILITY_COUNT < 4) return "";
  const text = document.querySelector(".prt-detail-action > .prt-box:nth-child(5) .prt-condition").textContent;
  const match = text.match(/\d+/);
  const result = (match) ? match[0] : "";
  return parseInt(result, 10);
})();

const SUPPORT_ABILITY_COUNT = document.querySelectorAll(".prt-detail-support .prt-box").length;
const SUPPORT_ABILITY_ONE_NAME = (() => {
  if (SUPPORT_ABILITY_COUNT < 1) return "";
  return document.querySelector(".prt-detail-support > .prt-box:nth-child(2) > .name").textContent;
})();
const SUPPORT_ABILITY_ONE_DESC = (() => {
  if (SUPPORT_ABILITY_COUNT < 1) return "";
  return document.querySelector(".prt-detail-support > .prt-box:nth-child(2) > .comment").textContent;
})();
const SUPPORT_ABILITY_TWO_NAME = (() => {
  if (SUPPORT_ABILITY_COUNT < 2) return "";
  return document.querySelector(".prt-detail-support > .prt-box:nth-child(3) > .name").textContent;
})();
const SUPPORT_ABILITY_TWO_DESC = (() => {
  if (SUPPORT_ABILITY_COUNT < 2) return "";
  return document.querySelector(".prt-detail-support > .prt-box:nth-child(3) > .comment").textContent;
})();

const result = `
{{CharacterTabs|base={{BASENAME}}}}
{{Character
|id= ${ID}
|charid=
|jpname=
|jptitle=
|jpva=
|name= ${NAME}
|release_date= ?
|link_gamewith=
|link_jpwiki=
|link_kamigame=
|gender= ?
|obtain= ?
|title=
|title_source=
|5star= ?
|5star_date=
|base_evo= ?
|max_evo= ?
|uncap_type=
|blush_value=
|art1= {{PAGENAME}} A.png
|art2= {{PAGENAME}} B.png
|art3=
|art_story1=
|sprite1= {{PAGENAME}} SDA.png
|sprite2= {{PAGENAME}} SDB.png
|sprite3=
|rarity= ${RARITY}
|element= ${ELEMENT}
|type= ${TYPE}
|race= ${RACE}
|va= ${VOICE_ACTOR}
|join=
|join_weapon= ${JOIN_WEAPON}
|weapon= ${PROFICIENCY}
|min_atk=
|max_atk= ${MAX_ATK}
|flb_atk=
|bonus_atk=
|min_hp=
|max_hp= ${MAX_HP}
|flb_hp=
|bonus_hp=
|ougi_count= ${OUGI_COUNT}
|ougi_name= ${OUGI_ONE_NAME}
|ougi_desc= ${OUGI_ONE_DESC}
|ougi2_name= ${OUGI_TWO_NAME}
|ougi2_desc= ${OUGI_TWO_DESC}
|ougi3_name= ${OUGI_THREE_NAME}
|ougi3_desc= ${OUGI_THREE_DESC}
|ougi4_name= ${OUGI_FOUR_NAME}
|ougi4_desc= ${OUGI_FOUR_DESC}
|abilitysubtitle=
|abilitycount= ${ABILITY_COUNT}
|a1_icon= Ability ${ABILITY_ONE_NAME}.png
|a1_name= ${ABILITY_ONE_NAME}
|a1_cd= {{InfoCd|num=1|cooldown=${ABILITY_ONE_COOLDOWN}|cooldown1=?|level1=55}}
|a1_dur= {{InfoDur|type=t|duration=?}}
|a1_oblevel= {{InfoOb|obtained=1|enhanced=55}}
|a1_effdesc= {{InfoDes|num=0|des=${ABILITY_ONE_DESC}}}
|a2_icon= Ability ${ABILITY_TWO_NAME}.png
|a2_name= ${ABILITY_TWO_NAME}
|a2_cd= {{InfoCd|num=1|cooldown=${ABILITY_TWO_COOLDOWN}|cooldown1=?|level1=75}}
|a2_dur= {{InfoDur|type=t|duration=?}}
|a2_oblevel= {{InfoOb|obtained=1|enhanced=75}}
|a2_effdesc= {{InfoDes|num=0|des=${ABILITY_TWO_DESC}}}
|a3_icon= Ability ${ABILITY_THREE_NAME}.png
|a3_name= ${ABILITY_THREE_NAME}
|a3_cd= {{InfoCd|num=0|cooldown=?}}
|a3_dur= {{InfoDur|type=t|duration=?}}
|a3_oblevel= {{InfoOb|obtained=${ABILITY_THREE_OBTAIN}}}
|a3_effdesc= {{InfoDes|num=0|des=${ABILITY_THREE_DESC}}}
|a4_icon= Ability ${ABILITY_FOUR_NAME}.png
|a4_name= ${ABILITY_FOUR_NAME}
|a4_cd= {{InfoCd|num=0|cooldown=?}}
|a4_dur= {{InfoDur|type=t|duration=?}}
|a4_oblevel= {{InfoOb|obtained=${ABILITY_FOUR_OBTAIN}}}
|a4_effdesc= {{InfoDes|num=0|des=${ABILITY_FOUR_DESC}}}
|s_abilitycount= ${SUPPORT_ABILITY_COUNT}
|sa_name= ${SUPPORT_ABILITY_ONE_NAME}
|sa_level= {{InfoOb|obtained=1}}
|sa_desc= ${SUPPORT_ABILITY_ONE_DESC}
|sa2_name= ${SUPPORT_ABILITY_TWO_NAME}
|sa2_level= {{InfoOb|obtained=1}}
|sa2_desc= ${SUPPORT_ABILITY_TWO_DESC}
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
