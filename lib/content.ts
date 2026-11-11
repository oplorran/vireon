"use client";

import type { Lang } from "./i18n";
import { ED_ITEMS } from "./ed-content";

type L = Record<Lang, string>;

export type Item = {
  slug: string;
  tag: string;
  title: L;
  text: L;
  body?: Record<Lang, string[]>;
  nutrition?: { label: L; value: L }[];
};

export type Category = {
  key: string;
  slug: string;
  icon: string;
  titleKey: string;
  textKey: string;
  tags: string[];
  items: Item[];
};

const t3 = (en: string, pt: string, es: string): L => ({ en, pt, es });

/* ----------------------------- Nutrition ----------------------------- */
const FOODS: Item[] = [
  {
    slug: "salmon",
    tag: "heart",
    title: t3("Salmon", "Salmão", "Salmón"),
    text: t3(
      "An oily fish often included in heart-healthy eating patterns.",
      "Peixe gordo frequentemente incluído em padrões alimentares saudáveis para o coração.",
      "Un pescado azul que suele formar parte de patrones de alimentación cardiosaludables.",
    ),
    body: {
      en: [
        "Salmon provides protein and marine omega-3 fats. It is one food in a varied pattern, not a treatment for any sexual symptom.",
        "Heart organizations describe oily fish as part of eating patterns that support cardiovascular health. Erectile function and blood-vessel health are related in population studies. A serving of salmon does not treat erectile dysfunction.",
      ],
      pt: [
        "O salmão fornece proteína e gorduras ômega-3 marinhas. É um alimento em um padrão variado, não um tratamento de sintoma sexual.",
        "Entidades cardiológicas citam peixes gordos como parte de padrões que apoiam a saúde cardiovascular. Função erétil e saúde dos vasos aparecem relacionadas em estudos populacionais. Uma porção de salmão não trata disfunção erétil.",
      ],
      es: [
        "El salmón aporta proteína y grasas omega-3 marinas. Es un alimento dentro de un patrón variado, no un tratamiento de un síntoma sexual.",
        "Las entidades cardiológicas citan el pescado azul dentro de patrones que apoyan la salud cardiovascular. La función eréctil y la salud vascular se relacionan en estudios poblacionales. Una ración de salmón no trata la disfunción eréctil.",
      ],
    },
    nutrition: [
      { label: t3("Serving", "Porção", "Ración"), value: t3("About 100 g cooked", "Cerca de 100 g cozido", "Unos 100 g cocinados") },
      { label: t3("Calories", "Calorias", "Calorías"), value: t3("About 180–210 kcal", "Cerca de 180–210 kcal", "Unas 180–210 kcal") },
      { label: t3("Protein", "Proteína", "Proteína"), value: t3("About 20–25 g", "Cerca de 20–25 g", "Unos 20–25 g") },
      { label: t3("Carbohydrates", "Carboidratos", "Carbohidratos"), value: t3("0 g", "0 g", "0 g") },
      { label: t3("Fat", "Gordura", "Grasa"), value: t3("About 10–13 g", "Cerca de 10–13 g", "Unos 10–13 g") },
      { label: t3("Fiber", "Fibra", "Fibra"), value: t3("0 g", "0 g", "0 g") },
    ],
  },
  {
    slug: "beans",
    tag: "heart",
    title: t3("Beans and lentils", "Feijões e lentilhas", "Judías y lentejas"),
    text: t3(
      "Low-cost sources of plant protein and fiber.",
      "Fontes baratas de proteína vegetal e fibra.",
      "Fuentes económicas de proteína vegetal y fibra.",
    ),
    nutrition: [
      { label: t3("Serving", "Porção", "Ración"), value: t3("About 100 g cooked", "Cerca de 100 g cozidos", "Unos 100 g cocidos") },
      { label: t3("Calories", "Calorias", "Calorías"), value: t3("About 110–130 kcal", "Cerca de 110–130 kcal", "Unas 110–130 kcal") },
      { label: t3("Protein", "Proteína", "Proteína"), value: t3("About 8 g", "Cerca de 8 g", "Unos 8 g") },
      { label: t3("Fiber", "Fibra", "Fibra"), value: t3("About 6–8 g", "Cerca de 6–8 g", "Unos 6–8 g") },
    ],
  },
  {
    slug: "spinach",
    tag: "produce",
    title: t3("Spinach and leafy greens", "Espinafre e folhas verdes", "Espinacas y verduras de hoja"),
    text: t3(
      "Low-energy vegetables that add volume, folate, and potassium.",
      "Vegetais de baixa energia que dão volume, folato e potássio.",
      "Verduras de baja energía que aportan volumen, folato y potasio.",
    ),
  },
  {
    slug: "oranges",
    tag: "produce",
    title: t3("Oranges", "Laranjas", "Naranjas"),
    text: t3(
      "A familiar fruit with vitamin C and fluid.",
      "Uma fruta conhecida, com vitamina C e líquido.",
      "Una fruta conocida con vitamina C y líquido.",
    ),
  },
  {
    slug: "tomatoes",
    tag: "produce",
    title: t3("Tomatoes", "Tomates", "Tomates"),
    text: t3(
      "A versatile vegetable with vitamin C and lycopene.",
      "Um vegetal versátil com vitamina C e licopeno.",
      "Una verdura versátil con vitamina C y licopeno.",
    ),
  },
  {
    slug: "olive-oil",
    tag: "fats",
    title: t3("Olive oil", "Azeite de oliva", "Aceite de oliva"),
    text: t3(
      "A mostly unsaturated cooking fat used in Mediterranean-style meals.",
      "Uma gordura de cozinha majoritariamente insaturada, usada em refeições mediterrâneas.",
      "Una grasa de cocina mayoritariamente insaturada, usada en comidas mediterráneas.",
    ),
  },
  {
    slug: "avocado",
    tag: "fats",
    title: t3("Avocado", "Abacate", "Aguacate"),
    text: t3(
      "A fruit that contributes unsaturated fat and fiber.",
      "Uma fruta que contribui com gordura insaturada e fibra.",
      "Una fruta que aporta grasa insaturada y fibra.",
    ),
  },
  {
    slug: "walnuts",
    tag: "fats",
    title: t3("Walnuts", "Nozes", "Nueces"),
    text: t3(
      "A handful-sized portion of nuts with plant omega-3 fat.",
      "Uma porção do tamanho de um punhado, com ômega-3 vegetal.",
      "Una ración del tamaño de un puñado, con omega-3 vegetal.",
    ),
  },
  {
    slug: "oats",
    tag: "grains",
    title: t3("Oats", "Aveia", "Avena"),
    text: t3(
      "A whole grain with soluble fiber, useful at breakfast.",
      "Um grão integral com fibra solúvel, útil no café da manhã.",
      "Un grano integral con fibra soluble, útil en el desayuno.",
    ),
  },
  {
    slug: "quinoa",
    tag: "grains",
    title: t3("Quinoa", "Quinoa", "Quinoa"),
    text: t3(
      "A seed used like a grain, with more protein than rice.",
      "Uma semente usada como grão, com mais proteína que o arroz.",
      "Una semilla usada como grano, con más proteína que el arroz.",
    ),
  },
  {
    slug: "brown-rice",
    tag: "grains",
    title: t3("Brown rice", "Arroz integral", "Arroz integral"),
    text: t3(
      "A whole-grain staple that keeps the bran.",
      "Um alimento integral básico que mantém o farelo.",
      "Un básico integral que conserva el salvado.",
    ),
  },
  {
    slug: "blueberries",
    tag: "antioxidant",
    title: t3("Blueberries", "Mirtilos", "Arándanos"),
    text: t3(
      "A small fruit, easy to add to breakfast.",
      "Uma fruta pequena, fácil de incluir no café da manhã.",
      "Una fruta pequeña, fácil de añadir al desayuno.",
    ),
  },
  {
    slug: "water",
    tag: "hydration",
    title: t3("Water", "Água", "Agua"),
    text: t3(
      "The default drink. Thirst and urine color are simple guides.",
      "A bebida padrão. Sede e cor da urina são guias simples.",
      "La bebida por defecto. La sed y el color de la orina son guías simples.",
    ),
  },
  {
    slug: "unsweetened-tea",
    tag: "hydration",
    title: t3("Unsweetened tea", "Chá sem açúcar", "Té sin azúcar"),
    text: t3(
      "A flavored drink with no added sugar.",
      "Uma bebida com sabor e sem açúcar adicionado.",
      "Una bebida con sabor y sin azúcar añadido.",
    ),
  },
  {
    slug: "plain-yogurt",
    tag: "balanced",
    title: t3("Plain yogurt", "Iogurte natural", "Yogur natural"),
    text: t3(
      "Protein and calcium without the dessert-level sugar.",
      "Proteína e cálcio sem o açúcar de uma sobremesa.",
      "Proteína y calcio sin el azúcar de un postre.",
    ),
  },
];

