import { useId } from 'react';

export function GridPattern(
  props: Omit<React.ComponentPropsWithoutRef<'pattern'>, 'id'>
) {
  let patternId = useId();

  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern
          id={patternId}
          width="128"
          height="128"
          patternUnits="userSpaceOnUse"
          {...props}
        >
          <path d="M0 0 L128 128" stroke="currentColor" strokeWidth="1" />
          <path d="M128 0 L0 128" stroke="currentColor" strokeWidth="1" />

          <circle cx="0" cy="0" r="4" fill="currentColor" />
          <circle cx="128" cy="0" r="4" fill="currentColor" />
          <circle cx="0" cy="128" r="4" fill="currentColor" />
          <circle cx="128" cy="128" r="4" fill="currentColor" />

          <circle cx="64" cy="64" r="6" fill="currentColor" />
        </pattern>{' '}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
