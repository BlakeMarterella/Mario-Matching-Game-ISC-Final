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

  var table = new Tabulator("#results", {
    layout: "fitColumns", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    addRowPos: "top", //when adding a new row, add it to the top of the table
    history: true, //allow undo and redo actions on the table
    pagination: "local", //paginate the data
    paginationSize: 30, //allow 30 rows per page of data
    movableColumns: true, //allow column order to be changed
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
            editor: "none"
        },
        {
            title: "Accuracy",
            field: "accuracy",
            editor: "none"
        },
        {
            title: "Date",
            field: "date",
            editor: "none"
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