/* ------------------------------ Recipes ------------------------------ */
const RECIPES: Item[] = [
  {
    slug: "berry-oat-bowl",
    tag: "breakfast",
    title: t3("Berry oat bowl", "Tigela de aveia com frutas", "Bol de avena con frutos rojos"),
    text: t3(
      "Plain oats with berries and walnuts.",
      "Aveia natural com frutas vermelhas e nozes.",
      "Avena natural con frutos rojos y nueces.",
    ),
    body: {
      en: ["Cook the oats in water or milk. Add berries and a small handful of walnuts. No sugar needed."],
      pt: ["Cozinhe a aveia em água ou leite. Junte as frutas e um pequeno punhado de nozes. Não precisa de açúcar."],
      es: ["Cocina la avena en agua o leche. Añade los frutos rojos y un pequeño puñado de nueces. No hace falta azúcar."],
    },
  },
  {
    slug: "vegetable-scramble",
    tag: "breakfast",
    title: t3("Vegetable scramble", "Ovos mexidos com legumes", "Huevos revueltos con verduras"),
    text: t3("Eggs with spinach and tomato.", "Ovos com espinafre e tomate.", "Huevos con espinacas y tomate."),
  },
  {
    slug: "chickpea-bowl",
    tag: "lunch",
    title: t3("Chickpea vegetable bowl", "Tigela de grão-de-bico", "Bol de garbanzos con verduras"),
    text: t3(
      "A lunch bowl with beans, greens, and whole grains.",
      "Uma tigela de almoço com leguminosas, folhas e grãos integrais.",
      "Un bol de comida con legumbres, verduras y granos integrales.",
    ),
  },
  {
    slug: "chicken-grain-bowl",
    tag: "lunch",
    title: t3("Chicken and grain bowl", "Tigela de frango com grãos", "Bol de pollo con granos"),
    text: t3(
      "A straightforward lunch with lean protein and vegetables.",
      "Um almoço direto, com proteína magra e vegetais.",
      "Un almuerzo sencillo con proteína magra y verduras.",
    ),
  },
  {
    slug: "baked-salmon-plate",
    tag: "dinner",
    title: t3("Baked salmon plate", "Prato de salmão assado", "Plato de salmón al horno"),
    text: t3(
      "Salmon with vegetables and a measured portion of avocado.",
      "Salmão com vegetais e uma porção medida de abacate.",
      "Salmón con verduras y una ración medida de aguacate.",
    ),
  },
  {
    slug: "lentil-soup",
    tag: "dinner",
    title: t3("Lentil vegetable soup", "Sopa de lentilha com legumes", "Sopa de lentejas con verduras"),
    text: t3("A pot of soup for several dinners.", "Uma panela de sopa para vários jantares.", "Una olla de sopa para varias cenas."),
  },
  {
    slug: "yogurt-fruit-cup",
    tag: "snack",
    title: t3("Yogurt fruit cup", "Copo de iogurte com fruta", "Vaso de yogur con fruta"),
    text: t3("A snack with protein and fruit.", "Um lanche com proteína e fruta.", "Un tentempié con proteína y fruta."),
  },
  {
    slug: "apple-walnut",
    tag: "snack",
    title: t3("Apple and walnut snack", "Lanche de maçã com nozes", "Tentempié de manzana y nueces"),
    text: t3(
      "Fruit plus a small portion of nuts.",
      "Fruta com uma pequena porção de nozes.",
      "Fruta con una pequeña ración de nueces.",
    ),
  },
];

