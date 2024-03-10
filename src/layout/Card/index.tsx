import styles from './card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={`${styles['card']} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Card;
