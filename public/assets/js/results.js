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
      const items1 = [{
          id: childKey,
          accuracy: childData.accuracy,
          date: childData.date,
          score: childData.score
      }];
      console.log(snapshot.numChildren()); 

      loadTableData(items1);
  })
})