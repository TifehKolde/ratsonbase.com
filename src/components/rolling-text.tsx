const phrases = ["Built on trust", "Defined by quality", "Construction", "Engineering", "Renovation", "Project delivery"];

export function RollingText() {
  return (
    <div className="rolling-band overflow-hidden border-y border-[#e7e7f0] bg-white py-5" aria-label="Built on trust, defined by quality, construction, engineering, renovation and project delivery">
      <div className="rolling-track flex w-max items-center gap-8">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8" aria-hidden={copy > 0}>
            {phrases.map((phrase) => <span key={phrase} className="flex items-center gap-8 whitespace-nowrap font-heading text-xl font-bold uppercase tracking-[-.035em] text-brand sm:text-2xl">{phrase}<span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-accent" /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
