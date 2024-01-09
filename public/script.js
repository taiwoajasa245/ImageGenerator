const searchBtn  = document.getElementById('search_btn');
const searchBox = document.getElementById('search_box'); 
const images = document.getElementById('myImages'); 


// hide imgae 
function HideImage() {    
    document.getElementById("loader").style.display = "flex";
    images.style.display = "none";
}
// show images after loder
function showImage() { 
    document.getElementById("loader").style.display = "none";
    images.style.display = "flex";
}


searchBtn.addEventListener('click', async () => {
    if( searchBox.value === ""){ 
        alert('Enter a value to search For an image');
    }else{ 
        try {
            HideImage(); 
            // Make a request to your server to get images
                    const response = await fetch(`http://localhost:8080/getImages?q=${searchBox.value}`);
                    const data = await response.json();
    
                    // Handle the images data
                    const imageContainer = images
                    imageContainer.innerHTML = ''; // Clear previous images


                    if (data.hits && data.hits.length > 0) {
                        data.hits.forEach(image => {
                            const imgElement = document.createElement('img');
                            imgElement.src = image.largeImageURL;
                            imgElement.alt = image.tags;
                            imageContainer.appendChild(imgElement);
                        });
                    } else {
                        imageContainer.innerHTML = '<p>No images found.</p>';
                    }

                    showImage();
    
                } catch (error) {
                    console.error(error);
                }
    }
});
