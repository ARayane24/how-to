import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ActionButton = ({
  // Changed from AuthButton to ActionButton
  children,
  onClick,
  className,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}) => (
  <Button
    onClick={onClick}
    className={cn(
      "w-full px-6 py-3 text-white font-semibold rounded-md shadow-md transition-colors duration-300",
      "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
      "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </Button>
);
export default ActionButton;
