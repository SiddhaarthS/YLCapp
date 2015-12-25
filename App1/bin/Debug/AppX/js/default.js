// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	var responseString;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
			    // TODO: This application has been newly launched. Initialize your application here.
			    var username = "qqnehcGoop2eo4bIQfhE8eXsxBA6aejlrakt0J3u";
			    var password = "javascript-key=sZBrnv7KevAzPEA8JeLRLYV0uAGMir4xsuN4Zn9S";

			    WinJS.xhr({
			        headers: { "Content-type": "application/json", "Authorization": "Basic " + btoa(username + ":" + password) },
			        url: "https://api.parse.com/1/classes/mun", type: "get", responseType: "JSON"
			    }).then(
                    function (success) {
                        responseString = JSON.parse(success.response);
                        console.log(responseString.results);
                        var dataList = new WinJS.Binding.List(responseString.results);

                        // Create a namespace to make the data publicly
                        // accessible. 
                        var publicMembers =
                            {
                                itemList: dataList
                            };
                        document.getElementById("basicListView").winControl.itemTemplate = document.getElementById("parseObjectListIconTextTemplate");
                        document.getElementById("basicListView").winControl.itemDataSource = dataList.dataSource;


                    },
                   function (error) {
                       console.log(error);
                   }
                    );
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());

		    // Retrieve the button and register our event handler. 
			var helloButton = document.getElementById("helloButton");
			helloButton.addEventListener("click", buttonClickHandler, false);
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	function buttonClickHandler(eventInfo) {
	  /*  var req = new XMLHttpRequest();
	    req.onreadystatechange = function () {
	        if (req.readyState == 4) {
	            console.log(req.status);
	        }
	    };
	    req.open("GET", "https://qqnehcGoop2eo4bIQfhE8eXsxBA6aejlrakt0J3u:javascript-key=sZBrnv7KevAzPEA8JeLRLYV0uAGMir4xsuN4Zn9S@api.parse.com/1/classes/mun", true);
	    req.send();*/
	}
	app.start();
})();
