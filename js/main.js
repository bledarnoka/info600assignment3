document.addEventListener('DOMContentLoaded', assignClickHandler)


document.addEventListener('DOMContentLoaded', assignClickHandlerLoadData)



function assignClickHandler() {

  document.getElementById('addRec').addEventListener('click', function () {

    const startYear = document.getElementById('startYear').value

    if (startYear <= 2000) {
      window.alert('Incorrect year: ' + startYear)
      return
    }

    const fullName = document.getElementById('fullName').value

    const major = document.getElementById('major').value

    const date = new Date()

    const time = date.getHours() + ':' + date.getMinutes()

    const newEntry = time + ' - ' + fullName + ', ' + major + ', ' + startYear

    const enteredRecords = document.getElementById('enteredRecords')

    let ne = document.createElement('li')

    ne.append(document.createTextNode(newEntry))
    $.ajax({
				method: 'POST',
				url: '/users',
				type: 'POST',

				cache: false,
				data: {
					fullName:$('#fullName').val(),
					major:$('#major').val(),
					startYear: $('#startYear').val(),
				}
			});
			console.log("it is working");
      document.getElementById('inputs').reset();
			});

			}

function assignClickHandlerLoadData() {

  document.getElementById('loadData').addEventListener('click', function () {

    var theRequest = new XMLHttpRequest();

    theRequest.open('GET', '/users') // hitting the URL to retrieve the student objects

    theRequest.onload = function () {

      var theData = JSON.parse(theRequest.responseText) // parsing the String response into JSON format


      for (i = 0; i < theData.records.length; i++) { // looping through the JSON objects (i.e. students)

        var fullName = theData.records[i].fullName

        var major = theData.records[i].major

        var startYear = theData.records[i].startYear

      	$("#enteredRecords").append(theData.records[i].fullName + " , " + theData.records[i].major + " ,  " + theData.records[i].startYear + "<button value='" +theData.records[i].id+ "' id ='deleteData'>Delete</button>" +"<br>" );

      }


    }

    theRequest.send();

  })

  $(document).on("click","#deleteData", function deleteData()
                {
                  const id = $(this).val();
                  console.log(id);
                  $.ajax
                  ({
                    url: '/user/'+ id,
                    method: 'DELETE',

                  });

                  alert("Record deleted");

                  var theRequest = new XMLHttpRequest();

                  theRequest.open('GET', '/users') // hitting the URL to retrieve the student objects

                   theRequest.onload = function() {

                    var theData = JSON.parse(theRequest.responseText) // parsing the String response into JSON format


                    for (i = 0; i < theData.records.length; i++) { // looping through the JSON objects (i.e. students)

                      var fullName = theData.records[i].fullName

                      var major = theData.records[i].major

                      var startYear = theData.records[i].startYear

                    	$("#enteredRecords").append(theData.records[i].fullName + " , " + theData.records[i].major + " ,  " + theData.records[i].startYear + "<button value='" +theData.records[i].id+ "' id ='deleteData'>Delete</button>" +"<br>" );

                    }

                  }
                });
}