const ability_flexboxes = document.querySelectorAll(".prt-ability-list .prt-box-flexible");

const ability_info = ability => {
  const NAME = ability?.querySelector(".name")?.textContent;
  const DESC = ability?.querySelector(".comment")?.textContent;
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
  const COOLDOWN = (() => {
    const cooldown = ability?.querySelector(".txt-recast")?.textContent.match(/\d+/)?.[0];
    const ready = ability?.querySelector(".start-recast")?.textContent.match(/\d+/)?.[0];
    return ready? nonEmpty`{{ReadyIn|${ready}|${cooldown}}}`: (cooldown? cooldown + 'T': '-');
  })();

  return [NAME, DESC, ID, COLOR, COOLDOWN];
};
const [ABILITY1_NAME, ABILITY1_DESC, ABILITY1_ID, ABILITY1_COLOR, ABILITY1_COOLDOWN] = ability_info(ability_flexboxes[0]);
const [ABILITY2_NAME, ABILITY2_DESC, ABILITY2_ID, ABILITY2_COLOR, ABILITY2_COOLDOWN] = ability_info(ability_flexboxes[1]);
const [ABILITY3_NAME, ABILITY3_DESC, ABILITY3_ID, ABILITY3_COLOR, ABILITY3_COOLDOWN] = ability_info(ability_flexboxes[2]);

const result = nonEmpty`
|umex1_icon=${ABILITY1_ID}
|umex1_color=${ABILITY1_COLOR}
|umex1_name=${ABILITY1_NAME}
|umex1_desc=${ABILITY1_DESC}
|umex1_cd=${ABILITY1_COOLDOWN}
|umex1_dur=
|umex1_cost={{ItmLst|Ultimacy's Dawn,1|PLACEHOLDER Distinction,30}}
|umex1_notes=
|umex2_icon=${ABILITY2_ID}
|umex2_color=${ABILITY2_COLOR}
|umex2_name=${ABILITY2_NAME}
|umex2_desc=${ABILITY2_DESC}
|umex2_cd=${ABILITY2_COOLDOWN}
|umex2_dur=
|umex2_cost={{ItmLst|Ultimacy's Star,1|PLACEHOLDER Distinction,30}}
|umex2_notes=
|umex3_icon=${ABILITY3_ID}
|umex3_color=${ABILITY3_COLOR}
|umex3_name=${ABILITY3_NAME}
|umex3_desc=${ABILITY3_DESC}
|umex3_cd=${ABILITY3_COOLDOWN}
|umex3_dur=
|umex3_cost={{ItmLst|Ultimacy's Dewdrop,1|PLACEHOLDER Distinction,30}}
|umex3_notes=
`;

copyToClipboard(result);
