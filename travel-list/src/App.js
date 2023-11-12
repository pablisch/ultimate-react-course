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

  return (
    <div className='app'>
      <Logo />
      <Form items={items} onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteitems} onUpdateItem={handleUpdateItem} />
      <Stats />
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

function PackingList({ items, onDeleteItem, onUpdateItem }) {
  

  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} />
        ))}
      </ul>
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

function Stats() {
  return (
    <footer className='stats'>
      <em>
        You have {} items on your list, and you already packed {} {}
      </em>
    </footer>
  );
}
