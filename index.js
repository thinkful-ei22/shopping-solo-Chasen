'use strict';

// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.

const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false},
  {name: "butter", checked: true}
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">
        ${item.name.toLowerCase()}
        <input type="text" name="item-edit-entry" class="item-edit-box" placeholder="edit item name">
        <button class='item-edit-submit hidden'>
          <span class='button-label'>submit</span>
        </button>
      </span>
      
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  // console.log("Generating shopping list element");
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList(obj=STORE) {
  // render the shopping list in the DOM
  // console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(obj);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  // console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();

    const newItemName = $('.js-shopping-list-entry').val();
    // console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();

  });
  
  
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index'  + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

// this function will be responsible for when users click the "check" button 
function handleItemCheckClicked() {
  
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

// this function will be responsible for when users want to delete a shopping list
  // item
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // alert('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItemFromShoppingList(itemIndex);
    renderShoppingList();
  });
}

function deleteItemFromShoppingList(itemIndex){
  STORE.splice(itemIndex,1);
}

function handleUncheckedButtonClicked(){
    $('input[type=checkbox]').on('change', function(){
    // alert($(this).is(':checked'));
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    if ($(this).is(':checked')) {
      // alert('check') and showing all webpage loads this way so flipped hide/show;
      $('.shopping-item__checked').closest('li').hide(600);
    }
    else {
      //alert('unchecked');
      $('.shopping-item__checked').closest('li').show(300);
    }
    // renderShoppingList();
  });
}
 

function handleItemSearch(){
  // $('#js-search-list-form').submit(function(){
  $('#js-search-list-form').on( 'keyup' , function(){
    event.preventDefault();//prevent default form input processing
    let searchVal = $('.js-search-entry').val().toLowerCase();
    // console.log(searchVal);

    let filteredSearch = STORE.filter(index => index.name.includes(searchVal));
    console.log(filteredSearch);
    renderShoppingList(filteredSearch);
  });
}

// this function will be responsible for when users click the "edit" button on
  // a shopping list item.
function handleEditItemInput(){
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    // console.log('`handleEditItemClicked` ran');
    $(event.currentTarget).closest('li').find('.item-edit-box').show();
    $(event.currentTarget).closest('li').find('.item-edit-submit').show();
    // console.log(event.currentTarget); 
    // renderShoppingList();
     });
}

function handleEditItemSubmit(){
  $('.js-shopping-list').on('click', '.item-edit-submit', function(event) { 
    console.log('lllllll'); 
    let editedItemName = $(event.currentTarget).closest('.js-shopping-item').find('.item-edit-box').val();
    console.log(editedItemName);
    const itemIndex = getItemIndexFromElement(event.currentTarget);

    if(editedItemName !== ''){
      STORE[itemIndex].name = editedItemName;
    }

    renderShoppingList();
  });
}










// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleUncheckedButtonClicked();
  handleItemSearch();
  handleEditItemInput();
  handleEditItemSubmit();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);