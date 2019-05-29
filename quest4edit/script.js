function getAllUsers(){
  //var eachMember="";
    axios.get('https://sb-oil-web-bootcamp.herokuapp.com/users')
    .then(function (response) {
      console.log(response);
      var allData = response.data;
      n = allData.data.length;
      document.getElementById("show").innerHTML = "";
      for(var i=0; i<n; i++){
          var member = allData.data[i];
          var id = member.id;
          var name = member.name;
          var surname = member.surname;
          var nickname = member.nickname;
          var gender = member.gender;
          var image = member.image;

          var eachMember = document.createElement('div');
          eachMember.className='eachMember';

          whiteBox = document.createElement('div');
          whiteBox.className='whiteBox';

          h1 = document.createElement('h1');
          h1.innerHTML=id+") "+nickname;

          img = document.createElement('img');
          img.src=image;

          h2 = document.createElement('h2');
          h2.innerHTML = name+" "+surname+"<br>("+gender+")";

          br = document.createElement('br');

          a = document.createElement('a');
          a.id='a'+id;
          a.href='#deleteUser';
          a.onclick=function(){deleteUser( (a.id).substring(1,) )}; /////////////

          bin = document.createElement('img');
          bin.src = '../img/greyBin.svg';

          h7 = document.createElement('h7');
          h7.innerHTML = 'delete user';

          
          whiteBox.appendChild(h1);
          whiteBox.appendChild(img);
          whiteBox.appendChild(h2);
          
          a.appendChild(bin);
          a.appendChild(h7);

          eachMember.appendChild(whiteBox);
          eachMember.appendChild(br);
          eachMember.appendChild(a);
  
          document.getElementById("show").appendChild(eachMember);
          

          // <div class="eachMember">
          //   <div class="whiteBox">
          //     <h1>id) nickname</h1>
          //     <img src="img"> </img>
          //     <h2>name+" "+surname</br>(gender)</h2>
          //   </div>
          //   </br>
          //   <a href="#deleteUser"> <img src="../img/greyBin.svg"> </img> <h7>delete user</h7> </a>
          // </div>



          // <div class="eachMember">
          //   <div class="whiteBox">
          //     <h1>id) nickname</h1>
          //     <img src="img"> </img>
          //     <h2>name+" "+surname</br>(gender)</h2>
          //   </div>
          //   </br>
          //   <a href="#deleteUser"> <img src="../img/greyBin.svg"> </img> <h7>delete user</h7> </a>
          // </div>
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
    var name    = document.getElementById("createUserForm").elements.namedItem("name").value;
    var surname = document.getElementById("createUserForm").elements.namedItem("surname").value;
    var nickname = document.getElementById("createUserForm").elements.namedItem("nickname").value;
    var gender = document.getElementById("createUserForm").elements.namedItem("gender").value;
    var image = document.getElementById("createUserForm").elements.namedItem("image").value;
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
        document.getElementById("createUserForm").reset();
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


function editUser(){
  hideForm();
  var id        = document.getElementById("editUserForm").elements.namedItem("id").value;
  var name      = document.getElementById("editUserForm").elements.namedItem("name").value;
  var surname   = document.getElementById("editUserForm").elements.namedItem("surname").value;
  var nickname  = document.getElementById("editUserForm").elements.namedItem("nickname").value;
  var gender    = document.getElementById("editUserForm").elements.namedItem("gender").value;
  var image     = document.getElementById("editUserForm").elements.namedItem("image").value;
  
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
        document.getElementById("editUserForm").reset();
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

function deleteUser(){
  hideForm();
  var id        = document.getElementById("userForm").elements.namedItem("id").value;
  axios.delete('https://sb-oil-web-bootcamp.herokuapp.com/users/'+id)
  .then(function (response) {
    console.log(response);
      var obj = response.data;
      var status = obj.status;
      if(status==0){
        errMessage=obj.error;
        document.getElementById("userForm").reset();
        alert(errMessage);
        unhideForm();
      }else{
        getAllUsers();
      }
  })
  .catch(function (error) {
    console.log(error);
  })

}

function deleteUser(id){
  axios.delete('https://sb-oil-web-bootcamp.herokuapp.com/users/'+id)
  .then(function (response) {
    console.log(response);
      var obj = response.data;
      var status = obj.status;
      if(status==0){
        errMessage=obj.error;
        document.getElementById("userForm").reset();
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
  document.getElementById("hiddenForm").style.visibility = "hidden";
}

function unhideForm(){
  document.getElementById("hiddenForm").style.visibility = "visible";
}

