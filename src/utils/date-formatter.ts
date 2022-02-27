class DateFormatter {
  getCurrentTime(): Date {
    return new Date();
  }

  getTimeDifferenceBetweenTwoDates(d1: Date, d2: Date): number {
    return Math.abs((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
  }

  formatDateIntoStringDifferenceBetweenTwoDates(
    timeSinceCreated: number
  ): string {
    if (timeSinceCreated < 1) {
      return `${Math.floor(timeSinceCreated * 24)} hours ago`;
    } else if (timeSinceCreated >= 1 && timeSinceCreated < 30) {
      return `${Math.floor(timeSinceCreated)} days ago`;
    } else {
      return `${Math.floor(timeSinceCreated / 30)} months ago`;
    }
  }
}

export default new DateFormatter();
