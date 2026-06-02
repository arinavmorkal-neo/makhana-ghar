/**
 * LoadingScreen — pass-through wrapper.
 * The original loading overlay was blocking FCP/LCP for 1.2–4 seconds.
 * Content now renders immediately for optimal Core Web Vitals.
 */
export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
