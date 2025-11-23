export interface CheerMessage {
  id: string;
  author: string;
  content: string;
  emoji: string;
  color: string;
  timestamp: number;
  likes: number;
}

export enum CardColor {
  Blue = 'bg-blue-500',
  Indigo = 'bg-indigo-500',
  Teal = 'bg-teal-500',
  Rose = 'bg-rose-500',
  Orange = 'bg-orange-500',
}

export const EMOJI_OPTIONS = [
  '🔥', '💯', '🍀', '📚', '💪', '✨', '🎓', '☕️',
  '✏️', '🏫', '🎒', '🌈', '🍔', '🎮', '🎵', '⚽️',
  '💡', '🧸', '🌙', '⭐', '🐱', '🐶', '🍕', '🍭'
];