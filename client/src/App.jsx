// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
//------------------------------------------------------------------------------------------------------------------------




// We import our App.css file to ensure the styles are applied to our component.
import './App.css';

// This is the main functional component for our application.
// In React, components are functions that return JSX (JavaScript XML).
function App() {
  // The 'return' statement contains the JSX that will be rendered to the DOM.
  // We are returning a single div with an h1 element as a placeholder for our app.
  // This gives us a clean starting point.
  return (
    <div>
      <h1>Job Board Aggregator</h1>
    </div>
  );
}

// We export the App component as the default export from this file.
// This allows it to be imported and used in other files, primarily 'src/main.jsx'.
export default App;