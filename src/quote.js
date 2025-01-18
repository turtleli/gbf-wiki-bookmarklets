const username = 'turtle';
const japanese = Game.lang == 'ja';
const language = japanese? '_jp': '_en';
const username_replacement = japanese? '(主人公)': '(Captain)';
const br_replacement = japanese? '': ' ';
const party_list = Game.view.contentModel.attributes.option.party_list;
const list = []
for (const party of party_list) {
    for (const member of party.member_list) {
        const name = member.master.name;
        let i = 1;
        const quote_list = [];
        for (const quote of member.param.serif) {
            quote_list.push('|quote' + i + language + '=' + quote.replaceAll(username, username_replacement).replaceAll('<br>', br_replacement));
            i++;
        }
        list.push(name + ':\n' + quote_list.join('\n') + '\n');
    }
}
const result = list.join('\n');

copyToClipboard(result);
