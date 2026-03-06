// Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`border rounded p-4 ${className}`}>{children}</div>
);

const CardHeader = ({ children }: CardProps) => (
  <div className="border-b pb-2 mb-3 font-bold">{children}</div>
);

const CardBody = ({ children }: CardProps) => (
  <div className="py-2">{children}</div>
);

const CardFooter = ({ children }: CardProps) => (
  <div className="border-t pt-2 mt-3">{children}</div>
);

// Compound component
export { Card };
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>;
