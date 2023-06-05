// Check page correctness
if (!location.hash.match("#gacha/summon")) {
  const answer = confirm("You don't seem to be in #gacha/summon page. Run anyway?");
  if (answer === false) return;
}

const ID = document.querySelector('.prt-summon-image > .img-summon').getAttribute("src").match(/\/b\/(.+?)\./)[1];

const NAME = (() => {
  const largeBanner = document.querySelector(".txt-item-name")?.textContent;
  const smallBanner = document.querySelector(".prt-summon-info > div:first-child")?.textContent;
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

const VOICE_ACTOR = document.querySelector(".txt-acter-name")?.innerText.split("\n").join(", ");

const MIN_HP = document.querySelector(".prt-min-hp .txt-hp-value").textContent;
const MAX_HP = document.querySelector(".prt-max-hp .txt-hp-value").textContent;
const MIN_ATK = document.querySelector(".prt-min-atk .txt-atk-value").textContent;
const MAX_ATK = document.querySelector(".prt-max-atk .txt-atk-value").textContent;

const call_info = document.querySelector("#prt-detail-summon-special-skill");
const CALL_NAME = call_info?.querySelector(".name")?.textContent;
const CALL_DESC = call_info?.querySelector(".comment")?.textContent;
const CALL_COOLDOWN = call_info?.querySelector(".txt-recast")?.textContent.match(/\d+/)?.[0];
const CALL_COOLDOWN_FIRST = call_info?.querySelector(".txt-start-recast")?.textContent.match(/\d+/)?.[0];

const AURA_NAME = document.querySelector(".prt-detail-protection .name")?.textContent;
const MAIN_AURA_DESC = document.querySelector(".prt-detail-protection .prt-aura-description")?.textContent.trim();
const SUB_AURA_DESC = document.querySelector(".prt-detail-protection .prt-aura-description ~ .prt-aura-description")?.textContent.trim();

const FLAVOR = document.querySelector(".prt-flavor").textContent.trim();

const result = nonEmpty`{{Summon
|id=${ID}
|summonid=
|element=${ELEMENT}
|rarity=${RARITY}
|homescreen=
|series=
|name=${NAME}
|jpname=
|link_jpwiki=
|link_gamewith=
|link_kamigame=
|va=${VOICE_ACTOR}
|vajp=
|base_evo=3
|max_evo=3
|image={{PAGENAME}}
|hp1=${MIN_HP}
|hp2=${MAX_HP}
|hp3=
|atk1=${MIN_ATK}
|atk2=${MAX_ATK}
|atk3=
|release_date=
|4star_date=
|4star_unlock=
|obtain=
|join=
|aura_name=${AURA_NAME}
|aura1=${MAIN_AURA_DESC}
|aura2=
|aura3=
|subaura1=${SUB_AURA_DESC}
|subaura2=
|call_name=${CALL_NAME}
|call_cd_first=${CALL_COOLDOWN_FIRST}
|call_cd_first_mlb=
|call_cd_first_flb=
|call_cd=${CALL_COOLDOWN}
|call_cd_mlb=
|call_cd_flb=
|call_reuse=
|comboable=
|combo1=
|combo2=
|call_base=${CALL_DESC}
|call_mlb=
|call_flb=
|flb1=
|flb2=
|flb3=
|flb4=
|flb5=
|flb6=
|flb7=
|flb8=
|rupies=
|flavor=${FLAVOR}
|reduce=
|reduce_advice=
}}

==Gameplay Notes==

==References==

`;

copyToClipboard(result);
