import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.tsx";

type Tech = { name: string; logo: string };
type Period = { year: number; month: number }; // month: 0 = enero
type Job = {
  company: string;
  role: string;
  start: Period;
  end: Period | null; // null = trabajo actual
  stack: Tech[];
};

/* Experiencia — orden cronológico inverso (lo más reciente primero, como
   en un CV). Los roles se dejan en inglés (convención en perfiles técnicos);
   las empresas son nombres propios. */
const EXPERIENCE: Job[] = [
  {
    company: "Griver",
    role: "AI Engineer",
    start: { year: 2026, month: 4 },
    end: null,
    stack: [
      { name: "JavaScript", logo: "javascript.svg" },
      { name: "Python", logo: "python.svg" },
      { name: "n8n", logo: "n8n.svg" },
      { name: "AWS", logo: "aws.svg" },
    ],
  },
  {
    company: "Ficachi Consultores",
    role: "Backend Engineer",
    start: { year: 2025, month: 8 },
    end: { year: 2026, month: 2 },
    stack: [
      { name: "Java", logo: "java.svg" },
      { name: "Spring Boot", logo: "spring.svg" },
      { name: "MySQL", logo: "mysql.svg" },
      { name: "JavaScript", logo: "javascript.svg" },
    ],
  },
  {
    company: "Hutchison Ports Icave",
    role: "Cloud Engineer Intern",
    start: { year: 2024, month: 8 },
    end: { year: 2025, month: 2 },
    stack: [
      { name: ".NET", logo: "dotnet.svg" },
      { name: "C#", logo: "csharp.svg" },
      { name: "JavaScript", logo: "javascript.svg" },
      { name: "Google Cloud", logo: "googlecloud.svg" },
    ],
  },
];

/* "sep 2024" — mes abreviado + año, localizado según el idioma activo. */
const monthYear = (p: Period, language: string) =>
  new Intl.DateTimeFormat(language, { month: "short", year: "numeric" }).format(
    new Date(p.year, p.month),
  );

/* "sep 2024 – mar 2025" / "may 2026 – Actualidad" */
const formatPeriod = (job: Job, language: string, present: string) =>
  `${monthYear(job.start, language)} – ${
    job.end ? monthYear(job.end, language) : present
  }`;

/* Bloque que aparece con fade + lift cuando la sección entra en viewport.
   La animación vive en index.css (.reveal); aquí solo se conmuta la clase
   y se pasa el retardo del stagger por la variable CSS --reveal-delay. */
const Reveal: React.FC<{
  visible: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ visible, delay = 0, className = "", children }) => (
  <div
    className={`reveal${visible ? " is-visible" : ""} ${className}`}
    style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
  >
    {children}
  </div>
);

/* Etiqueta de sección: versalitas tracked + regla hairline a lo ancho. */
const SectionLabel: React.FC<{
  as?: "span" | "h3";
  children: React.ReactNode;
}> = ({ as: Tag = "span", children }) => (
  <div className="flex items-center gap-4">
    <Tag className="shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
      {children}
    </Tag>
    <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
  </div>
);

/* Tecnología: silueta monocroma (.tech-logo) que recupera color de marca y
   se eleva al hover del item. */
const TechItem: React.FC<Tech> = ({ name, logo }) => (
  <li
    className="group flex w-[104px] flex-col items-center gap-2.5 rounded-xl px-2 py-3
               transition-transform duration-150 ease-[cubic-bezier(.2,.8,.2,1)]
               hover:-translate-y-1 motion-reduce:transition-none"
  >
    <img
      src={`/logos/${logo}`}
      alt={`${name} logo`}
      width={40}
      height={40}
      loading="lazy"
      className="tech-logo h-10 w-10 object-contain"
    />
    <span
      className="text-center text-xs font-medium tracking-wide text-neutral-500
                 transition-colors duration-200 group-hover:text-neutral-900
                 dark:text-neutral-400 dark:group-hover:text-neutral-100
                 motion-reduce:transition-none"
    >
      {name}
    </span>
  </li>
);

/* Entrada de experiencia: empresa + periodo + rol + fila de logos del stack.
   `divider` añade una regla hairline superior entre trabajos. */
const JobEntry: React.FC<{ job: Job; period: string; divider: boolean }> = ({
  job,
  period,
  divider,
}) => (
  <article
    className={
      divider ? "border-t border-neutral-200 pt-10 dark:border-neutral-800" : ""
    }
  >
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h4 className="text-lg font-semibold tracking-[-0.01em] text-neutral-900 dark:text-neutral-50 sm:text-xl">
        {job.company}
      </h4>
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">
        {period}
      </span>
    </div>
    <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
      {job.role}
    </p>
    <ul className="-ml-2 mt-5 flex flex-wrap gap-x-1 gap-y-2">
      {job.stack.map((tech) => (
        <TechItem key={`${job.company}-${tech.name}`} {...tech} />
      ))}
    </ul>
  </article>
);

const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Reveal una sola vez, al entrar en viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="bg-bg-light py-24 transition-colors duration-700 dark:bg-bg-dark sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        {/* — About — */}
        <Reveal visible={visible} delay={0}>
          <SectionLabel>{t("about.label")}</SectionLabel>
        </Reveal>

        {/* Lead statement — el gancho elevado a cita-titular en serif */}
        <Reveal visible={visible} delay={70} className="mt-9 sm:mt-11">
          <h2
            id="about-heading"
            className="text-balance text-4xl leading-[1.1] tracking-[-0.02em]
                       text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-6xl"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}
          >
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
              {"“"}
            </span>
            {t("about.lead")}
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">
              {"”"}
            </span>
          </h2>
        </Reveal>

        {/* Bio */}
        <Reveal visible={visible} delay={140} className="mt-8">
          <p className="max-w-[62ch] text-base leading-[1.75] text-neutral-600 dark:text-neutral-300 sm:text-lg">
            {t("about.description")}
          </p>
        </Reveal>

        {/* Enlace editorial — subrayado que se dibuja + flecha que se desplaza */}
        <Reveal visible={visible} delay={200} className="mt-7">
          <a
            href="https://google.com"
            className="group relative inline-flex items-center gap-1.5 rounded-sm py-1
                       text-sm font-medium text-tekhelet outline-none
                       transition-transform duration-150 ease-[cubic-bezier(.2,.8,.2,1)]
                       active:translate-y-px dark:text-tropical-indigo
                       focus-visible:ring-2 focus-visible:ring-tropical-indigo
                       focus-visible:ring-offset-4 focus-visible:ring-offset-bg-light
                       dark:focus-visible:ring-offset-bg-dark
                       motion-reduce:transition-none"
          >
            <span className="relative">
              {t("about.mod_link")}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0
                           bg-current transition-transform duration-300
                           ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-x-100
                           group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200
                         ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-0.5
                         group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5
                         group-focus-visible:-translate-y-0.5 motion-reduce:transition-none"
              strokeWidth={2}
            />
          </a>
        </Reveal>

        {/* — Stack & Tools, organizado por experiencia — */}
        <Reveal visible={visible} delay={290} className="mt-16 sm:mt-20">
          <SectionLabel as="h3">{t("about.tech_title")}</SectionLabel>
        </Reveal>

        {EXPERIENCE.map((job, i) => (
          <Reveal
            key={job.company}
            visible={visible}
            delay={350 + i * 70}
            className={i === 0 ? "mt-10" : ""}
          >
            <JobEntry
              job={job}
              period={formatPeriod(job, language, t("about.present"))}
              divider={i > 0}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
