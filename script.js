window.onload = populateSelect();
var selectedRow = null;

function populateSelect() {
  //get json data for category
  var request = new XMLHttpRequest(),
    method = "GET",
    overrideMimeType = "application/json",
    url = "dummy.json";

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      var categoryJSON = JSON.parse(request.responseText);
      console.log(categoryJSON);

      var options = document.getElementById("pendidikan");
      for (var i = 0; i < categoryJSON.length; i++) {
        options.innerHTML =
          options.innerHTML +
          `<option value="${categoryJSON[i].category_name}">${categoryJSON[i].category_name}</option>`;
      }
    }
  };
  // console.log(request);
  request.open(method, url, true);
  request.send();
}

function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow == null) {
    insertData(formData);
  } else {
    updatedData(formData);
  }
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["nama"] = document.getElementById("nama").value;
  formData["pendidikan"] = document.getElementById("pendidikan").value;
  formData["institusi"] = document.getElementById("institusi").value;
  //   console.log(formData);
  return formData;
}

function insertData(data) {
  var table = document
    .getElementById("tableList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.nama;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.pendidikan;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.institusi;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<button class="btn btn-warning" onClick="onEdit(this)">Edit</button>
                        <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>`;
  //alert
  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: "Data berhasil ditambahkan!",
  });
}

function resetForm() {
  document.getElementById("nama").value = "";
  //reset dropdown
  selectedCategory = document.getElementById("pendidikan");
  selectedCategory.selectedIndex = 0;

  document.getElementById("institusi").value = "";
  selectedRow = null;
}

function onEdit(data) {
  selectedRow = data.parentElement.parentElement;
  document.getElementById("nama").value = selectedRow.cells[0].innerHTML;
  document.getElementById("pendidikan").value = selectedRow.cells[1].innerHTML;
  document.getElementById("institusi").value = selectedRow.cells[2].innerHTML;
}

function updatedData(formData) {
  selectedRow.cells[0].innerHTML = formData.nama;
  selectedRow.cells[1].innerHTML = formData.pendidikan; 
  selectedRow.cells[2].innerHTML = formData.institusi;
  //alert
  Swal.fire({
    icon: "question",
    title: "Edit Data",
    text: "Data akan diubah secara permanen! tetap melanjutkan?",
    showCancelButton: true,
    cancelButtonText: "Kembali",
    confirmButtonText: "Edit",
  }).then((result) => {
    if (result.isConfirmed) {
       
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil diubah!",
      });
    }
  });
}

function onDelete(data) {
  Swal.fire({
    icon: "warning",
    title: "Hapus Data",
    text: "Data akan dihapus secara permanen! tetap melanjutkan?",
    showCancelButton: true,
    cancelButtonText: "Kembali",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      row = data.parentElement.parentElement;
      document.getElementById("tableList").deleteRow(row.rowIndex);
      resetForm();
    }
  });
}
