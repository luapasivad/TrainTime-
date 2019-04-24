 $(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBF536Nb6zi0Oty-LggWoa43NvjOf_ud-w",
    authDomain: "traintime-58706.firebaseapp.com",
    databaseURL: "https://traintime-58706.firebaseio.com",
    projectId: "traintime-58706",
    storageBucket: "traintime-58706.appspot.com",
    messagingSenderId: "457133562984"
  };
  firebase.initializeApp(config);
//global variables
  var database = firebase.database()
  var name = ""
  var dest = ""
  var time = ""
  var freq = ""
      


  // submit button function
  $('#submit').on('click', function(event) {
    event.preventDefault()
    //grab textbox calues
    
      name = $('#train-name').val().trim()
      dest = $('#train-dest').val().trim()
      time = $('#train-time').val().trim()
      freq = $('#train-freq').val().trim()


    if (
      name != "" && 
      dest != "" && 
      time != "" && 
      freq != "" ) {
        if (time.includes(":") === true) {
        console.log(name, dest, time, freq)




        database.ref('/train').push({
          name: name,
          dest: dest,
          time: time,
          freq: freq

        })
      } else {
        alert('Please enter the correct time')
      }
    } else {
      alert('Please input all available fields')
    }
  })
  


  database.ref('/train').on('value', function(snapshot){
    
    $('.trains').remove()

    console.log(snapshot.val())
    var train = snapshot.val()
    var trainArr = Object.keys(train)

    console.log(trainArr)

    for(let i=0; i<trainArr.length; i++) {

      var nameTemp = train[trainArr[i]].name
      var destTemp = train[trainArr[i]].dest
      var freqTemp = train[trainArr[i]].freq
      var timeTemp = train[trainArr[i]].time
      var arrivalTemp;
      console.log(timeTemp)

      
      var trainMinTill = moment(timeTemp, 'LT').diff(moment(), 'minutes')
      console.log(trainMinTill)
      min(trainMinTill)

      //minute timing function
      function min(minLeft) {
        if (minLeft < 0) {
          trainMinTill = parseInt(minLeft) + parseInt(freqTemp)
          min(trainMinTill)
        } else {
          console.log(minLeft)
          console.log(arrivalTemp)
          trainMinTill = minLeft + " minutes left"
          arrivalTemp = moment().add(minLeft, 'minutes').add(1, 'm').format('LT')
          return
        }
      }

      
      $('#table-body').append(
        '<tr class="trains"><td scope="row">'+nameTemp+'</td><td>'+destTemp+'</td><td>'+freqTemp+'</td><td>'+arrivalTemp+'</td><td>'+trainMinTill+'</td></tr>'
        )
    }

  })


}) 
