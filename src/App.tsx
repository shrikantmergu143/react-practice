import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';

function App() {
  const [search, setSearch] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);
  };
  const onSearch = (value: string) => {
    console.log('search value:', value);
  };
  return (
    <div className="">
      <Search name="search" value={search} onChange={onChange} onSearch={onSearch} />
    </div>
  );
}

export default App;
