const nickname = "turtle";
const url = document.URL;
const match = url.match(/scene_s(\d+)_([a-z]+)/);
if (match == null) return;
const scene_number = match?.[1];
const scene_type = (() => {
    switch (match?.[2]) {
        case "newyear": return "newyear";
        case "valentine": return "valentine";
        case "white": return "whiteday";
        case "halloween": return "halloween";
        case "christmas": return "xmas";
        case "birthday": return "birthday";
        default: return "???";
    }
})();

const scenario_steps = Game.view.eventSceneView.scenarioCollection.models;
const scene_list = [];
for (const step of scenario_steps) {
    const attr = step.attributes;
    scene_list.push({
        character: attr.charcter1_name.replaceAll(nickname, "(Captain)"),
        detail: attr.detail,
        sel_txt: [attr.sel1_txt, attr.sel2_txt, attr.sel3_txt ?? '', attr.sel4_txt ?? '' ],
        sel_next: [attr.sel_next1, attr.sel_next2, attr.sel_next3 ?? '', attr.sel_next4 ?? '' ],
        next: attr.next,
        branch: 0,
    });
}

const multiple_characters = (() => {
    let first_character = '';
    for (const scene of scene_list) {
        if (scene.character == 'null' || scene.character == '')
            continue;
        if (first_character == '')
            first_character = scene.character;
        else if (first_character != scene.character)
            return true;
    }
    return false;
})();

for (const scene of scene_list) {
    if (scene.sel_txt[0] == '' || scene.sel_txt[1] == '')
        continue;
    // Buggy scene (Catura birthday 2)
    if (scene.sel_next[0] == '') {
        continue;
    }
    // Non branching scene (Novei, taking massive shortcuts)
    if (scene.sel_next[0] == scene.sel_next[1]) {
        scene.branch = 1;
        continue;
    }

    scene.branch = 2;

    let n = 0;
    let end = ''
    do {
        end = Number(scene.sel_next[n + 1]) - 1;
        scene_list[end].sel_txt[0] = scene.sel_txt[n + 1];
        scene_list[end].sel_next[0] = "monii";
        scene_list[end].branch = 3; // non last branch end
        ++n;
    } while (n < 3 && scene.sel_next[n + 1] != '')

    end = Number(scene_list[end].next) - 1;
    scene_list[end].branch = 4; // Last branch end
}

const bold_tag = "'''";
const italic_tag = "''";

let in_multi_line_branch = false;
let current_character = '';
let result = '|' + scene_type + '_link' + scene_number + '=' + url + '\n' + '|' + scene_type + '_text' + scene_number + '=';
for (let n = 0; n < scene_list.length; ++n) {
    const scene = scene_list[n];

    if (multiple_characters && scene.character != '' && current_character != scene.character) {
        if (scene.character != 'null' || scene.detail != '')
            current_character = scene.character;
        if (scene.character != 'null')
            result += bold_tag + current_character + ':' + bold_tag + " ";
    }

    if (scene.branch == 2)
        in_multi_line_branch = true;
    if (scene.branch == 4)
        in_multi_line_branch = false;

    if (scene.detail != '') {
        let detail = scene.detail
            .replaceAll(nickname, "(Captain)")
            .replaceAll("<span class='scene-font-italic'>", italic_tag)
            .replaceAll("</span>", italic_tag)
            .replaceAll("<br>", "<br />")
            .trim();
        if (scene.character == "null")
            result += italic_tag + detail + italic_tag;
        else
            result += detail;
        if (scene.branch <= 2 && n != scene_list.length - 1)
            result += "<br />"
        if (!in_multi_line_branch)
            result += "\n";
    }

    if (scene.branch == 1) {
        if (scene.sel_txt[0] != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel_txt[0] + italic_tag + bold_tag + "<br />\n";
        if (scene.sel_txt[1] != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel_txt[1] + italic_tag + bold_tag + "<br />\n";
        if (scene.sel_txt[2] != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel_txt[2] + italic_tag + bold_tag + "<br />\n";
        if (scene.sel_txt[3] != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel_txt[3] + italic_tag + bold_tag + "<br />\n";
        continue;
    }

    // Check next to see if choice will actually pop up
    if (scene.sel_txt[0] != '' && scene.sel_next[0] != '') {
        if (in_multi_line_branch)
            result += "\n*";
        result += bold_tag + "Choose: " + italic_tag + scene.sel_txt[0] + italic_tag + bold_tag + "<br />";
        if (!in_multi_line_branch)
            result += "\n";
        current_character = '';
    }
}

copyToClipboard(result);
