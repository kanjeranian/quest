const axios = require('axios');

axios.get('https://sb-oil-web-bootcamp.herokuapp.com/users')
    .then(function (response) {
        var allData = response.data;
        for (var i = 0; i < allData.data.length; i++) {
            console.log(allData.data[i].nickname);
        }
    })
    .catch(function (error) {
        console.log(error);
    });