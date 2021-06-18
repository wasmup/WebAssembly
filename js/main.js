
document.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', (e) => {
        if (e.currentTarget.parentNode.tagName === 'LI') {
            e.currentTarget.parentNode.classList.toggle('done');
        }
        return true;
    }, false);
});

function changeBg() {
    const v = document.getElementById("color1").value;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = v;
    document.getElementById("colorHex").textContent = v;
}

window.scrollTo(0, document.body.scrollHeight);