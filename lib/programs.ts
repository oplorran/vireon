/**
 * Program content.
 *
 * Titles come from `PROGRAMS_DATA` (already localized). The lesson bodies stay in
 * English on purpose: the reference app also keeps library articles and program
 * lessons in English and only translates the shell.
 */

export type ProgramDay = {
  dayNumber: number;
  title: { en: string; pt: string; es: string };
  introduction: string;
  article: string;
  activityTitle: string;
  activityBody: string;
  tasks: string[];
  related: { type: "food" | "recipe" | "exercise" | "article"; slug: string; title: string }[];
};

export type ProgramWeek = { week: number; title: string | null; days: ProgramDay[] };

export type Program = {
  slug: string;
  level: string;
  totalDays: number;
  theme: "cyan" | "blue";
  weeks: ProgramWeek[];
};

type Seed = {
  intro: string;
  activity?: [string, string];
  tasks?: string[];
  related?: ProgramDay["related"];
};

const LEGAL_TASKS = [
  "Write one sentence about what changed after reading",
  "Mark the habits you already do",
  "Note one question for a clinician",
];

function build(
  slug: string,
  level: string,
  theme: Program["theme"],
  days: ProgramDay["title"][],
  seeds: Seed[],
  weekTitles: Record<number, string> = {},
  daysPerWeek = 7,
): Program {
  const built: ProgramDay[] = days.map((title, index) => {
    const number = index + 1;
    const seed = seeds[index] ?? { intro: "" };
    return {
      dayNumber: number,
      title,
      introduction:
        seed.intro ||
        `Day ${number} looks at ${title.en.toLowerCase()} as one small part of an educational routine, not as a treatment.`,
      article: [
        `${title.en} is easier to judge when you separate what is measured from what is promised. This lesson keeps the claim small: something you can read today and repeat tomorrow.`,
        `Use it as a checklist of attention. Notice what you already do, keep the version that survives a busy week, and write down the parts that do not fit your life yet.`,
        `If a symptom is persistent, or a habit keeps failing without an obvious reason, that is a conversation for a qualified clinician, not a conclusion from one lesson.`,
      ].join("\n\n"),
      activityTitle: seed.activity?.[0] ?? "Today's activity",
      activityBody:
        seed.activity?.[1] ??
        "Pick the smallest version of this task that still counts, do it once, and mark it in the checklist below if it happened.",
      tasks: seed.tasks ?? LEGAL_TASKS,
      related: seed.related ?? [],
    };
  });

  const weeks: ProgramWeek[] = [];
  built.forEach((day) => {
    const week = Math.ceil(day.dayNumber / daysPerWeek);
    const current = weeks[weeks.length - 1];
    if (current && current.week === week) {
      current.days.push(day);
      return;
    }
    weeks.push({ week, title: weekTitles[week] ?? null, days: [day] });
  });

  return { slug, level, totalDays: built.length, theme, weeks };
}

const starter: ProgramDay["title"][] = [
  { en: "Understanding Men's Health", pt: "Entendendo a saúde masculina", es: "Entender la salud masculina" },
  { en: "Nutrition Fundamentals", pt: "Fundamentos da nutrição", es: "Fundamentos de la nutrición" },
  { en: "Physical Activity", pt: "Atividade física", es: "Actividad física" },
  { en: "Sleep and Recovery", pt: "Sono e recuperação", es: "Sueño y recuperación" },
  { en: "Stress Management", pt: "Gestão do estresse", es: "Gestión del estrés" },
  { en: "Healthy Daily Habits", pt: "Hábitos diários saudáveis", es: "Hábitos diarios saludables" },
  { en: "Building Your Personal Routine", pt: "Construindo sua rotina pessoal", es: "Construir tu rutina personal" },
];

