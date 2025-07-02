// LinkedIn AI Agent - Core Functionality

// DOM Elements
const profileBtn = document.getElementById('profileBtn');
const connectionsBtn = document.getElementById('connectionsBtn');
const messagesBtn = document.getElementById('messagesBtn');
const jobsBtn = document.getElementById('jobsBtn');
const profileSection = document.getElementById('profileSection');
const connectionsSection = document.getElementById('connectionsSection');
const messagesSection = document.getElementById('messagesSection');
const jobsSection = document.getElementById('jobsSection');
const profileName = document.getElementById('profileName');
const profileHeadline = document.getElementById('profileHeadline');
const profileLocation = document.getElementById('profileLocation');
const profileSummary = document.getElementById('profileSummary');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const connectionsList = document.getElementById('connectionsList');
const jobsList = document.getElementById('jobsList');

// Current active profile data
let currentProfile = null;

// Navigation functionality
function switchSection(section) {
    // Hide all sections
    profileSection.classList.remove('active');
    connectionsSection.classList.remove('active');
    messagesSection.classList.remove('active');
    jobsSection.classList.remove('active');
    
    // Show selected section
    section.classList.add('active');
}

// Event listeners for navigation
profileBtn.addEventListener('click', () => switchSection(profileSection));
connectionsBtn.addEventListener('click', () => switchSection(connectionsSection));
messagesBtn.addEventListener('click', () => switchSection(messagesSection));
jobsBtn.addEventListener('click', () => switchSection(jobsSection));

// LinkedIn Data Provider Integration
async function fetchLinkedInProfile(profileUrl) {
    try {
        // In a real implementation, this would call our backend service
        // For now, we'll use mock data
        return {
            name: "John Doe",
            headline: "Senior Software Engineer at TechCorp",
            location: "San Francisco, California",
            summary: "Experienced software engineer with 8+ years in full-stack development. Specialized in JavaScript, Python, and cloud technologies.",
            connections: 542,
            experience: [
                {
                    title: "Senior Software Engineer",
                    company: "TechCorp",
                    duration: "2018 - Present"
                },
                {
                    title: "Software Engineer",
                    company: "DevSolutions",
                    duration: "2015 - 2018"
                }
            ],
            education: [
                {
                    institution: "Stanford University",
                    degree: "M.S. Computer Science",
                    year: "2015"
                }
            ],
            skills: ["JavaScript", "Python", "React", "Node.js", "AWS"]
        };
    } catch (error) {
        console.error("Error fetching LinkedIn profile:", error);
        return null;
    }
}

// AI Analysis Functions
function generateProfileSummary(profile) {
    // In a real implementation, this would call an AI service
    // For now, we'll generate a mock analysis
    return `Based on ${profile.name}'s profile:
    
- Strong technical background with ${profile.experience.length} professional roles
- Extensive experience in ${profile.skills.slice(0, 3).join(', ')}
- ${profile.connections}+ professional connections indicating a strong network
- Education from ${profile.education[0].institution} demonstrates solid foundation

Recommendations:
1. Highlight ${profile.skills[0]} experience in profile headline
2. Consider adding more detail about ${profile.experience[0].title} role
3. Expand network in ${profile.location} area`;
}

function generateConnectionRecommendations(profile) {
    // Mock recommendations
    return [
        {
            name: "Sarah Johnson",
            headline: "Engineering Manager at TechCorp",
            mutualConnections: 12,
            reason: "Works at the same company, shares 5 skills"
        },
        {
            name: "Michael Chen",
            headline: "Senior Product Manager at InnovateCo",
            mutualConnections: 8,
            reason: "Alumni from Stanford University, works in similar industry"
        },
        {
            name: "Alex Rodriguez",
            headline: "CTO at StartupLabs",
            mutualConnections: 5,
            reason: "Active in San Francisco tech community, potential mentor"
        }
    ];
}

function generateJobRecommendations(profile) {
    // Mock recommendations
    return [
        {
            title: "Lead Full-Stack Developer",
            company: "CloudTech",
            location: "San Francisco, CA",
            match: "92%",
            reason: "Matches your JavaScript and cloud experience"
        },
        {
            title: "Senior Python Engineer",
            company: "DataSystems",
            location: "Remote",
            match: "88%",
            reason: "Aligns with your Python expertise and data background"
        },
        {
            title: "Engineering Manager",
            company: "TechCorp",
            location: "San Francisco, CA",
            match: "85%",
            reason: "Internal promotion opportunity based on your tenure"
        }
    ];
}

// UI Update Functions
function displayProfile(profile) {
    profileName.textContent = profile.name;
    profileHeadline.textContent = profile.headline;
    profileLocation.textContent = profile.location;
    profileSummary.textContent = generateProfileSummary(profile);
    
    // Update profile picture (mock)
    const profilePicture = document.querySelector('.profile-picture');
    profilePicture.style.backgroundImage = "url('https://via.placeholder.com/300')";
}

function displayConnectionRecommendations() {
    const recommendations = generateConnectionRecommendations(currentProfile);
    connectionsList.innerHTML = '';
    
    recommendations.forEach(conn => {
        const card = document.createElement('div');
        card.className = 'connection-card';
        card.innerHTML = `
            <h3>${conn.name}</h3>
            <p>${conn.headline}</p>
            <p><small>${conn.mutualConnections} mutual connections</small></p>
            <p><em>${conn.reason}</em></p>
            <button class="connect-btn">Connect</button>
        `;
        connectionsList.appendChild(card);
    });
}

function displayJobRecommendations() {
    const recommendations = generateJobRecommendations(currentProfile);
    jobsList.innerHTML = '';
    
    recommendations.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} • ${job.location}</p>
            <p><strong>Match: ${job.match}</strong></p>
            <p>${job.reason}</p>
            <button class="apply-btn">Learn More</button>
        `;
        jobsList.appendChild(card);
    });
}

// Message Functionality
sendMessageBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // In a real implementation, this would send the message
        alert(`AI-generated message sent:\n\n${generateAIMessage(message)}`);
        messageInput.value = '';
    }
});

function generateAIMessage(userInput) {
    // In a real implementation, this would call an AI service
    return `Hi [Recipient's Name],

I noticed your profile and was particularly impressed by [specific detail]. ${userInput}

I'd love to connect and discuss potential opportunities to collaborate. Would you be available for a quick chat next week?

Best regards,
${currentProfile.name}`;
}

// Initialize the app
async function initApp() {
    // For demo purposes, we'll use a mock profile URL
    const profileUrl = "https://www.linkedin.com/in/johndoe";
    currentProfile = await fetchLinkedInProfile(profileUrl);
    
    if (currentProfile) {
        displayProfile(currentProfile);
        displayConnectionRecommendations();
        displayJobRecommendations();
    } else {
        alert("Failed to load profile data. Please try again later.");
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', initApp);