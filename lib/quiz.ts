export type Question = {
  id: string;
  title: string;
  help: string;
  options: string[];
  multiple?: boolean;
  /** Optional emoji rendered before each option, as in the original. */
  emojis?: string[];
};

export type Answers = Record<string, string[]>;

/** Questions, verbatim from the original funnel (steps e3–e16). */
export const QUESTIONS: Question[] = [
  {
    id: "symptom",
    title: "Which of these problems describes your current situation?",
    help: "Your symptoms tell us which complementary ingredient you need.",
    multiple: true,
    options: [
      "I lose my erection before finishing",
      "I don't have the firmness I used to",
      "I notice reduced size or girth",
      "Less desire than before",
    ],
  },
  {
    id: "duration",
    title: "How long have you been noticing these changes?",
    help: "This helps us calculate the strength of your first dose.",
    options: ["Less than 6 months", "6 months to 2 years", "2 to 5 years", "More than 5 years"],
  },
  {
    id: "baking_soda",
    title: "Do you have baking soda at home?",
    help: "It is the main ingredient of your protocol.",
    options: ["Yes, I have some at home", "No, but I can get it easily"],
    emojis: ["✅", "🛒"],
  },
  {
    id: "lemon",
    title: "Do you have a fresh lemon or lemon juice at home?",
    help: "Lemon activates the alkaline reaction.",
    options: ["Yes", "No, but I can buy some"],
    emojis: ["✅", "🛒"],
  },
  {
    id: "spice",
    title: "Do you have ginger, cinnamon or pepper at home?",
    help: "One of them is your third ingredient. Which one depends on your answers.",
    options: ["Yes, I have at least one", "I'm not sure"],
    emojis: ["✅", "⚠️"],
  },
  {
    id: "allergy",
    title: "Are you allergic to any natural spice?",
    help: "We need to know this to adapt your formula safely.",
    options: ["No, no allergies", "Yes, I am allergic"],
    emojis: ["✅", "⚠️"],
  },
  {
    id: "tried",
    title: "What have you already tried to fix this problem?",
    help: "This helps us exclude what does NOT work from your protocol.",
    multiple: true,
    options: [
      "Viagra or Cialis",
      "Natural supplements",
      "Exercises (Kegel, etc.)",
      "Psychological therapy",
      "A visit to the urologist",
      "Nothing — this is the first time I'm looking for help",
    ],
  },
  {
    id: "goal",
    title: "What is your main goal?",
    help: "This calibrates the strength of your formula.",
    options: ["Get hard, lasting erections back", "Increase penis size", "Last longer in bed", "All of the above"],
  },
  {
    id: "sleep",
    title: "How many hours do you sleep per night?",
    help: "Sleep duration affects the best time to take the mix.",
    options: ["Less than 5 hours", "5 to 7 hours", "7 to 9 hours", "More than 9 hours"],
  },
  {
    id: "water",
    title: "How much water do you drink per day?",
    help: "Hydration speeds up the alkaline reaction of baking soda.",
    options: ["Almost none", "Less than 34 oz (1 L)", "34 to 68 oz (1–2 L)", "More than 68 oz (2 L)"],
  },
  {
    id: "routine",
    title: "What does your day look like?",
    help: "This determines the best time to take the mix.",
    multiple: true,
    options: [
      "I work outside the home",
      "I work from home (remote)",
      "I take care of the home/family",
      "I am a student",
      "I am retired",
    ],
  },
];

/** Age bands from step e2. */
export const AGE_BANDS = ["25 - 35 years", "36 - 50 years", "51 - 65 years", "65+ years"] as const;
