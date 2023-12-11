let messages = [
    "Kellemes ünnepeket és boldog új évet kívánok!",
    "A szeretet a legcsodálatosabb ajándék karácsonyra.",
    "Békesség és boldogság töltse be otthonodat ezen ünnepi időszakban.",
    "Az igazi ajándék a szív melegét hozza el.",
    "Áldott karácsonyi ünnepeket kívánok neked és családodnak!",
    "A karácsony az idő, amikor a csodák valóra válnak.",
    "Az ünnepi időszakban összpontosítsunk a szeretetre és a jóakaratra.",
    "Egy kis mosoly sokat jelenthet valakinek karácsonykor.",
    "Áldott ünnepeket és boldog új évet mindenkinek!",
    "Az ünnepi fények ragyogása tegyen boldoggá mindenkit.",
    "A karácsony a család és a barátok körében töltött idő értéke.",
    "Jó egészséget és sok boldogságot kívánok neked ezen ünnepek alkalmával.",
    "Az ünnepek arra emlékeztetnek minket, hogy a szeretet a legfontosabb.",
    "Hálás vagyok azokért, akik szeretetteljesen körülvesznek karácsonykor.",
    "Az ünnepi időszak a meghitt pillanatokról szól.",
    "Kívánom, hogy az ünnepi időszakban bőség és boldogság kísérje lépteidet.",
    "Az ajándékok lehetnek kicsik, de a szeretet, amit hordoznak, óriási.",
    "Egy kis béke mindannyiunknak jól jön ebben a rohanó világban.",
    "A karácsony a szeretet és az összetartozás ünnepe.",
    "Remélem, hogy az ünnepi időszakban megtalálod a belső békédet.",
    "A karácsony az idő, amikor a szívünk nyitva áll mások iránt.",
    "Kívánom, hogy a boldogság karácsonykor otthonodba költözzön.",
    "<img src='https://img.freepik.com/free-vector/merry-christmas-wallpaper-design_79603-2129.jpg'>",
    "<img src='https://img.freepik.com/free-vector/gradient-christmas-tinsel-background_52683-76117.jpg' />"
];

let dates = [];

for (let i = 0; i < 24; i++) {
    dates.push(i + 1);
}

while (messages.length < 24) {
    messages.push("Hello");
}

const loadCards = () => {
    if (new Date().getMonth() !== 11) {
        document.body.innerHTML = `Nem karácsony van!`;
        return;
    }
    const cards = document.querySelectorAll('card');
    cards.forEach(card => {
        const randomDate = dates[Math.floor(Math.random() * dates.length)];
        let message;
        if (localStorage.getItem(`message-${ randomDate }`)) {
            message = localStorage.getItem(`message-${ randomDate }`);
        } else {
            message = "";
            while (message.length < 1) {
                let msg = messages[Math.floor(Math.random() * messages.length)];
                let alreadyUsed = false;
                for (let i = 0; i < 24; i++) {
                    if (localStorage.getItem(`message-${ i + 1 }`) === msg) {
                        alreadyUsed = true;
                    }
                }
                if (!alreadyUsed) {
                    message = msg;
                }
            }
            localStorage.setItem(`message-${ randomDate }`, message);
        }
        
        dates.splice(dates.indexOf(randomDate), 1);
        messages.splice(messages.indexOf(message), 1);
        card.setAttribute("data-date", randomDate);
        card.addEventListener('click', () => {
            removeCover(card.getAttribute("data-date"));
        });
        card.innerHTML = `
        <div class="col">
            <div class="card">
                <div class="cover" id="cover-${ randomDate }">
                    ${ randomDate }.
                </div>
                <div class="card-body">
                    <p>${ message }</p>
                </div>
            </div>
        </div>
        `;
    });
    for (let i = 0; i < 24; i++) {
        const cover = document.getElementById(`cover-${ i + 1 }`);
        if (localStorage.getItem(`cover-${ i + 1 }`) === "removed") {
            cover.style.display = "none";
        }
    }
};

const resetLocalStorage = () => {
    for (let i = 0; i < 24; i++) {
        localStorage.removeItem(`cover-${ i + 1 }`);
        localStorage.removeItem(`message-${ i + 1 }`);
    }
    location.reload();
}


const removeCover = number => {
    const cover = document.getElementById(`cover-${ number }`);
    const date = new Date().getDate();
    if (date < number) return;
    cover.style.animation = "disappear 0.5s";
    setInterval(() => {
        cover.style.display = "none";
    }, 500);
    localStorage.setItem(`cover-${ number }`, "removed");
}

document.onload = loadCards();