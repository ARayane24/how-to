import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AuthSubmitButton = ({ loading }: { loading: boolean }) => (
  <Button
    type="submit"
    className={cn(
      "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md",
      "text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
      "transition-colors duration-300",
      loading && "opacity-70 cursor-not-allowed"
    )}
    disabled={loading}
  >
    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
      <ArrowRight
        className="h-5 w-5 text-purple-300 group-hover:text-purple-200 transition-colors"
        aria-hidden="true"
      />
    </span>
    Login
  </Button>
);

export default AuthSubmitButton;
