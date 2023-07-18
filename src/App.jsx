import './App.css'
import {useState} from "react";

function App() {

  const [items, setItems] = useState([])
  const [filterStatus, setFilterStatus] = useState('All');

  window.addEventListener('click', () => {console.log(items)});

  function HandleAddItem(item) {
    setItems(() => [...items, item])
  }
  function HandleToggleItem(id) {
    setItems(
      items => items.map((item) => item.id === id ? {...item , checked: !item.checked } : item))
  }
  function HandleDeleteItem(id) {
    setItems(
      items => items.filter((item) => item.id !== id ? item : null))
  }
  function HandleChangeFilter(value) {
    setFilterStatus(value);
  }

  return (
    <div className='app'>
      <Header onAddItem={HandleAddItem} />
      <TodoList items={items} onToggleItems={HandleToggleItem} onDeleteItems={HandleDeleteItem} filterStatus={filterStatus}/>
      <Footer items={items} onChangeFilter={HandleChangeFilter} filterStatus={filterStatus}/>
    </div>
  )
}


function Header({onAddItem}) {

  const [text , setText] = useState('');
  function HandleSubmit(e)
  {
    e.preventDefault();
    if (!text) return;
    const newItem = {text, checked: false, id: Date.now()};
    onAddItem(newItem);

    setText('');
  }


  return (
    <div>
      <h1>TO DO LIST</h1>
      <form className='form' onSubmit={HandleSubmit}>
        <label>
          <input type='text' value={text} onChange={(e) => setText(e.target.value)}/>
        </label>
      </form>
    </div>
  )
}
function TodoList({items, onToggleItems, onDeleteItems, filterStatus}) {

  let filteredItems;

  if (filterStatus === 'All') {filteredItems = items} else
  if (filterStatus === 'Active') {filteredItems = items.filter((item) => item.checked === false)} else
  if (filterStatus === 'Completed') {filteredItems = items.filter((item) => item.checked === true)};

  return (
  <>
  <ul>
    { filteredItems.map((item, i) => (
      <Todo item={item} key={i} onToggleItems={onToggleItems} onDeleteItems={onDeleteItems}/>
    ))

    }

  </ul>

  </>
  )
}

function Todo({item, onToggleItems, onDeleteItems}) {
  return <li className='todo'>
      <input
        type='checkbox'
        checked={item.checked}
        onChange={() => {onToggleItems(item.id)}}
      />
      <span className={item.checked ? 'checked' : ''}>{item.text}</span>
    <button onClick={() => onDeleteItems(item.id)}>❌</button>
  </li>
}

function Footer({items, onChangeFilter, filterStatus}) {

  const unchecked = items.filter(item => item.checked === false);

  return (
    <div className='footer'>
  <p>{
    (items.length === 0) ? `add your first todo`
      : (unchecked.length > 0) ? `${unchecked.length} items left`
        : `you complete all your tasks!`
  }
  </p>
      <div className='filters'>
      <button type='button' className={ (filterStatus === 'All') ? 'current' : ''} onClick={() => onChangeFilter('All')}>All</button>
      <button type='button' className={ (filterStatus === 'Active') ? 'current' : ''} onClick={() => onChangeFilter('Active')}>Active</button>
      <button type='button' className={ (filterStatus === 'Completed') ? 'current' : ''} onClick={() => onChangeFilter('Completed')}>Completed</button>

        </div>
  </div>
  )
}

export default App;
