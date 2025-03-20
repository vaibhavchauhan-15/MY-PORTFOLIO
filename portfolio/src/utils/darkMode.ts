// Function to initialize dark mode based on user preference or localStorage
export const initializeDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if user has already set a preference in localStorage
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    // Apply saved preference
    const isDark = savedTheme === 'dark';
    applyDarkMode(isDark);
    return isDark;
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDarkMode(prefersDark);
    return prefersDark;
  }
};

// Function to toggle dark mode
export const toggleDarkMode = (isDark: boolean): void => {
  applyDarkMode(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Function to apply dark mode to the document
const applyDarkMode = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}; 