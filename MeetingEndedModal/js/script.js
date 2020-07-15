let listStars = document.querySelectorAll(".list-stars button");
let currentStars = 2;

function updateStars() {
    for (let i = 0; i < listStars.length; ++i) {
        if (i <= currentStars) {
            listStars[i].classList.add("star-fill");
        } else {
            listStars[i].classList.remove("star-fill");
        }
    }
}

for (let i = 0; i < listStars.length; ++i) {
    let starElement = listStars[i];

    starElement.addEventListener("click", function (e) {
        currentStars = i;
        updateStars();
    });
}
