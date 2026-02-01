// Check page correctness
if (!location.hash.match("#archive/detail_story_npc")) {
  const answer = confirm("You don't seem to be in #archive/detail_story_npc page. Run anyway?");
  if (answer === false) return;
}

const ID = document.querySelector('.btn-char-zoom[data-image-id]').getAttribute("data-image-id").replace("_01", "");
const NAME = document.querySelector(".prt-scroll-title").textContent;
const VOICE_ACTOR = document.querySelector(".txt-acter-name")?.innerText.split("\n").join(", ");

const PROFILE = document.querySelector(".prt-flavor")?.textContent;
const RACE = Game?.view?.detail_model?.attributes?.tribe_name.replace(" Type", "");
const result = nonEmpty`{{Non-party Character
|obtain=
|series=
|name=${NAME}
|art={{PAGENAME}}.png
|gender=
|profile=${PROFILE}
|race=${RACE}
|va=${VOICE_ACTOR}
|join=
|id=${ID}
|charid=
|jpname=
|jptitle=
|jpva=
|release_date=
}}
`;

copyToClipboard(result);
