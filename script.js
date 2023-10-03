

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
  function formatDatesToString(dateArray) {
    const formattedDates = [];
  
    for (const dateString of dateArray) {
      const inputDate = new Date(dateString);
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
  
      const day = inputDate.getDate();
      const month = monthNames[inputDate.getMonth()];
  
      const dayString = getDayString(day);
      const formattedDate = `${dayString} ${month}`;
      formattedDates.push(formattedDate);
    }
  
    return formattedDates.join(', ');
  }
  function getDayString(day) {
    if (day >= 11 && day <= 13) {
      return day + 'th';
    }
    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  }

  function calUpcommingHoliday(holidays)
  {
    
    let i = 0;
    for (i = 0; i < holidays.length; i++) {
        const holiday = new Date(holidays[i]);
        const currentDate = new Date();

        if (holiday >= currentDate) {
          const dayOfWeek = holiday.getDay(); 
          break;
         
        }
      }
      let upcommingHoliday = "";
      if(i<holidays.length)
      {
        upcommingHoliday = new Date(holidays[i]);
        upcommingHoliday = "Upcomming Holiday on " +  upcommingHoliday.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit"
          });
      }
      else{
        upcommingHoliday = "No Holidays!!"
      }
      
      
      
      return upcommingHoliday;
  }
  
  // Example usage:
  const holidays = ["2023-01-26","2023-03-08","2023-04-07","2023-08-15","2023-09-20","2023-10-02","2023-10-24", "2023-11-13", "2023-11-27", "2023-12-25"];
  const upcomingLongWeekends = findUpcomingLongWeekends(holidays);
  const upcommingHoliday = calUpcommingHoliday(holidays);

async function fetchData() {
    // const res=await fetch ("https://api.coronavirus.data.gov.uk/v1/data");
    // const record=await res.json();
    document.getElementById("upcomming").innerHTML= "🏖️ " +upcommingHoliday + " 🏖️";
    document.getElementById("upcommingLongWeekend").innerHTML= upcomingLongWeekends.length > 0 ? "✈️ Upcomming Long Weekends on " + formatDatesToString(upcomingLongWeekends) + " 🏝️":  "No Long Weekends Left!";
    
}
fetchData();