import { useEffect, useState } from 'react';

function App() {
  const [test, setTest] = useState('');

  useEffect(() => {
    if (test) console.log('hello');
  }, []);

  return (
    <div className="bg-gray-500">
      <header>
        <p>
          <p>hi</p>
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
