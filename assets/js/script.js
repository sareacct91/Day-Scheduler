// Global Variables
let curHour = dayjs().hour();

// Update the current time every second
setInterval(() => {
  curHour = dayjs().hour();
}, 1000);

//#region Functions
function checkTime(index) {
  index < curHour
    ? $(`#hour-${index}`).addClass("past")
    : index == curHour
    ? $(`#hour-${index}`).addClass("present")
    : $(`#hour-${index}`).addClass("future");
}

// Render the schedules saved in localstorage
function renderSchedule() {
  for (let i = 9; i <= 17; i++) {
    const text = localStorage.getItem(`hour-${i}`) || " ";
    $(`#hour-${i}`).children("textarea").val(text);
    checkTime(i);
  }
}

// Save the schedule in localstroage
function saveSchedule() {
  const textInput = $(this).siblings("textarea").val();
  const id = $(this).parent().attr("id");

  // save to localStorage
  localStorage.setItem(id, textInput);

  $('#confirmed').removeClass('d-none');
  setTimeout(() => {
    $('#confirmed').addClass('d-none');
  }, 2000);

}

function init() {
  // Display the current day at the top of the page
  $("#currentDay").text(`${dayjs().format("dddd, MMMM D")}`);
  renderSchedule();
  // eventListener for save button click
 $(".container-lg").on("click", ".saveBtn", saveSchedule); 
}
//#endregion functions

// Runs when the page finish loading
window.onload = () => {
  init();
};