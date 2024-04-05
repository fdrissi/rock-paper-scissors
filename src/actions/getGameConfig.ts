import { TGameConfig } from '../types';

export async function getGameConfig(): Promise<TGameConfig> {
  const response = await fetch('/game.json');
  const config: TGameConfig = await response.json();
  return config;
}
