// this note for show first all note
showNotes();

// Getting all element by Id or class
let addNote = document.getElementById("addNote");
let clearAll=document.getElementById('clearAll');
let search=document.getElementById('search');
let noteTitle = document.getElementById("noteTitle");
let noteText = document.getElementById("noteText");
let click = document.getElementById("click");


// adding to evenLinstener funcatio on add notes button for adding a work
addNote.addEventListener("click", function () {

  localStorage.setItem(`${noteTitle.value}`, `${noteText.value}`);

  showNotes();
  noteTitle.value = "";
  noteText.value = "";
});
// funcation for adding note by enter button
noteTitle.addEventListener("keyup", (e)=>{
  if(e.keyCode===13){
    addNote.click();
  }
})

// Adding funcation to clearAll button for clear all fucation
clearAll.addEventListener('click', ()=>{
  if(confirm('Do you want delete all the notes')){
    localStorage.clear();
    showNotes();
  }
})


// adding funcation on delete button for delete the work
function deleteWork(target){
  localStorage.removeItem(target);
  showNotes();
}

// Creating editBtn funcation 
function editbtn(currentElem){
  // Declearing varbile  
  let title=currentElem.previousElementSibling.previousElementSibling;
  let des=currentElem.previousElementSibling;
  let inputDes= document.createElement('textarea');
  let inputTitle= document.createElement('input');

  // funcation for give opction for edit funcation
  if(currentElem.innerText=="Edit"){
    currentElem.innerText="Done";
    inputDes.className="form-control";
    inputTitle.className="form-control";
    inputDes.value=des.innerText;
    inputTitle.value=title.innerText;
    // currentElem.parentElement.replaceChild(inputTitle, title);
    currentElem.parentElement.replaceChild(inputDes, des);
  }

  // funcation for set new value
  else{
    currentElem.innerText="Edit";
    let newTitle=document.createElement('b');
    let newDes=document.createElement('p');
    newTitle.classList="h5 card-title";
    newTitle.innerHTML=title.value;
    newDes.innerHTML=des.value;
    // currentElem.parentElement.replaceChild(newTitle, title);
    currentElem.parentElement.replaceChild(newDes, des);
    localStorage.setItem(title.value, des.value);


  }
}

// This funcation for show all notes
function showNotes() {
    let properties = Object.keys(localStorage);
    allNotes.innerHTML = "";

    for (let i = 0; i < properties.length; i++) {
      // "&nbsp" for the space between i and properties
      allNotes.innerHTML += `
      <div class="card mx-3 mb-3" style="width: 18rem;">
      <div class="card-body" >
      <b class="h5 card-title ">${i+1}.&nbsp</b>
      <b class="h5 card-title">${properties[i]}</b>
      <p class="card-text ms-2" >${localStorage[properties[i]]}</p>
      <button href="#" onclick="editbtn(this)" id="editbtn" class="mx-3 btn btn-warning">Edit</button>
      <button href="#" onclick="deleteWork('${properties[i]}')" class=" btn btn-primary">Delete</button>
      </div>
      </div>`;
    }
}

// Creating Search Funcation
search.addEventListener('input', ()=>{
  let data=search.value;
  let properties = Object.keys(localStorage);
    for (let i = 0; i < properties.length; i++) {
      if(localStorage[properties[i]].includes(data) || properties[i].includes(data)){
        console.log('ok');
      }

    }
})
