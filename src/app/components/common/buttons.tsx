import { HTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps
  extends Pick<HTMLAttributes<HTMLButtonElement>, 'onClick'> {}

export const NextButton = ({
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type="button"
      className="mt-6 border border-emerald-300 text-emerald-300 shadow-glow-sm shadow-emerald-400/40 bg-emerald-400/5 hover:bg-emerald-400/15 h-14 w-36 font-bold rounded-full transition"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const RetryButton = ({ onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="mt-6 border border-pink-500 text-pink-500 shadow-glow-sm shadow-pink-500/40 bg-pink-500/5 hover:bg-pink-500/15 h-14 w-36 font-bold rounded-full transition"
      onClick={onClick}
    >
      다시 시작하기
    </button>
  )
}
