const GradientLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      {children}
    </div>
  );
};

export default GradientLayout;
