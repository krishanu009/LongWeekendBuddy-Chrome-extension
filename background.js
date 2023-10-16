
chrome.alarms.create("dailyCheck", {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1  
});

const holidays = ["2023-01-26","2023-03-08","2023-04-07","2023-08-15","2023-09-20","2023-10-02","2023-10-24", "2023-11-13", "2023-11-27", "2023-12-25"];
function findUpcomingLongWeekends(holidays) {
    // Create an array to store upcoming long weekends
    const upcomingLongWeekends = [];
  
    // Get the current date
    const currentDate = new Date();
  
    // Define the weekend days (Saturday and Sunday)
    const weekendDays = [0, 6]; // 0 represents Sunday, and 6 represents Saturday
  
    // Iterate through the holidays
    for (let i = 0; i < holidays.length; i++) {
      const holiday = new Date(holidays[i]);
  
      // Check if the holiday is after the current date
      if (holiday > currentDate) {
        const dayOfWeek = holiday.getDay(); // Get the day of the week (0-6)
  
        // Check if the holiday is on a Friday or Monday (making a long weekend)
        if (dayOfWeek === 1 || dayOfWeek === 5) {
          // Check if the day before the holiday is a weekend day
          const dayBefore = new Date(holiday);
          dayBefore.setDate(holiday.getDate() - 1);
  
          // Check if the day after the holiday is a weekend day
          const dayAfter = new Date(holiday);
          dayAfter.setDate(holiday.getDate() + 1);
  
          if (weekendDays.includes(dayBefore.getDay()) || weekendDays.includes(dayAfter.getDay())) {
            // Add the upcoming long weekend to the result
            upcomingLongWeekends.push(holiday);
          }
        }
      }
    }
  
    return upcomingLongWeekends;
  }

  function daysUntilNextWeek(dates) {
    // Get today's date
    const today = new Date();
  
    // Calculate one week (7 days) from today
    const oneWeekFromToday = new Date(today);
    oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7);
  
    // Convert the dates in the array to Date objects
    const dateObjects = dates.map(dateString => new Date(dateString));
  
    // Find the next date within a week
    const nextDateWithinWeek = dateObjects.find(date => date >= today && date <= oneWeekFromToday);
  
    if (nextDateWithinWeek) {
      // Calculate the number of days until the next date within a week
      const timeDifference = nextDateWithinWeek.getTime() - today.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return daysDifference;
    } else {
      return 0; // No date within a week found
    }
  }


chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "dailyCheck") {


        let val =  daysUntilNextWeek(findUpcomingLongWeekends(holidays));

        if(val)
        {

            chrome.notifications.create('test', {
                type: 'basic',
                iconUrl: 'icon1.png',
                title: 'Hey There!',
                message: 'you got an upcoming long weekend in ' + val + " days!",
                priority: 2
            });

        }
        
    }
});