// Global Variables
let curHour = dayjs().hour();

//#region Functions
function checkTime(index) {
  if (index < curHour) {
    $(`#hour-${index}`).addClass("past");
    $(`#hour-${index}`).removeClass("present");
    $(`#hour-${index}`).removeClass("future");

  } else if (index == curHour) {
    $(`#hour-${index}`).removeClass("past");
    $(`#hour-${index}`).addClass("present");
    $(`#hour-${index}`).removeClass("future");
      ;
  } else {
    $(`#hour-${index}`).removeClass("past");
    $(`#hour-${index}`).removeClass("present");
    $(`#hour-${index}`).addClass("future");
  }
}

// Render the schedules saved in localstorage
function renderSchedule() {
  for (let i = 9; i <= 17; i++) {
    const text = localStorage.getItem(`hour-${i}`) || " ";
    $(`#hour-${i}`).children("textarea").val(text);
    checkTime(i);
  }
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

    // Re-render the page
    renderSchedule();
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