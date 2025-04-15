import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthInputProps {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}

const AuthInput = ({
  id,
  type,
  value,
  placeholder,
  onChange,
  autoComplete = "",
}: AuthInputProps) => (
  <div className=" w-full">
    <Label htmlFor={id} className="sr-only">
      {placeholder}
    </Label>
    <Input
      id={id}
      name={id}
      type={type}
      autoComplete={autoComplete}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "appearance-none rounded-md relative block w-full px-3 py-2",
        "border border-gray-700 placeholder-gray-400 text-white",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
        "focus:z-10 sm:text-sm bg-gray-800/50"
      )}
    />
  </div>
);

export default AuthInput;
