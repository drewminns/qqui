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
					<label htmlFor="element">Element Selector</label>
					<input type="text" id="element" autoFocus ref="selectorName" placeholder={this.props.data.selector} required/>
					<label htmlFor="type">Type of Selector</label>
					<select id="type" ref="type" onChange={this.displayAmount} value={this.state.value}>
						<option value="atLeast">At-Least</option>
						<option value="atMost">At-Most</option>
						<option value="between">Between</option>
					</select>
					<label for="amount">Amount of Items</label>
					<input type="number" ref="amountOne" required/>
					<input type={isBetween ? 'number' : 'hidden'} ref="amountTwo" required/>
					<input type="button" onClick={this.update} value="Update C2"/>
				</form>
			</section>
		);
	}
});

let QQExample = React.createClass({
	getInitialState() {
		return {
			items: ['i']
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
			return <div className="item">item</div>
		});
		return (
			<div>
				<style>{this.props.styles}</style>
				<header className="controls">
					<div onClick={this.addItem}>Add Item</div>
					<div onClick={this.removeItem}>Remove Item</div>
				</header>
				<section className="exampleItems">
					{itemObjects}
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
			styles = `.item:nth-last-child(n+${amountOne}), .item:nth-last-child(n+${amountOne}) ~ ${selector} { }`;
		} else if (type === 'atMost') {
			equation = `${selector}:nth-last-child(-n+${amountOne}):first-child, ${selector}:nth-last-child(-n+${amountOne}):first-child ~ ${selector} { }`;
			styles = `.item:nth-last-child(-n+${amountOne}):first-child, .item:nth-last-child(-n+${amountOne}):first-child ~ .item { }`;
		} else if (type === 'between') {
			equation = `${selector}:nth-last-child(n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child, ${selector}:nth-last-child(-n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child ~ ${selector} { }`;
			styles = `.item:nth-last-child(n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child, .item:nth-last-child(-n+${amountOne}):nth-last-child(-n+${amountTwo}):first-child ~ .item { }`;
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
				<QQForm onUpdate={this.onUpdate} data={this.state.data}/>
				<QQDisplay data={this.state.data} />
			</section>
		);
	}
});

React.render(<QQApp />, document.getElementById('content'));