import './App.css';
import { token } from './config';

const App = () => {
  //const user_id = '5fedc679f414663c693cf549';
  const anotherOneHandler = () => {
    fetch(`http://localhost:6789/api/v1/notifications/anotherOne`, {
      method: 'POST',
      headers: {
          'authorization': token,
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
