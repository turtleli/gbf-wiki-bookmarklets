const npc1_master=Game.view.deck_model.attributes.deck.npc[1].master;
const result = `|base_da=${npc1_master.da_odds}\n|base_ta=${npc1_master.ta_odds}`;
copyToClipboard(result);