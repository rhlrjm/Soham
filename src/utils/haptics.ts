export const triggerHaptic = (pattern: number | number[] = 30) => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
};
