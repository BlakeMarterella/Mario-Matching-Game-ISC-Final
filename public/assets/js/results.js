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
    layout: "fitData", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    pagination: "local", //paginate the data
    paginationSize: 15, //allow 30 rows per page of data
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
            widthGrow: 1
        },
        {
            title: "Accuracy",
            field: "accuracy",
            widthGrow: 1
        },
        {
            title: "Date",
            field: "date",
            widthGrow: 1
        },
    ],
});

  function loadTableData(items) {
    const table = document.getElementById("score");
    items.forEach(item => {
        let row = table.insertRow();
        let matches = row.insertCell(0);
        let accuracy = row.insertCell(1);
        let date = row.insertCell(2);
        matches.innerHTML = item.score;
        accuracy.innerHTML = item.accuracy;
        date.innerHTML = item.date;
     });
}


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