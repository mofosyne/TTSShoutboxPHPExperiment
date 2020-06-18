/***
// Modified by Brian Khuu to include speech synth, and to simplify the coding to take advantage of HTML5 features.
// This updates every 3 seconds, so you should avoid using this if not needed.
***/

/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

$(document).ready(function(){
	// Config
	var postURL = "/shoutbox/addbook.php" ; 
	var readURL = "/shoutbox/readbook.php" ;
	var longRefresh = 15*1000; // ms
	var shortRefresh = 3*1000; // ms (3 ms means 20 times a minute)
    var hibernateAfter = 20*5; // number of tries before hibernating (currently set to 5 mins)
	var enableSpeech = true;
	/* global vars */
	// Timer Vars
	var nextRefresh = 0;
	var inactivityCount = 0; // Counts upwards. Resets only when new event occurs.
	// Shoutbox vars
	var inputUser = $("#nick");
	var inputMessage = $("#message");
	var messageList = $(".content");
	var prevMsgDivs = null;	// Global var for Speech Synth function
	
	//functions
	/*
		Speech Synth Function
	*/
	function speakViaSpeechSynthAPI(speakArray){
		if(!enableSpeech){
			console.log("Notice: TTS disabled");
			return;
		}		// exit if this function is disabled.
		//Speak by http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API
		if (speakArray.length > 0){
			speakArray = speakArray.reverse(); // reverse speak array
			for (var i = 0; i < speakArray.length; i++) {
				var msg = new SpeechSynthesisUtterance(speakArray[i]);
				window.speechSynthesis.speak(msg);
			}
		}
	}
	
	/*
		Check if any new messages arrived
	*/
	function checkNewPosts(){
		if (document.querySelectorAll('.shoutBoxEntry').length <= 0){
			console.log("Document not loaded yet thus speech synth not running");
			return [];
		}
		if ( prevMsgDivs == null ){ // first run
			console.log("speech synth first run");
			prevMsgDivs = document.querySelectorAll('.shoutBoxEntry');
			return [];
		}
		console.log("Checking for new message for speech synth");
		var latestMsgDivs = document.querySelectorAll('.shoutBoxEntry');	// Static Array eqiv to getElementsByClassName('parseMD')
		var newMsgArray = []; // what to speak
		// Find new messages to speak. 
		for (var i = 0; i < latestMsgDivs.length; i++) {
			var findFlag = false;
			for (var j = 0; j < prevMsgDivs.length; j++) {
				if
				( 
					latestMsgDivs[i].getElementsByClassName('message')[0].innerHTML 
					== 
					prevMsgDivs[j].getElementsByClassName('message')[0].innerHTML 
				){
					findFlag = true;
					break;
				}
			}
			if ( findFlag == false ){ // Is false if new message
				var newmsg = latestMsgDivs[i].getElementsByClassName('message')[0].innerHTML + " - " + latestMsgDivs[i].getElementsByClassName('name')[0].innerHTML;
				newMsgArray.push(newmsg);
				console.log('newmsg detect: ' + newmsg );
			}
		}
		
		//Update prev msg memmory
		prevMsgDivs = document.querySelectorAll('.shoutBoxEntry');
		
		// Return true if new post detected
		return newMsgArray;
	}
	
	// Shoutbox Functions
	function updateShoutbox(){		
		var successFlag = false;
		//just for the fade effect
		//send the post to shoutbox.php
		$.ajax({
			type: "POST", url: readURL, data: "",
			success: function(data){
				successFlag = true;
			},
			complete: function(data){
				if (successFlag){ // Don't trigger if we don't get any data
					messageList.html(data.responseText);
					messageList.fadeIn(2000);
					var newMsgArray = checkNewPosts();
					/*	HTML5 SPEECH API  			*/
					speakViaSpeechSynthAPI(newMsgArray);
					/*	INACTIVITY COUNT LOGIC  	*/
					if (newMsgArray.length > 0){	// New post detected
						inactivityCount = 0;
					}else{							// No new post detected
						inactivityCount++;
					}
				}
			}
		});
		// reset counter
		periodicCountup = 0;
	}
	

	
	/* 
		SCHEDULER
	*/
	function scheduler(){
		// Set new timeout
		console.log('New Scheduler:: Inactivity Count:' + inactivityCount );
		if ( inactivityCount < hibernateAfter ){ // Recently updated so go fast
			setTimeout(scheduler, shortRefresh);
		} else{ // hibernate when inactivityCount is bigger than hibernate count
			setTimeout(scheduler, longRefresh);
			console.log('Notice: In hibernation mode');
		}
		// Check if settings changed
		if ( document.getElementById("myCheck") != null ) { // check if checkbox exist
			enableSpeech = document.getElementById("myCheck").checked; // update flag
		}
		// Fire event
		updateShoutbox();
	}
	// Start scheduler
	scheduler();
	
	
	/*
		SHOUTBOX LOGIC
	*/
	
	//check if all fields are filled
	function checkForm(){
		if(inputUser.val() && inputMessage.val())
			if((inputUser.val() == "Name") || (inputMessage.val() == "Message"))
				return false;
			else
				return true;
		else
			return false;
	}
	
	//on submit event
	$("#form").submit(function(){
		if(checkForm()){
			var nick = inputUser.val();
			var message = inputMessage.val();
			//we deactivate submit button while sending
			$("#send").attr({ disabled:true, value:"Sending..." });
			$("#send").blur();
			//send the post to shoutbox.php
			$.ajax({
				type: "POST", url: postURL , data: "name=" + nick + "&message=" + message,
				complete: function(data){
					messageList.html(data.responseText);
					updateShoutbox();
					//reactivate the send button
					$("#send").attr({ disabled:false, value:"Send" });
                    $("#message").attr({ disabled:false, value:"" });
                    $("#message").focus();
				}
			 });
			 //Clear Message Box
			 inputMessage.val("");
		}
		else alert("Please fill all fields!");
		//we prevent the refresh of the page after submitting the form
		return false;
	});
});