const starterSeeds: Seed[] = [
  {
    intro:
      "A week is enough to notice habits, not to prove anything about erectile function. Start by writing down what a normal day already looks like.",
    activity: ["Write a normal day", "List the meals, movement, sleep and stress of yesterday, without editing it to look better."],
    tasks: ["Describe yesterday in five lines", "Circle the part that repeats most", "Read the medical disclaimer"],
    related: [{ type: "article", slug: "understanding-ed", title: "Erectile dysfunction basics" }],
  },
  {
    intro: "Nutrition does not need a perfect plate. It needs a pattern you can repeat on a weekday.",
    activity: ["Build one steady plate", "Pick a protein, a vegetable and a carbohydrate you actually like, then use them together at lunch."],
    tasks: ["Choose one protein", "Choose one vegetable", "Eat them together once"],
    related: [{ type: "food", slug: "salmon", title: "Salmon" }],
  },
  {
    intro: "Movement helps most when it is boring and repeatable. Ten honest minutes beat an ambitious plan you skip.",
    activity: ["Ten minutes of movement", "Walk, climb stairs or do a short strength pattern. Stop if something hurts."],
    tasks: ["Move for ten minutes", "Note how you felt after", "Decide when you would repeat it"],
    related: [{ type: "exercise", slug: "brisk-walk", title: "Brisk walking" }],
  },
  {
    intro: "Sleep is the cheapest recovery tool in this program and the first one dropped in a busy week.",
    activity: ["Protect a sleep window", "Pick a target bedtime, set one alarm, and put the phone out of reach thirty minutes before it."],
    tasks: ["Pick a bedtime", "Set a wind-down alarm", "Charge the phone outside the bedroom"],
    related: [{ type: "article", slug: "sleep-fundamentals", title: "Sleep and recovery" }],
  },
  {
    intro: "Stress shows up in the body before it shows up in a plan. A short break counts if it is real.",
    activity: ["One breathing break", "Breathe in for four, out for six, for two minutes. Then name the thing that is actually pressing."],
    tasks: ["Take the two-minute break", "Name the real pressure", "Write one thing you can drop today"],
  },
  {
    intro: "Habits stick when the cue is visible. Today is about placing the cue, not about willpower.",
    activity: ["Place one cue", "Put the water bottle, the shoes, or the book where you will trip over it tomorrow morning."],
    tasks: ["Choose one habit", "Place the cue in sight", "Repeat the habit once today"],
    related: [{ type: "recipe", slug: "oats", title: "Overnight oats" }],
  },
  {
    intro: "A personal routine is a short list of things that still happen on a bad week.",
    activity: ["Write the smallest week", "Keep three items from the last six days and cross out the rest."],
    tasks: ["Pick three keepers", "Write them in one line each", "Mark the week complete"],
  },
];

const journey: ProgramDay["title"][] = [
  { en: "What this journey covers", pt: "O que esta jornada cobre", es: "Qué cubre este viaje" },
  { en: "Health is connected", pt: "A saúde é conectada", es: "La salud está conectada" },
  { en: "A realistic first week", pt: "Uma primeira semana realista", es: "Una primera semana realista" },
  { en: "Notice the habits you already have", pt: "Observe os hábitos que você já tem", es: "Nota los hábitos que ya tienes" },
  { en: "How to read health claims", pt: "Como ler promessas de saúde", es: "Cómo leer promesas de salud" },
  { en: "Safety and when to get help", pt: "Segurança e quando buscar ajuda", es: "Seguridad y cuándo buscar ayuda" },
  { en: "Week 1 check-in", pt: "Balanço da semana 1", es: "Revisión de la semana 1" },
  { en: "Build a steady plate", pt: "Monte um prato estável", es: "Arma un plato estable" },
  { en: "Vegetables, fruit, and fiber", pt: "Vegetais, fruta e fibra", es: "Verduras, fruta y fibra" },
  { en: "Fats that fit a heart-healthy pattern", pt: "Gorduras que cabem num padrão saudável", es: "Grasas que encajan en un patrón saludable" },
  { en: "Protein at each meal", pt: "Proteína em cada refeição", es: "Proteína en cada comida" },
  { en: "Hydration and alcohol", pt: "Hidratação e álcool", es: "Hidratación y alcohol" },
  { en: "Eating out without drama", pt: "Comer fora sem drama", es: "Comer fuera sin drama" },
  { en: "Week 2 check-in", pt: "Balanço da semana 2", es: "Revisión de la semana 2" },
  { en: "Sleep as a foundation", pt: "Sono como base", es: "El sueño como base" },
  { en: "A wind-down that works", pt: "Um relaxamento que funciona", es: "Un ritual que funciona" },
  { en: "Breathing under pressure", pt: "Respiração sob pressão", es: "Respiración bajo presión" },
  { en: "Movement you will repeat", pt: "Movimento que você vai repetir", es: "Movimiento que repetirás" },
  { en: "Strength without a gym", pt: "Força sem academia", es: "Fuerza sin gimnasio" },
  { en: "Desk days and stiffness", pt: "Dias de mesa e rigidez", es: "Días de escritorio y rigidez" },
  { en: "Week 3 check-in", pt: "Balanço da semana 3", es: "Revisión de la semana 3" },
  { en: "Keep the smallest version", pt: "Mantenha a menor versão", es: "Mantén la versión más pequeña" },
  { en: "Plan for a bad week", pt: "Planeje uma semana ruim", es: "Planifica una mala semana" },
  { en: "Tracking without obsession", pt: "Registrar sem obsessão", es: "Registrar sin obsesión" },
  { en: "Social support", pt: "Apoio social", es: "Apoyo social" },
  { en: "Sleep and travel", pt: "Sono e viagem", es: "Sueño y viajes" },
  { en: "Reviewing the month", pt: "Revisando o mês", es: "Revisando el mes" },
  { en: "What comes next", pt: "O que vem depois", es: "Lo que viene después" },
];

