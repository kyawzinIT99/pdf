type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <span className={`community-logo pdf-logo ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 64 48" width="64" height="48" role="img">
        <rect width="64" height="48" rx="8" fill="#0d3d38" />
        <circle cx="22" cy="24" r="11" fill="#e8c547" />
        <path
          d="M22 15.5c2.4 2.2 3.6 5 3.6 8.5s-1.2 6.3-3.6 8.5c-2.4-2.2-3.6-5-3.6-8.5s1.2-6.3 3.6-8.5z"
          fill="#0d3d38"
        />
        <text
          x="38"
          y="29"
          fill="#f4efe6"
          fontFamily="Georgia, serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.5"
        >
          PDF
        </text>
      </svg>
    </span>
  );
}
