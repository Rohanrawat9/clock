// Get the elements we need to update
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');
const hoursDisplay = document.querySelector('.hours');
const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');
const alarmList = document.querySelector('#alarm-list');

// Update the clock every second
setInterval(() => {
  // Get the current time
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Calculate the angles for the clock hands
  const hourAngle = (hours / 12) * 360 + 90;
  const minuteAngle = (minutes / 60) * 360 + 90;
  const secondAngle = (seconds / 60) * 360 + 90;

  // Update the clock hands
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `rotate(${secondAngle}deg)`;

  // Update the time display
  hoursDisplay.textContent = padZeroes(hours);
  minutesDisplay.textContent = padZeroes(minutes);
  secondsDisplay.textContent = padZeroes(seconds);
}, 1000);

// Add a leading zero to the time if necessary
function padZeroes(time) {
  return time.toString().padStart(2, '0');
}

// Handle setting an alarm
const setAlarmButton = document.querySelector('#set-alarm');
setAlarmButton.addEventListener('click', () => {
  const hoursInput = document.querySelector('#hours');
  const minutesInput = document.querySelector('#minutes');
  const secondsInput = document.querySelector('#seconds');
  const ampmInput = document.querySelector('#ampm');

  // Get the alarm time
  const alarmHours = parseInt(hoursInput.value);
  const alarmMinutes = parseInt(minutesInput.value);
  const alarmSeconds = parseInt(secondsInput.value);
  const alarmAmPm = ampmInput.value;

  // Calculate the alarm time in 24-hour format
  let alarm24Hours = alarmHours;
  if (alarmAmPm === 'PM' && alarmHours !== 12) {
    alarm24Hours += 12;
  } else if (alarmAmPm === 'AM' && alarmHours === 12) {
    alarm24Hours = 0;
  }

  // Create a new alarm and add it to the list
  const alarm = document.createElement('li');
  alarm.textContent = `${padZeroes(alarmHours)}:${padZeroes(alarmMinutes)}:${padZeroes(alarmSeconds)} ${alarmAmPm}`;
  alarmList.appendChild(alarm);

  // Schedule the alarm
  const now = new Date();
  const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarm24Hours, alarmMinutes, alarmSeconds);
  const timeUntilAlarm = alarmTime.getTime() - now.getTime();
  setTimeout(() => {
    alert('Alarm!');
  }, timeUntilAlarm);
});
