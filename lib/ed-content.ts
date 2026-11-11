"use client";

import type { Lang } from "./i18n";

type L = Record<Lang, string>;

export type EdItem = {
  slug: string;
  tag: string;
  title: L;
  text: L;
  body: Record<Lang, string[]>;
  nutrition?: { label: L; value: L }[];
};

const t3 = (en: string, pt: string, es: string): L => ({ en, pt, es });

export const ED_ITEMS: EdItem[] = [
  {
    slug: "understanding-ed",
    tag: "basics",
    title: t3("Understanding erectile dysfunction", "Entendendo a disfunção erétil", "Entender la disfunción eréctil"),
    text: t3(
      "A plain definition, and what this app will not do.",
      "Uma definição simples e o que este app não faz.",
      "Una definición sencilla y lo que esta app no hace.",
    ),
    body: {
      en: [
        "Erectile dysfunction means difficulty getting an erection, or keeping one, that is satisfactory for sexual activity. Occasional difficulty is common. When it is persistent, it is a reason to talk with a clinician rather than a reason to self-diagnose.",
        "NIDDK and the NHS describe erectile dysfunction as common, especially as men get older, and as something that can be linked with other health conditions. It is a symptom, not a verdict on masculinity, and it is not always caused by one thing.",
        "This app does not diagnose you, does not score erectile function, and does not promise improvement. Reading these pages is education. It is not evidence that your own health has changed.",
        "Major guidelines from the American Urological Association and the European Association of Urology frame care as an assessment of the person, their cardiovascular risk, their medicines, and their goals. That assessment belongs in a clinical visit.",
      ],
      pt: [
        "Disfunção erétil significa dificuldade em obter uma ereção, ou mantê-la, satisfatória para a atividade sexual. Dificuldade ocasional é comum. Quando é persistente, é motivo para falar com um clínico em vez de se autodiagnosticar.",
        "O NIDDK e o NHS descrevem a disfunção erétil como comum, sobretudo com o avançar da idade, e como algo que pode estar ligado a outras condições de saúde. É um sintoma, não um veredito sobre masculinidade, e nem sempre tem uma única causa.",
        "Este app não diagnostica, não pontua a função erétil e não promete melhora. Ler estas páginas é educação. Não é prova de que sua própria saúde mudou.",
        "As diretrizes principais da American Urological Association e da European Association of Urology enquadram o cuidado como avaliação da pessoa, do risco cardiovascular, dos remédios e dos objetivos. Essa avaliação pertence a uma consulta clínica.",
      ],
      es: [
        "La disfunción eréctil significa dificultad para lograr una erección, o mantenerla, satisfactoria para la actividad sexual. La dificultad ocasional es común. Cuando es persistente, es motivo para hablar con un clínico en lugar de autodiagnosticarse.",
        "El NIDDK y el NHS describen la disfunción eréctil como frecuente, sobre todo con la edad, y como algo que puede estar ligado a otras condiciones de salud. Es un síntoma, no un veredicto sobre la masculinidad, y no siempre tiene una sola causa.",
        "Esta app no te diagnostica, no puntúa la función eréctil y no promete mejoría. Leer estas páginas es educación. No es prueba de que tu propia salud haya cambiado.",
        "Las guías principales de la American Urological Association y de la European Association of Urology plantean el cuidado como evaluación de la persona, su riesgo cardiovascular, sus medicamentos y sus objetivos. Esa evaluación pertenece a una consulta clínica.",
      ],
    },
  },
  {
    slug: "risk-factors",
    tag: "risk",
    title: t3("Common risk factors", "Fatores de risco comuns", "Factores de riesgo comunes"),
    text: t3(
      "Associations clinicians ask about. They are not a checklist that diagnoses you.",
      "Associações que os clínicos investigam. Não são uma lista que diagnostica você.",
      "Asociaciones que los clínicos investigan. No son una lista que te diagnostica.",
    ),
    body: {
      en: [
        "Clinicians commonly ask about cardiovascular disease, diabetes, high blood pressure, cholesterol, smoking, alcohol, weight, sleep, stress, mood, and medicines. Each of these has been associated with erectile difficulty in population studies.",
        "An association is not a cause in a single person. Two men with the same risk list can have very different symptoms. The list is a prompt for a conversation, not a score.",
        "Age is the strongest single association in most datasets. That does not mean difficulty is inevitable, only that it becomes more likely over time.",
      ],
      pt: [
        "Clínicos costumam investigar doença cardiovascular, diabetes, pressão alta, colesterol, tabagismo, álcool, peso, sono, estresse, humor e remédios. Cada um desses fatores foi associado a dificuldade erétil em estudos populacionais.",
        "Uma associação não é causa numa pessoa isolada. Dois homens com a mesma lista de riscos podem ter sintomas muito diferentes. A lista é um gatilho para conversa, não uma nota.",
        "A idade é a associação mais forte na maioria dos conjuntos de dados. Isso não significa que a dificuldade seja inevitável, apenas que fica mais provável com o tempo.",
      ],
      es: [
        "Los clínicos suelen preguntar por enfermedad cardiovascular, diabetes, presión alta, colesterol, tabaquismo, alcohol, peso, sueño, estrés, ánimo y medicamentos. Cada uno se ha asociado con dificultad eréctil en estudios poblacionales.",
        "Una asociación no es una causa en una persona concreta. Dos hombres con la misma lista de riesgos pueden tener síntomas muy distintos. La lista es un disparador de conversación, no una puntuación.",
        "La edad es la asociación más fuerte en la mayoría de los conjuntos de datos. Eso no significa que la dificultad sea inevitable, solo que se vuelve más probable con el tiempo.",
      ],
    },
  },
  {
    slug: "cardiovascular-health",
    tag: "heart",
    title: t3("Cardiovascular health", "Saúde cardiovascular", "Salud cardiovascular"),
    text: t3(
      "Why clinicians treat erectile symptoms as a vascular clue, not only a sexual one.",
      "Por que os clínicos tratam sintomas eréteis como pista vascular, não só sexual.",
      "Por qué los clínicos tratan los síntomas eréctiles como pista vascular, no solo sexual.",
    ),
    body: {
      en: [
        "An erection depends on blood flow. The arteries that supply the penis are small, so vascular problems can show up there earlier than in larger vessels.",
        "That is why guidelines suggest treating persistent erectile difficulty as a signal worth a cardiovascular check, especially in men over 40 or with known risk factors.",
        "This does not mean every erection problem is a heart problem. It means the two are worth looking at together.",
      ],
      pt: [
        "Uma ereção depende de fluxo sanguíneo. As artérias que irrigam o pênis são pequenas, então problemas vasculares podem aparecer ali antes do que em vasos maiores.",
        "Por isso as diretrizes sugerem tratar a dificuldade erétil persistente como sinal que merece avaliação cardiovascular, sobretudo em homens acima de 40 anos ou com fatores de risco conhecidos.",
        "Isso não significa que todo problema de ereção seja um problema cardíaco. Significa que os dois merecem ser olhados juntos.",
      ],
      es: [
        "Una erección depende del flujo sanguíneo. Las arterias que irrigan el pene son pequeñas, así que los problemas vasculares pueden aparecer allí antes que en vasos mayores.",
        "Por eso las guías sugieren tratar la dificultad eréctil persistente como una señal que merece una revisión cardiovascular, sobre todo en hombres mayores de 40 años o con factores de riesgo conocidos.",
        "Eso no significa que todo problema de erección sea un problema cardíaco. Significa que ambos merecen mirarse juntos.",
      ],
    },
  },
  {
    slug: "diabetes-and-erectile-health",
    tag: "risk",
    title: t3("Diabetes and erectile health", "Diabetes e saúde erétil", "Diabetes y salud eréctil"),
    text: t3(
      "Diabetes raises the likelihood of erectile problems. It does not decide an individual case.",
      "A diabetes aumenta a probabilidade de problemas eréteis. Não decide um caso individual.",
      "La diabetes aumenta la probabilidad de problemas eréctiles. No decide un caso individual.",
    ),
    body: {
      en: [
        "Diabetes can affect nerves and small blood vessels, both of which matter for erection. It is one of the most commonly cited associations in the clinical literature.",
        "Control matters, but it is not the whole story. Men with well-controlled diabetes can still have symptoms, and men with poorer control can be unaffected for years.",
        "If you have diabetes and new erectile difficulty, it is a useful detail for your clinician, not a reason to change medication alone.",
      ],
      pt: [
        "A diabetes pode afetar nervos e pequenos vasos, ambos importantes para a ereção. É uma das associações mais citadas na literatura clínica.",
        "O controle importa, mas não é a história inteira. Homens com diabetes bem controlado ainda podem ter sintomas, e homens com controle pior podem ficar sem sintomas por anos.",
        "Se você tem diabetes e nova dificuldade erétil, isso é um detalhe útil para o seu clínico, não motivo para mudar remédio sozinho.",
      ],
      es: [
        "La diabetes puede afectar nervios y vasos pequeños, ambos importantes para la erección. Es una de las asociaciones más citadas en la literatura clínica.",
        "El control importa, pero no es toda la historia. Hombres con diabetes bien controlada pueden tener síntomas, y hombres con peor control pueden no tenerlos durante años.",
        "Si tienes diabetes y una nueva dificultad eréctil, es un dato útil para tu clínico, no motivo para cambiar la medicación por tu cuenta.",
      ],
    },
  },
  {
    slug: "psychological-factors",
    tag: "mind",
    title: t3("Psychological factors", "Fatores psicológicos", "Factores psicológicos"),
    text: t3(
      "Mood, anxiety, and relationships can contribute. They are not the whole explanation.",
      "Humor, ansiedade e relações podem contribuir. Não são a explicação inteira.",
      "El ánimo, la ansiedad y las relaciones pueden contribuir. No son toda la explicación.",
    ),
    body: {
      en: [
        "Anxiety can tighten the body and pull attention away from sensation. Mood can lower interest. Relationship strain can add pressure. All three can make difficulty feel worse than the physical part alone.",
        "Performance anxiety can build a loop: one difficult night raises worry, worry makes the next night harder. Breaking the loop sometimes matters as much as any physical factor.",
        "Psychological and physical causes often overlap. A clinician may consider both.",
      ],
      pt: [
        "A ansiedade pode tensionar o corpo e desviar a atenção da sensação. O humor pode baixar o interesse. Tensão no relacionamento pode acrescentar pressão. Os três podem piorar a dificuldade além da parte física.",
        "A ansiedade de desempenho pode criar um ciclo: uma noite difícil aumenta a preocupação, e a preocupação torna a noite seguinte mais difícil. Quebrar o ciclo às vezes importa tanto quanto qualquer fator físico.",
        "Causas psicológicas e físicas costumam se sobrepor. Um clínico pode considerar as duas.",
      ],
      es: [
        "La ansiedad puede tensar el cuerpo y desviar la atención de la sensación. El ánimo puede bajar el interés. La tensión de pareja puede añadir presión. Los tres pueden empeorar la dificultad más allá de la parte física.",
        "La ansiedad de desempeño puede crear un bucle: una noche difícil aumenta la preocupación, y la preocupación hace más difícil la siguiente. Romper el bucle a veces importa tanto como cualquier factor físico.",
        "Las causas psicológicas y físicas suelen solaparse. Un clínico puede considerar ambas.",
      ],
    },
  },
  {
    slug: "lifestyle-and-sexual-health",
    tag: "lifestyle",
    title: t3("Lifestyle and sexual health", "Estilo de vida e saúde sexual", "Estilo de vida y salud sexual"),
    text: t3(
      "Movement, food, sleep, alcohol, and smoking, in proportion.",
      "Movimento, comida, sono, álcool e tabagismo, com proporção.",
      "Movimiento, comida, sueño, alcohol y tabaco, con proporción.",
    ),
    body: {
      en: [
        "Regular movement, a varied food pattern, a protected sleep window, and moderate alcohol are the usual lifestyle suggestions. Smoking is the one most often singled out.",
        "Lifestyle is slow. It rarely produces a visible change in a week. It is also the part you control most directly.",
        "Lifestyle is not a substitute for assessment when symptoms persist, and assessment does not make lifestyle pointless.",
      ],
      pt: [
        "Movimento regular, padrão alimentar variado, janela de sono protegida e álcool moderado são as sugestões habituais de estilo de vida. O tabagismo é o fator mais destacado.",
        "Estilo de vida é lento. Raramente produz mudança visível em uma semana. Também é a parte que você controla mais diretamente.",
        "Estilo de vida não substitui avaliação quando os sintomas persistem, e a avaliação não torna o estilo de vida inútil.",
      ],
      es: [
        "Movimiento regular, un patrón de comida variado, una ventana de sueño protegida y alcohol moderado son las sugerencias habituales de estilo de vida. El tabaquismo es el factor que más se destaca.",
        "El estilo de vida es lento. Rara vez produce un cambio visible en una semana. También es la parte que más controlas.",
        "El estilo de vida no sustituye la evaluación cuando los síntomas persisten, y la evaluación no vuelve inútil el estilo de vida.",
      ],
    },
  },
  {
    slug: "when-to-seek-help",
    tag: "urgent",
    title: t3("When to seek medical help", "Quando buscar ajuda médica", "Cuándo buscar ayuda médica"),
    text: t3(
      "The thresholds that turn education into a clinical visit.",
      "Os limites que transformam educação em consulta clínica.",
      "Los umbrales que convierten la educación en una consulta clínica.",
    ),
    body: {
      en: [
        "Book a routine visit when difficulty is persistent, when it appeared suddenly, when it changed after a new medicine, or when it worries you enough to affect daily life.",
        "Seek emergency care for chest pain, fainting, sudden severe breathlessness, or an erection that is painful or lasts longer than four hours.",
        "This page does not replace triage. If you are unsure, err on the side of being seen.",
      ],
      pt: [
        "Marque uma consulta de rotina quando a dificuldade é persistente, quando apareceu de repente, quando mudou após um remédio novo ou quando preocupa o suficiente para afetar a vida diária.",
        "Procure emergência para dor no peito, desmaio, falta de ar súbita e grave, ou ereção dolorosa ou com mais de quatro horas.",
        "Esta página não substitui triagem. Se estiver em dúvida, prefira ser avaliado.",
      ],
      es: [
        "Pide una cita de rutina cuando la dificultad es persistente, cuando apareció de repente, cuando cambió tras un medicamento nuevo o cuando te preocupa lo suficiente para afectar la vida diaria.",
        "Busca urgencias por dolor en el pecho, desmayo, falta de aire súbita y grave, o una erección dolorosa o de más de cuatro horas.",
        "Esta página no sustituye el triaje. Si dudas, prefiere que te valoren.",
      ],
    },
  },
  {
    slug: "medical-treatment-options",
    tag: "clinic",
    title: t3("Medical treatment options", "Opções de tratamento médico", "Opciones de tratamiento médico"),
    text: t3(
      "An overview of what a clinician may discuss. Doses are not given here.",
      "Uma visão do que um clínico pode discutir. As doses não estão aqui.",
      "Una visión de lo que un clínico puede tratar. Las dosis no están aquí.",
    ),
    body: {
      en: [
        "A clinician may discuss oral medication, mechanical aids, lifestyle, treating an underlying condition, or a combination. Which one fits depends on the person, the medicines they already take, and preferences.",
        "This page lists categories only. It does not give doses, does not tell you which one you should take, and does not replace a prescription.",
        "If you already take something and it is not working, that is useful clinical information, not a failure.",
      ],
      pt: [
        "Um clínico pode discutir medicação oral, apoio mecânico, estilo de vida, tratar uma condição de base ou uma combinação. Qual encaixa depende da pessoa, dos remédios que já toma e das preferências.",
        "Esta página lista apenas categorias. Não dá doses, não diz qual você deve tomar e não substitui receita.",
        "Se você já toma algo e não funciona, isso é informação clínica útil, não um fracasso.",
      ],
      es: [
        "Un clínico puede plantear medicación oral, apoyo mecánico, estilo de vida, tratar una condición de base o una combinación. Cuál encaja depende de la persona, los medicamentos que ya toma y sus preferencias.",
        "Esta página solo enumera categorías. No da dosis, no dice cuál deberías tomar y no sustituye la receta.",
        "Si ya tomas algo y no funciona, eso es información clínica útil, no un fracaso.",
      ],
    },
  },
  {
    slug: "faq",
    tag: "basics",
    title: t3("Frequently asked questions", "Perguntas frequentes", "Preguntas frecuentes"),
    text: t3(
      "Short answers to the questions the pages above raise.",
      "Respostas curtas às perguntas das páginas acima.",
      "Respuestas cortas a las preguntas de las páginas anteriores.",
    ),
    body: {
      en: [
        "Is occasional difficulty normal? Yes, especially when tired, stressed, or out of rhythm. Persistence is what matters.",
        "Will this app tell me if I have erectile dysfunction? No. It explains the topic. Assessment belongs to a clinician.",
        "Should I stop my medication? Only with whoever prescribed it. Do not change alone.",
        "Do I need to buy a supplement? No. The pages describe categories, not a required shopping list.",
      ],
      pt: [
        "Dificuldade ocasional é normal? Sim, sobretudo com cansaço, estresse ou fora de ritmo. O que importa é a persistência.",
        "Este app diz se eu tenho disfunção erétil? Não. Ele explica o tema. A avaliação pertence a um clínico.",
        "Devo parar minha medicação? Só com quem prescreveu. Não mude sozinho.",
        "Preciso comprar um suplemento? Não. As páginas descrevem categorias, não uma lista de compras obrigatória.",
      ],
      es: [
        "¿Es normal la dificultad ocasional? Sí, sobre todo con cansancio, estrés o fuera de ritmo. Lo que importa es la persistencia.",
        "¿Esta app me dice si tengo disfunción eréctil? No. Explica el tema. La evaluación pertenece a un clínico.",
        "¿Debo dejar mi medicación? Solo con quien la prescribió. No cambies por tu cuenta.",
        "¿Necesito comprar un suplemento? No. Las páginas describen categorías, no una lista de compras obligatoria.",
      ],
    },
  },
];
