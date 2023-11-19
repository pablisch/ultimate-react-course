import React from 'react';
import { useState } from 'react';


const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteitems(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  function handleDeleteAll() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all list items?'
    )
    if (confirmed) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form items={items} onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteitems} onUpdateItem={handleUpdateItem} onDeleteAll={handleDeleteAll} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false  }
    console.log(newItem);
    onAddItems(newItem)

    setDescription('');
    setQuantity(1);
  }

  return (
    <form id='item-form' name='item-form' className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder='Item...' value={ description } onChange={e => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onUpdateItem, onDeleteAll }) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description') sortedItems = [...items].sort((a,b) => a.description.localeCompare(b.description)) 
  if (sortBy === 'packed') sortedItems = [...items].sort((a,b) => Number(a.packed) - Number(b.packed))

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteAll}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li className=''>
      <input type="checkbox" value={item.packed} onChange={() => onUpdateItem(item.id)} />
      <span style={item.packed ? {textDecoration: 'line-through '} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className='stats'>
        <em>
        What will you pack?
      </em>
    </footer>
    )
  }
  const numPacked = items.filter(item => item.packed).length
  const percentPacked = Math.round((numPacked / items.length) * 100)

  return (
    <footer className='stats'>
      {percentPacked === 100 ? (
        <em>
        You've got everything! You're ready to go! 🛩️
      </em>
      ) : percentPacked === 0 ? (
        <em>
        Time to start packing!
      </em>
      ) : (
        <em>
        You have {items.length} items on your list, and you already packed {numPacked} item{numPacked !== 1 && 's'} ({percentPacked}%).
      </em>  
      )
      }
      
    </footer>
  );
}
