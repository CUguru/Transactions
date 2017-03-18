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
		$('#results').prepend('<div class="buttons"><button type="text" name="search" id="search-1">HIGH INTEREST<br>TFSA SAVINGS</button>'+
			'<button type="text" name="search" id="search-2">COMPANION<br>SAVINGS</button>'+
			'<button type="text" name="search" id="search-3">UNLIMITED<br>CHEQUING</button>'+
			'<button type="text" name="search" id="search-4">BORDERLESS<br>PLAN</button>'+
			'<button type="text" name="reset" id="reset">Reset<br></button><select id="dropdown"></select></div>');
		$('#balance-and-header').append('<div class="person"><p>Welcome<br><span class="name">Chibuzo</span></p>'+
			'</div><div id="balance"></div><div class="date-and-time"><p class="date">Thursday, 3rd April, 2017'+
			'<br><span>7:32PM</span></p></div>');



		// make the initial table header
		$('#data').append('<table id="table"><thead><th>Transaction Name</th><th>Category</th>'+
			'<th>Transaction Kind</th><th>Amount</th><th>Date</th><th>Account</th>'+
			'</thead><tbody class="list"></tbody></table>');
		
		accounts = results.accounts;
		transactions = results.transactionData.transactions;
		categories = results.categories;

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

		
		function getAccountNames(accounts) {
			var accountNameArray = [];
			for(var i = 0; i < accounts.length; i++) {
				accountNameArray.push(accounts[i].accountName);
			}
			return accountNameArray;
		}

		var nameArray = getAccountNames(accounts);
		
		function getCategories(categories) {
			var catArray = [];
			for(var i = 0; i < categories.length; i++) {
				catArray.push(categories[i]);
			}
			return catArray;
		}

		var categoriesArray = getCategories(categories);
		function addDropDown(array) {
			for(var i = 0; i < array.length; i++) {
				$('select').append('<option>'+array[i]+'</option>');
			}
		}
		addDropDown(categoriesArray);
		
		
		

		// append the balance to the page
		$('#balance').append('<span id="balance-title">TOTAL BALANCE</span><br><span id="balance-amount">$ '+sum+'</span>');

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

			$('.list').append('<tr><td className="description">'+this.description+'</td><td className="category">'+(this.category)+'</td>'+
				'<td className="kind">'+transactionKind+'</td><td className="amount">$ '+this.amount+
				'</td><td className="date">'+this.transactionDate+'</td><td className="account">'+accountName+
				'</td></tr>');
		});

		var myTable = $('#table').DataTable({
			'paging': false,
			"info":     false,
			"columns": [
    			{ "width": "28%" },
    			null,
    			null,
    			null,
    			null,
    			{ "width": "15%" }
    		],
    		initComplete: function () {
	            this.api().columns(1).every( function () {
	                var column = this;
	                var select = $('#dropdown')
	                    .on( 'change', function () {
	                        var val = $.fn.dataTable.util.escapeRegex(
	                            $(this).val()
	                        );
	 
	                        column
	                            .search( val ? '^'+val+'$' : '', true, false )
	                            .draw();
	                    } );
	 
	                
	            } );
	        }
		});
		$('#search-1').on('click', function() {
			myTable.columns( 5 ).search( nameArray[0] ).draw();
			$('.active').not($(this)).removeClass('active');
			$(this).toggleClass('active');
			event.stopPropagation();
		});
		$('#search-2').on('click', function() {
			myTable.columns( 5 ).search( nameArray[1] ).draw();
			$('.active').not($(this)).removeClass('active');
			$(this).toggleClass('active');
			event.stopPropagation();
		});
		$('#search-3').on('click', function() {
			myTable.columns( 5 ).search( nameArray[2] ).draw();
			$('.active').not($(this)).removeClass('active');
			$(this).toggleClass('active');
			event.stopPropagation();
		});
		$('#search-4').on('click', function() {
			myTable.columns( 5 ).search( nameArray[3] ).draw();
			$('.active').not($(this)).removeClass('active');
			$(this).toggleClass('active');
			event.stopPropagation();
		});
		$('#reset').on('click', function() {
			myTable.columns( 5 ).search( " " ).draw();
			$('.active').not($(this)).removeClass('active');

		});
	}

	setTimeout(getResults, 1000);

});