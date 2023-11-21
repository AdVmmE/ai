const api = "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";
const inp = document.getElementById('inp');
const images = document.querySelector('.images');

const loadImage = async (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};

const getImage = async () => {
    // make a request to the OpenAI API
    const methods = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api}`
        },
        body: JSON.stringify({
            "prompt": inp.value,
            "n": 1,
            "size": "256x256"
        })
    };

    const res = await fetch("https://api.openai.com/v1/images/generations", methods);

    // parse the response as JSON
    const data = await res.json();
    const listImages = data.data;


    // Load images asynchronously
    for (const photo of listImages) {
        images.innerHTML = '';

        const container = document.createElement("div");
        images.append(container);

        const img = await loadImage(photo.url);
        container.append(img);
    }
};

// Example of using the getImage function
getImage();
