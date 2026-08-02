import { Construction } from 'lucide-react'

export function WorkspacePlaceholder({ title }: { title: string }) {
  return (
    <section className="grid min-h-96 place-items-center rounded-card border border-dashed bg-surface/60 p-8 text-center">
      <div>
        <Construction className="mx-auto text-brand" size={32} />
        <h1 className="mt-4 text-2xl font-extrabold">{title} workspace</h1>
        <p className="mt-2 text-sm text-ink-muted">This module will be built in a dedicated, reviewed milestone.</p>
      </div>
    </section>
  )
}
