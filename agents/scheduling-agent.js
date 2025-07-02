// Intelligent Scheduling Agent
class SchedulingAgent {
  constructor(posts, timezone = 'UTC') {
    this.posts = posts;
    this.timezone = timezone;
    this.optimalTimes = [9, 12, 15, 18, 21]; // Optimal posting times
  }

  async schedule() {
    try {
      const scheduledPosts = this.posts.map((post, index) => {
        const scheduleTime = this.calculateOptimalTime(index);
        return {
          ...post,
          scheduleTime,
          status: 'Scheduled'
        };
      });

      return this.validateSchedule(scheduledPosts);
    } catch (error) {
      console.error('Scheduling error:', error);
      throw new Error('Failed to schedule posts');
    }
  }

  calculateOptimalTime(index) {
    const hour = this.optimalTimes[index % this.optimalTimes.length];
    const date = new Date();
    const utcTime = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      hour,
      0,
      0
    );
    
    return new Date(utcTime).toLocaleString('en-US', {
      timeZone: this.timezone,
      hour12: false
    });
  }

  validateSchedule(scheduledPosts) {
    // Ensure no time conflicts
    const times = new Set();
    for (const post of scheduledPosts) {
      if (times.has(post.scheduleTime)) {
        throw new Error('Time conflict detected');
      }
      times.add(post.scheduleTime);
    }
    return scheduledPosts;
  }
}

module.exports = SchedulingAgent;