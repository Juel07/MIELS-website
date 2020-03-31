function openForm() {
  document.getElementById("reserveForm").style.display = "block";
}

function validateForm() {
  var x = document.forms["reservation-form"]["cName"].value;
  if (x == "") {
    alert("Please provide your name");
    return false;
  }
}



function closeForm() {
    document.getElementById("reserveForm").style.display = "none";
  }