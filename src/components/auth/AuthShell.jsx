import Link from "next/link";

import { Card } from "@heroui/react";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <main className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100 px-4 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/40 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <span aria-hidden>←</span>
          Back to home
        </Link>

        <Card
          variant="secondary"
          className="border border-slate-200/80 bg-white/90 shadow-xl shadow-blue-900/5 backdrop-blur-sm"
        >
          <Card.Header className="flex flex-col items-start gap-1 border-b border-slate-100 px-8 pb-5 pt-8">
            <Card.Title className="text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </Card.Title>
            {subtitle ? (
              <Card.Description className="text-sm text-slate-500">
                {subtitle}
              </Card.Description>
            ) : null}
          </Card.Header>

          <Card.Content className="px-8 py-6">
            {children}
          </Card.Content>

          {footer ? (
            <Card.Footer className="justify-center border-t border-slate-100 bg-slate-50/80 px-8 py-5 text-center text-sm text-slate-600">
              {footer}
            </Card.Footer>
          ) : null}
        </Card>
      </div>
    </main>
  );
}
