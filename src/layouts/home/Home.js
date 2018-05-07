import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <h1>Welcome to Registry Blocks!</h1>
          <p>With this app you can register your item in the blockchain.</p>
          <h2>Login with BlockChain technology</h2>
          <p>First register a account. This will create a new account in the blockchain that can be used to retrieve your registred items.</p>
          <p>In the upper-right corner, you'll see a "Sign Up" button. Click it to register a new account. If you already have a account click the "Login" button.</p>
          <h3>Register Items</h3>
          <p>To register a new item click the right top button "Register Item". This will give you a form where you can register new items that will be saved with BlockChain technology.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
