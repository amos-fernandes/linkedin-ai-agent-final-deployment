// Performance Benchmarking
class PerformanceBenchmark {
  constructor() {
    this.metrics = {
      responseTime: [],
      successRate: 0,
      errorRate: 0
    };
  }

  startTimer() {
    return process.hrtime();
  }

  endTimer(startTime) {
    const diff = process.hrtime(startTime);
    return (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds
  }

  trackResponseTime(duration) {
    this.metrics.responseTime.push(duration);
    if (this.metrics.responseTime.length > 100) {
      this.metrics.responseTime.shift();
    }
  }

  trackSuccess() {
    this.metrics.successRate++;
  }

  trackError() {
    this.metrics.errorRate++;
  }

  getMetrics() {
    const totalRequests = this.metrics.successRate + this.metrics.errorRate;
    const avgResponseTime = this.metrics.responseTime.length > 0 ?
      this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length :
      0;
      
    // Calculate percentiles
    const sortedTimes = [...this.metrics.responseTime].sort((a, b) => a - b);
    const p95 = sortedTimes.length > 0 ?
      sortedTimes[Math.floor(sortedTimes.length * 0.95)] : 0;
      
    return {
      avgResponseTime: avgResponseTime.toFixed(2) + 'ms',
      p95ResponseTime: p95.toFixed(2) + 'ms',
      successRate: this.metrics.successRate,
      errorRate: this.metrics.errorRate,
      successPercentage: totalRequests > 0 ?
        ((this.metrics.successRate / totalRequests) * 100).toFixed(2) + '%' : '0%',
      totalRequests
    };
  }
}

module.exports = PerformanceBenchmark;