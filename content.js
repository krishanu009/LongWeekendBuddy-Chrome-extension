chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "testAlarm") {
        // Execute code to show a notification here
        chrome.runtime.sendMessage({ type: "show_notification" });
    }
});