const journeySeeds: Seed[] = journey.map((title) => ({
  intro: `${title.en} is one piece of a month of education. Read it, take one small action, and keep the effort modest on purpose.`,
}));

journeySeeds[0] = {
  intro:
    "Four weeks, four themes: food, movement, sleep, and consistency. Nothing here is a cure and nothing is a score.",
  activity: ["Skim the month", "Open the week headings and pick the theme you expect to be hardest."],
  tasks: ["Skim all four weeks", "Name the hardest theme", "Decide the two days you will protect"],
  related: [{ type: "article", slug: "understanding-ed", title: "Erectile dysfunction basics" }],
};
journeySeeds[1] = {
  intro:
    "Blood vessels, sleep, mood and medicine all touch the same system. That is why one perfect habit rarely carries the week.",
  activity: ["Map the links", "Write the three areas that already affect your energy most."],
  tasks: ["Write three influences", "Mark the one you control", "Read the disclaimer"],
};
journeySeeds[4] = {
  intro:
    "A claim is easier to trust when it names who it studied, for how long, and what was measured.",
  activity: ["Test one claim", "Take a promise you saw this week and find who it was studied in."],
  tasks: ["Pick one claim", "Look for the sample", "Write what was actually measured"],
};
journeySeeds[5] = {
  intro:
    "Chest pain, fainting, sudden breathlessness or an erection lasting more than four hours belong with emergency care.",
  activity: ["Write the red flags", "Put the four emergency signs on one line you can find again."],
  tasks: ["Write the four signs", "Note the nearest emergency service", "Save the note on your phone"],
};
journeySeeds[6] = {
  intro: "A check-in should fit in a few lines: what held, what slipped, and one adjustment for next week.",
  activity: ["First check-in", "Write what held, what slipped, and the one change for week two."],
  tasks: ["Write what held", "Write what slipped", "Choose one adjustment"],
};
journeySeeds[7] = {
  intro: "Steady means three components, in portions you can eat on a Tuesday.",
  activity: ["Build the plate", "Serve a protein, a vegetable and a carbohydrate together at one meal."],
  tasks: ["Serve a protein", "Serve a vegetable", "Eat without a screen"],
  related: [{ type: "food", slug: "salmon", title: "Salmon" }],
};
journeySeeds[9] = {
  intro:
    "Olive oil, nuts, seeds and oily fish fit a heart-healthy pattern better than fried snacks, in ordinary amounts.",
  activity: ["Choose one fat", "Swap a fried snack for a handful of nuts or a teaspoon of olive oil today."],
  tasks: ["Pick one fat", "Use it once", "Note how filling it felt"],
};
journeySeeds[10] = {
  intro:
    "Protein at each meal is a practical anchor, not a prescription. A hand-sized portion is enough for most people.",
  activity: ["Anchor one meal", "Add a hand-sized protein portion to breakfast or lunch."],
  tasks: ["Add protein to one meal", "Keep the portion palm-sized", "Drink water with it"],
};
journeySeeds[11] = {
  intro: "Water first, alcohol second: two drinks on a weeknight is already a different night's sleep.",
  activity: ["Two glasses before anything else", "Drink two glasses of water before your first coffee today."],
  tasks: ["Two glasses before coffee", "Count the alcoholic drinks", "Stop drinking two hours before bed"],
};
journeySeeds[14] = {
  intro: "Sleep is the platform the rest of the month stands on. Protect the window before you improve the content.",
  activity: ["Fix the window", "Write a bedtime and a wake time, then set both alarms."],
  tasks: ["Write a bedtime", "Set both alarms", "Leave the phone outside reach"],
  related: [{ type: "article", slug: "sleep-fundamentals", title: "Sleep and recovery" }],
};
journeySeeds[15] = {
  intro: "A wind-down is a repeated sequence, not a mood. Three quiet steps are enough.",
  activity: ["Three quiet steps", "Pick three low-light actions and do them in the same order."],
  tasks: ["Choose three steps", "Do them in order", "Keep the lights low"],
};
journeySeeds[16] = {
  intro: "Slow exhale is the part of breathing that settles the body. Four in, six out, two minutes.",
  activity: ["Two minutes of slow exhale", "Breathe in for four and out for six, sitting down, twice today."],
  tasks: ["Breathe twice today", "Keep the exhale longer", "Sit down while doing it"],
};
journeySeeds[18] = {
  intro: "Body weight is enough for a first strength pattern: sit, push, hinge, carry.",
  activity: ["One body-weight pattern", "Do five slow chair squats and five wall push-ups."],
  tasks: ["Five chair squats", "Five wall push-ups", "Rest between sets"],
  related: [{ type: "exercise", slug: "sit-to-stand", title: "Bodyweight squat" }],
};
journeySeeds[19] = {
  intro: "Stiffness after a desk day responds to frequency, not intensity. Stand up more often than you stretch hard.",
  activity: ["Break the desk block", "Stand and move for two minutes every hour, three times today."],
  tasks: ["Three movement breaks", "Two minutes each", "Set a reminder"],
};
journeySeeds[20] = {
  intro: "Week three check-in: sleep and movement were the theme, so judge the week by the window you protected.",
  activity: ["Third check-in", "Write the nights you protected and the days you moved."],
  tasks: ["Write protected nights", "Write moving days", "Pick one repair"],
};
journeySeeds[21] = {
  intro: "The smallest version is the one that survives a hard week. Shrink the habit until it is almost silly.",
  activity: ["Shrink one habit", "Take a habit you keep skipping and cut it to two minutes."],
  tasks: ["Pick a skipped habit", "Cut it to two minutes", "Do the two minutes"],
};
journeySeeds[22] = {
  intro: "A bad week is predictable: travel, illness, deadlines. Write the fallback before it arrives.",
  activity: ["Write the fallback", "Decide what you will do on a day with no time and no energy."],
  tasks: ["Write the fallback", "Keep it under five minutes", "Place it on the calendar"],
};
journeySeeds[23] = {
  intro: "Tracking helps while it answers a question. When it becomes a scoreboard, drop a column.",
  activity: ["Drop one column", "Remove one thing you track but never use."],
  tasks: ["List what you track", "Remove one column", "Keep three at most"],
};
journeySeeds[24] = {
  intro: "Support is practical: someone who expects you at the same time each week.",
  activity: ["Ask one person", "Tell one person the day and time you will walk or cook."],
  tasks: ["Choose one person", "Name a day and time", "Send the message"],
};
journeySeeds[25] = {
  intro: "Travel breaks the room, not the habit. Carry the smallest version: water, shoes, and a fixed window.",
  activity: ["Pack the small version", "Put the shoes and the bottle in the bag before you leave."],
  tasks: ["Pack shoes", "Pack a bottle", "Fix the window in the new time zone"],
};
journeySeeds[26] = {
  intro: "A month review is three columns: kept, dropped, and worth repeating.",
  activity: ["Review the month", "Fill the three columns honestly, without scoring yourself."],
  tasks: ["Write what you kept", "Write what you dropped", "Circle what repeats"],
};
journeySeeds[27] = {
  intro: "What comes next is a shorter list than the month. Keep three items and a check-in day.",
  activity: ["Choose the next three", "Pick three keepers and one day to check in again."],
  tasks: ["Pick three keepers", "Pick a check-in day", "Mark the program complete"],
};

export const PROGRAMS: Program[] = [
  build("7-day-starter", "Starter", "blue", starter, starterSeeds),
  build(
    "30-day-wellness-journey",
    "Journey",
    "cyan",
    journey,
    journeySeeds,
    {
      1: "Week 1: Foundation",
      2: "Week 2: Nutrition and Movement",
      3: "Week 3: Mind and Body",
      4: "Week 4: Consistency",
    },
  ),
];

export function findProgram(slug: string) {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function findProgramDay(slug: string, day: number) {
  const program = findProgram(slug);
  if (!program) return null;
  for (const week of program.weeks) {
    const found = week.days.find((d) => d.dayNumber === day);
    if (found) return { program, day: found };
  }
  return null;
}
