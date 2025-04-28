document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('prompt');
    const resultContainer = document.getElementById('result');

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Please enter a description.');
            return;
        }

        resultContainer.innerHTML = 'Generating...';

        try {
            const response = await fetch('https://api.pollinations.ai/prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: `${prompt} in the style of Studio Ghibli`
                })
            });

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            const data = await response.json();
            const imageUrl = data.image_url; // 假设API返回的图像URL字段为image_url

            resultContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image" style="max-width: 100%; border-radius: 0.5rem;">`;
        } catch (error) {
            console.error('Error generating image:', error);
            resultContainer.innerHTML = 'Failed to generate image. Please try again later.';
        }
    });
});
