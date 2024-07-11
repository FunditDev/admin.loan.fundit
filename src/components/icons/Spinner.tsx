'use client'
const Spinner = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
    return (
        <svg viewBox="0 0 100 100" {...props} >
            <path d="M90.9 58.2c-3.8 18.9-20.1 32.7-39.7 33-22 .4-40.7-17-41.9-39C8 28.5 26.9 8.8 50.4 8.8c19 0 35.5 13.1 40 31.2.3 1.2 1.4 2.1 2.7 2.1 1.8 0 3.1-1.7 2.7-3.5C90.6 18.1 72 3.3 50.4 3.3c-27.2 0-49 23.4-46.6 51.1 2.1 23 21 41.2 44 42.4C71.6 98 91.7 81.9 96.2 59.4c.3-1.7-1-3.3-2.7-3.3-1.3-.1-2.4.8-2.6 2.1z" />
        </svg>
    );
};
export default Spinner;

export const SpinnerTwo = (
    props: React.SVGProps<SVGSVGElement>
  ): JSX.Element => {
    return (
      <svg
        {...props}
        className={`animate-spin -ms-1 me-3 h-5 w-5 ${props.className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  };