/* ----------------------------- Exercises ----------------------------- */
const EXERCISES: Item[] = [
  {
    slug: "brisk-walk",
    tag: "cardio",
    title: t3("Brisk walk", "Caminhada rápida", "Caminata rápida"),
    text: t3(
      "A beginner-friendly way to raise heart rate and breathing.",
      "Um jeito amigável para iniciantes de elevar frequência cardíaca e respiração.",
      "Una forma amable para principiantes de elevar la frecuencia cardíaca y la respiración.",
    ),
    body: {
      en: ["Walk fast enough that talking is possible but singing is not. Start with 10 minutes and add time before adding speed."],
      pt: ["Caminhe rápido o bastante para conseguir falar, mas não cantar. Comece com 10 minutos e aumente o tempo antes da velocidade."],
      es: ["Camina lo bastante rápido para poder hablar, pero no cantar. Empieza con 10 minutos y añade tiempo antes que velocidad."],
    },
  },
  {
    slug: "walk-intervals",
    tag: "cardio",
    title: t3("Easy walk intervals", "Intervalos leves de caminhada", "Intervalos suaves de caminata"),
    text: t3(
      "Short faster efforts inside an easy walk, only if the easy pace already feels comfortable.",
      "Esforços curtos e mais rápidos dentro de uma caminhada leve, só se o ritmo leve já for confortável.",
      "Esfuerzos cortos y más rápidos dentro de una caminata suave, solo si el ritmo suave ya resulta cómodo.",
    ),
  },
  {
    slug: "sit-to-stand",
    tag: "strength",
    title: t3("Sit to stand", "Sentar e levantar", "Sentarse y levantarse"),
    text: t3("A leg-strength pattern using a chair.", "Um padrão de força de pernas usando uma cadeira.", "Un patrón de fuerza de piernas usando una silla."),
    body: {
      en: ["Stand up from a chair without using your hands, then sit back down slowly. Keep the chair behind you."],
      pt: ["Levante-se da cadeira sem usar as mãos e sente-se devagar. Mantenha a cadeira atrás de você."],
      es: ["Levántate de la silla sin usar las manos y siéntate despacio. Mantén la silla detrás de ti."],
    },
  },
  {
    slug: "wall-push-up",
    tag: "strength",
    title: t3("Wall push-up", "Flexão na parede", "Flexión en la pared"),
    text: t3(
      "An upper-body exercise with the wall taking much of your weight.",
      "Exercício de parte superior com a parede absorvendo boa parte do peso.",
      "Ejercicio de tren superior con la pared absorbiendo buena parte del peso.",
    ),
  },
  {
    slug: "hip-flexor-stretch",
    tag: "mobility",
    title: t3("Hip flexor stretch", "Alongamento de flexores do quadril", "Estiramiento de flexores de cadera"),
    text: t3(
      "A gentle front-of-hip stretch for people who sit for long periods.",
      "Um alongamento suave da frente do quadril para quem fica sentado por longos períodos.",
      "Un estiramiento suave de la parte delantera de la cadera para quien pasa mucho tiempo sentado.",
    ),
  },
  {
    slug: "chest-opener",
    tag: "mobility",
    title: t3("Chest opener", "Abertura de peito", "Apertura de pecho"),
    text: t3("A posture break for rounded shoulders.", "Uma pausa de postura para ombros curvados.", "Una pausa postural para hombros redondeados."),
  },
  {
    slug: "pelvic-floor-awareness",
    tag: "pelvic",
    title: t3("Pelvic floor awareness and relaxation", "Consciência e relaxamento do assoalho pélvico", "Conciencia y relajación del suelo pélvico"),
    text: t3(
      "An education exercise about noticing and releasing tension. It is not a strengthening plan.",
      "Um exercício educativo sobre notar e soltar a tensão. Não é um plano de fortalecimento.",
      "Un ejercicio educativo sobre notar y soltar la tensión. No es un plan de fortalecimiento.",
    ),
  },
  {
    slug: "diaphragmatic-breathing",
    tag: "relax",
    title: t3("Diaphragmatic breathing", "Respiração diafragmática", "Respiración diafragmática"),
    text: t3(
      "A slow breathing pattern used for general relaxation.",
      "Um padrão respiratório lento usado para relaxamento geral.",
      "Un patrón respiratorio lento usado para relajación general.",
    ),
  },
  {
    slug: "even-count-breathing",
    tag: "relax",
    title: t3("Even-count breathing", "Respiração com contagem igual", "Respiración con conteo igual"),
    text: t3(
      "A simple counted breath without long holds.",
      "Uma respiração contada simples, sem pausas longas.",
      "Una respiración contada simple, sin retenciones largas.",
    ),
  },
];

/* ------------------------------- Sleep ------------------------------- */
const SLEEP: Item[] = [
  {
    slug: "sleep-fundamentals",
    tag: "fundamentals",
    title: t3("Sleep fundamentals", "Fundamentos do sono", "Fundamentos del sueño"),
    text: t3(
      "What a stable sleep window does for general health.",
      "O que uma janela de sono estável faz pela saúde geral.",
      "Lo que una ventana de sueño estable hace por la salud general.",
    ),
    body: {
      en: [
        "A stable sleep window means going to bed and waking at similar times. The body uses that predictability for appetite, mood, and recovery.",
        "Adults generally need seven to nine hours. If you snore heavily, wake gasping, or fall asleep during the day, mention it to a clinician.",
      ],
      pt: [
        "Uma janela de sono estável significa dormir e acordar em horários parecidos. O corpo usa essa previsibilidade para apetite, humor e recuperação.",
        "Adultos em geral precisam de sete a nove horas. Se você ronca muito, acorda sem ar ou dorme durante o dia, comente com um clínico.",
      ],
      es: [
        "Una ventana de sueño estable significa acostarse y despertar a horas parecidas. El cuerpo usa esa previsibilidad para el apetito, el ánimo y la recuperación.",
        "Los adultos suelen necesitar de siete a nueve horas. Si roncas mucho, despiertas sin aire o te duermes de día, coméntalo con un clínico.",
      ],
    },
  },
  {
    slug: "nighttime-routines",
    tag: "routines",
    title: t3("Nighttime routines", "Rotinas noturnas", "Rutinas nocturnas"),
    text: t3(
      "A short wind-down that signals the end of the day.",
      "Um relaxamento curto que sinaliza o fim do dia.",
      "Un breve ritual de relajación que señala el final del día.",
    ),
  },
  {
    slug: "sleep-environment",
    tag: "environment",
    title: t3("Sleep environment", "Ambiente de sono", "Ambiente de sueño"),
    text: t3(
      "Light, noise, temperature, and the bed itself.",
      "Luz, ruído, temperatura e a própria cama.",
      "Luz, ruido, temperatura y la propia cama.",
    ),
    body: {
      en: [
        "Dark, quiet, and slightly cool is the usual advice. Fix the first thing that is easiest to fix: a curtain, an eye mask, or a phone left outside the room.",
        "The bed should mostly be for sleep. If you are awake for more than twenty minutes, get up briefly instead of fighting it.",
      ],
      pt: [
        "Escuro, silencioso e levemente fresco é o conselho usual. Resolva primeiro o que for mais fácil: uma cortina, uma máscara de olhos ou o celular fora do quarto.",
        "A cama deve servir principalmente para dormir. Se ficar acordado mais de vinte minutos, levante-se um pouco em vez de lutar contra isso.",
      ],
      es: [
        "Oscuro, silencioso y algo fresco es el consejo habitual. Arregla primero lo más fácil: una cortina, un antifaz o el móvil fuera de la habitación.",
        "La cama debe servir sobre todo para dormir. Si estás despierto más de veinte minutos, levántate un poco en vez de luchar contra ello.",
      ],
    },
  },
  {
    slug: "recovery-habits",
    tag: "recovery",
    title: t3("Recovery habits", "Hábitos de recuperación", "Hábitos de recuperación"),
    text: t3(
      "Rest is part of training, not a reward you earn by exhaustion.",
      "O descanso é parte do treino, não uma recompensa conquistada pelo esgotamento.",
      "El descanso es parte del entrenamiento, no una recompensa ganada por agotamiento.",
    ),
  },
  {
    slug: "consistent-schedules",
    tag: "schedules",
    title: t3("Consistent sleep schedules", "Horários de sono consistentes", "Horarios de sueño constantes"),
    text: t3(
      "Why a similar wake time is easier to keep than a perfect bedtime.",
      "Por que um horário de acordar parecido é mais fácil de manter que um horário de dormir perfeito.",
      "Por qué una hora de despertar parecida es más fácil de mantener que una hora de dormir perfecta.",
    ),
  },
];

