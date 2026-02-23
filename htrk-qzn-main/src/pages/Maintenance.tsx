const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 animate-fade-in">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">Scheduled Maintenance</h1>
        <p className="text-muted-foreground">
          The Municipality of Quezon website is temporarily undergoing maintenance.
          Please check back shortly.
        </p>
        <p className="text-sm text-muted-foreground">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
