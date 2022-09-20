import React from 'react';

import { ProjectProvider } from './contexts/Project';

import NavBar from './components/NavBar';
import ProjectContainer from './components/Project/Container';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <ProjectProvider>
          <ProjectContainer />
        </ProjectProvider>
      </main>
    </div>
  );
}

export default App;
