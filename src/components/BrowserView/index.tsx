import { useEffect, useState } from 'react';

interface BrowserViewProps {
  children: React.ReactNode;
}

function isBrowser(width: number) {
  return width > 768;
}

function BrowserView({ children }: BrowserViewProps) {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return isBrowser(width) && <>{children} </>;
}

export default BrowserView;
