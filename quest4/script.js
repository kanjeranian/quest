function getAllUsers(){
  var xmlhttp = new XMLHttpRequest();
  var eachMember="";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var allData = JSON.parse(this.responseText);
      n = allData.data.length;
      for(var i=0; i<n; i++){
          var member = allData.data[i];
          var id = member.id;
          var name = member.name;
          var surname = member.surname;
          var nickname = member.nickname;
          var gender = member.gender;
          var img = member.image;

          eachMember+='<div class="eachMember"><div class="whiteBox"><h1>';
          eachMember+=id;
          eachMember+=') ';
          eachMember+=nickname;
          eachMember+='</h1><img src="';
          eachMember+=img;    
          eachMember+='"> </img><h2>';
          eachMember+=name+" "+surname;
          eachMember+='</br>(';
          eachMember+=gender;
          //eachMember+=')</h2><!--whiteBox--></div></br><a href="#deleteUser"> <img src="img/greyBin.svg"> </img> <h7>delete user</h7> </a><!--eachMember--></div>';
          eachMember+=')</h2><!--whiteBox--></div><!--eachMember--></div>';
      } 
      if(n==0){
        eachMember+='<div class=divDog> <img id="dogIMG" src="img/dog.svg"> </img> </div>';
      }
      document.getElementById("show").innerHTML = eachMember;
    }
  };
  xmlhttp.open("GET", "https://sb-oil-web-bootcamp.herokuapp.com/users", true);
  xmlhttp.send();
}

function createUser(){
  var name    = document.getElementById("createUserForm").elements.namedItem("name").value;
  var surname = document.getElementById("createUserForm").elements.namedItem("surname").value;
  var nickname = document.getElementById("createUserForm").elements.namedItem("nickname").value;
  var gender = document.getElementById("createUserForm").elements.namedItem("gender").value;
  var image = document.getElementById("createUserForm").elements.namedItem("image").value;
  var text = "name="+name+"&surname="+surname+"&nickname="+nickname+"&gender="+gender+"&image="+image;
  var xmlhttp = new XMLHttpRequest();
  var str="";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      status = obj.status;
      if(status==0){
        errMessage=obj.error;
        document.getElementById("createUserForm").reset();
        alert(errMessage);
      }else{
        getAllUsers();
      }
    }
  };
  xmlhttp.open("POST", "https://sb-oil-web-bootcamp.herokuapp.com/users", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //xmlhttp.send("name=Budsakorn&surname=Kosakrit&nickname=Hming&gender=female&image=https://i.ibb.co/Rv0ftN4/30168036-1667714573297048-1860097252479887139-o.jpg");
  xmlhttp.send(text);
}

function editUser(){
  var id        = document.getElementById("editUserForm").elements.namedItem("id").value;
  var name      = document.getElementById("editUserForm").elements.namedItem("name").value;
  var surname   = document.getElementById("editUserForm").elements.namedItem("surname").value;
  var nickname  = document.getElementById("editUserForm").elements.namedItem("nickname").value;
  var gender    = document.getElementById("editUserForm").elements.namedItem("gender").value;
  var image     = document.getElementById("editUserForm").elements.namedItem("image").value;
  
  var text="";

  if(name!="")    { text+="name="+name;         }
  if(surname!="")  { text+="surname="+surname;   }
  if(nickname!=""){ text+="nickname="+nickname; }
  if(gender!="")  { text+="gender="+gender;     }
  if(image!="")   { text+="image="+image;       }
  
  var xmlhttp = new XMLHttpRequest();
  var str="";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      status = obj.status;
      if(status==0){
        errMessage=obj.error;
        document.getElementById("editUserForm").reset();
        alert(errMessage);
      }else{
        getAllUsers();
      }
    }
  };
  
  xmlhttp.open("POST", "https://sb-oil-web-bootcamp.herokuapp.com/users/"+id, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xmlhttp.send("name=Budsakorn&surname=Kosakrit&nickname=ming&gender=female&image=https://i.ibb.co/Rv0ftN4/30168036-1667714573297048-1860097252479887139-o.jpg");
  xmlhttp.send(text);
  // document.getElementById("show").innerHTML = text;
}

function deleteUser(){
  var id        = document.getElementById("userForm").elements.namedItem("id").value;
  
  var xmlhttp = new XMLHttpRequest();
  var str="";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      status = obj.status;
      if(status==0){
        errMessage=obj.error;
        document.getElementById("userForm").reset();
        alert(errMessage);
      }else{
        getAllUsers();
      }
    }
  };
  xmlhttp.open("DELETE", "https://sb-oil-web-bootcamp.herokuapp.com/users/"+id, true);
  xmlhttp.send();
}

