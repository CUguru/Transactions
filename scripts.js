$(document).ready(function() {
	var transactionKind, accounts, transactions, categories
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
	function parseData(results) {
		var accounts = results.accounts;

		function getAccountId(accounts) {
			var accountArray = [];
			for(var i = 0; i < accounts.length; i++) {
				// console.log(accounts[i].accountId);
				accountArray.push(accounts[i].accountId);
			}
			return accountArray;
		}
		var myAccounts = getAccountId(accounts);
		console.log(myAccounts);
		var transactions = results.transactionData.transactions;
		var categories = results.categories;
		// console.log(transactions);
		// console.log(categories);
		$.each(transactions, function() {
			if(this.category === undefined) {
				this.category = 'No category specified';
			}

			if(this.amount < 0) {
				transactionKind = 'Withdrawal';
				this.amount = Math.abs(this.amount);
			} else {
				transactionKind = 'Deposit';
			}
			$('#table').append('<tr className="mix "><td>'+this.description+'</td><td className="category">'+(this.category)+'</td>'+
				'<td>'+transactionKind+'</td><td>'+this.amount+'</td><td>'+this.transactionDate+'</td></tr>');
			// console.log(results);
		});
		
	}

	

	// if they click the button, call the api function
	$('#button').click(getResults);
});