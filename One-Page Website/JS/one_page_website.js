
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".lightbox-image");

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";

    lightbox.innerHTML = `
        <button id="close-lightbox" aria-label="Close">&times;</button>
        <button id="previous-image" aria-label="Previous image">&#10094;</button>
        <img id="lightbox-image" src="" alt="">
        <button id="next-image" aria-label="Next image">&#10095;</button>
        <p id="lightbox-caption"></p>
    `;

    Object.assign(lightbox.style, {
        display: "none",
        position: "fixed",
        inset: "0",
        zIndex: "9999",
        backgroundColor: "rgba(0, 0, 0, 0.92)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white"
    });

    document.body.appendChild(lightbox);

    const enlargedImage = document.getElementById("lightbox-image");

    Object.assign(enlargedImage.style, {
        maxWidth: "85%",
        maxHeight: "75vh",
        objectFit: "contain"
    });

    const caption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("close-lightbox");
    const previousButton = document.getElementById("previous-image");
    const nextButton = document.getElementById("next-image");

    [closeButton, previousButton, nextButton].forEach(function (button) {
        Object.assign(button.style, {
            position: "absolute",
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "35px",
            cursor: "pointer",
            padding: "10px"
        });
    });

    closeButton.style.top = "10px";
    closeButton.style.right = "25px";
    previousButton.style.left = "15px";
    nextButton.style.right = "15px";
    caption.style.marginTop = "15px";

    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;

        const image = images[currentIndex];

        enlargedImage.src = image.dataset.large || image.src;
        enlargedImage.alt = image.alt;
        caption.textContent = image.alt;

        lightbox.style.display = "flex";
    }

    images.forEach(function (image, index) {
        image.addEventListener("click", function () {
            showImage(index);
        });
    });

    closeButton.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    previousButton.addEventListener("click", function () {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (lightbox.style.display === "none") return;

        if (event.key === "Escape") {
            lightbox.style.display = "none";
        } else if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        } else if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }
    });
});
