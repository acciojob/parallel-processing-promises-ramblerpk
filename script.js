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
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages(imageUrls) {
  loadingDiv.style.display = 'block'; // Show loading spinner
  errorDiv.textContent = ''; // Clear previous errors

  const promises = imageUrls.map(image => downloadImage(image.url));

  Promise.all(promises)
    .then(images => {
      loadingDiv.style.display = 'none'; // Hide loading spinner
      images.forEach(img => output.appendChild(img)); // Display images
    })
    .catch(error => {
      loadingDiv.style.display = 'none'; // Hide loading spinner
      errorDiv.textContent = error; // Show error message
    });
}

document.getElementById("download-images-button").addEventListener("click", () => {
  downloadImages(images);
});