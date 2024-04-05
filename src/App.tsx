import './styles/App.scss';
import Game from './components/game';
import { useEffect, useState } from 'react';
import { TGameConfig } from './types';
import { getGameConfig } from './actions/getGameConfig';
import { startGame } from './actions/play';

function App() {
  const [gameConfig, setGameConfig] = useState<TGameConfig>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    loadGameConfig();
  }, []);

  async function loadGameConfig() {
    setIsLoading(true);
    try {
      const config = await getGameConfig();
      setGameConfig(config);
    } catch (error) {
      console.error('Error while loading game config', error);
      setError('Error while loading game config');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !gameConfig) {
    return <div>{error}</div>;
  }

  const { play, getBalance } = startGame(gameConfig);

  return <Game config={gameConfig} onPlay={play} getBalance={getBalance} />;
}

export default App;
