

function getAllUsers(){
    axios.get('https://sb-oil-web-bootcamp.herokuapp.com/users')
    .then(function (response) {
      console.log(response);
      var allData = response.data;
      n = allData.data.length;
      
      $("#show").html("");

      for(var i=0; i<n; i++){
          var member = allData.data[i];
          var id = member.id;
          var name = member.name;
          var surname = member.surname;
          var nickname = member.nickname;
          var gender = member.gender;
          var image = member.image;

          var eachMember = $("<div/>", {
            id : 'member'+id,
            class : "eachMember"
          });
          eachMember.appendTo($("#show"));
          
          var whiteBox = $("<div/>", {
            class : "whiteBox"
          });
          whiteBox.appendTo(eachMember);

          var h1 = $("<h1></h1>").text(id+") "+nickname);
          h1.appendTo(whiteBox);

          var img = $('<img/>', { 
            src: image,
          });
          img.appendTo(whiteBox);

          var h2 = $("<h2></h2>").html(name+" "+surname+"<br>("+gender+")");
          h2.appendTo(whiteBox);
          
          var a = $("<a/>", {
            id   : "a"+id,
            class : "a",
            href : "#deleteUser"
          });
          a.appendTo(eachMember);
          $('.a').click(function(){ editUser2( (this.id).substring(1,) ); return false; });
          
          var editIcon = $('<img/>', { 
            src: '../img/editIcon.svg',
            class: 'editIcon'
          });
          editIcon.appendTo(a);
          
          var a2 = $("<a/>", {
            id   : "a2"+id,
            class : "a2",
            href : "#deleteUser"
          });
          a2.appendTo(eachMember);
          $('.a2').click(function(){ deleteUser( (this.id).substring(2,) ); return false; });

          var deleteIcon = $('<img />', { 
            src: '../img/deleteIcon.svg',
            class: 'deleteIcon'
          });
          deleteIcon.appendTo(a2);
      } 
      if(n==0){
        eachMember+='<div class=divDog> <img id="dogIMG" src="img/dog.svg"> </img> </div>';
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

function createUser(){
  hideForm();
  var name      = $("[name='name']").val();
  var surname   = $("[name='surname']").val();
  var nickname  = $("[name='nickname']").val();
  var gender    = $("[name='gender']").val();
  var image     = $("[name='image']").val();
 
  var text = "name="+name+"&surname="+surname+"&nickname="+nickname+"&gender="+gender+"&image="+image;
  var xmlhttp = new XMLHttpRequest();
  var str="";

  axios.post('https://sb-oil-web-bootcamp.herokuapp.com/users', {
    name: name,
    surname: surname,
    nickname: nickname,
    gender: gender,
    image: image
  })
  .then(function (response) {
    console.log(response);
    var obj = response.data;
    var status = obj.status;
    if(status==0){
      errMessage=obj.error;
      $("createUserForm").trigger("reset"); 
      alert(errMessage);
      unhideForm();
    }else{
      getAllUsers();
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
function editUser2(id){
  // location.replace("../html/edit_user.html");
  location = "../html/edit_user.html";
  // $(".formBoxBody").html("");
  // $("#show").html("");
}
function editUser(){
  hideForm();
  var id        = $("[name='id']").val();
  var name      = $("[name='name']").val();
  var surname   = $("[name='surname']").val();
  var nickname  = $("[name='nickname']").val();
  var gender    = $("[name='gender']").val();
  var image     = $("[name='image']").val();

  axios.post('https://sb-oil-web-bootcamp.herokuapp.com/users/'+id, {
    name: name,
    surname: surname,
    nickname: nickname,
    gender: gender,
    image: image
  })
  .then(function (response) {
    console.log(response);
      var obj = response.data;
      var status = obj.status;
      if(status==0){
        errMessage=obj.error;
        $("editUserForm").trigger("reset"); 
        unhideForm();
      }else{
        getAllUsers();
      }
  })
  .catch(function (error) {
    console.log(error);
  });

}

function deleteUser(id){
  axios.delete('https://sb-oil-web-bootcamp.herokuapp.com/users/'+id)
  .then(function (response) {
    console.log(response);
    var obj = response.data;
    var status = obj.status;
    if(status==0){
      errMessage=obj.error;
      alert(errMessage);
    }else{
      getAllUsers();
    }
  })
  .catch(function (error) {
    console.log(error);
  })

}
function hideForm(){
  $("#hiddenForm").hide();
}
function unhideForm(){
  $("#hiddenForm").show();
}
