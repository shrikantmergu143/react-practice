/* eslint-disable prettier/prettier */
import React from 'react';
import './App.css';
// import { Search } from './components';
import { Route, Routes } from 'react-router';
import { APP_URL } from './components/static/constant';
import { useSettings } from './components/context/SettingsContext';

const CounterComponent = React.lazy(() => import('./components/CounterComponent'));
const Timer = React.lazy(() => import('./components/Timer'));
const FileManage = React.lazy(() => import('./pages/folder/FileManage'));
const DashboardLayout = React.lazy(() => import('./pages/Layout/DashboardLayout'));

function App() {
  const setting = useSettings();
  console.log('setting', setting);
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
    <React.Suspense fallback={<React.Fragment />}>
      <Routes>
        <Route path={APP_URL.HOME} Component={DashboardLayout}>
          <Route index Component={Timer} />
          <Route path={APP_URL.COUNTER} Component={CounterComponent} />
          <Route path={APP_URL.FOLDER} Component={FileManage} />
          <Route path="*" Component={Timer} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
