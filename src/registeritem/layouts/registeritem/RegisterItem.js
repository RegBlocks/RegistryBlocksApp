import React, { Component } from 'react'
import RegisterItemContainer from '../../ui/itemform/ItemFormContainer'


class RegisterItem extends Component {
  constructor(props, { itemData }) {
    super(props)
    itemData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Register Item</h1>
            <p>Here you can register your new items.</p>
            <RegisterItemContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default RegisterItem
