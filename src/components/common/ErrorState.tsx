interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this section right now. Please try again.",
  actionLabel = "Try again",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="rounded-[28px] border border-rose-400/20 bg-rose-500/10 p-8 text-center">
      <p className="text-sm uppercase tracking-[0.28em] text-rose-300">Load Error</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-slate-300">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-full bg-rose-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-rose-300"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default ErrorState;