/* ------------------------------- Stress ------------------------------ */
const STRESS: Item[] = [
  {
    slug: "stress-management",
    tag: "management",
    title: t3("Stress management", "Gestão do estresse", "Gestión del estrés"),
    text: t3(
      "Stress is a demand-and-capacity problem, not a character flaw.",
      "Estresse é um problema de demanda e capacidade, não um defeito de caráter.",
      "El estrés es un problema de demanda y capacidad, no un defecto de carácter.",
    ),
    body: {
      en: [
        "Demand above capacity, for long enough, shows up as tension, poor sleep, and shorter patience. Reducing demand and raising capacity both count.",
        "Ten minutes of walking, daylight, or a call with someone you like are legitimate capacity. They are not luxuries.",
      ],
      pt: [
        "Demanda acima da capacidade, por tempo suficiente, aparece como tensão, sono ruim e paciência curta. Reduzir demanda e aumentar capacidade valem igualmente.",
        "Dez minutos de caminhada, luz do dia ou uma ligação com alguém de quem você gosta são capacidade legítima. Não são luxo.",
      ],
      es: [
        "La demanda por encima de la capacidad, durante suficiente tiempo, aparece como tensión, mal sueño y poca paciencia. Reducir la demanda y aumentar la capacidad valen igual.",
        "Diez minutos de caminata, luz de día o una llamada con alguien que te agrada son capacidad legítima. No son un lujo.",
      ],
    },
  },
  {
    slug: "relaxation-techniques",
    tag: "relax",
    title: t3("Relaxation techniques", "Técnicas de relaxamento", "Técnicas de relajación"),
    text: t3(
      "A small set of practices with a clear stop rule.",
      "Um pequeno conjunto de práticas com uma regra clara de parar.",
      "Un pequeño conjunto de prácticas con una regla clara para parar.",
    ),
  },
  {
    slug: "breathing-exercises",
    tag: "breathing",
    title: t3("Breathing exercises", "Exercícios de respiração", "Ejercicios de respiración"),
    text: t3(
      "How the included breathing practices are meant to be used.",
      "Como as práticas de respiração incluídas devem ser usadas.",
      "Cómo deben usarse las prácticas de respiración incluidas.",
    ),
  },
  {
    slug: "anxiety-education",
    tag: "anxiety",
    title: t3("Anxiety education", "Educação sobre ansiedade", "Educación sobre la ansiedad"),
    text: t3(
      "Anxiety is a body and mind response. This page does not diagnose it.",
      "Ansiedade é uma resposta do corpo e da mente. Esta página não a diagnostica.",
      "La ansiedad es una respuesta del cuerpo y la mente. Esta página no la diagnostica.",
    ),
  },
  {
    slug: "general-wellbeing",
    tag: "wellbeing",
    title: t3("General mental wellbeing", "Bem-estar mental geral", "Bienestar mental general"),
    text: t3(
      "Ordinary supports: people, daylight, movement, and sleep.",
      "Apoios comuns: pessoas, luz do dia, movimento e sono.",
      "Apoyos comunes: personas, luz de día, movimiento y sueño.",
    ),
  },
];

export const CATEGORIES: Category[] = [
  {
    key: "nutrition",
    slug: "nutrition",
    icon: "leaf",
    titleKey: "discover.1.title",
    textKey: "discover.1.text",
    tags: ["all", "heart", "produce", "fats", "grains", "antioxidant", "hydration", "balanced"],
    items: FOODS,
  },
  {
    key: "recipes",
    slug: "recipes",
    icon: "pot",
    titleKey: "discover.2.title",
    textKey: "discover.2.text",
    tags: ["all", "breakfast", "lunch", "dinner", "snack"],
    items: RECIPES,
  },
  {
    key: "exercises",
    slug: "exercises",
    icon: "dumbbell",
    titleKey: "discover.3.title",
    textKey: "discover.3.text",
    tags: ["all", "cardio", "strength", "mobility", "pelvic", "relax"],
    items: EXERCISES,
  },
  {
    key: "sleep",
    slug: "sleep",
    icon: "moon",
    titleKey: "discover.4.title",
    textKey: "discover.4.text",
    tags: ["all", "fundamentals", "routines", "environment", "recovery", "schedules"],
    items: SLEEP,
  },
  {
    key: "stress",
    slug: "stress",
    icon: "brain",
    titleKey: "discover.5.title",
    textKey: "discover.5.text",
    tags: ["all", "management", "relax", "breathing", "anxiety", "wellbeing"],
    items: STRESS,
  },
  {
    key: "ed",
    slug: "ed",
    icon: "pulse",
    titleKey: "discover.6.title",
    textKey: "discover.6.text",
    tags: ["all", "basics", "risk", "heart", "mind", "lifestyle", "urgent", "clinic"],
    items: ED_ITEMS,
  },
];

export function findItem(category: string, slug: string) {
  return CATEGORIES.find((c) => c.slug === category)?.items.find((i) => i.slug === slug);
}

