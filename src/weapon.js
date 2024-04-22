// Check page correctness
if (!location.hash.match("#gacha/weapon")) {
  const answer = confirm("You don't seem to be in #gacha/weapon page. Run anyway?");
  if (answer === false) return;
}

const ID = document.querySelector('.prt-weapon-image > .img-weapon').getAttribute("src").match(/\/g\/(.+?)\./)[1];

const NAME = (() => {
  const largeBanner = document.querySelector(".txt-item-name")?.textContent;
  const smallBanner = document.querySelector(".prt-weapon-info > div:first-child")?.textContent;
  return (largeBanner) ? largeBanner : smallBanner;
})();

const RARITY = (() => {
  if (document.querySelector(".prt-rarity-4")) return "ssr";
  if (document.querySelector(".prt-rarity-3")) return "sr";
  if (document.querySelector(".prt-rarity-2")) return "r";
  if (document.querySelector(".prt-rarity-4-large")) return "ssr";
  if (document.querySelector(".prt-rarity-3-large")) return "sr";
  if (document.querySelector(".prt-rarity-2-large")) return "r";
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
  if (document.querySelector(".ico-weapon-1")) return "sabre";
  if (document.querySelector(".ico-weapon-2")) return "dagger";
  if (document.querySelector(".ico-weapon-3")) return "spear";
  if (document.querySelector(".ico-weapon-4")) return "axe";
  if (document.querySelector(".ico-weapon-5")) return "staff";
  if (document.querySelector(".ico-weapon-6")) return "gun";
  if (document.querySelector(".ico-weapon-7")) return "melee";
  if (document.querySelector(".ico-weapon-8")) return "bow";
  if (document.querySelector(".ico-weapon-9")) return "harp";
  if (document.querySelector(".ico-weapon-10")) return "katana";
  return "?";
})();

const MIN_HP = document.querySelector(".prt-min-hp .txt-hp-value").textContent;
const MAX_HP = document.querySelector(".prt-max-hp .txt-hp-value").textContent;
const MIN_ATK = document.querySelector(".prt-min-atk .txt-atk-value").textContent;
const MAX_ATK = document.querySelector(".prt-max-atk .txt-atk-value").textContent;

const OUGI_NAME = document.querySelector(".prt-detail-special .name-m").textContent;
const OUGI_DESC = document.querySelector(".prt-detail-special .comment-m").textContent;

const skill_flexboxes = document.querySelectorAll(".prt-detail-skill .prt-box-flexible");
const skill_info = skill => {
  const NAME = skill?.querySelector(".name-m")?.textContent;
  const ICON = skill?.querySelector(".ico-skill-status")?.getAttribute("src")?.replace(/.*\//, "ws_");
  const DESC = skill?.querySelector(".comment-m")?.textContent;
  const LEVELREQ = skill?.querySelector(".txt-condition-level")?.textContent.match(/\d+$/)?.[0];
  return [NAME, ICON, DESC, LEVELREQ];
};
const [SKILL1_NAME, SKILL1_ICON, SKILL1_DESC, SKILL1_LEVELREQ] = skill_info(skill_flexboxes[0]);
const [SKILL2_NAME, SKILL2_ICON, SKILL2_DESC, SKILL2_LEVELREQ] = skill_info(skill_flexboxes[1]);
const [SKILL3_NAME, SKILL3_ICON, SKILL3_DESC, SKILL3_LEVELREQ] = skill_info(skill_flexboxes[2]);

const FLAVOR = document.querySelector(".prt-flavor").textContent.trim();

const WEAPON_OPTION = (() => {
  switch (TYPE) {
    case "sabre":
    case "katana":
      return `
|sm_s1_desc=
|sm_s1_dur=
|sm_s2_desc=
|sm_s2_cd=
|sm_s2_dur=
|sm_s2_cost=
|sm_atk_desc=
|sm_atk_dur=
|sm_def_desc=
|sm_def_dur=
|sm_def_cost=`;
    case "gun":
      return `
|bullets=
|bullet1=
|bullet2=
|bullet3=
|bullet4=
|bullet5=
|bullet6=`;
    default:
      return '';
  }
})();

const result = nonEmpty`{{Weapon
|id=${ID}
|series=
|group=
|name=${NAME}
|jpname=
|element=${ELEMENT}
|weapon=${TYPE}
|rarity=${RARITY}
|release_date=
|4star_date=
|5star_date=
|link_jpwiki=
|link_gamewith=
|link_kamigame=
|evo_min=0
|evo_base=3
|evo_max=3
|evo_red=
|image=
|gran=
|djeeta=
|hp1=${MIN_HP}
|hp2=${MAX_HP}
|hp3=
|atk1=${MIN_ATK}
|atk2=${MAX_ATK}
|atk3=
|character=
|obtain=
|obtain_text=
|ougi_name=${OUGI_NAME}
|enougi=${OUGI_DESC}
|enougi_4s=
|ougi=${OUGI_DESC}
|ougi_4s=
|s1_name=${SKILL1_NAME}
|s1_icon=${SKILL1_ICON}
|s1_desc=${SKILL1_DESC}
|s1_lvl=${SKILL1_LEVELREQ}
|s1_4s_name=
|s1_4s_icon=
|s1_4s_lvl=
|ens1_4s_desc=
|s1_4s_desc=
|s2_name=${SKILL2_NAME}
|s2_icon=${SKILL2_ICON}
|s2_desc=${SKILL2_DESC}
|s2_lvl=${SKILL2_LEVELREQ}
|s2_4s_name=
|s2_4s_icon=
|s2_4s_lvl=
|ens2_4s_desc=
|s2_4s_desc=
|s3_name=${SKILL3_NAME}
|s3_icon=${SKILL3_ICON}
|s3_desc=${SKILL3_DESC}
|s3_lvl=${SKILL3_LEVELREQ}
|s3_4s_name=
|s3_4s_icon=
|s3_4s_lvl=
|ens3_4s_desc=
|s3_4s_desc=${WEAPON_OPTION}
|reduce_advice=
|reduce=
|flavor=${FLAVOR}
}}
`;

copyToClipboard(result);
