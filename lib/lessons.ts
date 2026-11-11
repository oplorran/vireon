"use client";

import type { Lang } from "./i18n";

type L = Record<Lang, string>;

const t3 = (en: string, pt: string, es: string): L => ({ en, pt, es });

export type Lesson = {
  slug: string;
  title: L;
  outline?: boolean;
  body: Record<Lang, string[]>;
};

export type CoursePayload = {
  slug: string;
  lessons: Lesson[];
};

/* Lesson bodies are educational summaries, not medical claims. */

const shared = (topic: L, practice: L, close: L): Record<Lang, string[]> => ({
  en: [topic.en, practice.en, close.en],
  pt: [topic.pt, practice.pt, close.pt],
  es: [topic.es, practice.es, close.es],
});

export const COURSE_LESSONS: CoursePayload[] = [
  {
    slug: "protocolo-natural-erecciones-de-acero",
    lessons: [
      {
        slug: "la-mentira-de-la-disfuncion",
        title: t3("Understanding male circulatory health", "Entendendo a saúde circulatória masculina", "Entendiendo la salud circulatoria masculina"),
        body: shared(
          t3(
            "Erection is described in this material as a vascular event. Arteries relax, blood fills the tissue, and a vessel holds it while the body keeps the flow steady. Circulation is the frame, not willpower.",
            "A ereção é descrita neste material como um evento vascular. As artérias relaxam, o sangue preenche o tecido e um vaso o sustenta enquanto o corpo mantém o fluxo estável. A circulação é o quadro, não a força de vontade.",
            "La erección se describe aquí como un evento vascular. Las arterias se relajan, la sangre llena el tejido y un vaso lo sostiene mientras el cuerpo mantiene el flujo estable. La circulación es el marco, no la fuerza de voluntad.",
          ),
          t3(
            "Three everyday inputs are named: sleep length and consistency, time spent seated, and aerobic movement across the week. Each is presented as a habit to observe, not a measured fix.",
            "Três entradas cotidianas são nomeadas: duração e regularidade do sono, tempo sentado e movimento aeróbico na semana. Cada uma é apresentada como hábito a observar, não como correção medida.",
            "Se nombran tres entradas cotidianas: duración y regularidad del sueño, tiempo sentado y movimiento aeróbico en la semana. Cada una se presenta como hábito a observar, no como corrección medida.",
          ),
          t3(
            "The lesson separates what the member controls (movement, sleep window, hydration, alcohol) from what needs a clinician (blood pressure, glucose, medicines, persistent loss of firmness).",
            "A lição separa o que o membro controla (movimento, janela de sono, hidratação, álcool) do que precisa de clínico (pressão, glicose, remédios, perda persistente de firmeza).",
            "La lección separa lo que el miembro controla (movimiento, ventana de sueño, hidratación, alcohol) de lo que necesita clínico (presión, glucosa, medicamentos, pérdida persistente de firmeza).",
          ),
        ),
      },
      {
        slug: "formula-del-bicarbonato",
        title: t3("The natural protocol, step by step", "O protocolo natural, passo a passo", "El protocolo natural, paso a paso"),
        body: shared(
          t3(
            "The gram dose comes from the calculator on the Protocol screen. Open the calculator, set experience, and read the number before following the steps.",
            "A dose em gramas vem da calculadora na tela do Protocolo. Abra a calculadora, defina a experiência e leia o número antes de seguir os passos.",
            "La dosis en gramos viene de la calculadora en la pantalla del Protocolo. Abre la calculadora, define la experiencia y lee el número antes de seguir los pasos.",
          ),
          t3(
            "Step 1, alkalizing, 0 to 15 minutes. Step 2, enzyme activation, 15 to 30 minutes. Step 3, vasodilation, 30 to 60 minutes. Step 4, a sustained peak, 45 to 90 minutes. Optimization points: half-empty stomach, room-temperature water, drinking fast, hydration before, no alcohol, deep breathing.",
            "Passo 1, alcalinização, 0 a 15 minutos. Passo 2, ativação enzimática, 15 a 30 minutos. Passo 3, vasodilatação, 30 a 60 minutos. Passo 4, pico sustentado, 45 a 90 minutos. Otimização: estômago meio vazio, água em temperatura ambiente, beber rápido, hidratar antes, sem álcool, respiração profunda.",
            "Paso 1, alcalinización, 0 a 15 minutos. Paso 2, activación enzimática, 15 a 30 minutos. Paso 3, vasodilatación, 30 a 60 minutos. Paso 4, pico sostenido, 45 a 90 minutos. Optimización: estómago medio vacío, agua a temperatura ambiente, beber rápido, hidratar antes, sin alcohol, respiración profunda.",
          ),
          t3(
            "Eight-week progression: 70 percent of the dose for two weeks, 100 percent from week three, and a 7-day pause every 4 to 6 weeks once the effective dose is found. Absolute contraindications: uncontrolled hypertension above 180/110 mmHg, chronic kidney failure, severe fluid retention, heart failure, strong diuretics, prior metabolic alkalosis.",
            "Progressão de oito semanas: 70 por cento da dose por duas semanas, 100 por cento a partir da terceira e pausa de 7 dias a cada 4 a 6 semanas quando a dose eficaz é encontrada. Contraindicações absolutas: hipertensão acima de 180/110 mmHg, insuficiência renal crônica, retenção severa, insuficiência cardíaca, diuréticos fortes, alcalose prévia.",
            "Progresión de ocho semanas: 70 por ciento de la dosis por dos semanas, 100 por ciento desde la tercera y pausa de 7 días cada 4 a 6 semanas al encontrar la dosis eficaz. Contraindicaciones absolutas: hipertensión por encima de 180/110 mmHg, insuficiencia renal crónica, retención severa, insuficiencia cardíaca, diuréticos fuertes, alcalosis previa.",
          ),
        ),
      },
      {
        slug: "como-integrarlo-en-rutina",
        title: t3("Fitting it into a daily routine", "Encaixando na rotina diária", "Encajarlo en la rutina diaria"),
        body: shared(
          t3(
            "The protocol only works as a routine if the timing is repeatable. The lesson suggests anchoring it to a fixed moment, not to mood.",
            "O protocolo só funciona como rotina se o horário for repetível. A lição sugere ancorar em um momento fixo, não no humor.",
            "El protocolo solo funciona como rutina si el horario es repetible. La lección sugiere anclarlo a un momento fijo, no al humor.",
          ),
          t3(
            "Three anchors are described: the same weekday slot, a marker already in the day such as after a shower or before a meal, and a written record of the dose with the perceived effect.",
            "Três âncoras são descritas: o mesmo horário na semana, um marcador já existente no dia, como após o banho ou antes da refeição, e um registro escrito da dose com o efeito percebido.",
            "Se describen tres anclas: el mismo horario en la semana, un marcador que ya existe en el día, como después de la ducha o antes de comer, y un registro escrito de la dosis con el efecto percibido.",
          ),
          t3(
            "The lesson repeats that the record is subjective. A good week is one where the routine happened, not a week where the result was perfect.",
            "A lição repete que o registro é subjetivo. Uma boa semana é aquela em que a rotina aconteceu, não aquela em que o resultado foi perfeito.",
            "La lección repite que el registro es subjetivo. Una buena semana es aquella en la que ocurrió la rutina, no en la que el resultado fue perfecto.",
          ),
        ),
      },
      {
        slug: "resultados-en-7-dias",
        title: t3("Tracking progress", "Acompanhando progresso", "Siguiendo el progreso"),
        body: shared(
          t3(
            "Progress is tracked in the Progress screen, where habits are toggled and the week is visualised. Nothing there is a clinical measurement.",
            "O progresso é acompanhado na tela de Progresso, com hábitos marcados e a semana visualizada. Nada ali é medida clínica.",
            "El progreso se sigue en la pantalla de Progreso, con hábitos marcados y la semana visualizada. Nada allí es medida clínica.",
          ),
          t3(
            "The lesson proposes three markers: routine adherence, perceived firmness, and perceived recovery between days. Look at seven-day blocks, not single days, because one day says more about sleep and stress than about the protocol.",
            "A lição propõe três marcadores: adesão à rotina, firmeza percebida e recuperação percebida entre os dias. Olhe blocos de sete dias, não dias isolados, porque um dia fala mais de sono e estresse do que do protocolo.",
            "La lección propone tres marcadores: adherencia a la rutina, firmeza percibida y recuperación percibida entre días. Mira bloques de siete días, no días aislados, porque un día habla más del sueño y el estrés que del protocolo.",
          ),
          t3(
            "If nothing changes across a month, the lesson says the next step is a clinician, not a higher dose.",
            "Se nada mudar em um mês, a lição diz que o próximo passo é um clínico, não uma dose maior.",
            "Si nada cambia en un mes, la lección dice que el siguiente paso es un clínico, no una dosis mayor.",
          ),
        ),
      },
    ],
  },
  {
    slug: "el-controlador-del-orgasmo",
    lessons: [
      {
        slug: "por-que-eyaculas-rapido",
        title: t3("Understanding the body response", "Entendendo a resposta do corpo", "Entendiendo la respuesta del cuerpo"),
        body: shared(
          t3(
            "The arousal curve is described in four stages: a starting calm, a rising point of no return, the ejaculatory threshold, and the refractory pause. Most early endings happen because the third stage is crossed unnoticed.",
            "A curva de excitação é descrita em quatro estágios: calma inicial, ponto de subida sem retorno, limiar ejaculatório e pausa refratária. A maioria dos fins precoces acontece porque o terceiro estágio é cruzado sem ser notado.",
            "La curva de excitación se describe en cuatro etapas: calma inicial, punto de subida sin retorno, umbral eyaculatorio y pausa refractaria. La mayoría de los finales precoces ocurre porque la tercera etapa se cruza sin notarse.",
          ),
          t3(
            "The lesson asks the member to name, out loud, where they are on the curve during three separate sessions, using a simple 1 to 10 scale. The scale is subjective on purpose.",
            "A lição pede que o membro nomeie, em voz alta, onde está na curva durante três sessões separadas, usando uma escala simples de 1 a 10. A escala é subjetiva de propósito.",
            "La lección pide que el miembro nombre, en voz alta, dónde está en la curva durante tres sesiones separadas, con una escala simple de 1 a 10. La escala es subjetiva a propósito.",
          ),
          t3(
            "Nothing is corrected in this first lesson. The aim is awareness, because the techniques that follow only work when the threshold is recognised early.",
            "Nada é corrigido nesta primeira lição. O objetivo é consciência, porque as técnicas seguintes só funcionam quando o limiar é reconhecido cedo.",
            "Nada se corrige en esta primera lección. El objetivo es conciencia, porque las técnicas siguientes solo funcionan cuando el umbral se reconoce temprano.",
          ),
        ),
      },
      {
        slug: "tecnica-pulso-inverso",
        title: t3("The reverse-pulse technique", "A técnica do pulso inverso", "La técnica del pulso inverso"),
        body: shared(
          t3(
            "The reverse pulse is a deliberate interruption, not a stop. Pressure is reduced in pulses instead of being removed entirely, so the arousal curve flattens without collapsing.",
            "O pulso inverso é uma interrupção deliberada, não uma parada. A pressão é reduzida em pulsos em vez de removida por completo, para achatar a curva sem colapsar.",
            "El pulso inverso es una interrupción deliberada, no una parada. La presión se reduce en pulsos en lugar de retirarse por completo, para aplanar la curva sin colapsarla.",
          ),
          t3(
            "Practice is described alone first: three pulses at level 6, breathe out through the mouth on each one, then resume. The sequence is repeated five times per session, three sessions per week.",
            "A prática é descrita primeiro sozinho: três pulsos no nível 6, expirando pela boca em cada um, e então retomando. A sequência se repete cinco vezes por sessão, três sessões por semana.",
            "La práctica se describe primero a solas: tres pulsos en el nivel 6, exhalando por la boca en cada uno, y luego retomando. La secuencia se repite cinco veces por sesión, tres sesiones por semana.",
          ),
          t3(
            "The lesson warns that the first attempts feel mechanical. That is expected, and the technique is only judged after two weeks of practice.",
            "A lição avisa que as primeiras tentativas parecem mecânicas. Isso é esperado, e a técnica só é avaliada após duas semanas de prática.",
            "La lección avisa que los primeros intentos se sienten mecánicos. Es esperado, y la técnica solo se evalúa tras dos semanas de práctica.",
          ),
        ),
      },
      {
        slug: "coordinacion-fisica-mental",
        title: t3("Physical and mental coordination", "Coordenação física e mental", "Coordinación física y mental"),
        body: shared(
          t3(
            "Breathing and attention are trained together here. The lesson pairs a slow exhale with a single point of attention, chosen before the session starts.",
            "Respiração e atenção são treinadas juntas aqui. A lição combina expiração lenta com um único ponto de atenção, escolhido antes da sessão.",
            "Aquí se entrenan juntos la respiración y la atención. La lección combina una exhalación lenta con un único punto de atención, elegido antes de la sesión.",
          ),
          t3(
            "Three attention anchors are given: the breath at the nostrils, the sensation of contact, and a neutral image. When attention drifts, it is returned without judgement and without adding a second task.",
            "Três âncoras de atenção são dadas: a respiração nas narinas, a sensação de contato e uma imagem neutra. Quando a atenção desvia, ela volta sem julgamento e sem acrescentar uma segunda tarefa.",
            "Se dan tres anclas de atención: la respiración en las narinas, la sensación de contacto y una imagen neutra. Cuando la atención se desvía, vuelve sin juicio y sin añadir una segunda tarea.",
          ),
          t3(
            "The lesson also names a common mistake: switching anchors mid-session. Choose one and keep it for the whole session.",
            "A lição também nomeia um erro comum: trocar de âncora no meio da sessão. Escolha uma e mantenha durante toda a sessão.",
            "La lección también nombra un error común: cambiar de ancla a mitad de sesión. Elige una y mantenla durante toda la sesión.",
          ),
        ),
      },
      {
        slug: "ritual-pre-sexo",
        title: t3("Preparation and stamina drills", "Preparação e exercícios de resistência", "Preparación y ejercicios de resistencia"),
        body: shared(
          t3(
            "Preparation is described as a short sequence, not an elaborate ritual: water, five slow breaths, a brief pelvic-floor set, and a stated intention.",
            "A preparação é descrita como uma sequência curta, não um ritual elaborado: água, cinco respirações lentas, uma série breve de assoalho pélvico e uma intenção declarada.",
            "La preparación se describe como una secuencia corta, no un ritual elaborado: agua, cinco respiraciones lentas, una serie breve de suelo pélvico y una intención declarada.",
          ),
          t3(
            "Stamina drills happen outside the moment: stop-start twice a week, reverse pulse three times a week, and a 10-minute walk on the remaining days. The drills are short on purpose.",
            "Os exercícios de resistência acontecem fora do momento: parada-arranque duas vezes por semana, pulso inverso três vezes e caminhada de 10 minutos nos outros dias. Os exercícios são curtos de propósito.",
            "Los ejercicios de resistencia ocurren fuera del momento: parada-arranque dos veces por semana, pulso inverso tres veces y caminata de 10 minutos los otros días. Los ejercicios son cortos a propósito.",
          ),
          t3(
            "Progress is judged by how easily the sequence is remembered, not by a clock.",
            "O progresso é julgado pela facilidade de lembrar a sequência, não por um relógio.",
            "El progreso se juzga por la facilidad de recordar la secuencia, no por un reloj.",
          ),
        ),
      },
    ],
  },
  {
    slug: "metodo-5x",
    lessons: [
      {
        slug: "mapa-placer-femenino",
        title: t3("Anatomy of female pleasure", "Anatomia do prazer feminino", "Anatomía del placer femenino"),
        body: shared(
          t3(
            "Adult entertainment is said to have distorted female sexuality. The lesson starts with anatomy grounded in current research instead.",
            "A indústria adulta teria distorcido a sexualidade feminina. A lição começa pela anatomia baseada em pesquisa atual.",
            "La industria adulta habría distorsionado la sexualidad femenina. La lección empieza por la anatomía basada en investigación actual.",
          ),
          t3(
            "Numbers given: only 15 percent of women reach orgasm from penetration alone, 85 percent need clitoral stimulation, and average time to orgasm is 13 to 20 minutes. The clitoris is described as larger than the visible point, with internal tissue around the vaginal opening.",
            "Números dados: apenas 15 por cento das mulheres chegam ao orgasmo só com penetração, 85 por cento precisam de estímulo clitoriano, e o tempo médio até o orgasmo é de 13 a 20 minutos. O clitóris é descrito como maior que o ponto visível, com tecido interno ao redor da abertura.",
            "Números dados: solo el 15 por ciento de las mujeres llega al orgasmo solo con penetración, el 85 por ciento necesita estímulo clitoriano, y el tiempo medio hasta el orgasmo es de 13 a 20 minutos. El clítoris se describe como mayor que el punto visible, con tejido interno alrededor de la abertura.",
          ),
          t3(
            "Two zones are detailed: the external glans, with about 8,000 nerve endings, and the anterior vaginal wall, 5 to 8 cm inside. The others are announced but left open.",
            "Duas zonas são detalhadas: a glande externa, com cerca de 8.000 terminações nervosas, e a parede vaginal anterior, 5 a 8 cm dentro. As demais são anunciadas mas ficam em aberto.",
            "Se detallan dos zonas: el glande externo, con unas 8.000 terminaciones nerviosas, y la pared vaginal anterior, 5 a 8 cm dentro. Las demás se anuncian pero quedan abiertas.",
          ),
        ),
      },
      {
        slug: "tecnica-toques-cruzados",
        title: t3("Combined stimulation", "Estimulação combinada", "Estimulación combinada"),
        body: shared(
          t3(
            "The 5x method is a pattern of five alternating focuses rather than a single move. The lesson explains the alternation before describing pressure.",
            "O método 5x é um padrão de cinco focos alternados em vez de um movimento único. A lição explica a alternância antes de descrever a pressão.",
            "El método 5x es un patrón de cinco focos alternos en lugar de un movimiento único. La lección explica la alternancia antes de describir la presión.",
          ),
          t3(            "Sequence named: external, internal, external with a second point, pause, and repeat. Each focus lasts about 20 to 30 seconds at first, then longer as the response becomes predictable.",
            "Sequência nomeada: externo, interno, externo com um segundo ponto, pausa e repetição. Cada foco dura cerca de 20 a 30 segundos no início, e mais tempo conforme a resposta fica previsível.",
            "Secuencia nombrada: externo, interno, externo con un segundo punto, pausa y repetición. Cada foco dura unos 20 a 30 segundos al inicio, y más cuando la respuesta se vuelve previsible.",
          ),
          t3(
            "Pressure stays light. The lesson repeats that speed is the last variable to change, not the first.",
            "A pressão fica leve. A lição repete que a velocidade é a última variável a mudar, não a primeira.",
            "La presión queda leve. La lección repite que la velocidad es la última variable a cambiar, no la primera.",
          ),
        ),
      },
      {
        slug: "arte-toque-lengua-dedos",
        title: t3("Hands, mouth, and timing", "Mãos, boca e ritmo", "Manos, boca y ritmo"),
        body: shared(
          t3(
            "This lesson adds a second point of contact and the discipline of an unchanged rhythm. Two variables change at most, never three.",
            "Esta lição adiciona um segundo ponto de contato e a disciplina de um ritmo inalterado. No máximo duas variáveis mudam, nunca três.",
            "Esta lección añade un segundo punto de contacto y la disciplina de un ritmo invariable. Cambian como máximo dos variables, nunca tres.",
          ),
          t3(
            "Mouth and hand are described as complementary, not competing: one holds a steady base while the other explores. When the response rises, the base stays and only the exploring hand slows.",
            "Boca e mão são descritas como complementares, não concorrentes: uma mantém uma base estável enquanto a outra explora. Quando a resposta sobe, a base fica e só a mão que explora desacelera.",
            "Boca y mano se describen como complementarias, no competidoras: una mantiene una base estable mientras la otra explora. Cuando la respuesta sube, la base se queda y solo la mano que explora baja el ritmo.",
          ),
          t3(
            "Feedback is invited with a single question per session, kept short so it does not interrupt.",
            "O feedback é convidado com uma única pergunta por sessão, curta para não interromper.",
            "Se invita el feedback con una sola pregunta por sesión, corta para no interrumpir.",
          ),
        ),
      },
      {
        slug: "orgasmos-penetracion-combo-3",
        title: t3("Intimacy during penetration", "Intimidade durante a penetração", "Intimidad durante la penetración"),
        body: shared(
          t3(
            "The lesson brings the previous pattern into penetration. The angle is adjusted so the anterior wall receives indirect pressure while the external point stays reachable.",
            "A lição traz o padrão anterior para a penetração. O ângulo é ajustado para a parede anterior receber pressão indireta e o ponto externo continuar acessível.",
            "La lección lleva el patrón anterior a la penetración. El ángulo se ajusta para que la pared anterior reciba presión indirecta y el punto externo siga accesible.",
          ),
          t3(
            "Pace is slow at the start and only increases when breathing stays low. Three positions are named as better suited to the angle, without diagrams.",
            "O ritmo é lento no início e só aumenta quando a respiração permanece baixa. Três posições são nomeadas como mais adequadas ao ângulo, sem diagramas.",
            "El ritmo es lento al inicio y solo aumenta cuando la respiración permanece baja. Se nombran tres posiciones más adecuadas al ángulo, sin diagramas.",
          ),
          t3(
            "The lesson closes by saying the method should feel unhurried, and that a shorter session done well is better than a long one done fast.",
            "A lição fecha dizendo que o método deve parecer sem pressa, e que uma sessão curta bem feita é melhor que uma longa e rápida.",
            "La lección cierra diciendo que el método debe sentirse sin prisa, y que una sesión corta bien hecha es mejor que una larga y rápida.",
          ),
        ),
      },
    ],
  },
  {
    slug: "metodo-testosterona-natural",
    lessons: [
      {
        slug: "asesinos-ocultos-testosterona",
        title: t3("What affects hormone levels", "O que afeta os níveis hormonais", "Qué afecta los niveles hormonales"),
        body: shared(
          t3(
            "Four everyday inputs are listed: short sleep, abdominal fat, chronic stress, and long seated blocks. None of them is presented as a diagnosis.",
            "Quatro entradas cotidianas são listadas: sono curto, gordura abdominal, estresse crônico e longos blocos sentado. Nenhuma é apresentada como diagnóstico.",
            "Se listan cuatro entradas cotidianas: sueño corto, grasa abdominal, estrés crónico y largos bloques sentado. Ninguna se presenta como diagnóstico.",
          ),
          t3(
            "The lesson explains why each one plausibly interferes with the hormonal axis, then names one measurable habit per input: a fixed wake time, waist measurement, a daily walk, and a standing break every 50 minutes.",
            "A lição explica por que cada uma plausivelmente interfere no eixo hormonal e nomeia um hábito mensurável por entrada: hora fixa de acordar, medida da cintura, caminhada diária e pausa em pé a cada 50 minutos.",
            "La lección explica por qué cada una plausiblemente interfiere en el eje hormonal y nombra un hábito medible por entrada: hora fija de despertar, medida de cintura, caminata diaria y pausa de pie cada 50 minutos.",
          ),
          t3(
            "A blood test is described as the only way to know the numbers, and the lesson repeats that the app does not read labs.",
            "Um exame de sangue é descrito como a única forma de saber os números, e a lição repete que o app não lê exames.",
            "Un análisis de sangre se describe como la única forma de saber los números, y la lección repite que la app no lee análisis.",
          ),
        ),
      },
      {
        slug: "protocolo-ejercicio-t-boosting",
        title: t3("Training and hormone health", "Treino e saúde hormonal", "Entrenamiento y salud hormonal"),
        body: shared(
          t3(
            "Strength work is framed around large patterns and short sessions: squat, hinge, push, pull, and carry, twice a week, 30 to 40 minutes.",
            "O trabalho de força é enquadrado em padrões grandes e sessões curtas: agachamento, dobradiça, empurrar, puxar e carregar, duas vezes por semana, 30 a 40 minutos.",
            "El trabajo de fuerza se enmarca en patrones grandes y sesiones cortas: sentadilla, bisagra, empuje, tirón y acarreo, dos veces por semana, 30 a 40 minutos.",
          ),
          t3(
            "Excess is also named: more than five hard sessions a week, or long endurance blocks without recovery, are described as counterproductive for the goal.",
            "O excesso também é nomeado: mais de cinco sessões fortes por semana, ou blocos longos de resistência sem recuperação, são descritos como contraproducentes para o objetivo.",
            "También se nombra el exceso: más de cinco sesiones fuertes por semana, o bloques largos de resistencia sin recuperación, se describen como contraproducentes para el objetivo.",
          ),
          t3(
            "Progression is by added reps first, then load. The lesson suggests keeping a simple log so the increase is deliberate.",
            "A progressão é por repetições primeiro, depois carga. A lição sugere manter um registro simples para que o aumento seja deliberado.",
            "La progresión es por repeticiones primero, luego carga. La lección sugiere mantener un registro simple para que el aumento sea deliberado.",
          ),
        ),
      },
      {
        slug: "plan-alimentario-optimizacion-hormonal",
        title: t3("Eating for hormone balance", "Comer para equilíbrio hormonal", "Comer para el equilibrio hormonal"),
        body: shared(
          t3(
            "The plate is described plainly: a protein source at every meal, vegetables by volume, and starch placed around training.",
            "O prato é descrito de forma simples: uma fonte de proteína em cada refeição, vegetais em volume e amido em torno do treino.",
            "El plato se describe de forma simple: una fuente de proteína en cada comida, verduras por volumen y almidón alrededor del entrenamiento.",
          ),
          t3(
            "Three habits to reduce are named: liquid sugar, very late large meals, and long fasting windows for those who already sleep badly.",
            "Três hábitos a reduzir são nomeados: açúcar líquido, refeições grandes muito tarde e janelas longas de jejum para quem já dorme mal.",
            "Se nombran tres hábitos a reducir: azúcar líquido, comidas grandes muy tarde y ventanas largas de ayuno para quien ya duerme mal.",
          ),
          t3(
            "Nothing here is a prescription, and the lesson says a dietitian is the right next step when weight or glucose is a concern.",
            "Nada aqui é prescrição, e a lição diz que um nutricionista é o próximo passo certo quando peso ou glicose preocupam.",
            "Nada aquí es prescripción, y la lección dice que un nutricionista es el siguiente paso correcto cuando peso o glucosa preocupan.",
          ),
        ),
      },
      {
        slug: "rutina-sueno-maxima-produccion-testosterona",
        title: t3("Sleep and hormone recovery", "Sono e recuperação hormonal", "Sueño y recuperación hormonal"),
        body: shared(
          t3(
            "Sleep is treated as the base of the whole course. The lesson works on a fixed wake time before any other change.",
            "O sono é tratado como base de todo o curso. A lição trabalha uma hora fixa de acordar antes de qualquer outra mudança.",
            "El sueño se trata como base de todo el curso. La lección trabaja una hora fija de despertar antes de cualquier otro cambio.",
          ),
          t3(
            "Evening inputs are reduced in order: screens in bed, late caffeine, alcohol, and bright light in the last hour. Mornings get daylight within 30 minutes of waking.",
            "As entradas noturnas são reduzidas em ordem: telas na cama, cafeína tarde, álcool e luz forte na última hora. As manhãs recebem luz em até 30 minutos ao acordar.",
            "Las entradas nocturnas se reducen en orden: pantallas en la cama, cafeína tarde, alcohol y luz fuerte en la última hora. Las mañanas reciben luz en los 30 minutos tras despertar.",
          ),
          t3(
            "The lesson is explicit that seven hours is a target, not a guarantee, and that snoring with daytime tiredness deserves a clinician.",
            "A lição é explícita que sete horas é alvo, não garantia, e que ronco com cansaço diurno merece um clínico.",
            "La lección es explícita en que siete horas es un objetivo, no una garantía, y que ronquidos con cansancio diurno merecen un clínico.",
          ),
        ),
      },
    ],
  },
  {
    slug: "psicologia-del-seductor",
    lessons: [
      {
        slug: "gatillos-psicologicos-atraccion-femenina",
        title: t3("Three psychological triggers of attraction", "Três gatilhos psicológicos da atração", "Tres desencadenantes psicológicos de la atracción"),
        body: shared(
          t3(
            "The first 7 seconds are said to decide most of a first impression. Presence, energy, and confidence are named as the inputs that matter in that window.",
            "Os primeiros 7 segundos decidiriam a maior parte da primeira impressão. Presença, energia e confiança são nomeados como as entradas que importam nessa janela.",
            "Los primeros 7 segundos decidirían la mayor parte de la primera impresión. Presencia, energía y confianza se nombran como las entradas que importan en esa ventana.",
          ),
          t3(
            "Three triggers are separated: posture and movement, eye contact held in a slow triangle, and a low unhurried voice. Each has a short drill listed.",
            "Três gatilhos são separados: postura e movimento, contato visual em triângulo lento e voz baixa sem pressa. Cada um tem um exercício curto listado.",
            "Se separan tres desencadenantes: postura y movimiento, contacto visual en triángulo lento y voz baja sin prisa. Cada uno tiene un ejercicio corto listado.",
          ),
          t3(
            "The lesson warns against stacking all three at once. Choose one trigger per week until it becomes unconscious.",
            "A lição avisa contra empilhar os três de uma vez. Escolha um gatilho por semana até ficar inconsciente.",
            "La lección avisa contra apilar los tres a la vez. Elige un desencadenante por semana hasta que sea inconsciente.",
          ),
        ),
      },
      {
        slug: "lenguaje-corporal-hipnotiza",
        title: t3("Body language that holds attention", "Linguagem corporal que prende atenção", "Lenguaje corporal que retiene la atención"),
        body: shared(
          t3(
            "Open posture, visible hands, and deliberate movement are the three points of this lesson. Tension is read as closed, so the body is kept soft.",
            "Postura aberta, mãos visíveis e movimento deliberado são os três pontos desta lição. Tensão é lida como fechamento, então o corpo fica solto.",
            "Postura abierta, manos visibles y movimiento deliberado son los tres puntos de esta lección. La tensión se lee como cierre, así que el cuerpo se mantiene suelto.",
          ),
          t3(
            "Mirroring is explained with restraint: copy rhythm and volume, not gestures, and only after a few minutes of conversation.",
            "O espelhamento é explicado com contenção: copie ritmo e volume, não gestos, e só após alguns minutos de conversa.",
            "El espejo se explica con contención: copia ritmo y volumen, no gestos, y solo tras unos minutos de conversación.",
          ),
          t3(
            "A drill is given: record a two-minute self-introduction and watch it muted, checking only for closing signals.",
            "Um exercício é dado: grave uma autoapresentação de dois minutos e assista sem som, checando apenas sinais de fechamento.",
            "Se da un ejercicio: graba una autopresentación de dos minutos y mírala sin sonido, revisando solo señales de cierre.",
          ),
        ),
      },
      {
        slug: "arte-conversacion-seductora",
        title: t3("The art of a magnetic conversation", "A arte da conversa magnética", "El arte de la conversación magnética"),
        body: shared(
          t3(
            "Conversation is built on curiosity plus specific detail. The lesson replaces generic questions with observations that invite a story.",
            "A conversa é construída com curiosidade e detalhe específico. A lição troca perguntas genéricas por observações que convidam a uma história.",
            "La conversación se construye con curiosidad y detalle específico. La lección cambia preguntas genéricas por observaciones que invitan a una historia.",
          ),
          t3(
            "Three moves are described: name something concrete, ask about the story behind it, then offer a small piece of your own. Pace is unhurried, with pauses left alone.",
            "Três movimentos são descritos: nomear algo concreto, perguntar a história por trás, e oferecer um pequeno pedaço seu. O ritmo é sem pressa, com pausas preservadas.",
            "Se describen tres movimientos: nombrar algo concreto, preguntar la historia detrás, y ofrecer una pequeña parte propia. El ritmo es sin prisa, con pausas respetadas.",
          ),
          t3(
            "The lesson says silence is part of the technique and should not be filled immediately.",
            "A lição diz que o silêncio faz parte da técnica e não deve ser preenchido imediatamente.",
            "La lección dice que el silencio es parte de la técnica y no debe llenarse de inmediato.",
          ),
        ),
      },
      {
        slug: "crear-tension-sexual-sin-tocar",
        title: t3("Creating tension without touch", "Criando tensão sem tocar", "Creando tensión sin tocar"),
        body: shared(
          t3(
            "Tension is built by proximity and timing, not by contact. The lesson uses distance changes and a slower gaze as its two tools.",
            "A tensão é construída por proximidade e tempo, não por contato. A lição usa mudanças de distância e um olhar mais lento como ferramentas.",
            "La tensión se construye por proximidad y tiempo, no por contacto. La lección usa cambios de distancia y una mirada más lenta como herramientas.",
          ),
          t3(
            "Two rules are named: never step in without a reason, and never hold a gaze longer than comfortable. Both are judged by the other person's response, not by a count.",
            "Duas regras são nomeadas: nunca se aproximar sem motivo, e nunca segurar o olhar além do confortável. Ambas são julgadas pela resposta da outra pessoa, não por uma contagem.",
            "Se nombran dos reglas: nunca acercarse sin motivo, y nunca sostener la mirada más de lo cómodo. Ambas se juzgan por la respuesta del otro, no por una cuenta.",
          ),
          t3(
            "The outline closes with the reminder that tension only works when both sides are interested.",
            "O roteiro fecha lembrando que a tensão só funciona quando os dois lados estão interessados.",
            "El esquema cierra recordando que la tensión solo funciona cuando ambos lados están interesados.",
          ),
        ),
      },
    ],
  },
  {
    slug: "maestro-resistencia-sexual",
    lessons: [
      {
        slug: "ciencia-eyaculacion-precoz",
        title: t3("The science behind early ejaculation", "A ciência da ejaculação precoce", "La ciencia de la eyaculación precoz"),
        body: shared(
          t3(
            "Early ejaculation is described as a timing mismatch between arousal and control, not as a lack of willpower. The lesson keeps the definition deliberately broad.",
            "A ejaculação precoce é descrita como descompasso de tempo entre excitação e controle, não como falta de força de vontade. A lição mantém a definição ampla de propósito.",
            "La eyaculación precoz se describe como desajuste de tiempo entre excitación y control, no como falta de voluntad. La lección mantiene la definición amplia a propósito.",
          ),
          t3(
            "Four contributors are listed: sensitivity, anxiety, poor pelvic-floor endurance, and rushed early experiences. Each one is addressed later in the course.",
            "Quatro contribuintes são listados: sensibilidade, ansiedade, pouca resistência do assoalho pélvico e experiências iniciais apressadas. Cada um é tratado mais adiante no curso.",
            "Se listan cuatro contribuyentes: sensibilidad, ansiedad, poca resistencia del suelo pélvico y experiencias iniciales apresuradas. Cada uno se trata más adelante en el curso.",
          ),
          t3(
            "The lesson repeats that persistent cases deserve clinical assessment, and that self-report is the only measure used here.",
            "A lição repete que casos persistentes merecem avaliação clínica, e que o autorrelato é a única medida usada aqui.",
            "La lección repite que los casos persistentes merecen evaluación clínica, y que el autorreporte es la única medida usada aquí.",
          ),
        ),
      },
      {
        slug: "ejercicios-kegel-avanzados",
        title: t3("Advanced Kegel work for men", "Trabalho avançado de Kegel para homens", "Trabajo avanzado de Kegel para hombres"),
        body: shared(
          t3(
            "The pelvic floor is trained like any other muscle: identify, isolate, then progress. The lesson starts with the identification step so the wrong muscles are not used.",
            "O assoalho pélvico é treinado como qualquer músculo: identificar, isolar e progredir. A lição começa pela identificação para não usar os músculos errados.",
            "El suelo pélvico se entrena como cualquier músculo: identificar, aislar y progresar. La lección empieza por la identificación para no usar los músculos equivocados.",
          ),
          t3(
            "The advanced block is short holds plus fast contractions, with full relaxation between sets. The Kegel timer in the app is the timing reference.",
            "O bloco avançado é de contrações curtas mais rápidas, com relaxamento completo entre séries. O cronômetro de Kegel no app é a referência de tempo.",
            "El bloque avanzado es de contracciones cortas y rápidas, con relajación completa entre series. El cronómetro de Kegel en la app es la referencia de tiempo.",
          ),
          t3(
            "Two errors are named: holding the breath and training while already fatigued. Both hide progress.",
            "Dois erros são nomeados: prender a respiração e treinar já fatigado. Ambos escondem o progresso.",
            "Se nombran dos errores: retener la respiración y entrenar ya fatigado. Ambos esconden el progreso.",
          ),
        ),
      },
      {
        slug: "tecnica-parada-arranque-perfeccionada",
        title: t3("The stop-start technique, refined", "A técnica de parada-arranque, refinada", "La técnica de parada-arranque, refinada"),
        body: shared(
          t3(
            "Stop-start is described in its refined form: stop earlier than feels necessary, resume slower than before, and keep the pause shorter than the urge.",
            "A parada-arranque é descrita na forma refinada: pare antes do que parece necessário, retome mais devagar que antes e mantenha a pausa mais curta que o impulso.",
            "La parada-arranque se describe en su forma refinada: para antes de lo que parece necesario, retoma más despacio que antes y mantén la pausa más corta que el impulso.",
          ),
          t3(
            "The lesson explains that most people stop too late, so the technique becomes a series of rescues instead of a rhythm.",
            "A lição explica que a maioria para tarde demais, então a técnica vira uma sequência de resgates em vez de um ritmo.",
            "La lección explica que la mayoría para demasiado tarde, así que la técnica se vuelve una serie de rescates en lugar de un ritmo.",
          ),
          t3(
            "Three practice sessions a week are suggested, each with five stops and no target duration.",
            "Três sessões de prática por semana são sugeridas, cada uma com cinco paradas e sem duração alvo.",
            "Se sugieren tres sesiones de práctica por semana, cada una con cinco paradas y sin duración objetivo.",
          ),
        ),
      },
      {
        slug: "respiracion-tantrica-control-total",
        title: t3("Tantric breathing for control", "Respiração tântrica para controle", "Respiración tántrica para control"),
        body: shared(
          t3(
            "Breathing is used to lower the arousal set point, not to distract. The lesson teaches a long exhale with a short hold at the bottom.",
            "A respiração é usada para baixar o ponto de ajuste da excitação, não para distrair. A lição ensina expiração longa com breve pausa no final.",
            "La respiración se usa para bajar el punto de ajuste de la excitación, no para distraer. La lección enseña exhalación larga con breve pausa al final.",
          ),
          t3(
            "The drill is five rounds outside the moment, then two rounds inside it. Expansion is in the belly and ribs, never in the shoulders.",
            "O exercício é cinco ciclos fora do momento, depois dois dentro dele. A expansão é na barriga e nas costelas, nunca nos ombros.",
            "El ejercicio es cinco rondas fuera del momento, luego dos dentro. La expansión es en el vientre y las costillas, nunca en los hombros.",
          ),
          t3(
            "The lesson is careful to say breathing helps control, not that it guarantees a duration.",
            "A lição é cuidadosa em dizer que a respiração ajuda o controle, não que garante uma duração.",
            "La lección es cuidadosa en decir que la respiración ayuda al control, no que garantice una duración.",
          ),
        ),
      },
    ],
  },
  {
    slug: "nutricion-rendimiento-sexual",
    lessons: [
      {
        slug: "superalimentos-circulacion-erecciones",
        title: t3("Foods linked with circulation", "Alimentos ligados à circulação", "Alimentos ligados a la circulación"),
        body: shared(
          t3(
            "The lesson separates foods with reasonable circulation evidence from foods sold as aphrodisiacs without data.",
            "A lição separa alimentos com evidência razoável de circulação dos vendidos como afrodisíacos sem dados.",
            "La lección separa alimentos con evidencia razonable de circulación de los vendidos como afrodisíacos sin datos.",
          ),
          t3(
            "Beets, leafy greens, berries, oily fish, nuts, and olive oil are named, with a note that the effect comes from the pattern and not from a single portion.",
            "Beterraba, folhas verdes, frutas vermelhas, peixe gordo, castanhas e azeite são nomeados, com a nota de que o efeito vem do padrão e não de uma porção.",
            "Se nombran remolacha, hojas verdes, frutos rojos, pescado graso, frutos secos y aceite de oliva, con la nota de que el efecto viene del patrón y no de una porción.",
          ),
          t3(
            "Nothing is dosed. The lesson says the plate is the unit, not the nutrient.",
            "Nada é dosado. A lição diz que o prato é a unidade, não o nutriente.",
            "Nada se dosifica. La lección dice que el plato es la unidad, no el nutriente.",
          ),
        ),
      },
      {
        slug: "enemigos-ocultos-libido-dieta",
        title: t3("Diet habits that work against libido", "Hábitos alimentares contra a libido", "Hábitos alimentarios contra la libido"),
        body: shared(
          t3(
            "Four habits are named: very large late meals, liquid sugar, frequent alcohol, and long undereating blocks. Each is linked to energy and sleep rather than directly to hormones.",
            "Quatro hábitos são nomeados: refeições grandes muito tarde, açúcar líquido, álcool frequente e longos blocos de subalimentação. Cada um é ligado a energia e sono, não diretamente a hormônios.",
            "Se nombran cuatro hábitos: comidas grandes muy tarde, azúcar líquido, alcohol frecuente y largos bloques de subalimentación. Cada uno se liga a energía y sueño, no directamente a hormonas.",
          ),
          t3(
            "The lesson gives a replacement for each instead of only removing them, because removal alone tends to fail.",
            "A lição dá uma substituição para cada um em vez de só remover, porque remover sozinho tende a falhar.",
            "La lección da un reemplazo para cada uno en lugar de solo quitarlos, porque quitar solo suele fallar.",
          ),
          t3(
            "Alcohol is described as the most overestimated by members, since it helps the start and harms the recovery.",
            "O álcool é descrito como o mais superestimado pelos membros, já que ajuda o início e prejudica a recuperação.",
            "El alcohol se describe como el más sobreestimado por los miembros, ya que ayuda al inicio y perjudica la recuperación.",
          ),
        ),
      },
      {
        slug: "protocolo-ayuno-intermitente-testosterona",
        title: t3("Intermittent fasting and testosterone", "Jejum intermitente e testosterona", "Ayuno intermitente y testosterona"),
        body: shared(
          t3(
            "Fasting is presented as useful for some and risky for others, not as a universal upgrade. The lesson conditions it on sleep quality and total intake.",
            "O jejum é apresentado como útil para alguns e arriscado para outros, não como melhoria universal. A lição condiciona a qualidade do sono e a ingestão total.",
            "El ayuno se presenta como útil para algunos y riesgoso para otros, no como mejora universal. La lección lo condiciona a la calidad del sueño y la ingesta total.",
          ),
          t3(
            "A conservative starting window is given, with a note to keep protein high inside the window and to stop if sleep or mood worsens.",
            "Uma janela inicial conservadora é dada, com nota para manter proteína alta dentro da janela e parar se sono ou humor piorarem.",
            "Se da una ventana inicial conservadora, con nota para mantener proteína alta dentro de la ventana y parar si empeoran el sueño o el ánimo.",
          ),
          t3(
            "The lesson closes by saying where fasting ends and clinical nutrition begins.",
            "A lição fecha dizendo onde o jejum termina e a nutrição clínica começa.",
            "La lección cierra diciendo dónde termina el ayuno y empieza la nutrición clínica.",
          ),
        ),
      },
      {
        slug: "suplementacion-inteligente-natural",
        title: t3("Thoughtful natural supplementation", "Suplementação natural consciente", "Suplementación natural consciente"),
        outline: true,
        body: shared(
          t3(
            "A short list of supplements with reasonable evidence is named, with the common caveats: dose uncertainty, label quality, and interaction with medicines.",
            "Uma lista curta de suplementos com evidência razoável é nomeada, com as ressalvas comuns: incerteza de dose, qualidade do rótulo e interação com remédios.",
            "Se nombra una lista corta de suplementos con evidencia razonable, con las advertencias comunes: incertidumbre de dosis, calidad de etiqueta e interacción con medicamentos.",
          ),
          t3(
            "The outline lists what a clinician should be told before starting anything: current medicines, blood pressure, kidney history, and bleeding risk.",
            "O roteiro lista o que um clínico deve saber antes de começar qualquer coisa: remédios atuais, pressão, histórico renal e risco de sangramento.",
            "El esquema lista lo que un clínico debe saber antes de empezar cualquier cosa: medicamentos actuales, presión, historial renal y riesgo de sangrado.",
          ),
          t3(
            "No dose is promised, and the lesson says a supplement never replaces a diagnosis.",
            "Nenhuma dose é prometida, e a lição diz que suplemento nunca substitui diagnóstico.",
            "No se promete dosis, y la lección dice que un suplemento nunca sustituye un diagnóstico.",
          ),
        ),
      },
    ],
  },
  {
    slug: "biohacking-sexual-avanzado",
    lessons: [
      {
        slug: "tecnicas-respiracion-hiperbarica-oxido-nitrico",
        title: t3("Breathing practices and nitric oxide", "Práticas de respiração e óxido nítrico", "Prácticas de respiración y óxido nítrico"),
        body: shared(
          t3(
            "Nasal breathing, slow cadence, and brief breath holds are the three practices. The lesson keeps expectations modest.",
            "Respiração nasal, cadência lenta e breves apneias são as três práticas. A lição mantém expectativas modestas.",
            "Respiración nasal, cadencia lenta y breves retenciones son las tres prácticas. La lección mantiene expectativas modestas.",
          ),
          t3(
            "A 5-minute daily block is suggested, seated, with no target other than consistency. Dizziness is named as the signal to stop and breathe normally.",
            "Um bloco diário de 5 minutos é sugerido, sentado, sem outro alvo além da constância. Tontura é nomeada como sinal para parar e respirar normal.",
            "Se sugiere un bloque diario de 5 minutos, sentado, sin otro objetivo que la constancia. El mareo se nombra como señal para parar y respirar normal.",
          ),
          t3(
            "The lesson is clear that the nitric oxide claim is mechanistic and not a measured outcome in the app.",
            "A lição é clara que a alegação sobre óxido nítrico é mecanística e não um resultado medido no app.",
            "La lección es clara en que la afirmación sobre óxido nítrico es mecanística y no un resultado medido en la app.",
          ),
        ),
      },
      {
        slug: "protocolos-exposicion-frio-testosterona",
        title: t3("Cold exposure protocols", "Protocolos de exposição ao frio", "Protocolos de exposición al frío"),
        body: shared(
          t3(
            "Cold is used as a short, safe stimulus: 30 to 90 seconds at the end of a shower, three to four times a week.",
            "O frio é usado como estímulo curto e seguro: 30 a 90 segundos ao final do banho, três a quatro vezes por semana.",
            "El frío se usa como estímulo corto y seguro: 30 a 90 segundos al final de la ducha, tres a cuatro veces por semana.",
          ),
          t3(
            "The lesson separates the claimed hormonal effect from the reliable effect, which is alertness. It also warns that cold right before strength work can reduce performance.",
            "A lição separa o efeito hormonal alegado do efeito confiável, que é alerta. Também avisa que frio logo antes de força pode reduzir desempenho.",
            "La lección separa el efecto hormonal alegado del efecto fiable, que es la alerta. También avisa que el frío justo antes de fuerza puede reducir el rendimiento.",
          ),
          t3(
            "Contraindications listed: heart conditions, uncontrolled blood pressure, and Raynaud's, all with a note to confirm with a clinician.",
            "Contraindicações listadas: condições cardíacas, pressão não controlada e Raynaud, todas com nota para confirmar com clínico.",
            "Contraindicaciones listadas: condiciones cardíacas, presión no controlada y Raynaud, todas con nota para confirmar con clínico.",
          ),
        ),
      },
      {
        slug: "biofeedback-monitoramiento-performance",
        title: t3("Biofeedback and tracking", "Biofeedback e monitoramento", "Biofeedback y seguimiento"),
        body: shared(
          t3(
            "Tracking is kept to three fields: sleep hours, routine done, and perceived control. Anything more tends to be abandoned.",
            "O monitoramento fica em três campos: horas de sono, rotina feita e controle percebido. Mais que isso tende a ser abandonado.",
            "El seguimiento se limita a tres campos: horas de sueño, rutina hecha y control percibido. Más que eso suele abandonarse.",
          ),
          t3(
            "The lesson explains that the record is for pattern-finding, and that a bad week should be read as information, not as failure.",
            "A lição explica que o registro serve para achar padrões, e que uma semana ruim deve ser lida como informação, não como falha.",
            "La lección explica que el registro sirve para encontrar patrones, y que una mala semana debe leerse como información, no como falla.",
          ),
          t3(
            "The Progress screen holds the habits, and the lesson points there for the daily toggle.",
            "A tela de Progresso contém os hábitos, e a lição aponta para lá para a marcação diária.",
            "La pantalla de Progreso contiene los hábitos, y la lección apunta allí para la marca diaria.",
          ),
        ),
      },
      {
        slug: "suplementacion-avanzada-timing-preciso",
        title: t3("Supplement timing", "Horário de suplementos", "Horario de suplementos"),
        outline: true,
        body: shared(
          t3(
            "Timing is the subject here, not brands. The lesson groups supplements by whether they are better with food, away from food, or in the morning.",
            "O horário é o tema aqui, não marcas. A lição agrupa suplementos por serem melhores com comida, longe dela ou pela manhã.",
            "El horario es el tema aquí, no las marcas. La lección agrupa suplementos por ser mejores con comida, lejos de ella o por la mañana.",
          ),
          t3(
            "The practical advice is to move one item at a time, so a bad reaction can be attributed.",
            "O conselho prático é mudar um item por vez, para que uma reação ruim possa ser atribuída.",
            "El consejo práctico es cambiar un elemento a la vez, para que una mala reacción pueda atribuirse.",
          ),
          t3(
            "The outline notes that timing gains are small compared with consistency.",
            "O roteiro nota que ganhos de horário são pequenos comparados à constância.",
            "El esquema nota que las ganancias de horario son pequeñas comparadas con la constancia.",
          ),
        ),
      },
      {
        slug: "optimizacion-circadiana-hormonios-sexuales",
        title: t3("Circadian timing and sex hormones", "Ritmo circadiano e hormônios sexuais", "Ritmo circadiano y hormonas sexuales"),
        outline: true,
        body: shared(
          t3(
            "Light, meals, and movement are the three circadian levers in this lesson. All of them work through timing rather than quantity.",
            "Luz, refeições e movimento são as três alavancas circadianas desta lição. Todas funcionam pelo horário, não pela quantidade.",
            "Luz, comidas y movimiento son las tres palancas circadianas de esta lección. Todas funcionan por el horario, no por la cantidad.",
          ),
          t3(
            "The lesson asks for morning light, daytime meals, and movement before evening, then a dim last hour.",
            "A lição pede luz pela manhã, refeições de dia e movimento antes da noite, e uma última hora com luz baixa.",
            "La lección pide luz por la mañana, comidas de día y movimiento antes de la noche, y una última hora con luz baja.",
          ),
          t3(
            "Shift work is named as the case where the schedule bends and the levers matter more.",
            "Trabalho em turnos é nomeado como o caso em que o horário se flexiona e as alavancas importam mais.",
            "El trabajo por turnos se nombra como el caso en que el horario se flexiona y las palancas importan más.",
          ),
        ),
      },
      {
        slug: "tecnicas-meditacao-tantrica-moderna",
        title: t3("Modern tantric meditation", "Meditação tântrica moderna", "Meditación tántrica moderna"),
        outline: true,
        body: shared(
          t3(
            "The lesson strips the tradition down to three elements: posture, breath, and attention on sensation.",
            "A lição reduz a tradição a três elementos: postura, respiração e atenção na sensação.",
            "La lección reduce la tradición a tres elementos: postura, respiración y atención en la sensación.",
          ),
          t3(
            "Ten minutes seated is the suggested starting block, with no music and no guided audio, so the practice can be repeated anywhere.",
            "Dez minutos sentado é o bloco inicial sugerido, sem música e sem áudio guiado, para a prática ser repetível em qualquer lugar.",
            "Diez minutos sentado es el bloque inicial sugerido, sin música y sin audio guiado, para que la práctica se repita en cualquier lugar.",
          ),
          t3(
            "The outline closes by saying the meditative state is a skill, and that it does not replace the physical techniques.",
            "O roteiro fecha dizendo que o estado meditativo é uma habilidade, e que não substitui as técnicas físicas.",
            "El esquema cierra diciendo que el estado meditativo es una habilidad, y que no sustituye las técnicas físicas.",
          ),
        ),
      },
    ],
  },
  {
    slug: "el-macho-magnetico",
    lessons: [
      {
        slug: "gatillos-psicologicos-atraccion-femenina",
        title: t3("Three psychological triggers of attraction", "Três gatilhos psicológicos da atração", "Tres desencadenantes psicológicos de la atracción"),
        body: shared(
          t3(
            "Presence is trained as a physical skill first, because it is easier to observe than confidence.",
            "A presença é treinada primeiro como habilidade física, porque é mais fácil de observar que a confiança.",
            "La presencia se entrena primero como habilidad física, porque es más fácil de observar que la confianza.",
          ),
          t3(
            "Posture, gaze, and voice are each given a one-week block, with the drill written on the Progress screen.",
            "Postura, olhar e voz recebem um bloco de uma semana cada, com o exercício escrito na tela de Progresso.",
            "Postura, mirada y voz reciben un bloque de una semana cada, con el ejercicio escrito en la pantalla de Progreso.",
          ),
          t3(
            "The lesson insists the three are trained separately so they can later combine naturally.",
            "A lição insiste que os três são treinados separadamente para depois combinarem naturalmente.",
            "La lección insiste en que los tres se entrenan por separado para luego combinarse naturalmente.",
          ),
        ),
      },
      {
        slug: "lenguaje-corporal-hipnotiza",
        title: t3("Body language that holds attention", "Linguagem corporal que prende atenção", "Lenguaje corporal que retiene la atención"),
        body: shared(
          t3(
            "Slow movement is the core instruction. Rushed movement is read as nervousness and closes the space.",
            "O movimento lento é a instrução central. Movimento apressado é lido como nervosismo e fecha o espaço.",
            "El movimiento lento es la instrucción central. El movimiento apresurado se lee como nerviosismo y cierra el espacio.",
          ),
          t3(
            "The lesson covers hands, shoulders, and walking, in that order, with a mirror check for each.",
            "A lição cobre mãos, ombros e caminhada, nessa ordem, com uma checagem no espelho para cada.",
            "La lección cubre manos, hombros y caminata, en ese orden, con una revisión en el espejo para cada.",
          ),
          t3(
            "A note is added: too much slowness looks staged, so the target is deliberate, not theatrical.",
            "Uma nota é adicionada: lentidão demais parece encenada, então o alvo é deliberado, não teatral.",
            "Se añade una nota: demasiada lentitud parece actuada, así que el objetivo es deliberado, no teatral.",
          ),
        ),
      },
      {
        slug: "arte-conversacion-seductora",
        title: t3("The art of a magnetic conversation", "A arte da conversa magnética", "El arte de la conversación magnética"),
        body: shared(
          t3(
            "Hooks, stories, and questions are the structure here, with the story always coming before the question.",
            "Ganchos, histórias e perguntas são a estrutura aqui, com a história sempre antes da pergunta.",
            "Ganchos, historias y preguntas son la estructura aquí, con la historia siempre antes de la pregunta.",
          ),
          t3(
            "The lesson gives three story prompts to prepare in advance, short ones, so they can be reused without sounding rehearsed.",
            "A lição dá três temas de história para preparar antes, curtos, para serem reutilizados sem parecer ensaiado.",
            "La lección da tres temas de historia para preparar antes, cortos, para reutilizarlos sin sonar ensayado.",
          ),
          t3(
            "The closing note says listening does more than any line.",
            "A nota final diz que ouvir faz mais que qualquer frase.",
            "La nota final dice que escuchar hace más que cualquier frase.",
          ),
        ),
      },
      {
        slug: "crear-tension-sexual-sin-tocar",
        title: t3("Creating tension without touch", "Criando tensão sem tocar", "Creando tensión sin tocar"),
        outline: true,
        body: shared(
          t3(
            "The outline covers distance, gaze, and the exit. The exit matters because it keeps the tension unresolved.",
            "O roteiro cobre distância, olhar e saída. A saída importa porque mantém a tensão sem resolução.",
            "El esquema cubre distancia, mirada y salida. La salida importa porque mantiene la tensión sin resolver.",
          ),
          t3(
            "Three proximity levels are announced, from conversational to intimate, with the guideline that each one is held until it feels normal.",
            "Três níveis de proximidade são anunciados, do conversacional ao íntimo, com a orientação de manter cada um até parecer normal.",
            "Se anuncian tres niveles de proximidad, de conversacional a íntimo, con la orientación de mantener cada uno hasta que parezca normal.",
          ),
          t3(
            "The outline is deliberately short and points to practice over reading.",
            "O roteiro é deliberadamente curto e aponta para a prática em vez da leitura.",
            "El esquema es deliberadamente corto y apunta a la práctica más que a la lectura.",
          ),
        ),
      },
    ],
  },
  {
    slug: "performance-sexual-elite",
    lessons: [
      {
        slug: "tecnicas-controle-ejaculatorio-militar",
        title: t3("Ejaculation control drills", "Exercícios de controle ejaculatório", "Ejercicios de control eyaculatorio"),
        body: shared(
          t3(
            "The drills are borrowed from endurance training: fixed repetitions, fixed rest, and no judgment on the day's result.",
            "Os exercícios vêm do treino de resistência: repetições fixas, descanso fixo e nenhum julgamento sobre o resultado do dia.",
            "Los ejercicios vienen del entrenamiento de resistencia: repeticiones fijas, descanso fijo y ningún juicio sobre el resultado del día.",
          ),
          t3(
            "Three drills are listed with counts, all inside a 12-minute block, so the whole session is short enough to repeat.",
            "Três exercícios são listados com contagens, dentro de um bloco de 12 minutos, para a sessão inteira ser curta o bastante para repetir.",
            "Se listan tres ejercicios con conteos, dentro de un bloque de 12 minutos, para que toda la sesión sea corta y repetible.",
          ),
          t3(
            "The lesson says the counts matter more than the feeling in the first month.",
            "A lição diz que as contagens importam mais que a sensação no primeiro mês.",
            "La lección dice que los conteos importan más que la sensación en el primer mes.",
          ),
        ),
      },
      {
        slug: "metodos-amplificacao-prazer",
        title: t3("Ways to amplify sensation", "Formas de ampliar a sensação", "Formas de ampliar la sensación"),
        body: shared(
          t3(
            "Amplification is described through attention rather than intensity: fewer stimulation points, held longer.",
            "A amplificação é descrita pela atenção em vez da intensidade: menos pontos de estímulo, mantidos por mais tempo.",
            "La amplificación se describe por la atención en lugar de la intensidad: menos puntos de estímulo, mantenidos más tiempo.",
          ),
          t3(
            "The lesson contrasts broad fast movement with narrow slow movement, and asks for the second for two weeks.",
            "A lição contrasta movimento amplo e rápido com movimento estreito e lento, e pede o segundo por duas semanas.",
            "La lección contrasta movimiento amplio y rápido con movimiento estrecho y lento, y pide el segundo por dos semanas.",
          ),
          t3(
            "Two sensitivity notes are added: temperature and lubrication change perception more than pressure.",
            "Duas notas de sensibilidade são adicionadas: temperatura e lubrificação mudam a percepção mais que a pressão.",
            "Se añaden dos notas de sensibilidad: la temperatura y la lubricación cambian la percepción más que la presión.",
          ),
        ),
      },
      {
        slug: "posiciones-anatomicamente-optimizadas",
        title: t3("Positions chosen for anatomy", "Posições escolhidas pela anatomia", "Posiciones elegidas por la anatomía"),
        body: shared(
          t3(
            "Three positions are described by the angle they create, not by preference, with the note that bodies differ.",
            "Três posições são descritas pelo ângulo que criam, não por preferência, com a nota de que corpos variam.",
            "Se describen tres posiciones por el ángulo que crean, no por preferencia, con la nota de que los cuerpos varían.",
          ),
          t3(
            "Support with pillows is recommended for each, so the position is held without tension.",
            "Apoio com travesseiros é recomendado para cada uma, para a posição ser mantida sem tensão.",
            "Se recomienda apoyo con almohadas para cada una, para sostener la posición sin tensión.",
          ),
          t3(
            "The lesson says to test one position per session instead of changing constantly.",
            "A lição diz para testar uma posição por sessão em vez de mudar constantemente.",
            "La lección dice probar una posición por sesión en lugar de cambiar constantemente.",
          ),
        ),
      },
      {
        slug: "sincronizacion-orgasmos-multiples",
        title: t3("Syncing more than one orgasm", "Sincronizando mais de um orgasmo", "Sincronizando más de un orgasmo"),
        outline: true,
        body: shared(
          t3(
            "The outline covers the recovery window and how to use it without losing the rhythm. It is presented as an advanced step.",
            "O roteiro cobre a janela de recuperação e como usá-la sem perder o ritmo. É apresentado como passo avançado.",
            "El esquema cubre la ventana de recuperación y cómo usarla sin perder el ritmo. Se presenta como paso avanzado.",
          ),
          t3(
            "Breathing, hydration, and a change of pace are the three tools listed for the window.",
            "Respiração, hidratação e mudança de ritmo são as três ferramentas listadas para a janela.",
            "Respiración, hidratación y cambio de ritmo son las tres herramientas listadas para la ventana.",
          ),
          t3(
            "The outline notes that not everyone has a short recovery window, and that is not a failure.",
            "O roteiro nota que não todos têm janela curta de recuperação, e isso não é falha.",
            "El esquema nota que no todos tienen ventana corta de recuperación, y eso no es una falla.",
          ),
        ),
      },
      {
        slug: "tecnicas-recuperacao-instantanea",
        title: t3("Recovering between rounds", "Recuperando entre rodadas", "Recuperando entre rondas"),
        outline: true,
        body: shared(
          t3(
            "Recovery is treated as a routine: position, breath, fluid, and a low-demand distraction.",
            "A recuperação é tratada como rotina: posição, respiração, líquido e uma distração de baixa demanda.",
            "La recuperación se trata como rutina: posición, respiración, líquido y una distracción de baja demanda.",
          ),
          t3(
            "The lesson separates physical recovery from mental pressure, since anxiety is what usually ends the second round early.",
            "A lição separa recuperação física de pressão mental, já que a ansiedade é o que costuma encerrar cedo a segunda rodada.",
            "La lección separa recuperación física de presión mental, ya que la ansiedad suele terminar temprano la segunda ronda.",
          ),
          t3(
            "The outline asks for realism: two rounds is already a good target.",
            "O roteiro pede realismo: duas rodadas já é um bom alvo.",
            "El esquema pide realismo: dos rondas ya es un buen objetivo.",
          ),
        ),
      },
      {
        slug: "protocolos-resistencia-extrema",
        title: t3("Long-stamina protocols", "Protocolos de resistência longa", "Protocolos de resistencia larga"),
        outline: true,
        body: shared(
          t3(
            "The long protocols combine the earlier drills into a weekly structure, with two hard days and one easy day.",
            "Os protocolos longos combinam os exercícios anteriores em uma estrutura semanal, com dois dias fortes e um leve.",
            "Los protocolos largos combinan los ejercicios anteriores en una estructura semanal, con dos días fuertes y uno ligero.",
          ),
          t3(
            "The lesson is explicit that this block is for people already comfortable with the basics, not a starting point.",
            "A lição é explícita que este bloco é para quem já está confortável com o básico, não um ponto de partida.",
            "La lección es explícita en que este bloque es para quien ya está cómodo con lo básico, no un punto de partida.",
          ),
          t3(
            "Deload is included, and skipping it is named as the most common mistake.",
            "O deload é incluído, e pular ele é nomeado como o erro mais comum.",
            "Se incluye la descarga, y saltarla se nombra como el error más común.",
          ),
        ),
      },
    ],
  },
  {
    slug: "protocolo-resistencia-infinita",
    lessons: [
      {
        slug: "la-ciencia-de-la-eyaculacion",
        title: t3("The science of ejaculation", "A ciência da ejaculação", "La ciencia de la eyaculación"),
        outline: true,
        body: shared(
          t3(
            "The reflex arc is described in plain terms: stimulus, threshold, contraction, and refractory pause.",
            "O arco reflexo é descrito em termos simples: estímulo, limiar, contração e pausa refratária.",
            "El arco reflejo se describe en términos simples: estímulo, umbral, contracción y pausa refractaria.",
          ),
          t3(
            "The lesson names the two places where the arc can be interrupted: before the threshold and at the threshold.",
            "A lição nomeia os dois pontos onde o arco pode ser interrompido: antes do limiar e no limiar.",
            "La lección nombra los dos puntos donde el arco puede interrumpirse: antes del umbral y en el umbral.",
          ),
          t3(
            "The outline says the whole course is built on the first interruption.",
            "O roteiro diz que todo o curso é construído na primeira interrupção.",
            "El esquema dice que todo el curso se construye sobre la primera interrupción.",
          ),
        ),
      },
      {
        slug: "mapeando-tu-nivel-de-excitacion",
        title: t3("Mapping your arousal", "Mapeando sua excitação", "Mapeando tu excitación"),
        outline: true,
        body: shared(
          t3(
            "A 1 to 10 map is built by naming the level out loud every minute, without changing anything.",
            "Um mapa de 1 a 10 é construído nomeando o nível em voz alta a cada minuto, sem mudar nada.",
            "Un mapa de 1 a 10 se construye nombrando el nivel en voz alta cada minuto, sin cambiar nada.",
          ),
          t3(
            "Three maps on different days are requested, so a personal pattern appears.",
            "Três mapas em dias diferentes são pedidos, para um padrão pessoal aparecer.",
            "Se piden tres mapas en días distintos, para que aparezca un patrón personal.",
          ),
          t3(
            "The outline notes that most members discover their threshold is lower than they assumed.",
            "O roteiro nota que a maioria dos membros descobre que seu limiar é menor do que supunha.",
            "El esquema nota que la mayoría de los miembros descubre que su umbral es más bajo de lo que suponía.",
          ),
        ),
      },
      {
        slug: "los-4-etapas-de-la-respuesta-sexual",
        title: t3("The four stages of the sexual response", "Os quatro estágios da resposta sexual", "Las cuatro etapas de la respuesta sexual"),
        outline: true,
        body: shared(
          t3(
            "Excitement, plateau, orgasm, and resolution are defined briefly here, with the plateau as the working stage.",
            "Excitação, platô, orgasmo e resolução são definidos brevemente aqui, com o platô como estágio de trabalho.",
            "Excitación, meseta, orgasmo y resolución se definen brevemente aquí, con la meseta como etapa de trabajo.",
          ),
          t3(
            "The lesson reframes the plateau as a place to live, not a stage to pass through.",
            "A lição reenquadra o platô como lugar para habitar, não estágio a atravessar.",
            "La lección reencuadra la meseta como lugar para habitar, no etapa a atravesar.",
          ),
          t3(
            "The outline says the rest of the course trains time inside the plateau.",
            "O roteiro diz que o resto do curso treina tempo dentro do platô.",
            "El esquema dice que el resto del curso entrena tiempo dentro de la meseta.",
          ),
        ),
      },
      {
        slug: "identificando-tus-puntos-de-activacion",
        title: t3("Finding your trigger points", "Encontrando seus pontos de disparo", "Encontrando tus puntos de activación"),
        outline: true,
        body: shared(
          t3(
            "Trigger points are the specific spots where the rise accelerates. The lesson asks for them to be found and named, not avoided.",
            "Pontos de disparo são os locais específicos onde a subida acelera. A lição pede que sejam encontrados e nomeados, não evitados.",
            "Los puntos de activación son los lugares específicos donde la subida se acelera. La lección pide encontrarlos y nombrarlos, no evitarlos.",
          ),
          t3(
            "Speed, pressure, and angle are tested separately to identify which one triggers each point.",
            "Velocidade, pressão e ângulo são testados separadamente para identificar qual deles dispara cada ponto.",
            "Velocidad, presión y ángulo se prueban por separado para identificar cuál dispara cada punto.",
          ),
          t3(
            "The outline says knowing the points turns them into levers.",
            "O roteiro diz que conhecer os pontos os transforma em alavancas.",
            "El esquema dice que conocer los puntos los convierte en palancas.",
          ),
        ),
      },
      {
        slug: "el-mapa-de-tu-resistencia-personal",
        title: t3("Your personal stamina map", "Seu mapa pessoal de resistência", "Tu mapa personal de resistencia"),
        outline: true,
        body: shared(
          t3(
            "The three earlier maps are combined into one page: level, trigger, and the technique that lowered the level.",
            "Os três mapas anteriores são combinados em uma página: nível, disparo e a técnica que baixou o nível.",
            "Los tres mapas anteriores se combinan en una página: nivel, activación y la técnica que bajó el nivel.",
          ),
          t3(
            "The lesson calls this page the reference for the rest of the program, to be updated weekly.",
            "A lição chama esta página de referência para o resto do programa, a ser atualizada semanalmente.",
            "La lección llama a esta página referencia para el resto del programa, a actualizar semanalmente.",
          ),
          t3(
            "The outline says the map is only useful if it is honest.",
            "O roteiro diz que o mapa só é útil se for honesto.",
            "El esquema dice que el mapa solo es útil si es honesto.",
          ),
        ),
      },
      {
        slug: "protocolo-de-evaluacion-inicial",
        title: t3("A first self-assessment", "Uma primeira autoavaliação", "Una primera autoevaluación"),
        outline: true,
        body: shared(
          t3(
            "Five questions are listed: usual duration, threshold level, main trigger, recovery time, and current drills.",
            "Cinco perguntas são listadas: duração usual, nível de limiar, disparo principal, tempo de recuperação e exercícios atuais.",
            "Se listan cinco preguntas: duración usual, nivel de umbral, activador principal, tiempo de recuperación y ejercicios actuales.",
          ),
          t3(
            "Answers are written once and left untouched for four weeks, so change can be seen.",
            "As respostas são escritas uma vez e deixadas intactas por quatro semanas, para a mudança ser vista.",
            "Las respuestas se escriben una vez y se dejan intactas cuatro semanas, para que el cambio se vea.",
          ),
          t3(
            "The outline repeats that this is self-report, not a clinical test.",
            "O roteiro repete que isto é autorrelato, não teste clínico.",
            "El esquema repite que esto es autorreporte, no una prueba clínica.",
          ),
        ),
      },
      {
        slug: "tecnica-del-pulso-inverso",
        title: t3("The reverse-pulse technique", "A técnica do pulso inverso", "La técnica del pulso inverso"),
        outline: true,
        body: shared(
          t3(
            "The advanced version of the pulse reduces pressure in three steps instead of one, each shorter than the last.",
            "A versão avançada do pulso reduz a pressão em três etapas em vez de uma, cada uma mais curta que a anterior.",
            "La versión avanzada del pulso reduce la presión en tres pasos en lugar de uno, cada uno más corto que el anterior.",
          ),
          t3(
            "The lesson pairs it with a long exhale, and warns that the three steps must not become a full stop.",
            "A lição combina com expiração longa, e avisa que as três etapas não devem virar parada total.",
            "La lección lo combina con exhalación larga, y avisa que los tres pasos no deben volverse parada total.",
          ),
          t3(
            "Practice is twice a week, five repetitions.",
            "A prática é duas vezes por semana, cinco repetições.",
            "La práctica es dos veces por semana, cinco repeticiones.",
          ),
        ),
      },
      {
        slug: "metodo-de-los-3-niveles-de-excitacion",
        title: t3("Three arousal levels", "Três níveis de excitação", "Tres niveles de excitación"),
        outline: true,
        body: shared(
          t3(
            "The map is compressed into three working zones: safe, working, and edge. Techniques are assigned per zone.",
            "O mapa é comprimido em três zonas de trabalho: segura, de trabalho e de borda. Técnicas são atribuídas por zona.",
            "El mapa se comprime en tres zonas de trabajo: segura, de trabajo y de borde. Las técnicas se asignan por zona.",
          ),
          t3(
            "The safe zone gets pace work, the working zone gets breath work, and the edge zone gets pulses.",
            "A zona segura recebe trabalho de ritmo, a de trabalho recebe respiração e a de borda recebe pulsos.",
            "La zona segura recibe trabajo de ritmo, la de trabajo recibe respiración y la de borde recibe pulsos.",
          ),
          t3(
            "The outline says most time should be spent in the working zone.",
            "O roteiro diz que a maior parte do tempo deve ser passada na zona de trabalho.",
            "El esquema dice que la mayor parte del tiempo debe pasarse en la zona de trabajo.",
          ),
        ),
      },
      {
        slug: "puntos-de-presion-secretos",
        title: t3("Pressure points", "Pontos de pressão", "Puntos de presión"),
        outline: true,
        body: shared(
          t3(
            "Three external pressure points are named, each with a direction rather than an amount.",
            "Três pontos externos de pressão são nomeados, cada um com uma direção em vez de uma quantidade.",
            "Se nombran tres puntos externos de presión, cada uno con una dirección en lugar de una cantidad.",
          ),
          t3(
            "The lesson asks for light pressure first, since heavy pressure masks the signal.",
            "A lição pede pressão leve primeiro, já que pressão forte mascara o sinal.",
            "La lección pide presión ligera primero, ya que la presión fuerte enmascara la señal.",
          ),
          t3(
            "The outline warns that the points work differently on different days.",
            "O roteiro avisa que os pontos funcionam diferente em dias diferentes.",
            "El esquema avisa que los puntos funcionan distinto en días distintos.",
          ),
        ),
      },
      {
        slug: "la-respiracion-del-control-total",
        title: t3("Breathing for full control", "Respiração para controle total", "Respiración para control total"),
        outline: true,
        body: shared(
          t3(
            "A 4-2-6 cadence is introduced here, with the exhale as the controlling phase.",
            "Uma cadência 4-2-6 é introduzida aqui, com a expiração como fase de controle.",
            "Aquí se introduce una cadencia 4-2-6, con la exhalación como fase de control.",
          ),
          t3(
            "The lesson has the cadence trained alone for a week before it is used during intimacy.",
            "A lição faz a cadência ser treinada sozinha por uma semana antes de ser usada na intimidade.",
            "La lección hace entrenar la cadencia a solas una semana antes de usarla en la intimidad.",
          ),
          t3(
            "The outline says the cadence must stay silent and unnoticed by the partner.",
            "O roteiro diz que a cadência deve permanecer silenciosa e impercebida pela parceira.",
            "El esquema dice que la cadencia debe permanecer silenciosa y sin que la pareja lo note.",
          ),
        ),
      },
      {
        slug: "tecnica-de-la-pausa-estrategica",
        title: t3("The strategic pause", "A pausa estratégica", "La pausa estratégica"),
        outline: true,
        body: shared(
          t3(
            "The pause is short, planned, and covered by a change of activity, so it does not read as interruption.",
            "A pausa é curta, planejada e coberta por uma mudança de atividade, para não ser lida como interrupção.",
            "La pausa es corta, planificada y cubierta por un cambio de actividad, para que no se lea como interrupción.",
          ),
          t3(
            "Three covers are suggested: a kiss, a change of position, and a slower hand movement.",
            "Três coberturas são sugeridas: um beijo, uma troca de posição e um movimento mais lento da mão.",
            "Se sugieren tres coberturas: un beso, un cambio de posición y un movimiento más lento de la mano.",
          ),
          t3(
            "The outline says the pause should last less than the urge.",
            "O roteiro diz que a pausa deve durar menos que o impulso.",
            "El esquema dice que la pausa debe durar menos que el impulso.",
          ),
        ),
      },
      {
        slug: "combinando-todas-las-tecnicas",
        title: t3("Combining the techniques", "Combinando as técnicas", "Combinando las técnicas"),
        outline: true,
        body: shared(
          t3(
            "Only two techniques are combined at a time, always one physical and one breathing.",
            "Apenas duas técnicas são combinadas por vez, sempre uma física e uma de respiração.",
            "Solo se combinan dos técnicas a la vez, siempre una física y una de respiración.",
          ),
          t3(
            "The lesson gives three pairs that work well and three pairs that compete.",
            "A lição dá três pares que funcionam bem e três pares que competem.",
            "La lección da tres pares que funcionan bien y tres pares que compiten.",
          ),
          t3(
            "The outline says combining is the last step, not the first.",
            "O roteiro diz que combinar é o último passo, não o primeiro.",
            "El esquema dice que combinar es el último paso, no el primero.",
          ),
        ),
      },
      {
        slug: "respiracion-del-toro",
        title: t3("Bull breathing", "Respiração do touro", "Respiración del toro"),
        outline: true,
        body: shared(
          t3(
            "Bull breathing is a slow belly expansion with a heavy audible exhale, used at the edge.",
            "A respiração do touro é uma expansão lenta da barriga com expiração audível pesada, usada na borda.",
            "La respiración del toro es una expansión lenta del vientre con exhalación audible pesada, usada en el borde.",
          ),
          t3(
            "Two rounds are suggested, then a return to normal breathing.",
            "Dois ciclos são sugeridos, depois um retorno à respiração normal.",
            "Se sugieren dos rondas, luego una vuelta a la respiración normal.",
          ),
          t3(
            "The outline notes the sound is intentional and helps regulate.",
            "O roteiro nota que o som é intencional e ajuda a regular.",
            "El esquema nota que el sonido es intencional y ayuda a regular.",
          ),
        ),
      },
      {
        slug: "meditacion-sexual-tantrica",
        title: t3("Tantric sexual meditation", "Meditação sexual tântrica", "Meditación sexual tántrica"),
        outline: true,
        body: shared(
          t3(
            "Sensation is the object of attention here, without goals, for 10 minutes and then during intimacy.",
            "A sensação é o objeto de atenção aqui, sem metas, por 10 minutos e depois na intimidade.",
            "La sensación es el objeto de atención aquí, sin metas, durante 10 minutos y luego en la intimidad.",
          ),
          t3(
            "The lesson asks for one point of focus and a return to it each time attention drifts.",
            "A lição pede um ponto de foco e um retorno a ele cada vez que a atenção desvia.",
            "La lección pide un punto de foco y volver a él cada vez que la atención se desvía.",
          ),
          t3(
            "The outline says the practice lowers the sense of performance.",
            "O roteiro diz que a prática reduz a sensação de desempenho.",
            "El esquema dice que la práctica reduce la sensación de desempeño.",
          ),
        ),
      },
      {
        slug: "ejercicios-de-foco-mental",
        title: t3("Mental focus drills", "Exercícios de foco mental", "Ejercicios de foco mental"),
        outline: true,
        body: shared(
          t3(
            "Counting, naming, and imagery are the three drills, used only when attention collapses.",
            "Contar, nomear e imagens são os três exercícios, usados só quando a atenção colapsa.",
            "Contar, nombrar e imágenes son los tres ejercicios, usados solo cuando la atención colapsa.",
          ),
          t3(
            "The lesson says each drill should be tested until one is clearly more reliable.",
            "A lição diz que cada exercício deve ser testado até um ser claramente mais confiável.",
            "La lección dice que cada ejercicio debe probarse hasta que uno sea claramente más fiable.",
          ),
          t3(
            "The outline warns against using drills the whole time.",
            "O roteiro avisa contra usar exercícios o tempo todo.",
            "El esquema avisa contra usar ejercicios todo el tiempo.",
          ),
        ),
      },
      {
        slug: "ancoraje-mental-avanzado",
        title: t3("Advanced mental anchors", "Ancoragem mental avançada", "Anclaje mental avanzado"),
        outline: true,
        body: shared(
          t3(
            "An anchor is a single word or image trained in calm sessions, then recalled at the edge.",
            "Uma âncora é uma palavra ou imagem treinada em sessões calmas, e depois lembrada na borda.",
            "Un ancla es una palabra o imagen entrenada en sesiones tranquilas, y luego recordada en el borde.",
          ),
          t3(
            "Three anchors are built over three weeks, one per week.",
            "Três âncoras são construídas em três semanas, uma por semana.",
            "Se construyen tres anclas en tres semanas, una por semana.",
          ),
          t3(
            "The outline says the anchor only works if it was trained calm first.",
            "O roteiro diz que a âncora só funciona se foi treinada calma antes.",
            "El esquema dice que el ancla solo funciona si se entrenó en calma antes.",
          ),
        ),
      },
      {
        slug: "visualizacion-del-control-perfecto",
        title: t3("Visualizing steady control", "Visualizando controle firme", "Visualizando control firme"),
        outline: true,
        body: shared(
          t3(
            "A short visualization is scripted: the start, the plateau, the pulse, and the ending, always the same order.",
            "Uma visualização curta é roteirizada: o início, o platô, o pulso e o fim, sempre na mesma ordem.",
            "Una visualización corta se guioniza: el inicio, la meseta, el pulso y el final, siempre en el mismo orden.",
          ),
          t3(
            "Five minutes before the session is the suggested timing.",
            "Cinco minutos antes da sessão é o momento sugerido.",
            "Cinco minutos antes de la sesión es el momento sugerido.",
          ),
          t3(
            "The outline says repetition is what makes the visualization useful.",
            "O roteiro diz que a repetição é o que torna a visualização útil.",
            "El esquema dice que la repetición es lo que hace útil la visualización.",
          ),
        ),
      },
      {
        slug: "rutina-de-fortalecimiento-mental",
        title: t3("A mental strength routine", "Uma rotina de força mental", "Una rutina de fuerza mental"),
        outline: true,
        body: shared(
          t3(
            "The final lesson assembles a 15-minute weekly routine from the previous tools, with a fixed day and a checklist.",
            "A lição final monta uma rotina semanal de 15 minutos com as ferramentas anteriores, com dia fixo e checklist.",
            "La lección final arma una rutina semanal de 15 minutos con las herramientas anteriores, con día fijo y checklist.",
          ),
          t3(
            "The lesson is written to be repeated, not finished once.",
            "A lição é escrita para ser repetida, não concluída uma vez.",
            "La lección está escrita para repetirse, no completarse una vez.",
          ),
          t3(
            "The outline ends with a note that the routine is the course.",
            "O roteiro termina com a nota de que a rotina é o curso.",
            "El esquema termina con la nota de que la rutina es el curso.",
          ),
        ),
      },
    ],
  },
];

export function findCourse(slug: string) {
  return COURSE_LESSONS.find((course) => course.slug === slug);
}

export function findLesson(courseSlug: string, lessonSlug: string) {
  const course = findCourse(courseSlug);
  if (!course) return null;
  const index = course.lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (index === -1) return null;
  return { course, lesson: course.lessons[index], index };
}
