// Enhanced Dashboard Script - LinkedIn AI Agent

// Import advanced content generation
import { generateDailyPosts, schedulePosts } from './advanced-content.js';

// DOM Elements
const totalPosts = document.getElementById('totalPosts');
const scheduledPosts = document.getElementById('scheduledPosts');
const publishedPosts = document.getElementById('publishedPosts');
const engagementRate = document.getElementById('engagementRate');
const contentTableBody = document.getElementById('contentTableBody');
const generateDailyPostsBtn = document.getElementById('generateDailyPostsBtn');
const schedulePostsBtn = document.getElementById('schedulePostsBtn');

// State Management
let generatedPosts = [];
let scheduledContent = [];

// Initialize Dashboard
function initDashboard() {
    updateStats();
    updateContentTable();
    
    // Event Listeners
    generateDailyPostsBtn.addEventListener('click', handleGeneratePosts);
    schedulePostsBtn.addEventListener('click', handleSchedulePosts);
}

// Handle Post Generation
async function handleGeneratePosts() {
    try {
        generateDailyPostsBtn.disabled = true;
        generateDailyPostsBtn.textContent = 'Generating...';
        
        generatedPosts = await generateDailyPosts();
        updateContentTable();
        
        generateDailyPostsBtn.disabled = false;
        generateDailyPostsBtn.textContent = 'Generate Daily Posts';
    } catch (error) {
        console.error('Error generating posts:', error);
        alert('Error generating posts. Please try again.');
    }
}

// Handle Post Scheduling
async function handleSchedulePosts() {
    try {
        if (generatedPosts.length === 0) {
            alert('Please generate posts first');
            return;
        }
        
        schedulePostsBtn.disabled = true;
        schedulePostsBtn.textContent = 'Scheduling...';
        
        await schedulePosts(generatedPosts);
        scheduledContent = [...scheduledContent, ...generatedPosts];
        generatedPosts = [];
        
        updateStats();
        updateContentTable();
        
        schedulePostsBtn.disabled = false;
        schedulePostsBtn.textContent = 'Schedule Posts';
    } catch (error) {
        console.error('Error scheduling posts:', error);
        alert('Error scheduling posts. Please try again.');
    }
}

// Update Dashboard Stats
function updateStats() {
    totalPosts.textContent = scheduledContent.length;
    scheduledPosts.textContent = scheduledContent.filter(post => post.status === 'Scheduled').length;
    publishedPosts.textContent = scheduledContent.filter(post => post.status === 'Published').length;
    
    const totalEngagement = scheduledContent.reduce((sum, post) => {
        return sum + (post.engagement?.match(/\d+/)?.[0] || 0);
    }, 0);
    
    const avgEngagement = scheduledContent.length > 0 
        ? Math.round(totalEngagement / scheduledContent.length) 
        : 0;
        
    engagementRate.textContent = `${avgEngagement}%`;
}

// Update Content Table
function updateContentTable() {
    const allContent = [...generatedPosts, ...scheduledContent];
    
    contentTableBody.innerHTML = allContent
        .map(item => `
            <tr>
                <td>${item.date || new Date().toISOString().split('T')[0]}</td>
                <td>${item.title}</td>
                <td>${item.topic || 'AI/Finance'}</td>
                <td>
                    <div class="quality-score" style="background-color: ${getQualityColor(item.qualityScore || 0)};">
                        ${item.qualityScore || 'N/A'}%
                    </div>
                </td>
                <td><span class="status-badge ${(item.status || 'Generated').toLowerCase()}">${item.status || 'Generated'}</span></td>
                <td>${item.engagement || 'Not published yet'}</td>
                <td>
                    ${(item.actions || ['Preview', 'Edit']).map(action => 
                        `<button class="action-btn">${action}</button>`
                    ).join(' ')}
                </td>
            </tr>
        `)
        .join('');
}

// Start the Dashboard
document.addEventListener('DOMContentLoaded', initDashboard);