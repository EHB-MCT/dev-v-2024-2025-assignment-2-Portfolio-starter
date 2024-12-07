import { trackInteraction } from './utils/tracker';

const Home = () => {
  const handleClick = () => {
    trackInteraction('click', 'signup-button');
  };

  return (
    <div>
      <h1>Welcome to the User Interaction Dashboard</h1>
      <button onClick={handleClick}>Sign Up</button>
    </div>
  );
};

export default Home;
