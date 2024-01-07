const searchBtn  = document.getElementById('search_btn');
const searchBox = document.getElementById('search_box'); 

searchBtn.addEventListener('click', async () => {
    if( searchBox.value === ""){ 
        alert('Enter a value to search For an image');
    }else{ 
        try {
        
            // Make a request to your server to get images
                    const response = await fetch(`http://localhost:8080/getImages?q=${searchBox.value}`);
                    const data = await response.json();
    
                    // Handle the images data
                    const imageContainer = document.querySelector('.gallery-image');
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
    
                } catch (error) {
                    console.error(error);
                }
    }
});
