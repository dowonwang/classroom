import { cn } from '../lib/cn';

const tw = String.raw;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variants = {
  primary: tw`bg-primary text-white hover:bg-zinc-800`,
  secondary: tw`bg-secondary text-zinc-900 hover:bg-zinc-200`,
  ghost: tw`bg-transparent hover:bg-zinc-100`,
};

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
