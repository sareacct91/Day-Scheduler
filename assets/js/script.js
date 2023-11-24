// Global Variables
let curHour = dayjs().hour();

//#region Functions
function checkTime() {
  for (let i = 9; i <= 17; i++) {
    if (i < curHour) {
      $(`#hour-${i}`).addClass("past");
      $(`#hour-${i}`).removeClass("present");
      $(`#hour-${i}`).removeClass("future");
  
    } else if (i == curHour) {
      $(`#hour-${i}`).removeClass("past");
      $(`#hour-${i}`).addClass("present");
      $(`#hour-${i}`).removeClass("future");
        ;
    } else {
      $(`#hour-${i}`).removeClass("past");
      $(`#hour-${i}`).removeClass("present");
      $(`#hour-${i}`).addClass("future");
    }
  }
}

// Render the schedules saved in localstorage
function renderSchedule() {
  for (let i = 9; i <= 17; i++) {
    const text = localStorage.getItem(`hour-${i}`) || " ";
    $(`#hour-${i}`).children("textarea").val(text);
  }
  checkTime();
}

function removeSchedule() {
  const id = $(this).parent().attr("id");

  // Remove the schedule
  $(this).siblings("textarea").val('');
  localStorage.setItem(id, " ");
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

  // Render the page
  renderSchedule();

  // Update every second
  setInterval(() => {
    // Update the current time
    curHour = dayjs().hour();

    // Update the time slot color
    checkTime();
  }, 1000);

  // eventListener for save button click
  $(".container-lg").on("click", ".saveBtn", saveSchedule); 
// eventListener for remove button click
  $(".container-lg").on("click", ".removeBtn", removeSchedule); 
}
//#endregion functions

// Runs when the page finish loading
window.onload = () => {
  init();
};