/* ------------------------------- Courses ----------------------------- */
export const COURSES: { slug: string; title: L; text: L; lessons: number; featured?: boolean }[] = [
  {
    slug: "protocolo-natural-erecciones-de-acero",
    title: t3("Natural protocol for vascular health", "Protocolo natural para a saúde vascular", "Protocolo natural para la salud vascular"),
    text: t3(
      "An educational look at male circulation and everyday habits that support it.",
      "Uma leitura educativa da circulação masculina e hábitos possíveis de apoiar.",
      "Una mirada educativa a la circulación masculina y hábitos posibles de apoyar.",
    ),
    lessons: 4,
    featured: true,
  },
  {
    slug: "el-controlador-del-orgasmo",
    title: t3("Pleasure control", "Controle do prazer", "Control del placer"),
    text: t3(
      "Educational body-control techniques for a longer, more deliberate intimate experience.",
      "Técnicas educativas de controle corporal para uma experiência mais longa e deliberada.",
      "Técnicas educativas de control corporal para una experiencia más larga y deliberada.",
    ),
    lessons: 4,
  },
  {
    slug: "metodo-5x",
    title: t3("Method 5x: shared pleasure", "Método 5x: prazer compartilhado", "Método 5x: placer compartido"),
    text: t3(
      "Anatomy and technique for a shared experience, built on communication and respect.",
      "Anatomia e técnica para uma experiência compartilhada, baseada em comunicação e respeito.",
      "Anatomía y técnica para una experiencia compartida, basadas en comunicación y respeto.",
    ),
    lessons: 4,
  },
  {
    slug: "metodo-testosterona-natural",
    title: t3("Natural hormone health", "Saúde hormonal natural", "Salud hormonal natural"),
    text: t3(
      "What influences male hormone balance, and habits that support it.",
      "O que influencia o equilíbrio hormonal masculino, e hábitos que ajudam.",
      "Qué influye en el equilibrio hormonal masculino, y hábitos que ayudan.",
    ),
    lessons: 4,
  },
  {
    slug: "psicologia-del-seductor",
    title: t3("Psychology of attraction", "Psicologia da atração", "Psicología de la atracción"),
    text: t3(
      "How attraction and social skill work, through clear communication.",
      "Como atração e habilidade social funcionam, por comunicação clara.",
      "Cómo funcionan la atracción y la habilidad social, con comunicación clara.",
    ),
    lessons: 4,
  },
  {
    slug: "maestro-resistencia-sexual",
    title: t3("Advanced timing control", "Controle avançado de ritmo", "Control avanzado del ritmo"),
    text: t3(
      "Breathing and body control for managing pace during intimacy.",
      "Respiração e controle corporal para administrar o ritmo na intimidade.",
      "Respiración y control corporal para gestionar el ritmo en la intimidad.",
    ),
    lessons: 4,
  },
  {
    slug: "nutricion-rendimiento-sexual",
    title: t3("Nutrition and whole-body energy", "Nutrição e energia do corpo", "Nutrición y energía del cuerpo"),
    text: t3(
      "How food relates to circulation and everyday energy.",
      "Como a comida se relaciona com circulação e energia no dia.",
      "Cómo se relaciona la comida con la circulación y la energía diaria.",
    ),
    lessons: 4,
  },
  {
    slug: "biohacking-sexual-avanzado",
    title: t3("Healthy habit optimization", "Otimização de hábitos saudáveis", "Optimización de hábitos saludables"),
    text: t3(
      "Breathing, cold, sleep timing, and other habit practices.",
      "Respiração, frio, horário de sono e outras práticas de hábito.",
      "Respiración, frío, horario de sueño y otras prácticas de hábito.",
    ),
    lessons: 6,
  },
  {
    slug: "el-macho-magnetico",
    title: t3("Personal presence", "Presença pessoal", "Presencia personal"),
    text: t3(
      "Confidence and social presence in everyday interactions.",
      "Segurança e presença social em interações cotidianas.",
      "Confianza y presencia social en interacciones cotidianas.",
    ),
    lessons: 4,
  },
  {
    slug: "performance-sexual-elite",
    title: t3("Integrated control techniques", "Técnicas integradas de controle", "Técnicas integradas de control"),
    text: t3(
      "Breathing, mindfulness, and body control used together.",
      "Respiração, atenção plena e controle corporal usados juntos.",
      "Respiración, atención plena y control corporal usados juntos.",
    ),
    lessons: 6,
  },
  {
    slug: "protocolo-resistencia-infinita",
    title: t3("Advanced pleasure control", "Controle avançado do prazer", "Control avanzado del placer"),
    text: t3(
      "A longer outline of breathing, arousal mapping, and mental focus.",
      "Um roteiro mais longo de respiração, mapeamento da excitação e foco mental.",
      "Un guion más largo de respiración, mapeo de la excitación y foco mental.",
    ),
    lessons: 18,
  },
];

/* ------------------------------- Secrets ----------------------------- */
export type SecretLesson = { id: string; title: L; url: string };
export type SecretModule = { id: string; title: L; lessons: SecretLesson[] };

const V = "https://ckmgzvmgurbimvwkmdre.supabase.co/storage/v1/object/public/course-videos/videos";

