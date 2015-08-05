let QQForm = React.createClass({
	getInitialState() {
		return {
			value: 'atLeast'
		}
	},
	update(e) {
		e.preventDefault();
		let theVal = {
			selector: React.findDOMNode(this.refs.selectorName).value,
			type: this.state.value,
			amount: {
				one:  React.findDOMNode(this.refs.amountOne).value,
				two: 	React.findDOMNode(this.refs.amountTwo).value
			}
		}
		if (!theVal.selector || !theVal.amount.one) { return }
    this.props.onUpdate(theVal);
	},
	displayAmount(e) {
		this.setState({value: e.target.value});
	},
	render() {
		let isBetween;
		if (this.state.value == 'between') {
			isBetween = true;
		} else {
			isBetween = false;
		}
		return (
			<section className="formControl">
				<h2>Build a query</h2>
				<form onSubmit={this.update}>
					<div className="inputRow">
						<label htmlFor="element" className="inputLabel">Which element will be counted <span className="hint hint--bottom" data-hint="Provide the elements to be selected in the query">?</span></label>
						<input type="text" id="element" autoFocus ref="selectorName" placeholder="ex. ul li" required />
					</div>
					<div className="inputRow">
						<label htmlFor="type">Type of Query <span className="hint hint--bottom hint--bounce" data-hint="What kind of query will be used to count the elements">?</span></label>
						<select id="type" ref="type" onChange={this.displayAmount} value={this.state.value}>
							<option value="atLeast">At-Least</option>
							<option value="atMost">At-Most</option>
							<option value="between">At-Least / At-Most</option>
						</select>
					</div>
					<div className="inputRow">
						<label for="amount" className="inputLabel">Amount of Items <span className="hint hint--bottom hint--bounce" data-hint="Items to count">?</span></label>
						<input type="number" ref="amountOne" required placeholder={isBetween ? 'At least # of items to count' : '# of items to count'}/>
						<input type={isBetween ? 'number' : 'hidden'} ref="amountTwo" required placeholder="At most # of items to count"/>
					</div>
					<input type="submit" className="submit"  value="Create Query"/>
				</form>
			</section>
		);
	}
});

let QQExample = React.createClass({
	getInitialState() {
		return {
			items: ['i', 'i', 'i', 'i', 'i']
		}
	},
	addItem() {
		let newArray = this.state.items;    
		newArray.push("i");   
		this.setState({arr:newArray})
		console.log(this.state.items);
	},
	removeItem() {
		if (this.state.items.length > 1) {
			let newArray = this.state.items;    
			newArray.pop();   
			this.setState({arr:newArray})
		} else {
			return
		}
	},
	render() {
		let itemObjects = this.state.items.map(function(item) {
			return <li className="item"></li>
		});
		return (
			<div>
				<style>{this.props.styles}</style>
				<h2>Try it out</h2>
				<p>Your quantity query will be reflected on the items below by a change in colour. Add and remove items to see the styling be applied when the query matches.</p>
				<header className="controls">
					<div onClick={this.addItem} className="itemClick"><i className="fa fa-plus-circle "></i> Add Item</div>
					<div onClick={this.removeItem} className="itemClick"><i className="fa fa-minus-circle"></i> Remove Item</div>
				</header>
				<section className="itemList">
					<ul>
						{itemObjects}
					</ul>
				</section>
			</div>
		)
	}
});

let QQDisplay = React.createClass({
	render() {
		let type = this.props.data.type, amountOne = this.props.data.amount.one, amountTwo = this.props.data.amount.two, selector = this.props.data.selector.split(' ').slice(-1)[0];
		var pseudo, equation="// Build a query on the left", styles;
		if (type === 'atLeast') {
			equation = `${selector}:nth-last-child(n+${amountOne}), ${selector}:nth-last-child(n+${amountOne}) ~ ${selector} { }`;
			styles = `section.itemList ul>li:nth-last-child(n+${amountOne}), section.itemList ul>li:nth-last-child(n+${amountOne}) ~ li { background: #D81B60 !important; }`;
		} else if (type === 'atMost') {
			equation = `${selector}:nth-last-child(-n+${amountOne}):first-child, ${selector}:nth-last-child(-n+${amountOne}):first-child ~ ${selector} { }`;
			styles = `section.itemList ul>li:nth-last-child(-n+${amountOne}):first-child, section.itemList ul>li:nth-last-child(-n+${amountOne}):first-child ~ li { background: #D81B60 !important;  }`;
		} else if (type === 'between') {
			equation = `${selector}:nth-last-child(n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child, ${selector}:nth-last-child(-n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child ~ ${selector} { }`;
			styles = `section.itemList ul li:nth-last-child(n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child, section.itemList ul li:nth-last-child(n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child ~ li { background: #D81B60 !important; }`;
		}
		return (
			<div className="displayBody">
					<section className="equationDisplay">
						<h2>Your Code</h2>
						<p>Copy and paste the code below into your styles</p>
						<code>
							{equation}
						</code>
					</section>
					<QQExample styles={styles} />
			</div>
		);	
	}
});



let QQApp = React.createClass({
	getInitialState() {
		return {
			data: {
				selector: '',
				amount: {
					one: '',
					two: ''
				},
				type: ''
			}
		}
	},
	onUpdate(val){
		// console.log(val)
    this.setState({
      data: {
      	selector: val.selector,
      	amount: {
      		one: val.amount.one,
      		two: val.amount.two
      	},
      	type: val.type
      }
    });
  },
	render() {
		return (
			<section className="appBody">
				<QQForm onUpdate={this.onUpdate} data={this.state.data}/>
				<QQDisplay data={this.state.data} />
			</section>
		);
	}
});



$(function() {

	console.log('What\'s it built with? React, Babel and PostCSS! Help me improve or fix any issues! https://github.com/drewminns/qqui');
	console.log('Follow me on Twitter: @drewisthe');
	console.log('Find more crazy cool things at drewminns.com');
	React.render(<QQApp />, document.getElementById('content'));
	$('p.explain').on('click', function() {
		$('#lightbox').addClass('show');
	});
	$('.closeButton').on('click', function() {
		$('#lightbox').removeClass('show');
	});
	$(document).keyup(function(e) {
	     if (e.keyCode == 27) { // escape key maps to keycode `27`
	       $('#lightbox').removeClass('show');
	    }
	});
});