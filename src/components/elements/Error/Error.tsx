interface ErrorProps {
  message?: string;
}

const Error = ({ message = "An error occurred" }: ErrorProps) => {
  return (
    <div className="h-screen flex items-center justify-center text-center">
      <p className="text-error">{message}</p>
    </div>
  );
};

export default Error;