export const MODULES: SecretModule[] = [
  {
    id: "cc958538-ae3a-4e79-adb5-8a458030aa30",
    title: t3("Anatomy", "Anatomia", "Anatomía"),
    lessons: [
      { id: "66561559-85f0-4fc9-b564-8355c5b35d93", title: t3("Where is the G-spot?", "Onde fica o ponto G?", "¿Dónde está el punto G?"), url: `${V}/66561559-85f0-4fc9-b564-8355c5b35d93/1774968375420.mp4` },
      { id: "5f47f323-5159-4f37-8c80-540e84b782f9", title: t3("Zones of intense pleasure", "Zonas de prazer intenso", "Zonas de placer intenso"), url: `${V}/5f47f323-5159-4f37-8c80-540e84b782f9/1774968377974.mp4` },
      { id: "1533b8da-56a4-4b86-abca-ce32d7d7aa9c", title: t3("How to find the G-spot, the A-spot, and the cervix", "Como encontrar o ponto G, o ponto A e o colo do útero", "Cómo encontrar el punto G, el punto A y el cuello del útero"), url: `${V}/1533b8da-56a4-4b86-abca-ce32d7d7aa9c/1774968385405.mp4` },
      { id: "265229a3-3946-432a-8429-a039ab0185b5", title: t3("How to stimulate the G-spot with a toy", "Como estimular o ponto G com um brinquedo", "Cómo estimular el punto G con un juguete"), url: `${V}/265229a3-3946-432a-8429-a039ab0185b5/1774968388132.mp4` },
    ],
  },
  {
    id: "5d858dba-96d9-48e5-854f-1d54f908e34a",
    title: t3("Squirting", "Squirting", "Squirting"),
    lessons: [
      { id: "d74f454b-8fc1-4e84-9ffd-98903c539e83", title: t3("Squirting tutorial", "Tutorial de squirting", "Tutorial de squirting"), url: `${V}/d74f454b-8fc1-4e84-9ffd-98903c539e83/1774969127522.mp4` },
      { id: "37d5c325-210e-418b-afb2-5cfb6b083b3e", title: t3("Jet demonstration, part 2", "Demonstração de jato, parte 2", "Demostración de chorro, parte 2"), url: `${V}/37d5c325-210e-418b-afb2-5cfb6b083b3e/1774969129532.mp4` },
      { id: "3ff54ad7-2a8e-4708-b29b-4d9607dced2c", title: t3("Explicit lesson with a partner", "Lição explícita com parceira", "Lección explícita con pareja"), url: `${V}/3ff54ad7-2a8e-4708-b29b-4d9607dced2c/1774969132451.mp4` },
      { id: "40961f2e-1b66-4277-ba8a-b92e6be634a3", title: t3("Practical squirting 1", "Prática de squirting 1", "Práctica de squirting 1"), url: `${V}/40961f2e-1b66-4277-ba8a-b92e6be634a3/1774969538367.mp4` },
      { id: "b0a509c1-4d2e-4740-8b6b-adb8ac369be7", title: t3("Practical squirting 2", "Prática de squirting 2", "Práctica de squirting 2"), url: `${V}/b0a509c1-4d2e-4740-8b6b-adb8ac369be7/1774969137967.mp4` },
      { id: "7fd8de54-7b53-460c-bbc4-7b0c2cbb81d1", title: t3("How to help her ejaculate more easily", "Como ajudá-la a ejacular com mais facilidade", "Cómo ayudarla a eyacular con más facilidad"), url: `${V}/7fd8de54-7b53-460c-bbc4-7b0c2cbb81d1/1774969527540.mp4` },
      { id: "de1dc63f-a71f-4d24-8667-3f0dd4f11d28", title: t3("Step-by-step female ejaculation", "Ejaculação feminina passo a passo", "Eyaculación femenina paso a paso"), url: `${V}/de1dc63f-a71f-4d24-8667-3f0dd4f11d28/1774969143318.mp4` },
      { id: "bdf4f808-ef90-4d59-8ede-eb052d2132b9", title: t3("Extra tips for female ejaculation", "Dicas extras de ejaculação feminina", "Consejos extra de eyaculación femenina"), url: `${V}/bdf4f808-ef90-4d59-8ede-eb052d2132b9/1774969145289.mp4` },
    ],
  },
  {
    id: "708764f2-79c5-4b59-be50-44c0dbf7b7ca",
    title: t3("Penetration", "Penetração", "Penetración"),
    lessons: [
      { id: "b5f99f2b-c86b-42d5-954d-025f02ffb608", title: t3("Squirting with penetration", "Squirting com penetração", "Squirting con penetración"), url: `${V}/b5f99f2b-c86b-42d5-954d-025f02ffb608/1774969578237.mp4` },
      { id: "c797da68-e32c-425d-9753-d90716c200d9", title: t3("Squirting with penetration, part 2", "Squirting com penetração, parte 2", "Squirting con penetración, parte 2"), url: `${V}/c797da68-e32c-425d-9753-d90716c200d9/1774969580442.mp4` },
      { id: "b92f96a2-1e08-42a1-bf06-fc857ba48e6d", title: t3("Squirting with penetration, part 3", "Squirting com penetração, parte 3", "Squirting con penetración, parte 3"), url: `${V}/b92f96a2-1e08-42a1-bf06-fc857ba48e6d/1774969588030.mp4` },
      { id: "a50236de-79e5-4e7e-a559-82b2ef4fc1b7", title: t3("How to work with your penis size", "Como trabalhar com o tamanho do pênis", "Cómo trabajar con el tamaño del pene"), url: `${V}/a50236de-79e5-4e7e-a559-82b2ef4fc1b7/1774969596145.mp4` },
      { id: "37e38154-a644-4efe-bbb6-8f61dee9b291", title: t3("Reaching the G-spot with the penis", "Alcançar o ponto G com o pênis", "Alcanzar el punto G con el pene"), url: `${V}/37e38154-a644-4efe-bbb6-8f61dee9b291/1774969602036.mp4` },
      { id: "4d112313-8240-4ef9-a4ab-109ca96f4c14", title: t3("Reaching the G-spot with the penis, part 2", "Alcançar o ponto G com o pênis, parte 2", "Alcanzar el punto G con el pene, parte 2"), url: `${V}/4d112313-8240-4ef9-a4ab-109ca96f4c14/1774969607086.mp4` },
      { id: "76b6203e-2cd6-4c2b-a734-31d9764d9406", title: t3("Reaching the G-spot with the penis, part 3", "Alcançar o ponto G com o pênis, parte 3", "Alcanzar el punto G con el pene, parte 3"), url: `${V}/76b6203e-2cd6-4c2b-a734-31d9764d9406/1774969613432.mp4` },
      { id: "ec8dae95-62ad-4baf-bf65-151dc163c3d2", title: t3("A practical partner demonstration", "Demonstração prática com parceira", "Demostración práctica con pareja"), url: `${V}/ec8dae95-62ad-4baf-bf65-151dc163c3d2/1774969617405.mp4` },
      { id: "ed7b87b2-8555-4a11-abe4-118eeeba1fb6", title: t3("Increasing pleasure during penetration", "Aumentar o prazer na penetração", "Aumentar el placer en la penetración"), url: `${V}/ed7b87b2-8555-4a11-abe4-118eeeba1fb6/1774969624588.mp4` },
      { id: "94ef690c-0fc7-4169-a0e0-8b6381154d7b", title: t3("Cowgirl with a G-spot focus", "Cowgirl com foco no ponto G", "Cowgirl con enfoque en el punto G"), url: `${V}/94ef690c-0fc7-4169-a0e0-8b6381154d7b/1774969629444.mp4` },
      { id: "19b2f61d-e88f-4a21-963e-b38ab2a6f6de", title: t3("Rear entry with a G-spot focus", "Entrada traseira com foco no ponto G", "Entrada trasera con enfoque en el punto G"), url: `${V}/19b2f61d-e88f-4a21-963e-b38ab2a6f6de/1774969635413.mp4` },
      { id: "db30e285-2277-4c80-8221-366e41486229", title: t3("Orgasm and penis shape", "Orgasmo e formato do pênis", "Orgasmo y forma del pene"), url: `${V}/db30e285-2277-4c80-8221-366e41486229/1774969643162.mp4` },
      { id: "42a4c856-de86-4f7d-bfa7-b54153ab4ea6", title: t3("Orgasm and penis shape, part 2", "Orgasmo e formato do pênis, parte 2", "Orgasmo y forma del pene, parte 2"), url: `${V}/42a4c856-de86-4f7d-bfa7-b54153ab4ea6/1774969651940.mp4` },
    ],
  },
  {
    id: "2f890010-1a37-4b0a-8797-dd848a1f9e8e",
    title: t3("Kiss touch", "Kiss touch", "Kiss touch"),
    lessons: [
      { id: "6914dac3-4800-4238-9762-9153184f167c", title: t3("The kiss-touch technique", "A técnica kiss-touch", "La técnica kiss-touch"), url: `${V}/6914dac3-4800-4238-9762-9153184f167c/1774969737980.mp4` },
      { id: "e81cf4b0-2b3d-4932-b194-2965b905ba4f", title: t3("The kiss-touch technique, part 2", "A técnica kiss-touch, parte 2", "La técnica kiss-touch, parte 2"), url: `${V}/e81cf4b0-2b3d-4932-b194-2965b905ba4f/1774969742550.mp4` },
    ],
  },
  {
    id: "63d9cd8f-09d5-4529-81ee-4114b64ec2c9",
    title: t3("Situations", "Situações", "Situaciones"),
    lessons: [
      { id: "13fbf763-fad8-4b61-906b-ae3adf3a091f", title: t3("Preparing for oral sex", "Preparação para sexo oral", "Preparación para sexo oral"), url: `${V}/13fbf763-fad8-4b61-906b-ae3adf3a091f/1774969912023.mp4` },
      { id: "4bce20a1-a054-4248-bf4d-0edb21345f33", title: t3("Satisfying a partner with a smaller penis", "Satisfazer com um pênis menor", "Satisfacer con un pene más pequeño"), url: `${V}/4bce20a1-a054-4248-bf4d-0edb21345f33/1774969919215.mp4` },
      { id: "75dd3187-c923-4c08-8276-9fe2c46e94f7", title: t3("Sex techniques for a higher body weight", "Técnicas para maior peso corporal", "Técnicas para mayor peso corporal"), url: `${V}/75dd3187-c923-4c08-8276-9fe2c46e94f7/1774969925362.mp4` },
      { id: "0b1746d8-9dc2-4d79-8283-2e0e4ee33e52", title: t3("Tips for casual sex", "Dicas para sexo casual", "Consejos para sexo casual"), url: `${V}/0b1746d8-9dc2-4d79-8283-2e0e4ee33e52/1774969932306.mp4` },
      { id: "d474b28f-d671-41ef-ab06-a22a89ccf767", title: t3("Retrograde ejaculation: orgasm without ejaculating", "Ejaculação retrógrada: orgasmo sem ejacular", "Eyaculación retrógrada: orgasmo sin eyacular"), url: `${V}/d474b28f-d671-41ef-ab06-a22a89ccf767/1774969939209.mp4` },
      { id: "9e16a2ee-e178-4ddb-a0d9-bf621f52a97c", title: t3("Extra: the kiss-touch technique", "Extra: a técnica kiss-touch", "Extra: la técnica kiss-touch"), url: `${V}/9e16a2ee-e178-4ddb-a0d9-bf621f52a97c/1774969943869.mp4` },
    ],
  },
];

