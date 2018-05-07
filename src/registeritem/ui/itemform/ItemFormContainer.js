import { connect } from 'react-redux'
import ItemForm from './ItemForm'
import { addItem } from './ItemFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    itemName: '',
    itemSerial: ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemFormSubmit: (itemName, itemSerial) => {
      event.preventDefault();

      dispatch(addItem(itemName, itemSerial))
    }
  }
}

const ItemFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemForm)

export default ItemFormContainer
