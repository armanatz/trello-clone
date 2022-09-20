import React from 'react';

import { ProjectProvider } from './contexts/Project';

import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <ProjectProvider>
          <div></div>
        </ProjectProvider>
      </main>
    </div>
  );
}

export default App;
