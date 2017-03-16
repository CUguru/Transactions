$(document).ready(function() {
	// var demo = "http://demo7235469.mockable.io/transactions";
	// var callback = '&callback=';

	// var url = demo;
	function getData() {
		return $.ajax({
			url: 'http://demo7235469.mockable.io/transactions',
			type: 'GET'
		});
	}

	function getResults() {
		getData().done(parseData);
	}

	// function that gets passed in once the ajax call is done
	function parseData(data) {
		var myResults = data;
		var p = document.getElementById('error');
		p.textContent = myResults.accounts[1].accountId;
		console.log(myResults.accounts[1]);
	}

	
	

	// if they click the button, call the api function
	$('#button').click(getResults);
});