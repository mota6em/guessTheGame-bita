let gameName = "Guess The Name";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By MoBaraka`;

let numOfTries = 6;
let numOfLetters = 6; 
let hintNum = 2;
let wordToGuess;
let messageArea = document.querySelector(".result");
let currentTry = 1;
const startButton = document.getElementById("startTheGame");
startButton.addEventListener("click", function(){
    const inputsConainer = document.querySelector(".inputs");
    inputsConainer.innerHTML= "";
    genInput();
    let startBox =  document.querySelector(".startBox");
    startBox.style.display = "none";
});
const hint = document.getElementById("hint");
const check = document.getElementById("check");
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
document.querySelector(".hint span").innerHTML = hintNum;
hint.addEventListener("click", getHint);

function genInput(){
    check.disabled = false;
    check.style.opacity=1;
    hint.style.opacity= 1;
    hint.disabled = false;
    numOfTries = document.getElementById("numOfTries").value;
    numOfLetters = document.getElementById("numOfLetters").value;
    numOfLetters = parseInt(numOfLetters);
    switch(numOfLetters){
        case 3:
            var randomIndex = Math.floor(Math.random() * threeLetterWords.length);
            wordToGuess = threeLetterWords[randomIndex];
            break;
        case 4:
            var randomIndex = Math.floor(Math.random() * fourLetterWords.length);
            wordToGuess = fourLetterWords[randomIndex];
            break;
        case 5:
            var randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
            wordToGuess = fiveLetterWords[randomIndex];
            break;
        case 6:
            var randomIndex = Math.floor(Math.random() * sixLetterWords.length);
            wordToGuess = sixLetterWords[randomIndex];
            break;
        case 7:
            var randomIndex = Math.floor(Math.random() * sevenLetterWords.length);
            wordToGuess = sevenLetterWords[randomIndex];
            break;
        default:
            wordToGuess = "Error";
            break;
    }
    console.log("Word to guess is: ", wordToGuess);  // Debugging output
    const inputsConainer = document.querySelector(".inputs");
    for(let i = 1; i <= numOfTries; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML =`<span class="try-span">Try ${i}</span>`;
        
        if(i !== 1){
            tryDiv.classList.add("disabled-inputs");
        }

        for(let j = 1; j <= numOfLetters ; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.setAttribute("maxlength", 1);
            input.id = `try-${i}-letter-${j}`;
            input.classList.add("try-letter-box");
            tryDiv.appendChild(input);
        }
        inputsConainer.appendChild(tryDiv);
    }

    inputsConainer.children[0].children[1].focus();
    const disabledDives = document.querySelectorAll(".disabled-inputs input");
    disabledDives.forEach((e) => (e.disabled = true));
    
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => (
        input.addEventListener("input", function(){
            input.value = input.value.toUpperCase();
            const nextIndex = inputs[index +1];
            // console.log(nextIndex);
            if(nextIndex) inputs[index + 1].focus();
        })
    ))
    
}   



// async function fetchWordToGuess() {
//     let wordsArray = [];
//     let wordToGuess = "";

//     try {
//         const response = await fetch('https://api.datamuse.com/words?ml=flower');
//         const data = await response.json();
//         wordsArray = data.map(wordObj => wordObj.word);

//         let words = wordsArray.filter((word) => word.length === numOfLetters);

//         // Selecting a random word from the filtered words
//         if (words.length > 0) {
//             wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
//         } else {
//             console.error("No words found with the specified length.");
//         }    // This will print the filtered words array
//     } catch (error) {
//         console.error('Error fetching words:', error);
//     }

//     return wordToGuess;
// }

guessButton.addEventListener("click", handleGuesses);
function handleGuesses(){
    guessButton.disabled  = true;
    let successGuess = true;
    for(let i = 1; i <= numOfLetters; i++){
        const inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];
        if(letter === actualLetter) 
        {
            inputField.classList.add("yes-in-place");
        }
        else if(wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add("not-in-place");
            successGuess = false;
        }
        else{
            inputField.classList.add("no");
            successGuess = false;
        }
    }

    if(successGuess){
        messageArea.innerHTML = `<h2>Congratulations, You Win!</h2> <p>The Word Is <span>${wordToGuess}</span>.</p><button id="startAgain">Start Again!</button>`;
        messageArea.style.display = "flex";
        const startAgain = document.getElementById("startAgain");
        startAgain.addEventListener("click", function(){
            location.reload();
        });
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((divDB) => (divDB.style.opacity = "0.5"));
        guessButton.disabled  = true;
        check.disabled = true;
        hint.disabled = true;
        check.style.opacity = "0.5";
        hint.style.opacity = "0.5";
        // const disabledDives = document.querySelectorAll(".disabled-inputs input");
        // disabledDives.forEach((e) => (e.disabled = true));
    }
    else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInput.forEach((input) => (input.disabled = true));
        guessButton.disabled  = false;
        // currentTry++;
        currentTry++;
        
        // document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
        const nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInput.forEach((input) => input.disabled = false);
        let el = document.querySelector(`.try-${currentTry}`);
        if(el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        }
        else{
            check.disabled = true;
            hint.disabled = true;
            check.style.opacity = "0.5";
            hint.style.opacity = "0.5";
            messageArea.innerHTML = `<h2>No Way, U Lost!</h2> <p>The Word Was <span>${wordToGuess}</span>.</p><button id="startAgain">Start Again!</button>`;
            messageArea.style.display = "flex";
            const startAgain = document.getElementById("startAgain");
            startAgain.addEventListener("click", function(){
                location.reload();
            });

            // let allTries = document.querySelectorAll(".inputs > div");
            // allTries.forEach((divDB) => (divDB.style.opacity = "0.5"));
            // guessButton.disabled  = true;
        }
    }

}

guessButton.addEventListener("click", function(){
    console.log("FUCK");
})


function getHint(){
    if(hintNum){
        hintNum--;
        document.querySelector(".hint span").innerHTML = hintNum;

    }
    if(hintNum === 0){
        hint.disabled = true;
        hint.style.opacity = "0.3";
    }
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(avilableInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    // console.log(emptyEnabledInputs);


    if(emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        // console.log(randomIndex);
        const randomInuput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInuput);
        if(indexToFill !== -1){
            randomInuput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}

function handleBackSpace(event){
    if(event.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if(currentIndex > 0){
            const curruntInput  = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            prevInput.value = "";
            curruntInput.value = "";
            prevInput.focus();
        }
    }
}

document.addEventListener("keydown", handleBackSpace);
// window.onload = function(){
//     wordToGuess = "mmmmm";
//     // fetchWordToGuess().then((word) => {
//     //     wordToGuess = word;  // Assign the resolved word to the wordToGuess variable
//     //     // genInput();  // Continue with generating the input fields
//     // });
// }

window.onload = function(){
    wordToGuess = "MORNINNG";
    // fetchWordToGuess().then((word) => {wordToGuess = word;})
    genInput();
    document.querySelector(".try-1").classList.add("disabled-inputs");
    document.querySelector("#try-1-letter-1").disabled = true;
    check.disabled = true;
    check.style.opacity= 0.5;
    hint.style.opacity= 0.5;
    hint.disabled = true;
}



const threeLetterWords = [
    "cat", "dog", "bat", "rat", "pig", "cow", "ant", "bee", "owl", "fox",
    "man", "fan", "hat", "bag", "pen", "sun", "run", "fun", "win", "tin",
    "van", "bun", "mat", "cap", "map", "pad", "pot", "nut", "cup", "toy",
    "box", "jaw", "jaw", "gym", "sky", "lip", "hip", "arm", "leg", "toe",
    "ear", "eye", "ice", "egg", "gem", "hen", "fin", "fur", "log", "mud",
    "oil", "zip", "jet", "kit", "web", "net", "lid", "key", "pot", "pen",
    "bat", "bun", "cap", "can", "dig", "dip", "dot", "eat", "fit", "fix",
    "hit", "hop", "hug", "jam", "lap", "log", "mix", "nap", "pat", "pop",
    "red", "rib", "rid", "run", "sad", "sip", "sit", "tap", "tip", "top",
    "wed", "wet", "win", "zip", "bet", "bid", "bog", "bug", "bum", "cab",
    "cod", "cog", "cop", "cub", "cut", "dad", "dim", "dip", "dot", "dub",
    "dye", "fig", "fit", "fog", "gap", "get", "gig", "gum", "gut", "hat",
    "hug", "hum", "hut", "jet", "jug", "lab", "lag", "lip", "log", "lot",
    "man", "map", "mat", "men", "mix", "mop", "mud", "nap", "net", "nod",
    "nut", "pad", "peg", "pen", "pet", "pie", "pin", "pit", "pod", "pop",
    "pot", "pub", "rag", "ram", "rat", "rib", "rob", "rod", "rot", "row",
    "rub", "rug", "run", "sap", "set", "sip", "sit", "sob", "sow", "tag",
    "tan", "tap", "tax", "ten", "tip", "top", "toy", "tug", "van", "vet",
    "vow", "wag", "web", "wet", "win", "wow", "yak", "yam", "zap", "zig",
    "zip", "zen", "zoo", "bar", "bat", "bay", "bid", "bit", "bow", "bud",
    "bus", "bye", "cat", "cow", "cry", "cub", "cup", "cut", "dry", "ear",
    "eat", "end", "eye", "fan", "fat", "fig", "fit", "fog", "fox", "fry",
    "fur", "gap", "gas", "get", "guy", "ham", "hat", "hay", "hen", "hit",
    "hot", "hug", "ice", "jam", "jet", "joy", "jug", "kid", "kit", "lab",
    "lad", "lap", "lay", "leg", "lid", "log", "lot", "man", "map", "mat",
    "men", "mix", "mop", "mud", "nap", "net", "nod", "nut", "pad", "peg",
    "pen", "pet", "pie", "pig", "pin", "pit", "pod", "pop", "pot", "pub",
    "rag", "ram", "rat", "rib", "rob", "rod", "rot", "row", "rub", "rug",
    "run", "sap", "set", "sip", "sit", "sob", "sow", "tag", "tan", "tap",
    "tax", "ten", "tip", "top", "toy", "tug", "van", "vet", "vow", "wag",
    "web", "wet", "win", "wow", "yak", "yam", "zap", "zig", "zip", "zen",
    "zoo", "act", "add", "aid", "aim", "air", "and", "ant", "any", "ape",
    "arc", "are", "ark", "arm", "art", "ash", "ask", "ate", "axe", "bad",
    "bag", "ban", "bar", "bat", "bay", "bed", "bee", "beg", "bet", "big",
    "bit", "bob", "bog", "boo", "bow", "box", "boy", "bud", "bug", "bum",
    "bun", "bus", "but", "buy", "cab", "can", "cap", "car", "cat", "cow",
    "cry", "cub", "cup", "cut", "day", "den", "did", "die", "dig", "dim",
    "dip", "dot", "dry", "dug", "ear", "eat", "egg", "end", "eye", "fan",
    "far", "fat", "fig", "fit", "fix", "fly", "fog", "for", "fox", "fun",
    "fur", "gap", "gas", "get", "got", "gum", "gun", "gut", "had", "ham",
    "hat", "hay", "hen", "her", "hid", "him", "hip", "his", "hit", "hog",
    "hot", "how", "hub", "hug", "hum", "hut", "ice", "ill", "ink", "jam",
    "jar", "jaw", "jet", "job", "jog", "joy", "jug", "key", "kid", "kit",
    "lab", "lad", "lag", "lap", "law", "lay", "leg", "let", "lid", "lie",
    "lip", "lit", "log", "lot", "low", "mad", "man", "map", "mat", "may",
    "men", "met", "mix", "mob", "mop", "mud", "mug", "net", "new", "nil",
    "nod", "not", "now", "nut", "oak", "odd", "off", "oil", "old", "one",
    "orb", "our", "out", "owl", "own", "pad", "pal", "pan", "pat", "pay",
    "pea", "pen", "pet", "pie", "pig", "pin", "pit", "pop", "pot", "pub",
    "rag", "ran", "rat", "red", "rib", "rid", "rob", "rod", "row", "rub",
    "rug", "run", "sad", "sat", "say", "see", "set", "sew", "she", "shy",
    "sip", "sit", "six", "sky", "sob", "son", "sow", "sun", "tap", "tax",
    "tea", "ten", "the", "tie", "tip", "toe", "top", "tow", "toy", "try",
    "tug", "two", "use", "van", "vet", "vow", "wag", "war", "was", "wax",
    "web", "wet", "who", "win", "wit", "wow", "yak", "yam", "yes", "yet",
    "you", "zip", "zoo"
];
const fourLetterWords = [
    "tree", "ship", "frog", "bird", "lion", "bear", "fish", "duck", "wolf", "goat",
    "milk", "cake", "ball", "book", "lamp", "gold", "rock", "sand", "moon", "star",
    "wind", "rain", "fire", "snow", "ice", "leaf", "root", "rose", "vine", "bark",
    "wood", "iron", "coal", "salt", "rice", "pear", "plum", "corn", "peas", "bean",
    "meat", "beef", "pork", "lamb", "goat", "calf", "deer", "duck", "crab", "clam",
    "worm", "moth", "toad", "frog", "bird", "hawk", "crow", "dove", "swan", "lion",
    "bear", "wolf", "boar", "hare", "fawn", "bush", "fern", "palm", "bark", "reed",
    "rope", "knot", "nail", "bolt", "saw", "file", "drill", "plan", "mold", "grip",
    "vice", "glue", "iron", "lead", "zinc", "gold", "coin", "ring", "neck", "band",
    "wrist", "hand", "palm", "foot", "shin", "knee", "thigh", "back", "neck", "nose",
    "chin", "brow", "eyes", "ears", "lips", "teeth", "jaw", "gums", "hair", "bald",
    "comb", "brush", "soap", "bath", "sink", "tub", "door", "knob", "lock", "bell",
    "rope", "wire", "pipe", "vent", "wall", "roof", "beam", "tile", "wood", "nail",
    "bolt", "seal", "ring", "clip", "plug", "lamp", "bulb", "tube", "cord", "plug",
    "coil", "belt", "gear", "link", "ring", "band", "mesh", "knot", "loop", "chain",
    "clip", "hook", "nail", "screw", "bolt", "clamp", "ring", "plug", "jack", "lead",
    "pipe", "vent", "duct", "hose", "cord", "wire", "rope", "belt", "strap", "band",
    "clip", "ring", "knot", "loop", "link", "mesh", "gate", "wall", "door", "roof",
    "tile", "beam", "pole", "post", "rail", "step", "ring", "band", "belt", "gear",
    "link", "chain", "clip", "hook", "ring", "plug", "jack", "lead", "pipe", "vent",
    "duct", "hose", "cord", "wire", "rope", "belt", "strap", "band", "ring", "clip",
    "knot", "loop", "link", "mesh", "gate", "wall", "door", "roof", "tile", "beam",
    "pole", "post", "rail", "step", "ring", "band", "belt", "gear", "link", "chain",
    "clip", "hook", "ring", "plug", "jack", "lead", "pipe", "vent", "duct", "hose",
    "cord", "wire", "rope", "belt", "strap", "band", "clip", "knot", "loop", "link",
    "mesh", "gate", "wall", "door", "roof", "tile", "beam", "pole", "post", "rail",
    "step", "ring", "band", "belt", "gear", "link", "chain", "clip", "hook", "ring",
    "plug", "jack", "lead", "pipe", "vent", "duct", "hose", "cord", "wire", "rope",
    "belt", "strap", "band", "ring", "clip", "knot", "loop", "link", "mesh", "gate",
    "wall", "door", "roof", "tile", "beam", "pole", "post", "rail", "step", "ring",
    "band", "belt", "gear", "link", "chain", "clip", "hook", "ring", "plug", "jack",
    "lead", "pipe", "vent", "duct", "hose", "cord", "wire", "rope", "belt", "strap",
    "band", "ring", "clip", "knot", "loop", "link", "mesh", "gate", "wall", "door",
    "roof", "tile", "beam", "pole", "post", "rail", "step", "ring", "band", "belt",
    "gear", "link", "chain", "clip", "hook", "ring", "plug", "jack", "lead", "pipe",
    "vent", "duct", "hose", "cord", "wire", "rope", "belt", "strap", "band", "ring",
    "clip", "knot", "loop", "link", "mesh", "gate", "wall", "door", "roof", "tile",
    "beam", "pole", "post", "rail", "step", "ring", "band", "belt", "gear", "link",
    "chain", "clip", "hook", "ring", "plug", "jack", "lead", "pipe", "vent", "duct",
    "hose", "cord", "wire", "rope", "belt", "strap", "band", "clip", "knot", "loop",
    "link", "mesh", "gate", "wall", "door", "roof", "tile", "beam", "pole", "post",
    "rail", "step", "ring", "band", "belt", "gear", "link", "chain", "clip", "hook",
    "ring", "plug", "jack", "lead", "pipe", "vent", "duct", "hose", "cord", "wire",
    "rope", "belt", "strap", "band", "clip", "knot", "loop", "link", "mesh", "gate",
    "wall", "door", "roof", "tile", "beam", "pole", "post", "rail", "step", "ring"];

const fiveLetterWords = [
    "apple", "bread", "crane", "drink", "eagle", "flame", "grape", "heart", "ivory", "jumpy",
    "koala", "lemon", "mango", "night", "ocean", "peach", "quilt", "river", "sheep", "tiger",
    "under", "vivid", "wheat", "xenon", "yacht", "zebra", "abide", "blaze", "candy", "dance",
    "eagle", "focus", "glove", "honor", "inbox", "jolly", "karma", "leash", "mirth", "noble",
    "olive", "piano", "quest", "roast", "shine", "tread", "unity", "vivid", "wooly", "x-ray",
    "yogic", "zonal", "actor", "bloom", "candy", "daisy", "eager", "fable", "gloom", "house",
    "index", "jelly", "knock", "light", "mango", "nerdy", "oasis", "party", "queen", "right",
    "sunny", "tiger", "ultra", "vivid", "watch", "xenon", "yield", "zesty", "array", "brave",
    "crisp", "drive", "eagle", "frost", "glove", "happy", "ivory", "jumpy", "knife", "lucky",
    "magic", "night", "ocean", "piano", "queen", "round", "steel", "trust", "unite", "vivid",
    "worry", "xenon", "yacht", "zebra", "actor", "beach", "cloud", "dance", "eagle", "flame",
    "grape", "honey", "infer", "joker", "knife", "lemon", "mango", "noise", "oasis", "pearl",
    "quest", "roast", "shine", "tiger", "ugly", "vivid", "whale", "xenon", "yacht", "zebra",
    "anvil", "bacon", "clamp", "drain", "elbow", "forge", "grape", "horse", "ivory", "juice",
    "knife", "liver", "mango", "night", "octet", "piano", "quilt", "robot", "sword", "tiger",
    "ultra", "vivid", "wheat", "xenon", "yacht", "zebra", "aloha", "brave", "climb", "dingo",
    "eagle", "focus", "gland", "happy", "inbox", "jumpy", "kiosk", "lemon", "mirth", "ninja",
    "oasis", "peach", "quick", "rival", "shine", "tiger", "under", "vivid", "watch", "xenon",
    "yield", "zesty", "beach", "charm", "dance", "exile", "flame", "grape", "house", "ivory",
    "jolly", "kiosk", "lemon", "mango", "noble", "ocean", "party", "quest", "right", "storm",
    "tiger", "ultra", "vivid", "wheat", "xenon", "yacht", "zebra", "align", "brave", "climb",
    "drive", "eagle", "flame", "grape", "house", "ivory", "jumpy", "lemon", "mango", "night",
    "ocean", "peach", "queen", "rival", "sword", "trust", "under", "vivid", "watch", "xenon",
    "yield", "zebra", "apple", "beach", "crisp", "drain", "eagle", "fable", "grape", "honey",
    "ivory", "jumpy", "knife", "lemon", "mango", "night", "octet", "pearl", "quest", "roast",
    "shine", "tiger", "ultra", "vivid", "wheat", "xenon", "yacht", "zebra", "alpha", "brave",
    "cloud", "dance", "eagle", "focus", "grape", "happy", "ivory", "jumpy", "knife", "lemon",
    "mango", "night", "ocean", "peach", "quest", "right", "shine", "tiger", "ultra", "vivid",
    "wheat", "xenon", "yacht", "zebra", "blaze", "cloud", "drive", "eagle", "flame", "grape",
    "house", "ivory", "jumpy", "knife", "lemon", "mango", "night", "ocean", "peach", "quest",
    "roast", "shine", "tiger", "under", "vivid", "wheat", "xenon", "yield", "zebra", "brave",
    "cloud", "dance", "eagle", "focus", "grape", "happy", "ivory", "jumpy", "knife", "lemon",
    "mango", "night", "ocean", "peach", "quest", "right", "shine", "tiger", "ultra", "vivid",
    "wheat", "xenon", "yacht", "zebra", "apple", "beach", "crisp", "drain", "eagle", "flame",
    "grape", "house", "ivory", "jumpy", "knife", "lemon", "mango", "night", "ocean", "peach",
    "quest", "roast", "shine", "tiger", "ultra", "vivid", "wheat", "xenon", "yacht", "zebra",
    "align", "brave", "cloud", "dance", "eagle", "focus", "grape", "happy", "ivory", "jumpy",
    "knife", "lemon", "mango", "night", "ocean", "peach", "quest", "right", "shine", "tiger"];



const sixLetterWords = [
    "abduct", "baffle", "cactus", "daring", "eagle", "fabric", "gadget", "huddle", "impact", "jungle",
    "kitten", "laptop", "marble", "napkin", "orange", "pardon", "quartz", "rocket", "silver", "tiger",
    "unique", "vacuum", "wonder", "yellow", "zephyr", "admire", "banish", "circle", "dimple", "enrich",
    "famine", "glisten", "honest", "insure", "jacket", "kettle", "lively", "magnet", "nuclear", "outfit",
    "plasma", "quiver", "rescue", "snack", "toggle", "utter", "velvet", "wasted", "xenon", "yogurt",
    "abduct", "bright", "carpet", "dinner", "embark", "frozen", "gossip", "hunger", "import", "jovial",
    "knight", "lender", "mammal", "nature", "optics", "planet", "quaint", "regret", "simple", "tough",
    "utter", "vacant", "winter", "yacht", "zodiac", "afraid", "barrel", "cattle", "demand", "effort",
    "famous", "gadget", "honest", "inbox", "jungle", "kitten", "lender", "master", "nurture", "office",
    "plenty", "quaint", "ripple", "second", "treaty", "utter", "vortex", "whale", "xenon", "yogurt",
    "bitter", "cattle", "daring", "energy", "flavor", "gazing", "hunger", "injury", "jacket", "kitten",
    "lemon", "market", "nature", "outrun", "perfect", "quaint", "regret", "supply", "trouble", "utopia",
    "vacant", "whisky", "xenon", "youth", "zephyr", "arisen", "baffle", "charge", "damage", "elixir",
    "freely", "gadget", "hustle", "impact", "jovial", "kettle", "length", "mining", "noble", "opener",
    "polish", "quaint", "review", "spider", "tender", "update", "vivid", "waste", "xenon", "yogurt",
    "advice", "banish", "change", "design", "evolve", "famine", "guzzle", "heroic", "injury", "jungle",
    "kettle", "lender", "mellow", "naked", "outfit", "preach", "quaint", "revolt", "simmer", "tender",
    "utopia", "vivid", "whisky", "xenon", "youth", "zephyr", "alumni", "brush", "cactus", "daring",
    "energy", "famous", "gadget", "hunger", "impact", "jovial", "kitten", "lender", "mellow", "nature",
    "outfit", "plenty", "quaint", "revolt", "simple", "tiger", "unique", "velvet", "whale", "xenon",
    "youth", "zephyr"
];
    
const sevenLetterWords = [
    "abandon", "bizarre", "capture", "diamond", "eclipse", "fashion", "giraffe", "horizon", "include", "jungle",
    "kitchen", "leisure", "mystery", "network", "operate", "package", "quality", "resolve", "software", "together",
    "ultimate", "venture", "whistle", "xenon", "yogurts", "zodiac", "artwork", "barrier", "catalog", "defense",
    "exercise", "freight", "genuine", "hospice", "inspire", "justice", "kingdom", "library", "magnitude", "nucleus",
    "options", "pioneer", "recruit", "secret", "tourism", "uncover", "variety", "wedding", "xenon", "yarn",
    "zoology", "baggage", "capture", "discount", "elevate", "foreman", "grip", "hardware", "inquire", "jacket",
    "kingdom", "leisure", "mystery", "nobody", "outlook", "package", "quality", "radiant", "software", "tradition",
    "ultimate", "vaccine", "weather", "xenon", "yogurt", "zodiac", "accused", "bizarre", "challenge", "doctor",
    "enigma", "famous", "guardian", "horizon", "impress", "jacket", "kingdom", "leisure", "mountain", "network",
    "operate", "primary", "quantity", "reclaim", "secrets", "trouble", "unknown", "variety", "witness", "xenon",
    "yogurt", "zodiac", "briefly", "captain", "delight", "exhibit", "flavors", "grinder", "history", "inspire",
    "jungle", "kinetic", "letters", "monkey", "natural", "outcome", "package", "quality", "relieve", "student",
    "transfer", "venture", "whistle", "xenon", "yogurt", "zodiac", "article", "blender", "capture", "dolphin",
    "elevate", "freight", "giraffe", "horizon", "include", "journey", "kingdom", "lifestyle", "mystery", "notable",
    "options", "provider", "quality", "rescue", "sensible", "trouble", "ultimate", "variety", "wonder", "xenon",
    "yellow", "zodiac", "adviser", "baggage", "capture", "director", "excited", "freight", "genuine", "horizon",
    "inspire", "jacket", "kingdom", "leisure", "mystery", "nurture", "option", "pleased", "quality", "removal",
    "reclaim", "solution", "transfer", "uniform", "vaccine", "weather", "xenon", "yogurt", "zodiac"
];


