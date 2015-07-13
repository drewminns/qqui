let QQForm = React.createClass({
	getInitialState() {
		return {
			value: 'atLeast'
		}
	},
	update() {
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
				<form>
					<div className="inputRow">
						<label htmlFor="element" className="inputLabel">Which Element?</label>
						<input type="text" id="element" autoFocus ref="selectorName" placeholder="ex. ul li" required/>
					</div>
					<div className="inputRow">
						<label htmlFor="type">Type of Query</label>
						<select id="type" ref="type" onChange={this.displayAmount} value={this.state.value}>
							<option value="atLeast">At-Least</option>
							<option value="atMost">At-Most</option>
							<option value="between">Between</option>
						</select>
					</div>
					<div className="inputRow">
						<label for="amount" className="inputLabel">Amount of Items</label>
						<input type="number" ref="amountOne" required placeholder="Query Amount"/>
						<input type={isBetween ? 'number' : 'hidden'} ref="amountTwo" required placeholder="Amount Query End"/>
					</div>
					<input type="button" onClick={this.update} value="Create Query"/>
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
				<header className="controls">
					<div onClick={this.addItem}><i className="fa fa-plus-circle itemClick"></i> Add Item</div>
					<div onClick={this.removeItem}><i className="fa fa-minus-circle itemClick"></i> Remove Item</div>
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
		let type = this.props.data.type, amountOne = this.props.data.amount.one, amountTwo = this.props.data.amount.two, selector = this.props.data.selector;
		var pseudo, equation, styles;
		if (type === 'atLeast') {
			equation = `${selector}:nth-last-child(n+${amountOne}), ${selector}:nth-last-child(n+${amountOne}) ~ ${selector} { }`;
			styles = `section.itemList ul>li:nth-last-child(n+${amountOne}), section.itemList ul>li:nth-last-child(n+${amountOne}) ~ li { background: #01B0C5 !important; }`;
		} else if (type === 'atMost') {
			equation = `${selector}:nth-last-child(-n+${amountOne}):first-child, ${selector}:nth-last-child(-n+${amountOne}):first-child ~ ${selector} { }`;
			styles = `section.itemList ul>li:nth-last-child(-n+${amountOne}):first-child, section.itemList ul>li:nth-last-child(-n+${amountOne}):first-child ~ li { background: #01B0C5 !important;  }`;
		} else if (type === 'between') {
			equation = `${selector}:nth-last-child(n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child, ${selector}:nth-last-child(-n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child ~ ${selector} { }`;
			styles = `section.itemList ul>li:nth-last-child(n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child, section.itemList ul>li:nth-last-child(-n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child ~ li { background: #01B0C5 !important; }`;
		}
		return (
			<div className="displayBody">
					<section className="">
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
				<div className="wrapper flexParent">
					<QQForm onUpdate={this.onUpdate} data={this.state.data}/>
					<QQDisplay data={this.state.data} />
				</div>
			</section>
		);
	}
});

React.render(<QQApp />, document.getElementById('content'));