import { Bot, CheckCircle2, ChevronLeft, ChevronRight, Construction, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useState } from 'react'

type Subject = { id: number; name: string; teachers: string; periods: number }
type Session = { day: string; period: number; subject: string; teacher: string; room: string }

const inputClass = 'mt-2 w-full rounded-xl border bg-surface px-3 py-2.5 text-sm font-medium outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10'
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

function makeDraft(subjects: Subject[], rooms: string[], periodsPerDay: number): Session[] {
  const sessions: Session[] = []
  const teacherSlots = new Set<string>()
  let slot = 0
  subjects.filter((subject) => subject.name.trim()).forEach((subject) => {
    const eligible = subject.teachers.split(',').map((teacher) => teacher.trim()).filter(Boolean)
    for (let occurrence = 0; occurrence < Math.max(1, subject.periods); occurrence += 1) {
      let candidate = slot
      let teacher = eligible[occurrence % Math.max(eligible.length, 1)] || 'Teacher to assign'
      while (teacherSlots.has(`${candidate}-${teacher}`)) { candidate += 1 }
      const day = days[Math.floor(candidate / periodsPerDay) % days.length]
      const period = (candidate % periodsPerDay) + 1
      sessions.push({ day, period, subject: subject.name, teacher, room: rooms[sessions.length % rooms.length] || 'Room to assign' })
      teacherSlots.add(`${candidate}-${teacher}`)
      slot = candidate + 1
    }
  })
  return sessions
}

