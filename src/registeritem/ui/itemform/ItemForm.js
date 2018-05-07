import React, { Component } from 'react'

class ItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemName: this.props.itemName,
      itemSerial: this.props.itemSerial
    }
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.itemName.length < 2)
    {
      return alert('Please fill in your item name.')
    }

    if (this.state.itemSerial.length < 2)
    {
      return alert('Please fill in your item serial.')
    }

    this.props.onItemFormSubmit(this.state.itemName, this.state.itemSerial)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="itemName">Item Name</label>
          <input id="itemName" type="text" value={this.state.itemName} onChange={this.onInputChange.bind(this)} placeholder="Item" />
          <span className="pure-form-message">This is a required field.</span>
        </fieldset>
        <fieldset>
          <label htmlFor="itemSerial">Item Serial</label>
          <input id="itemSerial" type="text" value={this.state.itemSerial} onChange={this.onInputChange.bind(this)} placeholder="Serial" />
          <span className="pure-form-message">This is a required field.</span>
          <br />
          <button type="submit" className="pure-button pure-button-primary">Register Item</button>
        </fieldset>
      </form>
    )
  }
}

export default ItemForm
