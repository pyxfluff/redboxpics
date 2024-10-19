// pyxfluff 2024

const main = (async () => {
    let indexResp = await fetch("https://index.redbox.pics/src/static/images/index.json");
    let indexJSON = await indexResp.json();

    const imageGrid = document.getElementById("image-grid");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    for (let index = 0; index < indexJSON.totalCount; index++) {
        const imageURL = `https://index.redbox.pics/src/static/images/${indexJSON.format.replace("{{num}}", index + 1)}`;

        const linkElement = document.createElement("a");
        linkElement.href = imageURL; 
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer"; 

        const imgElement = document.createElement("img");
        imgElement.dataset.src = imageURL;
        imgElement.className = "grid-image";
        imgElement.alt = `Image ${index}`;

        linkElement.appendChild(imgElement);
        imageGrid.appendChild(linkElement);
        observer.observe(imgElement);
    }
});

main();
