interface LoaderProps {
  dependency: unknown;
  fallback: React.ReactNode;
  content: React.ReactNode;
}

function Loader({ dependency, content, fallback }: LoaderProps) {
  return dependency ? content : fallback;
}

export default Loader;
