let stats = {
    "life": 250,
    "strength": 10,
    "endurance": 10,
    "deffense": 10,
    "experience": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Pánikolsz mert hamarosan sötétedik és élelmet kell találnod", "profile_lvl0.gif"],
    ["Kajakómába estél és felélted az üsszes ételt. <br> Mehetsz újra kaját keresni hogy ne éhezz!","profile_lvl1.gif"],
    ["Ma este nagy kanállal eszünk! Rengeteg az élelmed.","profile_lvl2.gif"],
    ["Végigvitted a játékot! Gratulálok! Legyen tánc! <br> Csak viccelek, ezt lehetetlen.", "profile_lvl3.gif"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}

/* ADVENTURE */

let story =  document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function favagas(){
    let szazalek = rnd_szazalek();
    if(szazalek <= 50){

        harc("Mosómedve", 50, 10);
        

        refreshProfileStats();
    } else{
        
        story.innerHTML += "Élelmet találtál! (+1 étel)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function harc(e_name, e_life, e_damage){
    story.innerHTML = "Egy " + e_name + " megtámadott téged!<br>";

    
    let counter = 0;
    let ellenfel_tamad = true;
    do {
        counter++;
        story.innerHTML += "<br>__"+counter+". kör__<br>";
        let szazalek = rnd_szazalek();
        if(ellenfel_tamad){

            let elkerules = 50 + stats.deffense;
            if(elkerules >= 100) elkerules = 95; 

            if(szazalek > elkerules){
                story.innerHTML += "Elkerülöd "+e_name+" csapását!<br>" ;
            }else{
                story.innerHTML += "A " +e_name+" eltalál és megsebez! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
            }
        }else{
            let elkerules = 50;
            if(szazalek > elkerules){
                story.innerHTML += "A "+e_name+" elkerüli a csapásodat!<br>";
            }else{
                story.innerHTML += "Eltalálod a " +e_name+"-t! (-"+stats.strength+" élet)<br>";
                
                e_life -= stats.strength;

                story.innerHTML += e_name +e_life+" élettel távozik!<br>";
            }

        }

        ellenfel_tamad = !ellenfel_tamad; 

        
    } while (stats.life > 0 && e_life > 0 && counter <= 10);
}