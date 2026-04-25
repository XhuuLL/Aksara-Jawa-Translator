export default function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-32 mb-16 sm:mb-24 animate-fade-in group relative">
      <div className="absolute -left-6 top-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-amber-500/50 hidden lg:block hover:text-amber-500 cursor-pointer">
        <a href={`#${id}`}>#</a>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-3">
        {title}
      </h2>
      
      <div className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed space-y-6 max-w-none prose prose-zinc dark:prose-invert prose-headings:font-bold prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-p:leading-relaxed">
        {children}
      </div>
      
      <hr className="mt-16 sm:mt-24 border-zinc-100 dark:border-white/[0.05]" />
    </section>
  );
}
