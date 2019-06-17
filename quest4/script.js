var urlString = $(location).attr("href");
var url = new URL(urlString);
try {
  var id = url.searchParams.get("id");
  $("#inputID").val(id.toString());
} catch (err) {}
$(".submitEditUser").click(function () {
  editUser();
});

function getAllUsers() {
  axios.get('https://sb-oil-web-bootcamp.herokuapp.com/users')
    .then(function (response) {
      console.log(response);
      var allData = response.data;
      n = allData.data.length;
      $("#show").html("");
      var eachMember;
      for (var i = 0; i < n; i++) {
        var member = allData.data[i];
        var id = member.id;
        var name = member.name;
        var surname = member.surname;
        var nickname = member.nickname;
        var gender = member.gender;
        var image = member.image;

        eachMember = $("<div/>", {
          id: 'member' + id,
          class: "eachMember"
        });
        eachMember.appendTo($("#show"));

        var whiteBox = $("<div/>", {
          class: "whiteBox"
        });
        whiteBox.appendTo(eachMember);

        var h1 = $("<h1></h1>").text(id + ") " + nickname);
        h1.appendTo(whiteBox);

        var img = $('<img/>', {
          src: image,
        });
        img.appendTo(whiteBox);

        var h2 = $("<h2></h2>").html(name + " " + surname + "<br>(" + gender + ")");
        h2.appendTo(whiteBox);

        var a = $("<a/>", {
          id: "a" + id,
          class: "a",
          href: "#deleteUser"
        });
        a.appendTo(eachMember);
        $('.a').click(function () {
          createEditUserForm((this.id).substring(1, ));
          return false;
        });

        var editIcon = $('<img/>', {
          src: '../img/editIcon.svg',
          class: 'editIcon'
        });
        editIcon.appendTo(a);

        var a2 = $("<a/>", {
          id: "a2" + id,
          class: "a2",
          href: "#deleteUser"
        });
        a2.appendTo(eachMember);
        $('.a2').click(function () {
          deleteUser((this.id).substring(2, ));
        });

        var deleteIcon = $('<img />', {
          src: '../img/deleteIcon.svg',
          id: "d2" + id,
          class: 'deleteIcon'
        });
        deleteIcon.appendTo(a2);
      }
      if (n == 0) {
        eachMember += '<div class=divDog> <img id="dogIMG" src="img/dog.svg"> </img> </div>';
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

function createUser() {
  hideForm();
  var name = $("[name='name']").val();
  var surname = $("[name='surname']").val();
  var nickname = $("[name='nickname']").val();
  var image = $("[name='image']").val();
  var gender = $("[name='gender']:checked").val();
  var text = "name=" + name + "&surname=" + surname + "&nickname=" + nickname + "&gender=" + gender + "&image=" + image;
  var xmlhttp = new XMLHttpRequest();
  var str = "";

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
      if (status == 0) {
        errMessage = obj.error;
        $("createUserForm").trigger("reset");
        alert(errMessage);
        unhideForm();
      } else {
        getAllUsers();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteUser() {
  hideForm();
  var id = $("[name='id']").val();
  axios.delete('https://sb-oil-web-bootcamp.herokuapp.com/users/' + id)
    .then(function (response) {
      console.log(response);
      var obj = response.data;
      var status = obj.status;
      if (status == 0) {
        errMessage = obj.error;
        $("userForm").trigger("reset");
        alert(errMessage);
        unhideForm();
      } else {
        getAllUsers();
      }
    })
    .catch(function (error) {
      console.log(error);
    })

}

function deleteUser(id) {
  load();
  axios.delete('https://sb-oil-web-bootcamp.herokuapp.com/users/' + id)
    .then(function (response) {
      console.log(response);
      var obj = response.data;
      var status = obj.status;
      if (status == 0) {
        errMessage = obj.error;
        //alert(errMessage);
      } else {
        getAllUsers();
      }
    })
    .catch(function (error) {
      console.log(error);
    })

}

function createEditUserForm(id) {
  id = id.toString();
  location = "../html/edit_user.html?id=" + id;
}

function editUser() {
  hideForm();
  var id = $("[name='id']").val();
  var name = $("[name='name']").val();
  var surname = $("[name='surname']").val();
  var nickname = $("[name='nickname']").val();
  var image = $("[name='image']").val();
  var gender = $("[name='gender']:checked").val();

  axios.post('https://sb-oil-web-bootcamp.herokuapp.com/users/' + id, {
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
      if (status == 0) {
        errMessage = obj.error;
        $("editUserForm").trigger("reset");
        alert(errMessage);
        unhideForm();
      } else {
        getAllUsers();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function hideForm() {
  $("#hiddenForm").hide();
}

function unhideForm() {
  $("#hiddenForm").show();
}

function load() {
  $("#show").html('<img id="loadingSign" src="../img/loading_sign.gif"> </img>');
}