/*
<div class="col">
    <div class="card">
        <div class="card-body">
        <h5 class="card-title">Kártya 1</h5>
        <p class="card-text">A kártya tartalma itt helyezkedik el.</p>
        </div>
    </div>
</div>
*/

let messages = [
    "Hello"
];

let dates = [];

for (let i = 0; i < 24; i++) {
    dates.push(i + 1);
}

while (messages.length < 24) {
    messages.push("Hello");
}

const loadCards = () => {
    const cards = document.querySelectorAll('card');
    cards.forEach(card => {
        const randomDate = dates[Math.floor(Math.random() * dates.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        dates.splice(dates.indexOf(randomDate), 1);
        messages.splice(messages.indexOf(randomMessage), 1);
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
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="Placeholder Image">
                </div>
            </div>
        </div>
        `;
    });
};

const removeCover = number => {
    const cover = document.getElementById(`cover-${ number }`);
    cover.style.animation = "disappear 0.5s";
    setInterval(() => {
        cover.style.display = "none";
    }, 500);
}

document.onload = loadCards();