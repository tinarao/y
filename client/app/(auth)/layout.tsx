const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center items-center h-screen">
        <div className="min-w-[500px] rounded-xl border">  
          {children}
        </div>
    </main>
  );
};

export default AuthLayout;
