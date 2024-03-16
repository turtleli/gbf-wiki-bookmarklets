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
        character: attr.charcter1_name,
        detail: attr.detail,
        sel1_txt: attr.sel1_txt,
        sel2_txt: attr.sel2_txt,
        sel3_txt: attr.sel3_txt ?? '' ,
        sel4_txt: attr.sel4_txt ?? '' ,
        sel1_next: attr.sel_next1,
        sel2_next: attr.sel_next2,
        sel3_next: attr.sel_next3 ?? '' ,
        sel4_next: attr.sel_next4 ?? '' ,
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
    if (scene.sel1_txt == '' || scene.sel2_txt == '')
        continue;
    // Buggy scene (Catura birthday 2)
    if (scene.sel1_next == '') {
        continue;
    }
    // Non branching scene (Novei, taking massive shortcuts)
    if (scene.sel1_next == scene.sel2_next) {
        scene.branch = 1;
        continue;
    }

    scene.branch = 2;
    const sel1_end = Number(scene.sel2_next) - 1;
    scene_list[sel1_end].sel1_txt = scene.sel2_txt;
    scene_list[sel1_end].sel1_next = "monii";
    scene_list[sel1_end].branch = 3; // first branch end
    const sel2_end = Number(scene_list[sel1_end].next) - 1;
    scene_list[sel2_end].branch = 4; // second branch end
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
    if (scene.branch == 3)
        current_character = '';
    if (scene.branch == 4)
        in_multi_line_branch = false;

    if (scene.detail != '') {
        let detail = scene.detail
            .replaceAll("turtle", "(Captain)")
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
        if (scene.sel1_txt != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel1_txt + italic_tag + bold_tag + "<br />\n";
        if (scene.sel2_txt != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel2_txt + italic_tag + bold_tag + "<br />\n";
        if (scene.sel3_txt != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel3_txt + italic_tag + bold_tag + "<br />\n";
        if (scene.sel4_txt != '')
            result += "*" + bold_tag + "Choose: " + italic_tag + scene.sel4_txt + italic_tag + bold_tag + "<br />\n";
        continue;
    }

    // Check next to see if choice will actually pop up
    if (scene.sel1_txt != '' && scene.sel1_next != '') {
        if (in_multi_line_branch)
            result += "\n*";
        result += bold_tag + "Choose: " + italic_tag + scene.sel1_txt + italic_tag + bold_tag + "<br />";
        if (!in_multi_line_branch)
            result += "\n";
    }
}

copyToClipboard(result);
