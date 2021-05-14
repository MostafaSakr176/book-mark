var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitButton = document.getElementById("submitButton");

var currentIndex ; //to stor the current index


var bookMarkContainer ;
if(localStorage.getItem("bookMarkContainer") == null){
    bookMarkContainer = [];
}else{
    bookMarkContainer = JSON.parse(localStorage.getItem("bookMarkContainer"));
    displayBookMark();
}


function submit(){
    if(submitButton.innerText == "ubdate"){
        ubdateBookMark();
    }else{
        if(validateInputs() == true){
            if(validateBookMarkName() == true){
                if(validateBookMarkUrl() == true){
                    var bookMark = {
                    name : siteName.value ,
                    siteURL : siteUrl.value
                    }
                    bookMarkContainer.push(bookMark);
                    localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkContainer));
                    displayBookMark();
                    clearForm();
                }else{
                window.alert("URL must be start with 'www.' and end with '.com' !")
                }
            }else{
                window.alert("Name must be the first litter capital and contain (3-8) litters !")
            }
        }else{
            alert("all inputs are required !")
        }
    }
}

function displayBookMark(){
    var cartona = ``;
    for(var i = 0 ; i<bookMarkContainer.length ; i++){
        cartona += `<div class="webwell row" id="mostafa"><h2>${bookMarkContainer[i].name}</h2>
                    <a class="btn btn-primary" href="http://${siteUrl.value}" target="_blank">visit</a>
                    <button class="btn btn-danger btndelete" onclick="deleteBookMark(${i})">Delete</button>
                    <button class="btn btn-info btndelete" onclick="getData(${i})">ubdate</button></div>`;
    }
    document.getElementById("bookmarkList").innerHTML = cartona;
}

function deleteBookMark(index){
    bookMarkContainer.splice(index,1);
    localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkContainer));
    displayBookMark();
}

function getData(index){
    currentIndex = index ; 

    siteName.value = bookMarkContainer[index].name ;
    siteUrl.value = bookMarkContainer[index].siteURL ;
    submitButton.innerText = "ubdate" ;
}

function ubdateBookMark(){
    if(validateInputs() == true){
        if(validateBookMarkName() == true){
            if(validateBookMarkUrl() == true){
                bookMarkContainer[currentIndex].name = siteName.value ;
                bookMarkContainer[currentIndex].siteURL = siteUrl.value ;

                localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkContainer));
                
                displayBookMark();
                clearForm();
                submitButton.innerText = "submit" ;
            }else{
                alert("URL must be start with 'www.' and end with '.com' !")
            }
        }else{
            alert("Name must be the first litter capital and contain (3-8) litters !")
        }
    }else{
        alert("all inputs are required !")
    }
    
}

function validateInputs(){
    if(siteName.value !='' && siteUrl.value !=''){
        return true ;
    }else{
        return false ;
    }
}

function validateBookMarkName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(siteName.value) == true){
        return true;
    }else{
        return false;
    }
    
}

function validateBookMarkUrl(){
    var regex = /^(www.)([a-z]*|[A-Z]*)(.com)$/;
    if(regex.test(siteUrl.value) == true){
        return true;
    }else{
        return false;
    }
    
}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}