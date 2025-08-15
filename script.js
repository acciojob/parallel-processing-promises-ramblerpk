const output = document.getElementById("output");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    // Append immediately so Cypress sees them
    output.appendChild(img);

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages(imageUrls) {
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";

  const promises = imageUrls.map(image => downloadImage(image.url));

  Promise.all(promises)
    .then(() => {
      loadingDiv.style.display = "none";
    })
    .catch(error => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = error;
    });
}

document.getElementById("download-images-button").addEventListener("click", () => {
  downloadImages(images);
});