/* ------------------------------- Recipes (trick) --------------------- */
export const KITCHEN: { tag: string; minutes: string; title: L; text: L }[] = [
  { tag: "testosterone", minutes: "8", title: t3("Potent testosterone smoothie", "Smoothie potente de testosterona", "Batido potente de testosterona"), text: t3("An energizing drink rich in zinc and essential vitamins for hormone support.", "Uma bebida energética rica em zinco e vitaminas essenciais para apoio hormonal.", "Una bebida energizante rica en zinc y vitaminas esenciales para el apoyo hormonal.") },
  { tag: "libido", minutes: "15", title: t3("Aphrodisiac ginger tea", "Chá afrodisíaco de gengibre", "Té afrodisíaco de jengibre"), text: t3("A hot drink that stimulates circulation and supports libido.", "Uma bebida quente que estimula a circulação e apoia a libido.", "Una bebida caliente que estimula la circulación y apoya la libido.") },
  { tag: "testosterone", minutes: "10", title: t3("Power nut mix", "Mix de castanhas potente", "Mezcla de frutos secos potente"), text: t3("A mix of nuts and seeds for energy and male vitality.", "Uma mistura de castanhas e sementes para energia e vitalidade masculina.", "Una mezcla de frutos secos y semillas para energía y vitalidad masculina.") },
  { tag: "energy", minutes: "8", title: t3("Energizing green juice", "Suco verde energizante", "Zumo verde energizante"), text: t3("A detox-style drink for energy and sexual vitality.", "Uma bebida estilo detox para energia e vitalidade sexual.", "Una bebida tipo detox para energía y vitalidad sexual.") },
  { tag: "circulation", minutes: "10", title: t3("Watermelon flavored water", "Água aromatizada de melancia", "Agua aromatizada de sandía"), text: t3("A hydrating drink rich in citrulline for circulation.", "Uma bebida hidratante rica em citrulina para a circulação.", "Una bebida hidratante rica en citrulina para la circulación.") },
  { tag: "energy", minutes: "5", title: t3("Acai smoothie with guarana", "Smoothie de açaí com guaraná", "Batido de açaí con guaraná"), text: t3("A strong natural Brazilian energy drink.", "Uma bebida energética brasileira natural e forte.", "Una bebida energética brasileña natural y fuerte.") },
  { tag: "testosterone", minutes: "15", title: t3("Tribulus terrestris tea", "Chá de tribulus terrestris", "Té de tribulus terrestris"), text: t3("A natural infusion used to support testosterone.", "Uma infusão natural usada para apoiar a testosterona.", "Una infusión natural usada para apoyar la testosterona.") },
  { tag: "testosterone", minutes: "10", title: t3("Spinach and feta omelet", "Omelete de espinafre com feta", "Tortilla de espinacas y feta"), text: t3("A breakfast rich in protein and magnesium.", "Um café da manhã rico em proteína e magnésio.", "Un desayuno rico en proteína y magnesio.") },
  { tag: "circulation", minutes: "8", title: t3("Beet and pomegranate smoothie", "Smoothie de beterraba com romã", "Batido de remolacha y granada"), text: t3("A drink rich in nitrates for circulation.", "Uma bebida rica em nitratos para a circulação.", "Una bebida rica en nitratos para la circulación.") },
  { tag: "energy", minutes: "15", title: t3("Quinoa salad with avocado", "Salada de quinoa com abacate", "Ensalada de quinoa con aguacate"), text: t3("A complete plate rich in essential amino acids.", "Um prato completo, rico em aminoácidos essenciais.", "Un plato completo, rico en aminoácidos esenciales.") },
  { tag: "libido", minutes: "15", title: t3("Damiana and cinnamon tea", "Chá de damiana com canela", "Té de damiana con canela"), text: t3("A traditional Mexican aphrodisiac blend.", "Uma mistura afrodisíaca mexicana tradicional.", "Una mezcla afrodisíaca mexicana tradicional.") },
  { tag: "ferments", minutes: "20", title: t3("Kefir with honey", "Kefir com mel", "Kéfir con miel"), text: t3("A fermented drink for the gut, with no added sugar.", "Uma bebida fermentada para a flora intestinal, sem açúcar adicionado.", "Una bebida fermentada para la flora intestinal, sin azúcar añadido.") },
];

