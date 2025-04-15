import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Reusable Components
const FormInput = ({
  // Changed from AuthInput to FormInput
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  className,
  ...props
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  [key: string]: unknown;
}) => (
  <div className="space-y-1">
    <Label htmlFor={id} className="text-gray-300">
      {label}
    </Label>
    {type === "textarea" ? (
      <textarea
        id={id}
        value={value}
        onChange={(e) =>
          onChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
        }
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
          "rounded-md shadow-sm transition-colors duration-300",
          className
        )}
        {...props}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
          "rounded-md shadow-sm transition-colors duration-300",
          className
        )}
        {...props}
      />
    )}
  </div>
);

export default FormInput;
