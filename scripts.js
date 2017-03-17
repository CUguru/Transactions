$(document).ready(function() {
	var transactionKind, accounts, transactions, categories, balance, accountName;

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
		$('#results').prepend('<button type="text" name="search" id="search-1">account 1</button>'+
			'<button type="text" name="search" id="search-2">account 2</button>'+
			'<button type="text" name="search" id="search-3">account 3</button>'+
			'<button type="text" name="search" id="search-4">account 4</button>'+
			'<button type="text" name="reset" id="reset">Reset</button>');
		$('#balance-and-header').append('<div id="balance"></div>');

		// make the initial table header
		$('#data').append('<table id="table"><thead><th>Transaction Name</th><th>Category</th>'+
			'<th>Transaction Kind</th><th>Amount</th><th>Date</th><th>Account</th>'+
			'</thead><tbody class="list"></tbody></table>');
		
		var accounts = results.accounts;
		var transactions = results.transactionData.transactions;

		// get the total balance for all the accounts
		function getTotalBalance(accounts) {
			var balanceArray = [];
			for(var i = 0; i < accounts.length; i++) {
				balanceArray.push(accounts[i].balance);
			}
			return balanceArray;
		}
		var myBalance = getTotalBalance(accounts);
		sum = myBalance.reduce(add, 0);
		function add(a, b) {
			return a + b;
		}
		

		function getAccountId(accounts) {
			var accountIdArray = [];
			for(var i = 0; i < accounts.length; i++) {
				accountIdArray.push(accounts[i].accountId);
			}
			return accountIdArray;
		}
		var accountArray = getAccountId(accounts);
		console.log(accountArray);

		
		function getAccountNames(accounts) {
			var accountNameArray = [];
			for(var i = 0; i < accounts.length; i++) {
				accountNameArray.push(accounts[i].accountName);
			}
			return accountNameArray;
		}
		var nameArray = getAccountNames(accounts);

		// append the balance to the page
		$('#balance').append('<span>TOTAL BALANCE</span><br><span>$ '+sum+'</span>');

		$.each(transactions, function() {
			// console.log(this.accountId);
			if(this.category === undefined) {
				this.category = 'No category specified';
			}

			if(this.amount < 0) {
				transactionKind = 'Withdrawal';
				this.amount = Math.abs(this.amount);
			} else {
				transactionKind = 'Deposit';
			}

			// get the account name for each table row
			if(this.accountId === accountArray[0]) {
				accountName = nameArray[0];
			} else if(this.accountId === accountArray[1]) {
				accountName = nameArray[1];
			} else if(this.accountId === accountArray[2]) {
				accountName = nameArray[2];
			} else if(this.accountId === accountArray[3]) {
				accountName = nameArray[3];
			}

			$('.list').append('<tr className="'+this.transactionDate+" "+this.accountId+'"><td className="description">'
				+this.description+'</td><td className="category">'+(this.category)+'</td>'+
				'<td className="kind">'+transactionKind+'</td><td className="amount">$ '+this.amount+
				'</td><td className="date">'+this.transactionDate+'</td><td className="account">'+accountName+
				'</td></tr>');
		});

		var myTable = $('#table').DataTable({
			'paging': false,
			'ordering': false,
			"columns": [
    			{ "width": "28%" },
    			null,
    			null,
    			null,
    			null,
    			{ "width": "15%" }
    		]
		});
		$('#search-1').on('click', function() {
			myTable.columns( 5 ).search( nameArray[0] ).draw();
		});
		$('#search-2').on('click', function() {
			myTable.columns( 5 ).search( nameArray[1] ).draw();
		});
		$('#search-3').on('click', function() {
			myTable.columns( 5 ).search( nameArray[2] ).draw();
		});
		$('#search-4').on('click', function() {
			myTable.columns( 5 ).search( nameArray[3] ).draw();
		});
		$('#reset').on('click', function() {
			myTable.columns( 5 ).search( " " ).draw();
		});
	}

	setTimeout(getResults, 1000);

});