export const TONICS: { tag: string; level: string; minutes: string; window: string; title: L; text: L }[] = [
  { tag: "combination", level: "intermediate", minutes: "15", window: "45-90", title: t3("Original bull tonic", "Tônico do touro original", "Tónico del toro original"), text: t3("The classic combination from the protocol.", "A combinação clássica do protocolo.", "La combinación clásica del protocolo.") },
  { tag: "circulation", level: "easy", minutes: "5", window: "30-60", title: t3("Natural nitric oxide boost", "Estímulo natural de óxido nítrico", "Estímulo natural de óxido nítrico"), text: t3("Beet, citrulline, and water.", "Beterraba, citrulina e água.", "Remolacha, citrulina y agua.") },
  { tag: "hormonal", level: "advanced", minutes: "20", window: "2-4 h", title: t3("Warrior hormone elixir", "Elixir hormonal do guerreiro", "Elixir hormonal del guerrero"), text: t3("A longer formula with several ingredients.", "Uma fórmula mais longa com vários ingredientes.", "Una fórmula más larga con varios ingredientes.") },
  { tag: "circulatory", level: "intermediate", minutes: "10", window: "20-45", title: t3("Strong circulation stimulant", "Estimulante forte da circulação", "Estimulante fuerte de la circulación"), text: t3("A sharper formula for a short window.", "Uma fórmula mais intensa para uma janela curta.", "Una fórmula más intensa para una ventana corta.") },
  { tag: "combination", level: "advanced", minutes: "25", window: "60-120", title: t3("Night potency combination", "Combinação de potência noturna", "Combinación de potencia nocturna"), text: t3("The longest formula of the set.", "A fórmula mais longa do conjunto.", "La fórmula más larga del conjunto.") },
];

/* ------------------------------- Programs ---------------------------- */
export const PROGRAMS_DATA: Record<
  string,
  { slug: string; titleKey: string; textKey: string; tagKey: string; days: { title: L; week?: L }[] }
> = {
  "7-day-starter": {
    slug: "7-day-starter",
    titleKey: "programs.1.title",
    textKey: "programs.1.text",
    tagKey: "programs.1.tag",
    days: [
      { title: t3("Understanding Men's Health", "Entendendo a saúde masculina", "Entender la salud masculina") },
      { title: t3("Nutrition Fundamentals", "Fundamentos da nutrição", "Fundamentos de la nutrición") },
      { title: t3("Physical Activity", "Atividade física", "Actividad física") },
      { title: t3("Sleep and Recovery", "Sono e recuperação", "Sueño y recuperación") },
      { title: t3("Stress Management", "Gestão do estresse", "Gestión del estrés") },
      { title: t3("Healthy Daily Habits", "Hábitos diários saudáveis", "Hábitos diarios saludables") },
      { title: t3("Building Your Personal Routine", "Construindo sua rotina pessoal", "Construir tu rutina personal") },
    ],
  },
  "30-day-wellness-journey": {
    slug: "30-day-wellness-journey",
    titleKey: "programs.2.title",
    textKey: "programs.2.text",
    tagKey: "programs.2.tag",
    days: [
      { week: t3("Week 1: Foundation", "Semana 1: Base", "Semana 1: Base"), title: t3("What this journey covers", "O que esta jornada cobre", "Qué cubre este viaje") },
      { title: t3("Health is connected", "A saúde é conectada", "La salud está conectada") },
      { title: t3("A realistic first week", "Uma primeira semana realista", "Una primera semana realista") },
      { title: t3("Notice the habits you already have", "Observe os hábitos que você já tem", "Nota los hábitos que ya tienes") },
      { title: t3("How to read health claims", "Como ler promessas de saúde", "Cómo leer promesas de salud") },
      { title: t3("Safety and when to get help", "Segurança e quando buscar ajuda", "Seguridad y cuándo buscar ayuda") },
      { title: t3("Week 1 check-in", "Balanço da semana 1", "Revisión de la semana 1") },
      { week: t3("Week 2: Nutrition and Movement", "Semana 2: Nutrição e movimento", "Semana 2: Nutrición y movimiento"), title: t3("Build a steady plate", "Monte um prato estável", "Arma un plato estable") },
      { title: t3("Vegetables, fruit, and fiber", "Vegetais, fruta e fibra", "Verduras, fruta y fibra") },
      { title: t3("Fats that fit a heart-healthy pattern", "Gorduras que cabem num padrão saudável", "Grasas que encajan en un patrón saludable") },
      { title: t3("Protein at each meal", "Proteína em cada refeição", "Proteína en cada comida") },
      { title: t3("Hydration and alcohol", "Hidratação e álcool", "Hidratación y alcohol") },
      { title: t3("Eating out without drama", "Comer fora sem drama", "Comer fuera sin drama") },
      { title: t3("Week 2 check-in", "Balanço da semana 2", "Revisión de la semana 2") },
      { week: t3("Week 3: Mind and Body", "Semana 3: Mente e corpo", "Semana 3: Mente y cuerpo"), title: t3("Sleep as a foundation", "Sono como base", "El sueño como base") },
      { title: t3("A wind-down that works", "Um relaxamento que funciona", "Un ritual que funciona") },
      { title: t3("Breathing under pressure", "Respiração sob pressão", "Respiración bajo presión") },
      { title: t3("Movement you will repeat", "Movimento que você vai repetir", "Movimiento que repetirás") },
      { title: t3("Strength without a gym", "Força sem academia", "Fuerza sin gimnasio") },
      { title: t3("Desk days and stiffness", "Dias de mesa e rigidez", "Días de escritorio y rigidez") },
      { title: t3("Week 3 check-in", "Balanço da semana 3", "Revisión de la semana 3") },
      { week: t3("Week 4: Consistency", "Semana 4: Constância", "Semana 4: Constancia"), title: t3("Keep the smallest version", "Mantenha a menor versão", "Mantén la versión más pequeña") },
      { title: t3("Plan for a bad week", "Planeje uma semana ruim", "Planifica una mala semana") },
      { title: t3("Tracking without obsession", "Registrar sem obsessão", "Registrar sin obsesión") },
      { title: t3("Social support", "Apoio social", "Apoyo social") },
      { title: t3("Sleep and travel", "Sono e viagem", "Sueño y viajes") },
      { title: t3("Reviewing the month", "Revisando o mês", "Revisando el mes") },
      { title: t3("What comes next", "O que vem depois", "Lo que viene después") },
    ],
  },
};
