export function getCurrentDateAndTime() {
    const now = new Date();
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = now.toLocaleDateString('en-US', options);

    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZoneName: 'short',
    });
  
    return { date, time };
}