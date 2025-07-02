// LinkedIn Content Creator - Core Functionality

// DOM Elements
const contentForm = document.getElementById('contentForm');
const generateBtn = document.getElementById('generateBtn');
const publishBtn = document.getElementById('publishBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const postContent = document.getElementById('postContent');
const imagePreview = document.getElementById('imagePreview');

// Content Generation State
let currentPost = null;
let currentImage = null;

// Event Listeners
contentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await generateContent();
});

regenerateBtn.addEventListener('click', async () => {
    await generateContent();
});

publishBtn.addEventListener('click', async () => {
    await publishContent();
});

// Content Generation Function
async function generateContent() {
    // Get form data
    const formData = new FormData(contentForm);
    const topic = formData.get('topic');
    const audience = formData.get('audience');
    const tone = formData.get('tone');
    const keywords = formData.get('keywords');
    const cta = formData.get('cta');

    // Show loading state
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    postContent.textContent = 'Generating post content...';
    imagePreview.textContent = 'Creating visual content...';

    try {
        // Simulate API calls (in real implementation, these would call actual APIs)
        const post = await generatePostContent(topic, audience, tone, keywords, cta);
        const image = await generatePostImage(post);

        // Update UI with generated content
        currentPost = post;
        currentImage = image;
        postContent.innerHTML = formatPostContent(post);
        imagePreview.innerHTML = `<img src="${image}" alt="Generated visual content" style="max-width: 100%; border-radius: 8px;">`;

        // Enable publish button
        publishBtn.disabled = false;
    } catch (error) {
        console.error('Error generating content:', error);
        postContent.textContent = 'Error generating content. Please try again.';
        imagePreview.textContent = 'Error generating visual content.';
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Content';
    }
}

// Post Content Generation (Mock)
async function generatePostContent(topic, audience, tone, keywords, cta) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock post content
    return {
        title: `The Future of ${topic}: Insights for ${audience}`,
        content: `In today's rapidly evolving landscape, ${topic} is becoming increasingly important for ${audience}. Here's what you need to know:

1. **Current Trends**: ${keywords.split(',').slice(0, 3).join(', ')} are shaping the future of this field
2. **Key Insights**: Recent developments show significant progress in ${keywords.split(',')[0]}
3. **Actionable Advice**: ${cta || 'Stay ahead of the curve by implementing these strategies'}

#${topic.replace(/ /g, '')} #${audience.replace(/ /g, '')} #ProfessionalGrowth`,
        hashtags: [topic.replace(/ /g, ''), audience.replace(/ /g, ''), 'ProfessionalGrowth']
    };
}

// Image Generation (Mock)
async function generatePostImage(post) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return mock image URL
    return `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(post.title)}`;
}

// Format Post Content for Display
function formatPostContent(post) {
    return `
        <h3>${post.title}</h3>
        <div style="white-space: pre-wrap;">${post.content}</div>
        <div class="hashtags">
            ${post.hashtags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
        </div>
    `;
}

// Publish Content Function
async function publishContent() {
    // Show loading state
    publishBtn.disabled = true;
    publishBtn.textContent = 'Publishing...';

    try {
        // Simulate publishing process
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Content published successfully to LinkedIn!');
    } catch (error) {
        console.error('Error publishing content:', error);
        alert('Error publishing content. Please try again.');
    } finally {
        publishBtn.disabled = false;
        publishBtn.textContent = 'Publish to LinkedIn';
    }
}