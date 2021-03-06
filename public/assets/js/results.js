const firebaseConfig = {
    apiKey: "AIzaSyCty60HL2t5UVK_bxpTKJYe7Qr2S9p9xjk",
    authDomain: "isc-mathcing-game.firebaseapp.com",
    databaseURL: "https://isc-mathcing-game-default-rtdb.firebaseio.com",
    projectId: "isc-mathcing-game",
    storageBucket: "isc-mathcing-game.appspot.com",
    messagingSenderId: "414403306402",
    appId: "1:414403306402:web:f6dcf1e33a383a065f48fb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  document.getElementById("yourScore").innerHTML += "</br>Matches: " + localStorage.getItem("score");
  document.getElementById("yourScore").innerHTML += "</br>Accuracy: " + localStorage.getItem("accuracy") + "%";

  var table = new Tabulator("#results", {
    placeholder:"Loading Data",
    layout: "fitColumn", //fit columns to width of table
    resizableRows: true, //allow row order to be changed
    initialSort: [ //set the initial sort order of the data
        {
            column: "matches",
            dir: "desc"
        },
    ],
    columns: [ //define the table columns
        {
            title: "Matches",
            field: "matches",
            width: 120,
        },
        {
            title: "Accuracy",
            field: "accuracy",
            width: 140,
        },
        {
            title: "Date",
            field: "date",
            width: 110,
        },
    ],
});


var databaseRef = firebase.database().ref('Score');

databaseRef.once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
      var childKey = childsnapshot.key;
      var childData = childsnapshot.val();

      table.addRow({
        matches: childData.score,
        accuracy: childData.accuracy,
        date: childData.date,
    });
  })
})