interface ErrorProps {
  message?: string;
}

const Error = ({ message = "An error occurred" }: ErrorProps) => {
  return (
    <div className="py-10 md:py-20 text-center">
      <p className="text-error">{message}</p>
    </div>
  );
};

export default Error;