export function WorkspacePlaceholder({ title }: { title: string }) {
  const [step, setStep] = useState(0)
  const [department, setDepartment] = useState('Computer Science')
  const [programme, setProgramme] = useState('BSc Computer Science, Year 2')
  const [semester, setSemester] = useState('Semester 3')
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Data Structures', teachers: 'Dr. Rao, Ms. Mehta', periods: 4 },
    { id: 2, name: 'Database Systems', teachers: 'Ms. Mehta, Mr. Khan', periods: 3 },
  ])
  const [roomsText, setRoomsText] = useState('Lab 201, Room A-12')
  const [periodsPerDay, setPeriodsPerDay] = useState(6)
  const [draft, setDraft] = useState<Session[]>([])
  const isTimetable = title === 'Timetable builder'
  const steps = ['Academic setup', 'Subjects & teachers', 'Rooms & weekly periods', 'Review & generate']
  const rooms = roomsText.split(',').map((room) => room.trim()).filter(Boolean)

  function updateSubject(id: number, key: keyof Omit<Subject, 'id'>, value: string | number) {
    setSubjects((current) => current.map((subject) => subject.id === id ? { ...subject, [key]: value } : subject))
  }
  function generate() {
    const nextDraft = makeDraft(subjects, rooms, periodsPerDay)
    setDraft(nextDraft)
    localStorage.setItem('smart-timetable-draft', JSON.stringify({ department, programme, semester, subjects, rooms, periodsPerDay, sessions: nextDraft }))
  }
  if (!isTimetable) return <section className="grid min-h-96 place-items-center rounded-card border border-dashed bg-surface/60 p-8 text-center"><div><Construction className="mx-auto text-brand" size={32} /><h1 className="mt-4 text-2xl font-extrabold">{title} workspace</h1><p className="mt-2 text-sm text-ink-muted">This module will be built in a dedicated, reviewed milestone.</p></div></section>

  return <div className="mx-auto max-w-5xl">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-brand">TIMETABLE ASSISTANT</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight">Create your weekly timetable</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">Enter the details you already have. The assistant creates a balanced first draft that you can review with your teachers.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700"><Bot size={15} /> Conflict-aware planning</span></div>
    <div className="mt-8 grid gap-2 sm:grid-cols-4">{steps.map((label, index) => <button key={label} onClick={() => setStep(index)} className={`flex items-center gap-3 rounded-xl border p-3 text-left text-xs font-bold ${index === step ? 'border-brand bg-brand/8 text-brand' : index < step ? 'bg-emerald-500/5 text-emerald-700' : 'bg-surface text-ink-muted'}`}><span className={`grid size-6 shrink-0 place-items-center rounded-full ${index <= step ? 'bg-brand text-white' : 'bg-surface-muted'}`}>{index < step ? <CheckCircle2 size={15} /> : index + 1}</span>{label}</button>)}</div>
    <section className="mt-5 rounded-card border bg-surface p-5 shadow-sm sm:p-7">
      {step === 0 && <><h2 className="text-xl font-extrabold">Start with your academic setup</h2><p className="mt-1 text-sm text-ink-muted">This gives every class the right home in your admin workspace.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold">Department<input value={department} onChange={(event) => setDepartment(event.target.value)} className={inputClass} /></label><label className="block text-sm font-bold">Programme / class<input value={programme} onChange={(event) => setProgramme(event.target.value)} className={inputClass} /></label><label className="block text-sm font-bold">Semester<input value={semester} onChange={(event) => setSemester(event.target.value)} className={inputClass} /></label><label className="block text-sm font-bold">Term dates<input placeholder="e.g. Aug 12 – Dec 15" className={inputClass} /></label></div></>}
      {step === 1 && <><h2 className="text-xl font-extrabold">Add subjects and eligible teachers</h2><p className="mt-1 text-sm text-ink-muted">Separate teacher names with commas. A subject may have several teachers, and the assistant will rotate them where possible.</p><div className="mt-6 space-y-3">{subjects.map((subject) => <div key={subject.id} className="grid gap-3 rounded-xl border p-3 sm:grid-cols-[1fr_1.5fr_.5fr_auto]"><input aria-label="Subject name" value={subject.name} onChange={(event) => updateSubject(subject.id, 'name', event.target.value)} placeholder="Subject name" className="rounded-lg border px-3 py-2 text-sm font-semibold outline-none focus:border-brand" /><input aria-label="Eligible teachers" value={subject.teachers} onChange={(event) => updateSubject(subject.id, 'teachers', event.target.value)} placeholder="Teachers, separated by commas" className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand" /><input aria-label="Periods per week" type="number" min="1" max="12" value={subject.periods} onChange={(event) => updateSubject(subject.id, 'periods', Number(event.target.value))} className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-brand" /><button type="button" onClick={() => setSubjects((current) => current.filter((item) => item.id !== subject.id))} className="grid size-10 place-items-center rounded-lg text-ink-muted hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${subject.name}`}><Trash2 size={17} /></button></div>)}</div><button type="button" onClick={() => setSubjects((current) => [...current, { id: Date.now(), name: '', teachers: '', periods: 3 }])} className="mt-4 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold text-brand"><Plus size={16} /> Add another subject</button></>}
      {step === 2 && <><h2 className="text-xl font-extrabold">Set rooms and teaching hours</h2><p className="mt-1 text-sm text-ink-muted">The scheduler spreads sessions through the week and does not double-book a teacher in the same period.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold">Available rooms<input value={roomsText} onChange={(event) => setRoomsText(event.target.value)} className={inputClass} /><span className="mt-1 block text-xs font-normal text-ink-muted">Separate rooms with commas.</span></label><label className="block text-sm font-bold">Classes per day<input type="number" min="1" max="10" value={periodsPerDay} onChange={(event) => setPeriodsPerDay(Math.max(1, Number(event.target.value)))} className={inputClass} /></label><label className="block text-sm font-bold">First period starts<input placeholder="e.g. 9:00 AM" className={inputClass} /></label><label className="block text-sm font-bold">Working days<input defaultValue="Monday to Friday" className={inputClass} /></label></div></>}
      {step === 3 && <><h2 className="text-xl font-extrabold">Ready for a first draft</h2><p className="mt-1 text-sm text-ink-muted">The assistant will plan {subjects.reduce((total, subject) => total + subject.periods, 0)} weekly periods for {programme}.</p><div className="mt-6 grid gap-3 rounded-xl bg-surface-muted p-4 text-sm sm:grid-cols-4"><span><b>{department || 'No department'}</b><br /><small className="text-ink-muted">Department</small></span><span><b>{subjects.length}</b><br /><small className="text-ink-muted">Subjects</small></span><span><b>{new Set(subjects.flatMap((subject) => subject.teachers.split(',').map((teacher) => teacher.trim()).filter(Boolean))).size}</b><br /><small className="text-ink-muted">Eligible teachers</small></span><span><b>{rooms.length}</b><br /><small className="text-ink-muted">Rooms</small></span></div>{draft.length > 0 && <div className="mt-6"><p className="flex items-center gap-2 font-extrabold text-emerald-700"><CheckCircle2 size={18} /> Draft timetable created and saved on this device</p><div className="mt-3 overflow-x-auto rounded-xl border"><table className="w-full min-w-150 text-left text-sm"><thead className="bg-surface-muted text-xs uppercase tracking-wide text-ink-muted"><tr><th className="p-3">Day</th><th className="p-3">Period</th><th className="p-3">Subject</th><th className="p-3">Teacher</th><th className="p-3">Room</th></tr></thead><tbody>{draft.map((session, index) => <tr key={`${session.day}-${session.period}-${index}`} className="border-t"><td className="p-3 font-bold">{session.day}</td><td className="p-3">{session.period}</td><td className="p-3">{session.subject}</td><td className="p-3 text-ink-muted">{session.teacher}</td><td className="p-3 text-ink-muted">{session.room}</td></tr>)}</tbody></table></div></div>}</>}
      <div className="mt-7 flex justify-between border-t pt-5"><button disabled={step === 0} onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-ink-muted disabled:invisible"><ChevronLeft size={17} /> Back</button>{step < 3 ? <button onClick={() => setStep(step + 1)} className="inline-flex items-center gap-1 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white">Continue <ChevronRight size={17} /></button> : <button onClick={generate} className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white"><Sparkles size={17} /> {draft.length ? 'Regenerate timetable' : 'Generate timetable'}</button>}</div>
    </section>
  </div>
}
