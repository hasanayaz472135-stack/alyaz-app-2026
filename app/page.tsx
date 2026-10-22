export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
          A
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Alyaz
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Ana sayfaya hoş geldiniz
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Uygulamanız için temiz ve sağlam bir başlangıç noktası.
          </p>
        </div>
        <a
          href="#basla"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Başlayın
        </a>
      </section>
    </main>
  )
}
