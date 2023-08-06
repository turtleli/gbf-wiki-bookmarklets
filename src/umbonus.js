const bonus_list = document.querySelectorAll(".lis-bonus-list .txt-bonus");

const bonus_info = bonus => {
  const match =  bonus.textContent.match(/(.*) (\+.*)/);
  return [match?.[1], match?.[2]];
};
const [BONUS1_NAME, BONUS1_SIZE] = bonus_info(bonus_list[0]);
const [BONUS2_NAME, BONUS2_SIZE] = bonus_info(bonus_list[1]);
const [BONUS3_NAME, BONUS3_SIZE] = bonus_info(bonus_list[2]);
const [BONUS4_NAME, BONUS4_SIZE] = bonus_info(bonus_list[3]);
const [BONUS5_NAME, BONUS5_SIZE] = bonus_info(bonus_list[4]);
const [BONUS6_NAME, BONUS6_SIZE] = bonus_info(bonus_list[5]);

const result = nonEmpty`
|umlvl1_bonus={{ClassBonus|${BONUS1_NAME}|${BONUS1_SIZE}}}
|umlvl2_bonus={{ClassBonus|${BONUS2_NAME}|${BONUS2_SIZE}}}
|umlvl3_bonus={{ClassBonus|${BONUS3_NAME}|${BONUS3_SIZE}}}
|umlvl4_bonus={{ClassBonus|${BONUS4_NAME}|${BONUS4_SIZE}}}
|umlvl5_bonus={{ClassBonus|${BONUS5_NAME}|${BONUS5_SIZE}}}
|umlvl6_bonus={{ClassBonus|${BONUS6_NAME}|${BONUS6_SIZE}}}
|umlvltotal_bonus=
`;

copyToClipboard(result);
