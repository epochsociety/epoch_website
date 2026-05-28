import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Loader } from "@/components/Loader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background abstract elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gradient rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" />
      
      <div className="max-w-md w-full text-center glass-strong rounded-3xl p-12 shadow-soft relative z-10 border border-border/50">
        <div className="mb-6">
          <span className="text-7xl md:text-8xl font-black text-foreground tracking-tighter">
            404
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Lost in the Void</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The page you're looking for drifted off into another epoch. It might have been moved or deleted.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="group inline-flex items-center justify-center rounded-full bg-brand-gradient text-white px-8 py-3 text-sm font-semibold shadow-soft hover:shadow-glow transition-all duration-300"
          >
            Return to Base
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4">
      <div className="max-w-md text-center glass-strong rounded-3xl p-10 shadow-soft">
        <h1 className="text-xl font-semibold">Something went sideways</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-brand-gradient text-white px-5 py-2.5 text-sm font-medium shadow-soft hover:shadow-glow transition"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted transition">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Epoch Society — Tech, Innovation & Creativity" },
      { name: "description", content: "A club for builders, designers, and dreamers turning ideas into prototypes." },
      { property: "og:title", content: "Epoch Society" },
      { property: "og:description", content: "Tech · Innovation · Creativity" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Loader />
      <Outlet />
    </QueryClientProvider>
  );
}
