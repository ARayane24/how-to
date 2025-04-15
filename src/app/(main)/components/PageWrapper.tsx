const PageWrapper = ({
  // Changed from AuthPage to PageWrapper
  title,
  children,
  subtitle,
}: {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-gray-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  </div>
);
export default PageWrapper;
