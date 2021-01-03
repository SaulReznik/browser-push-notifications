import './App.css';

const App = () => {
  const anotherOneHandler = () => {
    fetch('http://localhost:6789/api/v1/notifications/anotherOne', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      }
    });
    console.log('Push sent...');
  }

  return (
    <div className="App">
      <h1>What's up pal?</h1>
      <button onClick={anotherOneHandler}>Another One</button>
    </div>
  );
}

export default App;
