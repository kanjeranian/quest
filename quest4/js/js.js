function getAllUsers(){
    axios.get('https://sb-oil-web-bootcamp.herokuapp.com/users')
    .then(function (response) {
      console.log(response);
      var allData = response.data;
      n = allData.data.length;
      
      document.getElementById("show").innerHTML = "";/////////////////

      for(var i=0; i<n; i++){
          var member = allData.data[i];
          var id = member.id;
          var name = member.name;
          var surname = member.surname;
          var nickname = member.nickname;
          var gender = member.gender;
          var image = member.image;

          var eachMember = document.createElement('div');///////////////
          eachMember.className='eachMember';
          eachMember.id='member'+id;

          whiteBox = document.createElement('div');///////////////
          whiteBox.className='whiteBox';

          h1 = document.createElement('h1');///////////////
          h1.innerHTML=id+") "+nickname;

          img = document.createElement('img');///////////////
          img.id='a'+id;
          img.src=image;

          h2 = document.createElement('h2');///////////////
          h2.innerHTML = name+" "+surname+"<br>("+gender+")";

          br = document.createElement('br');///////////////

          a = document.createElement('a');///////////////
          a.id='a'+id;
          a.href='#deleteUser';
          a.onclick=function(){editUser2( (this.id).substring(1,) )}; 

          editIcon = document.createElement('img');///////////////
          editIcon.src = '../img/editIcon.svg';
          editIcon.className='editIcon'; 

          a2 = document.createElement('a');///////////////
          a2.id='a2'+id;
          a2.href='#deleteUser';
          a2.onclick=function(){deleteUser( (this.id).substring(2,) )}; 

          deleteIcon = document.createElement('img');///////////////
          deleteIcon.src = '../img/deleteIcon.svg';
          deleteIcon.className='deleteIcon'

          h7 = document.createElement('h7');///////////////
          h7.innerHTML = 'delete user';

          
          whiteBox.appendChild(h1);
          whiteBox.appendChild(img);
          whiteBox.appendChild(h2);
          
          a.appendChild(editIcon);
          a2.appendChild(deleteIcon); ///////

          eachMember.appendChild(whiteBox);
          eachMember.appendChild(br);
          eachMember.appendChild(a);
          eachMember.appendChild(a2);
          
          document.getElementById("show").appendChild(eachMember);///////////////
          
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
function editUser2(id){
  formBox = document.createElement('div');
  formBox.className='formBox';
  formBox.id='hiddenForm';

  var br = document.createElement('br');
  
  formBoxHead = document.createElement('div');
  formBoxHead.className='formBoxHead';
  e = document.createElement('p');
  e.innerHTML='EDIT USER';
  formBoxHead.appendChild(e);
  
  var formBoxBody = document.createElement('div');
  formBoxBody.className='formBoxBody';
  
  var form = document.createElement('form');
  form.id='editUserForm';
  
  var iid = document.createElement('input');
  iid.setAttribute("type", "text");
  iid.setAttribute("name", "id");
  iid.setAttribute("placeholder", "USER ID");
  iid.setAttribute("value", id);
  form.appendChild(iid);
  form.appendChild(br);
  
  var name = document.createElement('input');
  name.setAttribute("type", "text");
  name.setAttribute("name", "name");
  name.setAttribute("placeholder", "NAME");
  form.appendChild(name);
  var br2 = document.createElement('br');
  form.appendChild(br2);
  
  var surname = document.createElement('input');
  surname.setAttribute("type", "text");
  surname.setAttribute("name", "surname");
  surname.setAttribute("placeholder", "SURNAME");
  form.appendChild(surname);
  var br = document.createElement('br');
  form.appendChild(br);
  
  var nickname = document.createElement('input');
  nickname.setAttribute("type", "text");
  nickname.setAttribute("name", "nickname");
  nickname.setAttribute("placeholder", "NICKNAME");
  form.appendChild(nickname);
  var br = document.createElement('br');
  form.appendChild(br);
  
  var image = document.createElement('input');
  image.setAttribute("type", "text");
  image.setAttribute("name", "image");
  image.setAttribute("placeholder", "IMAGE (LINK)");
  form.appendChild(image);
  var br = document.createElement('br');
  form.appendChild(br);
  
  var radio = document.createElement('div');
  radio.className='radio';
  
  var ra1 = document.createElement('input');
  ra1.setAttribute("type", "radio");
  ra1.setAttribute("name", "gender");
  ra1.setAttribute("value", "female");
  radio.appendChild(ra1);
  
  var ra11 = document.createElement('none');
  ra11.innerHTML=" female ";
  radio.appendChild(ra11);
  
  
  var ra2 = document.createElement('input');
  ra2.setAttribute("type", "radio");
  ra2.setAttribute("name", "gender");
  ra2.setAttribute("value", "male");
  radio.appendChild(ra2);

  var ra22 = document.createElement('none');
  ra22.innerHTML=" male ";
  radio.appendChild(ra22);

  form.appendChild(radio);

  formBoxBody.appendChild(form);
  
  var button = document.createElement('button');
  button.className="submit";
  button.onclick=function(){editUser();}
  button.innerHTML="submit";


  formBox.appendChild(formBoxHead);
  formBox.appendChild(formBoxBody);
  formBox.appendChild(button);
  
  document.getElementById("show").innerHTML = "";
  document.getElementById("show").appendChild(formBox);
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
