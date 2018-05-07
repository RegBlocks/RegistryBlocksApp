import RegisterItemsContract from '../../../../build/contracts/RegisterItems.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const ITEM_ADDED = 'ITEMADDED'
function itemAdded(itemName, itemSerial) {
  return {
    type: ITEM_ADDED,
    payload: itemName, itemSerial
  }
}

export function addItem(itemName, itemSerial) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const registeritems = contract(RegisterItemsContract)
      registeritems.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var registeritemsInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        registeritems.deployed().then(function(instance) {
          registeritemsInstance = instance

          // Attempt to login user.
          registeritemsInstance.addItem(itemName, itemSerial, {from: coinbase})
          .then(function(result) {
            // If no error, update user.

            dispatch(itemAdded({"itemName": itemName, "itemSerial": itemSerial}))

            return alert('Item added!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
