import React from 'react';
import './App.css';
// import { Search } from './components';
import { Route, Routes } from 'react-router';
import CounterComponent from './components/CounterComponent';
import Timer from './components/Timer';
import FileManage from './components/folder/FileManage';

function App() {
  // const [search, setSearch] = useState('');

  // const onSearch = (value: string) => {
  //   console.log('search value:', value);
  // };

  // return (
  //   <div className="app-shell">
  //     <Search
  //       name="search"
  //       label="Search packages"
  //       value={search}
  //       helperText="Debounced search callback is package-ready."
  //       onValueChange={setSearch}
  //       onSearch={onSearch}
  //     />
  //   </div>
  // );
  return (
    <Routes>
      <Route path="/" Component={Timer} />
      <Route path="/folder" Component={FileManage} />
    </Routes>
  );
}

export default App;
