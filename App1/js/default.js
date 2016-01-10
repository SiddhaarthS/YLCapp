// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";
    var dataList;
	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var folderRef = app.local;
	function storeData()
	{
	    
	    folderRef.writeText("data1.txt", JSON.stringify(responseString)).done(function () {
	        console.log("Finished writing");
	      //  readData();
	    });
	}

	var responseString;// I made a mistake by modifying this string at various places
	var intactResponseString;// Some times I need the intact string without modification and thats why I uses this variable to achieve that 

    //Func to store in list
	function refreshList()
	{
	    var num = responseString.results.length;  //This represents the number of rows in the result set
	    var temp_start_date, temp_end_date, string_temp_start_date, string_temp_end_date, temp_year;
	    var i; // counter variable
	    for (i = 0; i < num; i++) {
	        temp_start_date = new Date(responseString.results[i]["start_date"].iso.toString()); //We convert the date from the iso date object stored in werver to JavaScript date object
	        string_temp_start_date = temp_start_date.toString(); //Now the date object is stored as a string
	        var words = string_temp_start_date.split(" ");//Now the variable "words" is an array which holds the indivdual words in the string
	        responseString.results[i]["start_date"] = words[2]; // The third word holds the date of the month

	        var temp_month = words[1]; //This variable stores the month in "Mon" format, to be used later :)

	        /*Now we repeat the same procedure for the end_date*/
	        temp_end_date = new Date(responseString.results[i]["end_date"].iso.toString()); //We convert the date from the iso date object stored in werver to JavaScript date object
	        string_temp_end_date = temp_end_date.toString(); //Now the date object is stored as a string
	        var words_end = string_temp_end_date.split(" ");//Now the variable "words" is an array which holds the indivdual words in the string
	        responseString.results[i]["end_date"] = words_end[2]; // The third word holds the date of the month

	        /*Now we try to place the month and year in the form of Mon,YY eg) Dec,15*/
	        temp_year = responseString.results[i]["sort_date"];
	        var words_year = temp_year.split("-");
	        words_year = words_year[0].split("0");
	        words_year = temp_month + "," + words_year[1];
	        responseString.results[i]["sort_date"] = words_year;
	        // console.log(words_year);
	    }
	    dataList = new WinJS.Binding.List(responseString.results);

	    // Create a namespace to make the data publicly
	    // accessible. 
	    var publicMembers =
            {
                itemList: dataList
            };
	    document.getElementById("basicListView").winControl.itemTemplate = document.getElementById("parseObjectListIconTextTemplate");
	    document.getElementById("basicListView").winControl.itemDataSource = dataList.dataSource;

	}

	function readData()
	{
	    folderRef.exists("data1.txt").done(function (exists) {
	        if (exists) {
	            WinJS.Application.local.readText("data1.txt","default").done(
                    function (text) {
                        try{
                            responseString = JSON.parse(text);
                        }
                        catch (e) {
                            alert(e);
                        }
                        intactResponseString = responseString;
                        console.log(text);
                        refreshList();
                    },
                    function(error)
                    {
                        console.log(error.toString());
                    }
                );
	        }
	        else {
	            console.log("File does not exist");
	        }
	    });
	}


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
                        readData();
                        responseString = JSON.parse(success.response);
                        intactResponseString = responseString;
                        storeData();
                        refreshList(); //Calling this a second time to update the list in case of new events from server
                    },
                   function (error) {
                       readData();
                       console.log(error);
                   }
                    );

                //For  some unknown reason, I was not able to hide more than the divs that I have already hidden in CSS/HTML. So I did this here
			    document.getElementById("navigation-button-bar").style.display = "none";
			    document.getElementById("blank_circle").style.display = "none";
			    document.getElementById("right_circle").style.display = "none";
			    document.getElementById("detailed_text").style.display = "none";
			    document.getElementById("search_blank_circle").style.display = "none";
			    document.getElementById("search_right_circle").style.display = "none";
			    document.getElementById("search_detailed_text").style.display = "none";
			    document.getElementById("SearchPage").style.display = "none";
			    document.getElementById("GoSearchNameButton").style.display = "none";
			    document.getElementById("GoSearchCityButton").style.display = "none";
			    // readData();

			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());

		    // Retrieve the buttons and register our event handler. 
			var UNButton = document.getElementById("UNButton");
			UNButton.addEventListener("click", buttonClickHandler, false);

			var MUNButton = document.getElementById("MUNButton");
			MUNButton.addEventListener("click", buttonClickHandler, false);

			var HomeButton = document.getElementById("HomeButton");
			HomeButton.addEventListener("click", buttonClickHandler, false);

			var YLCButton = document.getElementById("YLCButton");
			YLCButton.addEventListener("click", buttonClickHandler, false);

			var RefreshButton = document.getElementById("RefreshButton");
			RefreshButton.addEventListener("click", buttonClickHandler, false);

			var DisplayMenuButton = document.getElementById("DisplayMenuButton");
			DisplayMenuButton.addEventListener("click", buttonClickHandler, false);

			var SearchButton = document.getElementById("SearchButton");
			SearchButton.addEventListener("click", SearchHandler, false);

			var BackButton = document.getElementById("BackButton");
			BackButton.addEventListener("click", BackHandler, false);

			var SearchByNameButton = document.getElementById("SearchByNameButton");
			SearchByNameButton.addEventListener("click", SearchByHandler, false);

			var SearchByNameButton = document.getElementById("SearchByNameButton");
			SearchByNameButton.addEventListener("click", SearchByHandler, false);

			var SearchByCityButton = document.getElementById("SearchByCityButton");
			SearchByCityButton.addEventListener("click", SearchByHandler, false);

			var SearchByMonthButton = document.getElementById("SearchByMonthButton");
			SearchByMonthButton.addEventListener("click", SearchByHandler, false);

			var GoSearchNameButton = document.getElementById("GoSearchNameButton");
			GoSearchNameButton.addEventListener("click", GoSearchHandler, false);

			var GoSearchCityButton = document.getElementById("GoSearchCityButton");
			GoSearchCityButton.addEventListener("click", GoSearchHandler, false);

			var GoSearchMonthButton = document.getElementById("GoSearchMonthButton");
			GoSearchMonthButton.addEventListener("click", GoSearchHandler, false);

		    // addEventListener syntax for itemInvoked
			var basicListView = document.getElementById("basicListView");
			basicListView.addEventListener("iteminvoked", itemInvokedHandler);

		    //These buttons are for those found in the MUN Resources page
			var ROPButton = document.getElementById("ROPButton");
			ROPButton.addEventListener("click", resourceClickHandler, false);

			var PCButton = document.getElementById("PCButton");
			PCButton.addEventListener("click", resourceClickHandler, false);

			var OCButton = document.getElementById("OCButton");
			OCButton.addEventListener("click", resourceClickHandler, false);

			var UNCButton = document.getElementById("UNCButton");
			UNCButton.addEventListener("click", resourceClickHandler, false);

			var DHRButton = document.getElementById("DHRButton");
			DHRButton.addEventListener("click", resourceClickHandler, false);

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
	    var clickedButton = eventInfo.target.id.toString();
	    switch (clickedButton) {

	        case "DisplayMenuButton":
	            //console.log("button clicked");
	            if (document.getElementById("navigation-button-bar").style.display === "none") {
	               // console.log("if condition");
	                document.getElementById("navigation-button-bar").style.display = "block";
	            }
	            else {
	              //  console.log("else condition");
	                document.getElementById("navigation-button-bar").style.display = "none";
	            }
	            break;
	        case "HomeButton":
	            readData();
	            document.getElementById("basicListView").style.display = "block";
	            document.getElementById("MUN").style.display = "none";
	            document.getElementById("UN").style.display = "none";
	            document.getElementById("YLC").style.display = "none";
	            break;

	        case "MUNButton":
	            document.getElementById("basicListView").style.display = "none";
	            document.getElementById("MUN").style.display = "block";
	            document.getElementById("UN").style.display = "none";
	            document.getElementById("YLC").style.display = "none";
	            document.getElementById("MUN_button_pane").style.display = "block";
	            document.getElementById("ROP").style.display = "none";
	            document.getElementById("PC").style.display = "none";
	            document.getElementById("OC").style.display = "none";
	            document.getElementById("UNC").style.display = "none";
	            document.getElementById("DHR").style.display = "none";
	            break;

            case "UNButton":
                document.getElementById("basicListView").style.display = "none";
                document.getElementById("MUN").style.display = "none";
                document.getElementById("UN").style.display = "block";
                document.getElementById("YLC").style.display = "none";
                break;

	        case "YLCButton":
	            document.getElementById("basicListView").style.display = "none";
	            document.getElementById("MUN").style.display = "none";
	            document.getElementById("UN").style.display = "none";
	            document.getElementById("YLC").style.display = "block";
	            break;

	        case "RefreshButton":
	            var username = "qqnehcGoop2eo4bIQfhE8eXsxBA6aejlrakt0J3u";
	            var password = "javascript-key=sZBrnv7KevAzPEA8JeLRLYV0uAGMir4xsuN4Zn9S";

	            WinJS.xhr({
	                headers: { "Content-type": "application/json", "Authorization": "Basic " + btoa(username + ":" + password) },
	                url: "https://api.parse.com/1/classes/mun", type: "get", responseType: "JSON"
	            }).then(
                    function (success) {
                        responseString = JSON.parse(success.response);
                        // console.log(responseString.results);
                        var num = responseString.results.length;  //This represents the number of rows in the result set
                        var temp_start_date, temp_end_date, string_temp_start_date, string_temp_end_date, temp_year;
                        var i; // counter variable
                        for (i = 0; i < num; i++) {
                            temp_start_date = new Date(responseString.results[i]["start_date"].iso.toString()); //We convert the date from the iso date object stored in werver to JavaScript date object
                            string_temp_start_date = temp_start_date.toString(); //Now the date object is stored as a string
                            var words = string_temp_start_date.split(" ");//Now the variable "words" is an array which holds the indivdual words in the string
                            responseString.results[i]["start_date"] = words[2]; // The third word holds the date of the month

                            var temp_month = words[1]; //This variable stores the month in "Mon" format, to be used later :)

                            /*Now we repeat the same procedure for the end_date*/
                            temp_end_date = new Date(responseString.results[i]["end_date"].iso.toString()); //We convert the date from the iso date object stored in werver to JavaScript date object
                            string_temp_end_date = temp_end_date.toString(); //Now the date object is stored as a string
                            var words_end = string_temp_end_date.split(" ");//Now the variable "words" is an array which holds the indivdual words in the string
                            responseString.results[i]["end_date"] = words_end[2]; // The third word holds the date of the month

                            /*Now we try to place the month and year in the form of Mon,YY eg) Dec,15*/
                            temp_year = responseString.results[i]["sort_date"];
                            var words_year = temp_year.split("-");
                            words_year = words_year[0].split("0");
                            words_year = temp_month + "," + words_year[1];
                            responseString.results[i]["sort_date"] = words_year;
                        }
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
	            document.getElementById("basicListView").style.display = "block";
	            document.getElementById("MUN").style.display = "none";
	            document.getElementById("UN").style.display = "none";
	            document.getElementById("YLC").style.display = "none";
	            break;
	    }
	}

    
	function resourceClickHandler(eventInfo) {

	    var clickedButton = eventInfo.target.id.toString();
	    if (document.getElementById("MUN_button_pane").style.display === "none") {
	        document.getElementById("MUN_button_pane").style.display = "block";
	    }
	    else {
	        document.getElementById("MUN_button_pane").style.display = "none";
	    }
	    switch (clickedButton) {
	        case "ROPButton": 
	            document.getElementById("ROP").style.display = "block";
	            document.getElementById("PC").style.display = "none";
	            document.getElementById("OC").style.display = "none";
	            document.getElementById("UNC").style.display = "none";
	           document.getElementById("DHR").style.display = "none";
	            break;
	        case "PCButton":
	            document.getElementById("ROP").style.display = "none";
	            document.getElementById("PC").style.display = "block";
	            document.getElementById("OC").style.display = "none";
	            document.getElementById("UNC").style.display = "none";
	            document.getElementById("DHR").style.display = "none";
	            break;
	        case "OCButton":
	            document.getElementById("ROP").style.display = "none";
	            document.getElementById("PC").style.display = "none";
	            document.getElementById("OC").style.display = "block";
	            document.getElementById("UNC").style.display = "none";
	            document.getElementById("DHR").style.display = "none";
	            break;
	        case "UNCButton":
	            document.getElementById("ROP").style.display = "none";
	            document.getElementById("PC").style.display = "none";
	            document.getElementById("OC").style.display = "none";
	            document.getElementById("UNC").style.display = "block";
	            document.getElementById("DHR").style.display = "none";
	            break;
	        case "DHRButton":
	            document.getElementById("ROP").style.display = "none";
	            document.getElementById("PC").style.display = "none";
	            document.getElementById("OC").style.display = "none";
	            document.getElementById("UNC").style.display = "none";
	            document.getElementById("DHR").style.display = "block";
	            break;
	    }
	}

	function SearchHandler(eventInfo) {
	 /*   document.getElementById("Non_Search_Non_Add").style.display = "none";*/
	    document.getElementById("SearchPage").style.display = "block";
	}

	function BackHandler(eventInfo) {
	    /*   document.getElementById("Non_Search_Non_Add").style.display = "none";*/
	    document.getElementById("SearchPage").style.display ="none";
	}

	function SearchByHandler(eventInfo) {
	    /*   document.getElementById("Non_Search_Non_Add").style.display = "none";*/
	    var clickedButton = eventInfo.target.id.toString();
	    switch (clickedButton) {
	        case "SearchByNameButton":
	            document.getElementById("SearchByNamePane").style.display = "block";
	            document.getElementById("SearchByCityPane").style.display = "none";
	            document.getElementById("SearchByMonthPane").style.display = "none";
	            document.getElementById("GoSearchNameButton").style.display = "block";
	            document.getElementById("GoSearchCityButton").style.display = "none";
	            document.getElementById("GoSearchMonthButton").style.display = "none";
	            break;
	        case "SearchByCityButton":
	            document.getElementById("SearchByNamePane").style.display = "none";
	            document.getElementById("SearchByCityPane").style.display = "block";
	            document.getElementById("SearchByMonthPane").style.display = "none";
	            document.getElementById("GoSearchNameButton").style.display = "none";
	            document.getElementById("GoSearchCityButton").style.display = "block";
	            document.getElementById("GoSearchMonthButton").style.display = "none";
	            break;
	        case "SearchByMonthButton":
	            document.getElementById("SearchByNamePane").style.display = "none";
	            document.getElementById("SearchByCityPane").style.display = "none";
	            document.getElementById("SearchByMonthPane").style.display = "block";
	            document.getElementById("GoSearchNameButton").style.display = "none";
	            document.getElementById("GoSearchCityButton").style.display = "none";
	            document.getElementById("GoSearchMonthButton").style.display = "block";
	            break;

	    }
	    //document.getElementById("SearchPage").style.display = "none";
	}

	function GoSearchHandler(eventInfo) {
	    var searchString;
	    var clickedButton = eventInfo.target.id.toString();
	    switch (clickedButton) {
	        case "GoSearchNameButton":
	            searchString = document.getElementById("EventName").value;
	            var num = intactResponseString.results.length;  //This represents the number of rows in the result set
	            var resultArray = [];
	            var temp_string;
	            temp_string = intactResponseString;
	            var i,j; // counter variable
	            for (i = 0; i < num; i++) {
	                var words;
	                words = temp_string.results[i]["name"].split(" ");
	                var wordlength = words.length;
	                for (j = 0; j < wordlength; j++) {
	                    if (words[j].toLowerCase() === searchString.toLowerCase()) {
	                                var object = {
		                            name: intactResponseString.results[i]["name"],
		                            priority: intactResponseString.results[i]["priority"],
		                            zone: intactResponseString.results[i]["zone"],
		                            city: intactResponseString.results[i]["city"],
		                            venue: intactResponseString.results[i]["venue"],
		                            link: intactResponseString.results[i]["link"],
		                            contact1: intactResponseString.results[i]["contact1"],
		                            contact2: intactResponseString.results[i]["contact2"],
		                            start_date: intactResponseString.results[i]["start_date"],
	                                end_date: intactResponseString.results[i]["end_date"],
		                            sort_date: intactResponseString.results[i]["sort_date"],
	                                };
	                                resultArray.push(object);
	                    }
	                }
	            }
                try{
                    console.log(resultArray[0]["name"]);
                	            }
	            catch(e)
	            {
	                alert("No events match your serach");
	            }
                break;
	            /*<div id="searchListView"
                data-win-control="WinJS.UI.ListView"
                data-win-options="{
                itemTemplate: select('#jectListIconTextTemplate'),oniteminvoked : itemInvokedHandler,
                layout: {type: WinJS.UI.ListLayout}}">
                </div>*/
	        case "GoSearchCityButton":
	            searchString = document.getElementById("CityName").value;
	            var num = intactResponseString.results.length;  //This represents the number of rows in the result set
	            var temp_string;
	            temp_string = intactResponseString;
	            var resultArray = [];
	            var i, j; // counter variable
	            for (i = 0; i < num; i++) {
	                var words;
	                words = temp_string.results[i]["city"];
	                 if (words.toLowerCase() === searchString.toLowerCase()) {
	                     var object = {
	                         name: intactResponseString.results[i]["name"],
	                         priority: intactResponseString.results[i]["priority"],
	                         zone: intactResponseString.results[i]["zone"],
	                         city: intactResponseString.results[i]["city"],
	                         venue: intactResponseString.results[i]["venue"],
	                         link: intactResponseString.results[i]["link"],
	                         contact1: intactResponseString.results[i]["contact1"],
	                         contact2: intactResponseString.results[i]["contact2"],
	                         start_date: intactResponseString.results[i]["start_date"],
	                         end_date: intactResponseString.results[i]["end_date"],
	                         sort_date: intactResponseString.results[i]["sort_date"],
	                     };
	                     resultArray.push(object);
	                    }//if condition
	            }//for loop
	            try{
	                console.log(resultArray[0]["name"]);

	            }
	            catch(e)
	            {
	                alert("No events match your serach");
	            }
	            break;
	        case "GoSearchMonthButton":
	            searchString = document.getElementById("MonthName").value;
	            var num = intactResponseString.results.length;  //This represents the number of rows in the result set
	            var temp_string;
	            temp_string = intactResponseString;
	            var resultArray = [];
	            var i, j; // counter variable
	            for (i = 0; i < num; i++) {
	                var words;
	                words = temp_string.results[i]["sort_date"].split(",");
	                var wordlength = words.length;
	                if (words[0].toLowerCase() === searchString.toLowerCase()) {
	                    var object = {
	                        name: intactResponseString.results[i]["name"],
	                        priority: intactResponseString.results[i]["priority"],
	                        zone: intactResponseString.results[i]["zone"],
	                        city: intactResponseString.results[i]["city"],
	                        venue: intactResponseString.results[i]["venue"],
	                        link: intactResponseString.results[i]["link"],
	                        contact1: intactResponseString.results[i]["contact1"],
	                        contact2: intactResponseString.results[i]["contact2"],
	                        start_date: intactResponseString.results[i]["start_date"],
	                        end_date: intactResponseString.results[i]["end_date"],
	                        sort_date: intactResponseString.results[i]["sort_date"],
	                    };
	                    resultArray.push(object);
	                }
	            }
	            try {
	                console.log(resultArray[0]["name"]);
	            }
	            catch (e) {
	                alert("No events match your serach");
	            }
	            break;
	    }
	    var searchDataList = new WinJS.Binding.List(resultArray);
	    document.getElementById("searchListView").winControl.itemDataSource = searchDataList.dataSource;
	    // Create a namespace to make the data publicly
	    // accessible. 
	}

	function itemInvokedHandler(eventInfo) {
	    /* Your code */
	    var listView = document.getElementById("body").querySelector("#basicListView").winControl;
	    var clickedIndex = eventInfo.detail.itemIndex;
	    var clickedTile = listView.elementFromIndex(clickedIndex);
	    // clickedTile.style.display = "none";
	    if (clickedTile.childNodes[3].style.display === "none") {
	        clickedTile.childNodes[3].style.display = "block";
	        clickedTile.childNodes[7].style.display = "block";
	        clickedTile.childNodes[9].style.display = "block";
	        clickedTile.childNodes[13].style.display = "none";
	        clickedTile.childNodes[15].style.display = "none";
	        clickedTile.childNodes[17].style.display = "none";

	    }
	    else {
	        clickedTile.childNodes[3].style.display = "none";
	        clickedTile.childNodes[7].style.display = "none";
	        clickedTile.childNodes[9].style.display = "none";
	        clickedTile.childNodes[13].style.display = "block";
	        clickedTile.childNodes[15].style.display = "block";
	        clickedTile.childNodes[17].style.display = "block";
	    }
	    
	   // console.log(clickedTile.childNodes[17]);
	    /* These is the DOM structure found through trial and error . Those not mentioned are empty text nodes and can be ignored.
        clickedTile.childNodes[3]  : date_display
	    clickedTile.childNodes[1]   : <!-- Displays the "start_date" and "end_date" field. -->
        clickedTile.childNodes[5]   : <!-- Displays the "venue" field and "city" -->
        clickedTile.childNodes[7]   : <div id="venue_text" style="float:left">...</div>
        clickedTile.childNodes[9]   : <div id="instruction">...</div>
	    clickedTile.childNodes[11]   : <!--The following tags will initially be hidden and toggle with the tags used above on clicking-->
	    clickedTile.childNodes[13]   : <div id="blank_circle" style="display: none;"></div>
        clickedTile.childNodes[15]   : <div id="right_circle" style="display: none;"></div>*/
	}
	app.start();

	function searchItemInvokedHandler(eventInfo) {
	    /* Your code */
	    console.log("Executed");
	    var listView = document.getElementById("SearchPage").querySelector("#searchListView").winControl;
	    var clickedIndex = eventInfo.detail.itemIndex;
	    var clickedTile = listView.elementFromIndex(clickedIndex);
	    // clickedTile.style.display = "none";
	    if (clickedTile.childNodes[3].style.display === "none") {
	        clickedTile.childNodes[3].style.display = "block";
	        clickedTile.childNodes[7].style.display = "block";
	        clickedTile.childNodes[9].style.display = "block";
	        clickedTile.childNodes[13].style.display = "none";
	        clickedTile.childNodes[15].style.display = "none";
	        clickedTile.childNodes[17].style.display = "none";

	    }
	    else {
	        clickedTile.childNodes[3].style.display = "none";
	        clickedTile.childNodes[7].style.display = "none";
	        clickedTile.childNodes[9].style.display = "none";
	        clickedTile.childNodes[13].style.display = "block";
	        clickedTile.childNodes[15].style.display = "block";
	        clickedTile.childNodes[17].style.display = "block";
	    }

	    /* These is the DOM structure found through trial and error . Those not mentioned are empty text nodes and can be ignored.
        clickedTile.childNodes[3]  : date_display
	    clickedTile.childNodes[1]   : <!-- Displays the "start_date" and "end_date" field. -->
        clickedTile.childNodes[5]   : <!-- Displays the "venue" field and "city" -->
        clickedTile.childNodes[7]   : <div id="venue_text" style="float:left">...</div>
        clickedTile.childNodes[9]   : <div id="instruction">...</div>
	    clickedTile.childNodes[11]   : <!--The following tags will initially be hidden and toggle with the tags used above on clicking-->
	    clickedTile.childNodes[13]   : <div id="blank_circle" style="display: none;"></div>
        clickedTile.childNodes[15]   : <div id="right_circle" style="display: none;"></div>*/
	}
	app.start();
})();
