import React, { useState } from 'react';
import './App.css';
import { Search } from './components';

function App() {
  const [search, setSearch] = useState('');

  const onSearch = (value: string) => {
    console.log('search value:', value);
  };

  return (
    <div className="app-shell">
      <Search
        name="search"
        label="Search packages"
        value={search}
        helperText="Debounced search callback is package-ready."
        onValueChange={setSearch}
        onSearch={onSearch}
      />
    </div>
  );
}

export default App;
