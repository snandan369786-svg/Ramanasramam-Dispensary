/* ─────────────────────────────────────────────────────────────────────────────
 *  HEALTH ATLAS — educational content
 *
 *  Plain-language information about common health conditions, compiled from
 *  the public sources listed under each condition (WHO, NHS, CDC, NIH and
 *  clinical guideline bodies). It has NOT been reviewed by the dispensary's
 *  doctors. If a qualified reviewer checks it, record their name and the date
 *  in `atlasMeta.review` — the site will then show it. Do not add a reviewer
 *  who has not actually reviewed the content.
 *
 *  Editorial rules for anyone adding or editing a condition:
 *   • Educational only — never diagnose, never suggest a reader "has" a condition.
 *   • No named prescription medicines, doses or promises of cure.
 *   • Every condition must list reliable references.
 *   • Do not add statistics unless they are quoted from a listed source.
 * ─────────────────────────────────────────────────────────────────────────── */

export const atlasMeta = {
  lastUpdated: "November 2026",
  /** e.g. { name: "Dr …", date: "…" } once a real review has taken place */
  review: null as null | { name: string; date: string },
  disclaimer:
    "The Health Atlas is for general education only. It does not diagnose any condition and is not a substitute for advice from a qualified doctor. If you are worried about your health, please consult a doctor. In an emergency, call 108 (ambulance) or 112, or go to the nearest hospital.",
};

export type CategoryId =
  | "metabolic"
  | "heart"
  | "respiratory"
  | "neurological"
  | "endocrine"
  | "digestive"
  | "general";

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "metabolic",
    name: "Metabolic Health",
    description: "How the body turns food into energy and stores it.",
  },
  {
    id: "heart",
    name: "Heart & Cardiovascular Health",
    description: "The heart, blood vessels and circulation.",
  },
  {
    id: "respiratory",
    name: "Respiratory Health",
    description: "The lungs and the airways that serve them.",
  },
  {
    id: "neurological",
    name: "Neurological Health",
    description: "The brain, spinal cord and nerves.",
  },
  {
    id: "endocrine",
    name: "Endocrine Health",
    description: "Glands and the hormones they make.",
  },
  {
    id: "digestive",
    name: "Digestive Health",
    description: "The food pipe, stomach and gut.",
  },
  {
    id: "general",
    name: "General Health",
    description: "Blood, bones and joints, kidneys and everyday wellbeing.",
  },
];

export type ConditionIcon =
  | "glucose"
  | "pressure"
  | "weight"
  | "heart"
  | "airway"
  | "blood"
  | "joint"
  | "kidney"
  | "thyroid"
  | "brain"
  | "reflux";

/** Conditions with a dedicated interactive "Inside the Body" diagram */
export type DiagramId = "diabetes" | "hypertension" | "obesity" | "asthma";

export type Step = { title: string; text: string };
export type TitledItem = { title: string; text: string };
export type Myth = {
  statement: string;
  verdict: "myth" | "fact";
  explanation: string;
};
export type Reference = { title: string; publisher: string; url: string };

export type Condition = {
  slug: string;
  name: string;
  aka?: string[];
  category: CategoryId;
  icon: ConditionIcon;
  /** One sentence for cards and search results */
  summary: string;
  /** Extra words that should match in search */
  keywords: string[];
  overview: string[];
  understanding: { intro: string; steps: Step[]; diagram?: DiagramId };
  causes: { intro: string; items: string[] };
  symptoms: { items: string[]; note?: string };
  diagnosis: { items: TitledItem[]; note?: string };
  treatment: { intro: string; items: TitledItem[] };
  prevention: { intro: string; items: string[] };
  consult: { emergency: string[]; routine: string[] };
  myths: Myth[];
  references: Reference[];
};

const WHO = "World Health Organization";
const NHS = "NHS (UK National Health Service)";
const CDC = "Centers for Disease Control and Prevention (US)";

export const conditions: Condition[] = [
  /* ── Diabetes ─────────────────────────────────────────────────────────── */
  {
    slug: "diabetes",
    name: "Diabetes",
    aka: ["Diabetes mellitus", "Type 1 and type 2 diabetes"],
    category: "metabolic",
    icon: "glucose",
    summary:
      "A long-term condition in which blood glucose stays too high, because the body makes too little insulin or cannot use it well.",
    keywords: ["sugar", "blood sugar", "glucose", "insulin", "hba1c", "type 2", "type 1", "prediabetes"],
    overview: [
      "Diabetes is a long-term condition in which the level of glucose (sugar) in the blood is too high. Glucose comes from the food we eat and is the body's main source of energy. A hormone called insulin, made by the pancreas, helps glucose move out of the blood and into the body's cells.",
      "In type 1 diabetes, the body's immune system destroys the cells that make insulin, so little or none is produced. In type 2 diabetes — the most common type — the body does not respond to insulin properly (insulin resistance) and, over time, may not make enough of it. Diabetes can also develop during pregnancy; this is called gestational diabetes.",
      "Over many years, high blood glucose can damage blood vessels and nerves, affecting the heart, kidneys, eyes and feet. With early diagnosis and good management, many of these complications can be prevented or delayed.",
    ],
    understanding: {
      intro:
        "Blood glucose is kept within a narrow range by a constant conversation between the food we eat, the pancreas and the body's cells.",
      diagram: "diabetes",
      steps: [
        {
          title: "Food becomes glucose",
          text: "Carbohydrates in food are broken down into glucose, which passes into the bloodstream. Blood glucose rises after a meal.",
        },
        {
          title: "The pancreas releases insulin",
          text: "Beta cells in the pancreas sense the rise in glucose and release insulin into the blood.",
        },
        {
          title: "Insulin lets glucose into cells",
          text: "Insulin works like a key. It signals muscle, fat and liver cells to take in glucose to use for energy or to store, and blood glucose falls back towards normal.",
        },
        {
          title: "When the system falters",
          text: "In diabetes there is too little insulin, or the cells respond poorly to it. Glucose cannot enter the cells efficiently and builds up in the blood. Over years, persistently high glucose damages blood vessels and nerves.",
        },
      ],
    },
    causes: {
      intro:
        "Type 1 diabetes is an autoimmune condition and is not caused by lifestyle. Type 2 diabetes develops from a combination of genetic and lifestyle factors. The risk of type 2 diabetes is higher with:",
      items: [
        "Being overweight, especially carrying extra fat around the waist",
        "Physical inactivity",
        "A family history of diabetes",
        "Increasing age",
        "South Asian, African or African-Caribbean family background",
        "High blood pressure",
        "Having had diabetes during pregnancy",
        "Prediabetes — blood glucose that is higher than normal but not yet in the diabetes range",
      ],
    },
    symptoms: {
      items: [
        "Feeling very thirsty",
        "Passing urine more often than usual, especially at night",
        "Feeling very tired",
        "Losing weight without trying",
        "Blurred vision",
        "Cuts or wounds that take longer to heal",
        "Itching around the genitals, or repeated thrush",
      ],
      note: "Many people with type 2 diabetes have no symptoms at first, which is why testing matters. Symptoms of type 1 diabetes can appear quickly, over days or weeks.",
    },
    diagnosis: {
      items: [
        {
          title: "HbA1c blood test",
          text: "Reflects average blood glucose over roughly the past two to three months.",
        },
        {
          title: "Fasting plasma glucose",
          text: "Measures blood glucose after not eating for at least eight hours.",
        },
        {
          title: "Oral glucose tolerance test",
          text: "Blood glucose is measured before, and two hours after, drinking a measured glucose drink.",
        },
        {
          title: "Random blood glucose",
          text: "A test taken at any time of day, often used when symptoms are present.",
        },
      ],
      note: "Results are interpreted by a doctor. Unless symptoms are clear, a diagnosis is usually confirmed with a repeat test.",
    },
    treatment: {
      intro:
        "Treatment aims to keep blood glucose in a healthy range and to protect the heart, kidneys, eyes, nerves and feet. Plans are individual and agreed with a doctor.",
      items: [
        {
          title: "Healthy eating",
          text: "A balanced diet with attention to portion sizes, refined carbohydrates and sugary drinks helps control blood glucose.",
        },
        {
          title: "Regular physical activity",
          text: "Activity helps the body use insulin more effectively.",
        },
        {
          title: "Weight management",
          text: "For people with type 2 diabetes who are overweight, losing weight improves blood glucose control and, in some people, can bring it back into the normal range.",
        },
        {
          title: "Medicines",
          text: "Many people need medicines, taken by mouth or by injection, to lower blood glucose. People with type 1 diabetes need insulin for life.",
        },
        {
          title: "Regular check-ups",
          text: "Routine checks of HbA1c, blood pressure, cholesterol, kidneys, eyes and feet help detect complications early.",
        },
      ],
    },
    prevention: {
      intro:
        "Type 1 diabetes cannot currently be prevented. The risk of type 2 diabetes can be reduced by:",
      items: [
        "Maintaining a healthy weight",
        "Being physically active on most days",
        "Eating plenty of vegetables, whole grains and pulses, and limiting sugary drinks and refined foods",
        "Avoiding tobacco",
        "Having your blood glucose checked if you are at higher risk",
      ],
    },
    consult: {
      emergency: [
        "Confusion, extreme drowsiness or fainting in someone with diabetes",
        "Vomiting, abdominal pain, fast breathing or a fruity smell on the breath, especially in someone with type 1 diabetes",
      ],
      routine: [
        "You have any of the symptoms described above",
        "You have risk factors and have never had your blood glucose checked",
        "You have diabetes and notice changes in your vision, numbness or tingling in your feet, or a foot wound that is slow to heal",
      ],
    },
    myths: [
      {
        statement: "Eating sugar alone causes diabetes.",
        verdict: "myth",
        explanation:
          "Type 1 diabetes is autoimmune and is not caused by sugar. Type 2 diabetes results from several genetic and lifestyle factors. A diet high in sugary foods and drinks can contribute to weight gain, which raises risk, but sugar on its own is not the single cause.",
      },
      {
        statement: "Type 2 diabetes can be present for years without symptoms.",
        verdict: "fact",
        explanation:
          "Blood glucose often rises slowly and many people feel well. A blood test is the only reliable way to know.",
      },
      {
        statement: "People with diabetes can never eat anything sweet.",
        verdict: "myth",
        explanation:
          "Sweet foods are best limited, but small amounts can fit within a balanced eating plan. A doctor or dietitian can give individual advice.",
      },
    ],
    references: [
      { title: "Diabetes — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/diabetes" },
      { title: "Type 2 diabetes", publisher: NHS, url: "https://www.nhs.uk/conditions/type-2-diabetes/" },
      { title: "Type 1 diabetes", publisher: NHS, url: "https://www.nhs.uk/conditions/type-1-diabetes/" },
      { title: "Diabetes basics", publisher: CDC, url: "https://www.cdc.gov/diabetes/about/index.html" },
    ],
  },

  /* ── Hypertension ─────────────────────────────────────────────────────── */
  {
    slug: "hypertension",
    name: "Hypertension",
    aka: ["High blood pressure"],
    category: "heart",
    icon: "pressure",
    summary:
      "Blood pressure that stays persistently high, straining the heart and blood vessels — often without any symptoms.",
    keywords: ["blood pressure", "bp", "high bp", "pressure", "stroke", "salt"],
    overview: [
      "Blood pressure is the force of blood pushing against the walls of the arteries as the heart pumps. It is written as two numbers: the systolic pressure, when the heart beats, over the diastolic pressure, when the heart rests between beats. It is measured in millimetres of mercury (mmHg).",
      "Hypertension, or high blood pressure, means this pressure is persistently higher than it should be. It is very common, and most people who have it feel completely well — which is why it is often called a 'silent' condition.",
      "Untreated, high blood pressure increases the risk of heart attack, stroke, heart failure and kidney disease. It is detected with a simple measurement and can usually be controlled with lifestyle changes and, where needed, medicines.",
    ],
    understanding: {
      intro:
        "Arteries are living, elastic tubes. Follow what happens to their walls when the pressure inside them stays high for years.",
      diagram: "hypertension",
      steps: [
        {
          title: "Each heartbeat creates pressure",
          text: "When the heart contracts, it pushes blood into the arteries and pressure rises (systolic). Between beats the heart relaxes and pressure falls (diastolic).",
        },
        {
          title: "Healthy arteries stretch and recoil",
          text: "Normal artery walls are elastic. They stretch with each beat and spring back, helping blood flow smoothly.",
        },
        {
          title: "Persistent high pressure strains the walls",
          text: "When pressure stays high, the walls are under constant extra force. Over time they thicken and stiffen, and the inner lining can be damaged, making it easier for fatty plaque to build up.",
        },
        {
          title: "The heart and organs bear the load",
          text: "Stiffer, narrower arteries make the heart work harder and can reduce blood flow to the brain, heart, kidneys and eyes — raising the risk of stroke, heart disease and kidney damage.",
        },
      ],
    },
    causes: {
      intro:
        "In most adults there is no single cause; high blood pressure develops over time. Factors that raise the risk include:",
      items: [
        "Eating too much salt, and too few vegetables and fruit",
        "A diet high in saturated and trans fats",
        "Physical inactivity",
        "Tobacco use and drinking alcohol",
        "Being overweight",
        "A family history of high blood pressure",
        "Increasing age",
        "Other conditions, such as diabetes or kidney disease",
      ],
    },
    symptoms: {
      items: [
        "Most people have no symptoms at all",
        "Very high blood pressure may cause severe headache",
        "Chest pain or difficulty breathing",
        "Dizziness, nausea or vomiting",
        "Blurred vision or other changes in vision",
        "Confusion or anxiety",
        "Nosebleeds or an irregular heartbeat",
      ],
      note: "Symptoms usually appear only when blood pressure is very high. Regular measurement is the only way to know your blood pressure.",
    },
    diagnosis: {
      items: [
        {
          title: "Blood pressure measurement",
          text: "Taken with a cuff on the upper arm. According to WHO, hypertension is diagnosed when readings on two different days are 140/90 mmHg or higher.",
        },
        {
          title: "Repeated or home readings",
          text: "Because blood pressure varies through the day, doctors may use several readings, home monitoring or 24-hour ambulatory monitoring to confirm it.",
        },
        {
          title: "Checks for related risks",
          text: "Blood and urine tests, and sometimes an ECG, assess the kidneys, cholesterol, blood glucose and the heart.",
        },
      ],
    },
    treatment: {
      intro:
        "Treatment lowers blood pressure to reduce the risk of heart attack, stroke and kidney disease. Targets are set individually by a doctor.",
      items: [
        {
          title: "Reduce salt",
          text: "Cutting down on salt — including salt hidden in pickles, papads, snacks and packaged foods — lowers blood pressure.",
        },
        {
          title: "Eat a heart-healthy diet",
          text: "More vegetables, fruit, whole grains and pulses, and less saturated fat.",
        },
        {
          title: "Stay active and manage weight",
          text: "Regular activity and losing excess weight both help to lower blood pressure.",
        },
        {
          title: "Avoid tobacco and limit alcohol",
          text: "Stopping smoking protects the arteries; less alcohol helps lower blood pressure.",
        },
        {
          title: "Medicines when needed",
          text: "Many people also need one or more blood-pressure-lowering medicines. These are usually taken long term and should not be stopped without medical advice.",
        },
      ],
    },
    prevention: {
      intro: "Healthy habits help to prevent high blood pressure:",
      items: [
        "Eat less salt — WHO recommends less than 5 g a day, about one teaspoon",
        "Eat plenty of vegetables and fruit",
        "Be physically active",
        "Keep to a healthy weight",
        "Avoid tobacco and limit alcohol",
        "Have your blood pressure checked regularly",
      ],
    },
    consult: {
      emergency: [
        "A very high reading together with severe headache, chest pain, breathlessness, confusion or blurred vision",
        "Signs of a stroke — a drooping face, weakness in an arm, or difficulty speaking",
      ],
      routine: [
        "You have not had your blood pressure checked recently",
        "Your home readings are consistently above the target your doctor has given you",
        "You have side effects you think may be from your blood pressure medicines",
      ],
    },
    myths: [
      {
        statement: "Hypertension always causes noticeable symptoms.",
        verdict: "myth",
        explanation:
          "Most people with high blood pressure feel completely well. It can quietly damage the heart, brain and kidneys for years, which is why regular checks matter.",
      },
      {
        statement: "Once my blood pressure is normal on medicine, I can stop taking it.",
        verdict: "myth",
        explanation:
          "Normal readings usually mean the treatment is working. Stopping without medical advice can let blood pressure rise again.",
      },
      {
        statement: "Young adults can have high blood pressure.",
        verdict: "fact",
        explanation:
          "Hypertension is more common with age, but it can occur at any age. Adults of all ages benefit from having their blood pressure checked.",
      },
    ],
    references: [
      { title: "Hypertension — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/hypertension" },
      { title: "High blood pressure (hypertension)", publisher: NHS, url: "https://www.nhs.uk/conditions/high-blood-pressure-hypertension/" },
      { title: "About high blood pressure", publisher: CDC, url: "https://www.cdc.gov/high-blood-pressure/about/index.html" },
    ],
  },

  /* ── Obesity ──────────────────────────────────────────────────────────── */
  {
    slug: "obesity",
    name: "Obesity",
    category: "metabolic",
    icon: "weight",
    summary:
      "Excess body fat that affects health, shaped by genes, hormones, environment and daily life — not willpower alone.",
    keywords: ["weight", "overweight", "bmi", "body mass index", "waist", "fat", "metabolism"],
    overview: [
      "Obesity is a complex, long-term condition in which excess body fat builds up to an extent that can harm health. It is commonly screened using body mass index (BMI) — weight in kilograms divided by height in metres squared.",
      "For adults, WHO defines overweight as a BMI of 25 or more and obesity as a BMI of 30 or more. BMI is a screening tool, not a diagnosis on its own. Waist size also matters, and people of South Asian background can face health risks at a lower BMI, so lower thresholds are often used.",
      "Obesity raises the risk of type 2 diabetes, heart disease, high blood pressure, some cancers and osteoarthritis. Even modest weight loss can bring real health benefits.",
    ],
    understanding: {
      intro:
        "Weight is not simply a matter of choice. Explore the factors that interact to shape it.",
      diagram: "obesity",
      steps: [
        {
          title: "Energy balance",
          text: "Body weight reflects the balance between energy taken in from food and energy the body uses. When intake consistently exceeds use, the extra is stored, largely as fat.",
        },
        {
          title: "Genes",
          text: "Genes influence appetite, how full we feel and where the body stores fat. They help explain why people living in the same surroundings can differ in weight.",
        },
        {
          title: "Hormones and the brain",
          text: "Hormones from fat tissue and the gut, such as leptin and ghrelin, signal hunger and fullness to the brain. After weight loss these signals can shift in ways that increase hunger — one reason weight regain is common.",
        },
        {
          title: "Environment and daily life",
          text: "Easy access to energy-dense foods, sitting for long periods, short sleep, stress, some medicines and some medical conditions all influence weight.",
        },
        {
          title: "Everything interacts",
          text: "These factors act together, which is why obesity is understood as a complex long-term condition rather than simply a matter of individual choice.",
        },
      ],
    },
    causes: {
      intro: "Obesity usually results from several factors acting together:",
      items: [
        "Regularly taking in more energy than the body uses, especially from highly processed, high-fat and high-sugar foods",
        "Low levels of physical activity and long periods of sitting",
        "Genetic factors",
        "Not getting enough sleep",
        "Some medicines",
        "Some medical conditions, such as an underactive thyroid",
        "Surroundings that make healthy food or safe activity harder to access",
      ],
    },
    symptoms: {
      items: [
        "Extra body fat, particularly around the waist",
        "Breathlessness on exertion",
        "Snoring, or pauses in breathing during sleep",
        "Joint and back pain",
        "Tiredness",
        "Increased sweating",
        "Low confidence or low mood",
      ],
      note: "Obesity is identified by measurement rather than by symptoms. These are common effects that may accompany it.",
    },
    diagnosis: {
      items: [
        {
          title: "Body mass index (BMI)",
          text: "Weight in kilograms divided by height in metres squared — a quick screening measure.",
        },
        {
          title: "Waist measurement",
          text: "Fat stored around the waist is linked to a higher risk of heart disease and type 2 diabetes.",
        },
        {
          title: "Health assessment",
          text: "A doctor may check blood pressure, blood glucose, cholesterol and thyroid function, and look for related conditions.",
        },
      ],
    },
    treatment: {
      intro:
        "Treatment focuses on health, not just numbers on a scale, and works best when it is sustainable and supported.",
      items: [
        {
          title: "Healthy, sustainable eating",
          text: "Gradual changes to what and how much we eat, rather than short-term restrictive diets.",
        },
        {
          title: "More physical activity",
          text: "Building activity into daily life and reducing time spent sitting.",
        },
        {
          title: "Behavioural support",
          text: "Help with habits, sleep and stress makes changes easier to maintain.",
        },
        {
          title: "Medicines",
          text: "For some people, doctors may consider weight-management medicines alongside lifestyle changes.",
        },
        {
          title: "Surgery",
          text: "For some people with severe obesity, weight-loss (bariatric) surgery may be considered by a specialist team.",
        },
      ],
    },
    prevention: {
      intro: "Habits that help to prevent unhealthy weight gain:",
      items: [
        "Base meals on vegetables, fruit, whole grains and pulses",
        "Limit sugary drinks and highly processed foods",
        "Be active regularly and break up long periods of sitting",
        "Get enough sleep",
        "Encourage healthy habits in children from early in life",
      ],
    },
    consult: {
      emergency: [],
      routine: [
        "You are concerned about your weight, or your child's",
        "You have gained weight quickly without a clear reason",
        "You snore loudly with pauses in breathing, or feel very sleepy in the day",
        "You would like support to lose weight safely",
      ],
    },
    myths: [
      {
        statement: "Obesity is determined only by lifestyle choices.",
        verdict: "myth",
        explanation:
          "Diet and activity matter, but genes, hormones, sleep, stress, medicines, medical conditions and surroundings all play a part. Obesity is a complex condition, not a simple failure of willpower.",
      },
      {
        statement: "Obesity increases the risk of type 2 diabetes.",
        verdict: "fact",
        explanation:
          "Excess body fat, especially around the waist, makes the body less responsive to insulin. Losing even a modest amount of weight can reduce this risk.",
      },
      {
        statement: "Skipping meals is a reliable way to lose weight.",
        verdict: "myth",
        explanation:
          "Skipping meals does not reliably lead to weight loss and can increase hunger later in the day. A sustainable eating pattern that suits the individual matters more.",
      },
    ],
    references: [
      { title: "Obesity and overweight — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
      { title: "Obesity", publisher: NHS, url: "https://www.nhs.uk/conditions/obesity/" },
      { title: "Obesity", publisher: CDC, url: "https://www.cdc.gov/obesity/index.html" },
    ],
  },

  /* ── Coronary artery disease ──────────────────────────────────────────── */
  {
    slug: "coronary-artery-disease",
    name: "Coronary Artery Disease",
    aka: ["Coronary heart disease", "Ischaemic heart disease"],
    category: "heart",
    icon: "heart",
    summary:
      "Narrowing of the arteries that supply the heart muscle, which can cause chest pain and heart attacks.",
    keywords: ["heart", "heart attack", "angina", "chest pain", "cholesterol", "cad", "chd", "plaque", "atherosclerosis"],
    overview: [
      "The heart is a muscle that needs a constant supply of oxygen-rich blood. This is delivered by the coronary arteries, which run over the surface of the heart.",
      "In coronary artery disease, fatty deposits called plaque build up inside the walls of these arteries (atherosclerosis), narrowing them and reducing blood flow. This can cause chest pain, called angina, especially during exertion. If a plaque breaks open and a blood clot forms, it can suddenly block the artery and cause a heart attack.",
      "Cardiovascular diseases are the leading cause of death worldwide, yet many of the risk factors behind them can be changed.",
    ],
    understanding: {
      intro: "Coronary artery disease develops slowly, over many years.",
      steps: [
        {
          title: "Plaque begins to form",
          text: "Damage to the inner lining of an artery — from high blood pressure, smoking, high cholesterol or high blood glucose — allows fatty material to collect in the artery wall.",
        },
        {
          title: "The artery narrows",
          text: "As plaque grows, less blood can reach the heart muscle. At rest this may cause no symptoms, but during exertion the heart can be short of oxygen, causing angina.",
        },
        {
          title: "A sudden blockage",
          text: "If a plaque ruptures, a blood clot can form on top of it and block the artery. The heart muscle beyond the blockage is starved of oxygen — a heart attack — and needs emergency treatment.",
        },
      ],
    },
    causes: {
      intro: "Coronary artery disease is linked to a number of risk factors:",
      items: [
        "High blood pressure",
        "High LDL ('bad') cholesterol",
        "Smoking and tobacco use",
        "Diabetes",
        "Being overweight",
        "Physical inactivity",
        "An unhealthy diet",
        "Drinking too much alcohol",
        "Increasing age",
        "A family history of heart disease at a young age",
      ],
    },
    symptoms: {
      items: [
        "Chest pain or discomfort (angina) — often a pressure, tightness or heaviness",
        "Pain that may spread to the arms, neck, jaw, back or stomach",
        "Discomfort brought on by exertion and eased by rest",
        "Shortness of breath",
        "Unusual tiredness",
      ],
      note: "Heart symptoms can be milder or less typical in women, older people and people with diabetes — for example breathlessness, nausea, sweating or tiredness without obvious chest pain.",
    },
    diagnosis: {
      items: [
        {
          title: "Electrocardiogram (ECG)",
          text: "Records the heart's electrical activity and can show signs of strain or damage.",
        },
        {
          title: "Blood tests",
          text: "Check cholesterol and blood glucose. When a heart attack is suspected, tests for heart-muscle damage (such as troponin) are used.",
        },
        {
          title: "Exercise stress test",
          text: "Monitors the heart while it works harder, usually on a treadmill.",
        },
        {
          title: "Echocardiogram",
          text: "An ultrasound scan showing how well the heart muscle and valves are working.",
        },
        {
          title: "Coronary angiography",
          text: "X-ray or CT imaging with a contrast dye shows where the coronary arteries are narrowed.",
        },
      ],
    },
    treatment: {
      intro:
        "Treatment relieves symptoms and lowers the risk of a heart attack. It is planned by a doctor, often with a cardiologist.",
      items: [
        {
          title: "Lifestyle changes",
          text: "Stopping smoking, eating a heart-healthy diet, being active and managing weight.",
        },
        {
          title: "Medicines",
          text: "Medicines may be used to relieve chest pain, lower cholesterol and blood pressure, and reduce the risk of blood clots.",
        },
        {
          title: "Procedures",
          text: "Narrowed arteries can be widened with angioplasty and a stent, or bypassed with coronary artery bypass surgery.",
        },
        {
          title: "Cardiac rehabilitation",
          text: "Supervised exercise and education programmes help recovery after a heart attack or procedure.",
        },
      ],
    },
    prevention: {
      intro: "Many cases can be prevented or delayed by:",
      items: [
        "Not smoking or using tobacco in any form",
        "Eating less salt and saturated fat, and more vegetables, fruit and whole grains",
        "Being physically active",
        "Keeping blood pressure, cholesterol and blood glucose under control",
        "Maintaining a healthy weight",
        "Limiting alcohol",
      ],
    },
    consult: {
      emergency: [
        "Chest pain, pressure or tightness lasting more than a few minutes, or that comes and goes — especially with sweating, breathlessness, nausea, or pain spreading to the arm, jaw or back",
        "Sudden severe breathlessness, collapse or fainting",
      ],
      routine: [
        "Chest discomfort that comes on with exertion and settles with rest",
        "You have risk factors such as diabetes, high blood pressure, smoking or a family history of heart disease and would like a check-up",
      ],
    },
    myths: [
      {
        statement: "Heart disease only affects older men.",
        verdict: "myth",
        explanation:
          "Coronary artery disease affects women as well as men, and can develop earlier in people with diabetes, high blood pressure, smoking or a strong family history.",
      },
      {
        statement: "Chest pain is the only warning sign of a heart attack.",
        verdict: "myth",
        explanation:
          "Breathlessness, sweating, nausea, light-headedness, or pain in the arm, jaw or back can also be signs — sometimes without significant chest pain.",
      },
      {
        statement: "Stopping smoking lowers the risk of heart disease.",
        verdict: "fact",
        explanation:
          "The risk begins to fall after stopping and continues to fall over the following years. It is never too late to stop.",
      },
    ],
    references: [
      { title: "Cardiovascular diseases (CVDs) — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)" },
      { title: "Coronary heart disease", publisher: NHS, url: "https://www.nhs.uk/conditions/coronary-heart-disease/" },
      { title: "About heart disease", publisher: CDC, url: "https://www.cdc.gov/heart-disease/about/index.html" },
    ],
  },

  /* ── Asthma ───────────────────────────────────────────────────────────── */
  {
    slug: "asthma",
    name: "Asthma",
    category: "respiratory",
    icon: "airway",
    summary:
      "A long-term condition in which the airways become inflamed and narrowed, causing wheezing and breathlessness.",
    keywords: ["wheeze", "wheezing", "breathless", "breathing", "inhaler", "lungs", "cough", "allergy"],
    overview: [
      "Asthma is a common long-term condition affecting the airways — the tubes that carry air in and out of the lungs. In people with asthma, the airways are sensitive and inflamed, and can react to triggers by narrowing.",
      "This narrowing makes it harder to breathe and can cause wheezing, coughing, chest tightness and breathlessness. Symptoms often come and go, and can sometimes worsen suddenly in an asthma attack.",
      "Asthma affects both children and adults. It cannot currently be cured, but with the right treatment most people can control their symptoms and live full, active lives.",
    ],
    understanding: {
      intro:
        "Step through a cross-section of a small airway to see what happens during asthma symptoms.",
      diagram: "asthma",
      steps: [
        {
          title: "A healthy airway",
          text: "Air flows freely through an open airway. It is lined by a thin layer of mucus and wrapped in a band of smooth muscle.",
        },
        {
          title: "Inflammation",
          text: "In asthma, the airway lining is inflamed and swollen, even when a person feels well. This makes the airways oversensitive to triggers.",
        },
        {
          title: "The muscle tightens",
          text: "When a trigger is met, the muscle around the airway tightens (bronchoconstriction), narrowing the passage.",
        },
        {
          title: "Extra mucus",
          text: "The airway may produce extra, thicker mucus, narrowing it further. Air has to squeeze through, causing wheezing and breathlessness.",
        },
        {
          title: "Treatment opens and calms the airway",
          text: "Reliever inhalers quickly relax the tightened muscle. Preventer inhalers reduce inflammation over time, lowering the chance of attacks.",
        },
      ],
    },
    causes: {
      intro:
        "The exact cause of asthma is not fully understood; genes and the environment both play a part. Risk factors and common triggers include:",
      items: [
        "A family history of asthma or allergies",
        "Allergies, eczema or hay fever",
        "Colds, flu and other chest infections",
        "Dust mites, pollen, mould and animal fur",
        "Tobacco smoke, including second-hand smoke",
        "Air pollution, and smoke from cooking fires or incense",
        "Cold air, exercise and strong smells",
        "Dusts and chemicals at work",
      ],
    },
    symptoms: {
      items: [
        "Wheezing — a whistling sound when breathing",
        "Breathlessness",
        "A tight feeling in the chest",
        "Coughing, often worse at night or early in the morning",
      ],
      note: "Symptoms vary from person to person and over time, and may be worse in some seasons.",
    },
    diagnosis: {
      items: [
        {
          title: "History and examination",
          text: "A doctor asks about the pattern of symptoms, triggers and family history, and listens to the chest.",
        },
        {
          title: "Spirometry",
          text: "Measures how much and how fast you can breathe out — often repeated after a reliever medicine to see whether airflow improves.",
        },
        {
          title: "Peak flow monitoring",
          text: "A small hand-held meter records how fast you can breathe out, sometimes over several weeks.",
        },
        {
          title: "FeNO test",
          text: "Measures nitric oxide in the breath, a marker of airway inflammation.",
        },
      ],
    },
    treatment: {
      intro:
        "The aim is to control symptoms and prevent attacks with as little treatment as necessary. Plans are agreed with a doctor.",
      items: [
        {
          title: "Reliever inhalers",
          text: "Used when symptoms occur, to relax the airway muscles quickly.",
        },
        {
          title: "Preventer inhalers",
          text: "Used every day to reduce inflammation in the airways, even when you feel well.",
        },
        {
          title: "Good inhaler technique",
          text: "Using an inhaler correctly — often with a spacer — makes a big difference to how well it works.",
        },
        {
          title: "Avoiding triggers",
          text: "Reducing exposure to smoke, dust and other known triggers.",
        },
        {
          title: "A personal asthma action plan",
          text: "A written plan agreed with your doctor explains your daily treatment and what to do if symptoms worsen.",
        },
      ],
    },
    prevention: {
      intro:
        "Asthma itself cannot always be prevented, but attacks can often be reduced by:",
      items: [
        "Using preventer treatment as prescribed, even when feeling well",
        "Avoiding tobacco smoke, including second-hand smoke",
        "Reducing exposure to known triggers",
        "Keeping recommended vaccinations up to date",
        "Having regular asthma reviews with a doctor",
      ],
    },
    consult: {
      emergency: [
        "Your reliever inhaler is not helping, or you need it more often than every four hours",
        "You are too breathless to speak, eat or sleep",
        "Lips or fingertips look blue or grey",
        "Drowsiness, confusion or exhaustion during an attack",
      ],
      routine: [
        "You have a cough or wheeze that keeps coming back",
        "Symptoms wake you at night",
        "You need your reliever inhaler three or more times a week",
      ],
    },
    myths: [
      {
        statement: "Asthma is only a childhood condition.",
        verdict: "myth",
        explanation:
          "Asthma often starts in childhood, but it can begin at any age and frequently continues into adult life.",
      },
      {
        statement: "People with asthma should avoid exercise.",
        verdict: "myth",
        explanation:
          "With well-controlled asthma, most people can be fully active. Regular exercise is good for the lungs and general health.",
      },
      {
        statement: "Asthma symptoms can usually be controlled with regular treatment.",
        verdict: "fact",
        explanation:
          "There is no cure yet, but with the right treatment and good inhaler technique most people have few symptoms.",
      },
    ],
    references: [
      { title: "Asthma — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/asthma" },
      { title: "Asthma", publisher: NHS, url: "https://www.nhs.uk/conditions/asthma/" },
      { title: "About asthma", publisher: CDC, url: "https://www.cdc.gov/asthma/about/index.html" },
      { title: "GINA reports", publisher: "Global Initiative for Asthma", url: "https://ginasthma.org/reports/" },
    ],
  },

  /* ── Anaemia ──────────────────────────────────────────────────────────── */
  {
    slug: "anaemia",
    name: "Anaemia",
    aka: ["Anemia"],
    category: "general",
    icon: "blood",
    summary:
      "Too few healthy red blood cells, or too little haemoglobin, to carry enough oxygen around the body.",
    keywords: ["anemia", "iron", "haemoglobin", "hemoglobin", "hb", "tired", "tiredness", "pale", "blood", "b12", "folate"],
    overview: [
      "Anaemia is a condition in which the number of red blood cells, or the amount of haemoglobin inside them, is lower than normal. Haemoglobin is the iron-containing protein that carries oxygen from the lungs to the rest of the body.",
      "When there is not enough of it, the body's tissues receive less oxygen, which can cause tiredness, weakness and breathlessness. Anaemia is very common worldwide, particularly among young children, women during their reproductive years and pregnant women.",
      "Lack of iron is the most common cause, but anaemia has many possible causes — so finding the underlying reason is an important part of treatment.",
    ],
    understanding: {
      intro: "Healthy blood depends on making red cells — and not losing them too quickly.",
      steps: [
        {
          title: "Red cells carry oxygen",
          text: "Red blood cells are packed with haemoglobin, which picks up oxygen in the lungs and releases it in the tissues.",
        },
        {
          title: "The body needs raw materials",
          text: "Red cells are made in the bone marrow and need iron, vitamin B12 and folate. They live for about four months before being replaced.",
        },
        {
          title: "When supply falls short",
          text: "Anaemia develops when too few red cells are made, when blood is lost, or when red cells are destroyed faster than they can be replaced.",
        },
      ],
    },
    causes: {
      intro: "Common causes and risk factors include:",
      items: [
        "Too little iron in the diet, or poor absorption of iron",
        "Blood loss — for example from heavy periods or bleeding in the gut",
        "Pregnancy, which increases the body's need for iron and folate",
        "Lack of vitamin B12 or folate",
        "Infections such as malaria and intestinal worms",
        "Long-term conditions such as kidney disease",
        "Inherited blood conditions such as thalassaemia and sickle cell disease",
      ],
    },
    symptoms: {
      items: [
        "Tiredness and lack of energy",
        "Shortness of breath",
        "Pale skin, or pale inner eyelids",
        "A noticeable heartbeat (palpitations)",
        "Headaches",
        "Dizziness",
        "Brittle nails, or cravings for non-food items such as ice or clay",
      ],
      note: "Mild anaemia may cause no symptoms and is often found on a routine blood test.",
    },
    diagnosis: {
      items: [
        {
          title: "Complete blood count (CBC)",
          text: "Measures haemoglobin and the number and size of red blood cells.",
        },
        {
          title: "Iron studies",
          text: "Including ferritin, which reflects the body's iron stores.",
        },
        {
          title: "Vitamin B12 and folate levels",
          text: "Checked when the type of anaemia suggests a vitamin deficiency.",
        },
        {
          title: "Tests for the cause",
          text: "Further tests, such as stool tests, may look for blood loss or other underlying causes.",
        },
      ],
    },
    treatment: {
      intro: "Treatment depends on the type and cause of anaemia.",
      items: [
        {
          title: "Treating the cause",
          text: "For example, managing heavy periods, treating infections, or investigating bleeding.",
        },
        {
          title: "Iron replacement",
          text: "When iron deficiency is confirmed, a doctor may advise iron treatment. It should be taken only on medical advice, as too much iron can be harmful.",
        },
        {
          title: "Vitamin replacement",
          text: "Vitamin B12 or folate is replaced when a deficiency is the cause.",
        },
        {
          title: "Diet",
          text: "Iron-rich foods help maintain healthy levels once they are restored.",
        },
        {
          title: "Specialist treatment",
          text: "Severe or inherited forms may need further care, such as blood transfusion.",
        },
      ],
    },
    prevention: {
      intro: "The risk of iron-deficiency anaemia can be reduced by:",
      items: [
        "Eating iron-rich foods such as green leafy vegetables, pulses, lentils, millets, meat, fish and eggs",
        "Including foods rich in vitamin C, such as citrus fruits and amla, with meals to help iron absorption",
        "Avoiding tea or coffee with meals, as they reduce iron absorption",
        "Following medical advice on iron and folic acid during pregnancy",
        "Preventing and treating infections such as malaria and worms",
      ],
    },
    consult: {
      emergency: [
        "Chest pain, severe breathlessness or fainting",
        "Vomiting blood, or passing black, tarry stools",
      ],
      routine: [
        "You feel persistently tired or breathless",
        "You notice any of the symptoms described above",
        "You have very heavy periods",
        "You are pregnant or planning a pregnancy",
      ],
    },
    myths: [
      {
        statement: "Anaemia is always caused by a lack of iron.",
        verdict: "myth",
        explanation:
          "Iron deficiency is the most common cause, but vitamin deficiencies, infections, long-term illness, blood loss and inherited conditions can also cause anaemia. The cause should be found before treatment.",
      },
      {
        statement: "Drinking tea with meals can reduce iron absorption.",
        verdict: "fact",
        explanation:
          "Compounds in tea and coffee reduce how much iron the body absorbs from food. Having them between meals instead can help.",
      },
      {
        statement: "Iron supplements are harmless, so anyone tired can take them.",
        verdict: "myth",
        explanation:
          "Tiredness has many causes, and too much iron can be harmful. Iron treatment should be taken only after testing and on medical advice.",
      },
    ],
    references: [
      { title: "Anaemia — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/anaemia" },
      { title: "Iron deficiency anaemia", publisher: NHS, url: "https://www.nhs.uk/conditions/iron-deficiency-anaemia/" },
      { title: "Anemia", publisher: "National Heart, Lung, and Blood Institute (US NIH)", url: "https://www.nhlbi.nih.gov/health/anemia" },
    ],
  },

  /* ── Osteoarthritis ───────────────────────────────────────────────────── */
  {
    slug: "osteoarthritis",
    name: "Osteoarthritis",
    category: "general",
    icon: "joint",
    summary:
      "Gradual changes in the joints that cause pain and stiffness, most often in the knees, hips and hands.",
    keywords: ["arthritis", "knee", "knee pain", "joint", "joint pain", "hip", "stiffness", "bones"],
    overview: [
      "Osteoarthritis is the most common type of arthritis. It affects the joints, most often the knees, hips, hands and spine.",
      "In a healthy joint, the ends of the bones are covered by smooth cartilage that lets them glide over each other. In osteoarthritis, this cartilage gradually becomes thinner and rougher, and the bone beneath and the tissues around the joint change. This can cause pain, stiffness and reduced movement.",
      "Osteoarthritis is more common with age, but it is not an inevitable part of ageing. Symptoms can often be improved with exercise, weight management and other treatments.",
    ],
    understanding: {
      intro: "Osteoarthritis affects the whole joint, not only the cartilage.",
      steps: [
        {
          title: "A healthy joint",
          text: "Smooth cartilage and a small amount of lubricating fluid allow the bones to move against each other with little friction.",
        },
        {
          title: "Cartilage thins",
          text: "The cartilage becomes rough and thin. The body tries to repair it, but repair does not keep pace with the damage.",
        },
        {
          title: "Bone and tissues respond",
          text: "Bone at the joint edges may form small growths (osteophytes), and the joint lining can become inflamed and swollen.",
        },
        {
          title: "Pain and stiffness",
          text: "These changes cause pain, stiffness and reduced movement. Weak muscles around the joint can make symptoms worse — and strong muscles can help.",
        },
      ],
    },
    causes: {
      intro: "Factors that increase the risk include:",
      items: [
        "Increasing age",
        "Being overweight, which puts extra load on the knees and hips",
        "A previous joint injury or operation",
        "Repeated heavy stress on joints from some jobs or activities",
        "A family history of osteoarthritis",
        "Being female",
        "Other joint conditions or differences in joint shape",
      ],
    },
    symptoms: {
      items: [
        "Joint pain, often worse with activity and towards the end of the day",
        "Stiffness after rest or in the morning, usually easing within about half an hour",
        "Reduced range of movement",
        "A grating or crackling feeling in the joint",
        "Swelling around the joint",
        "Weakness in the muscles around the joint",
      ],
    },
    diagnosis: {
      items: [
        {
          title: "Clinical assessment",
          text: "Often diagnosed from the symptoms and an examination of the joint, particularly in people over 45.",
        },
        {
          title: "X-rays",
          text: "Can show narrowing of the joint space and bone changes, but are not always needed.",
        },
        {
          title: "Blood tests",
          text: "Sometimes used to rule out other types of arthritis.",
        },
      ],
    },
    treatment: {
      intro:
        "There is no cure, but symptoms can be eased and function improved. Treatment is tailored to the person and the joints affected.",
      items: [
        {
          title: "Exercise",
          text: "Strengthening exercise and general activity are core treatments. A physiotherapist can design a suitable programme.",
        },
        {
          title: "Weight management",
          text: "Losing excess weight reduces the load on the knees and hips.",
        },
        {
          title: "Pain relief",
          text: "A doctor may advise pain-relieving medicines or creams. Pain relief should be reviewed regularly.",
        },
        {
          title: "Supportive aids",
          text: "Suitable footwear, walking aids and adapting daily tasks can reduce strain on joints.",
        },
        {
          title: "Joint replacement",
          text: "Surgery may be considered when symptoms are severe and other treatments have not helped.",
        },
      ],
    },
    prevention: {
      intro: "You can help protect your joints by:",
      items: [
        "Keeping to a healthy weight",
        "Staying active with low-impact exercise such as walking, cycling or swimming",
        "Strengthening the muscles around the joints",
        "Protecting joints from injury",
      ],
    },
    consult: {
      emergency: [
        "A joint that suddenly becomes hot, red and very swollen, especially with fever",
      ],
      routine: [
        "Joint pain or stiffness that does not go away",
        "Pain that affects daily activities, work or sleep",
        "A joint that locks, gives way or becomes deformed",
      ],
    },
    myths: [
      {
        statement: "Osteoarthritis is just a normal part of getting older.",
        verdict: "myth",
        explanation:
          "It becomes more common with age, but many older people do not develop it, and its symptoms can be treated rather than simply accepted.",
      },
      {
        statement: "Exercise wears out arthritic joints faster.",
        verdict: "myth",
        explanation:
          "Appropriate exercise is one of the most effective treatments. It strengthens the muscles that support the joint and can reduce pain.",
      },
      {
        statement: "Losing excess weight can reduce knee pain.",
        verdict: "fact",
        explanation:
          "Extra body weight increases the load on the knees. For people who are overweight, losing weight can ease pain and improve function.",
      },
    ],
    references: [
      { title: "Osteoarthritis — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/osteoarthritis" },
      { title: "Osteoarthritis", publisher: NHS, url: "https://www.nhs.uk/conditions/osteoarthritis/" },
      { title: "Osteoarthritis", publisher: CDC, url: "https://www.cdc.gov/arthritis/osteoarthritis/index.html" },
    ],
  },

  /* ── Chronic kidney disease ───────────────────────────────────────────── */
  {
    slug: "chronic-kidney-disease",
    name: "Chronic Kidney Disease",
    aka: ["CKD"],
    category: "general",
    icon: "kidney",
    summary:
      "A gradual, long-term loss of kidney function, most often linked to diabetes and high blood pressure.",
    keywords: ["kidney", "kidneys", "renal", "ckd", "creatinine", "egfr", "dialysis", "urine", "protein"],
    overview: [
      "The kidneys filter waste products and excess fluid from the blood, which leave the body as urine. They also help control blood pressure, balance salts and minerals, and support the production of red blood cells.",
      "In chronic kidney disease (CKD), the kidneys are damaged and gradually work less well over months or years. Early CKD usually causes no symptoms, so it is often found through routine blood and urine tests.",
      "Diabetes and high blood pressure are the most common causes. Finding CKD early allows steps to be taken to slow it down and to protect the heart.",
    ],
    understanding: {
      intro: "Each kidney contains a vast number of tiny filtering units called nephrons.",
      steps: [
        {
          title: "Tiny filters at work",
          text: "In each nephron, a cluster of tiny blood vessels (the glomerulus) filters the blood, keeping cells and proteins in and letting waste pass out into the urine.",
        },
        {
          title: "Damage to the filters",
          text: "Over years, high blood glucose, high blood pressure or inflammation can damage these delicate vessels.",
        },
        {
          title: "Protein leaks into the urine",
          text: "Damaged filters let protein (albumin) leak into the urine — often one of the earliest signs, found on a urine test.",
        },
        {
          title: "Waste and fluid build up",
          text: "As more nephrons are lost, the kidneys clear waste and fluid less effectively. In advanced stages this can cause swelling, tiredness and other symptoms.",
        },
      ],
    },
    causes: {
      intro: "Common causes and risk factors include:",
      items: [
        "Diabetes",
        "High blood pressure",
        "Inflammation of the kidney filters (glomerulonephritis)",
        "Inherited conditions such as polycystic kidney disease",
        "Repeated kidney infections, or blockages such as kidney stones or an enlarged prostate",
        "Long-term use of some medicines, including some painkillers, without medical supervision",
        "A family history of kidney disease, older age, smoking and obesity",
      ],
    },
    symptoms: {
      items: [
        "Tiredness",
        "Swollen ankles, feet or hands",
        "Shortness of breath",
        "Feeling sick",
        "Blood in the urine",
        "Needing to pass urine more or less often",
        "Itchy skin and muscle cramps",
      ],
      note: "Early CKD usually causes no symptoms. Symptoms tend to appear only when kidney function is significantly reduced.",
    },
    diagnosis: {
      items: [
        {
          title: "Blood test (eGFR)",
          text: "Uses the level of creatinine in the blood to estimate how well the kidneys are filtering.",
        },
        {
          title: "Urine test (ACR)",
          text: "Measures albumin, a protein that can leak into the urine when the kidneys are damaged.",
        },
        {
          title: "Blood pressure check",
          text: "High blood pressure is both a cause and a consequence of kidney disease.",
        },
        {
          title: "Kidney ultrasound",
          text: "Shows the size and shape of the kidneys and can reveal blockages.",
        },
        {
          title: "Kidney biopsy",
          text: "Occasionally, a small sample of kidney tissue is examined to find the cause.",
        },
      ],
    },
    treatment: {
      intro:
        "Treatment aims to slow kidney damage, manage complications and protect the heart.",
      items: [
        {
          title: "Controlling blood pressure",
          text: "Keeping blood pressure within a target set by a doctor is one of the most important steps.",
        },
        {
          title: "Managing diabetes",
          text: "Good blood glucose control helps protect the kidneys.",
        },
        {
          title: "Kidney-protective medicines",
          text: "A doctor may prescribe medicines that reduce protein leakage and slow progression.",
        },
        {
          title: "Reviewing other medicines",
          text: "Some medicines can affect the kidneys or need dose changes when kidney function is reduced.",
        },
        {
          title: "Dialysis or transplant",
          text: "If the kidneys fail, dialysis or a kidney transplant may be needed.",
        },
      ],
    },
    prevention: {
      intro: "You can help protect your kidneys by:",
      items: [
        "Keeping blood pressure and blood glucose under control",
        "Not smoking",
        "Staying active and keeping to a healthy weight",
        "Eating less salt",
        "Avoiding regular use of over-the-counter painkillers without medical advice",
        "Having kidney tests if you have diabetes, high blood pressure or a family history of kidney disease",
      ],
    },
    consult: {
      emergency: [
        "Passing very little or no urine",
        "Sudden swelling with breathlessness",
        "Confusion or severe drowsiness",
      ],
      routine: [
        "You notice blood in your urine",
        "Your ankles, feet or face are swollen",
        "You have diabetes or high blood pressure and have not had your kidneys checked",
      ],
    },
    myths: [
      {
        statement: "If you feel well, your kidneys must be healthy.",
        verdict: "myth",
        explanation:
          "Early kidney disease usually has no symptoms. Blood and urine tests are the only way to know, especially for people with diabetes or high blood pressure.",
      },
      {
        statement: "Diabetes and high blood pressure are the leading causes of CKD.",
        verdict: "fact",
        explanation:
          "Both damage the tiny blood vessels in the kidneys over time. Controlling them is one of the best ways to protect kidney health.",
      },
      {
        statement: "Drinking lots of water can cure kidney disease.",
        verdict: "myth",
        explanation:
          "Staying well hydrated is sensible, but extra water does not reverse kidney damage. In some stages of CKD, doctors may even advise limiting fluids.",
      },
    ],
    references: [
      { title: "Chronic kidney disease", publisher: NHS, url: "https://www.nhs.uk/conditions/kidney-disease/" },
      { title: "Chronic kidney disease (CKD)", publisher: "National Institute of Diabetes and Digestive and Kidney Diseases (US NIH)", url: "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd" },
      { title: "Chronic kidney disease basics", publisher: CDC, url: "https://www.cdc.gov/kidney-disease/about/index.html" },
      { title: "CKD evaluation and management guideline", publisher: "KDIGO", url: "https://kdigo.org/guidelines/ckd-evaluation-and-management/" },
    ],
  },

  /* ── Hypothyroidism ───────────────────────────────────────────────────── */
  {
    slug: "hypothyroidism",
    name: "Hypothyroidism",
    aka: ["Underactive thyroid"],
    category: "endocrine",
    icon: "thyroid",
    summary:
      "An underactive thyroid gland that makes too little thyroid hormone, slowing many of the body's processes.",
    keywords: ["thyroid", "underactive thyroid", "tsh", "t4", "goitre", "goiter", "hashimoto", "iodine", "hormone"],
    overview: [
      "The thyroid is a small, butterfly-shaped gland at the front of the neck. It makes hormones that help control the body's metabolism — the rate at which it uses energy — affecting heart rate, body temperature, weight and energy levels.",
      "In hypothyroidism, the thyroid does not make enough of these hormones, so many of the body's processes slow down. It is more common in women and can develop at any age.",
      "Hypothyroidism is usually diagnosed with a blood test and is commonly treated with daily hormone replacement, taken as advised by a doctor.",
    ],
    understanding: {
      intro: "Thyroid hormone levels are controlled by a feedback loop between the brain and the thyroid.",
      steps: [
        {
          title: "The brain sets the level",
          text: "The pituitary gland at the base of the brain releases thyroid-stimulating hormone (TSH), which tells the thyroid how much hormone to make.",
        },
        {
          title: "The thyroid responds",
          text: "The thyroid uses iodine from the diet to make thyroid hormones (T4 and T3), which travel in the blood to almost every tissue.",
        },
        {
          title: "Feedback keeps balance",
          text: "When thyroid hormone levels are right, the pituitary releases less TSH. When they fall, it releases more.",
        },
        {
          title: "When the thyroid underperforms",
          text: "If the thyroid cannot keep up, hormone levels fall and TSH rises. A raised TSH with low T4 is the typical pattern of hypothyroidism.",
        },
      ],
    },
    causes: {
      intro: "Common causes and risk factors include:",
      items: [
        "Autoimmune thyroid disease (Hashimoto's thyroiditis), in which the immune system attacks the thyroid",
        "Previous thyroid surgery or radioactive iodine treatment",
        "Too little iodine in the diet, in areas where iodine deficiency occurs",
        "Some medicines",
        "Problems with the pituitary gland (rare)",
        "Hypothyroidism present from birth — which is why many newborns are screened",
        "Being female, a family history of thyroid disease, or another autoimmune condition such as type 1 diabetes",
      ],
    },
    symptoms: {
      items: [
        "Tiredness",
        "Feeling cold",
        "Weight gain",
        "Constipation",
        "Dry skin and hair",
        "Muscle aches and weakness",
        "Low mood",
        "Changes to menstrual periods",
        "Slowed thinking or poor memory",
        "A swelling in the neck (goitre)",
      ],
      note: "Symptoms usually develop slowly and are shared with many other conditions, so a blood test is needed to know.",
    },
    diagnosis: {
      items: [
        {
          title: "TSH blood test",
          text: "Usually the first test. A raised TSH suggests the thyroid is underactive.",
        },
        {
          title: "Free T4 test",
          text: "Measures the main thyroid hormone in the blood.",
        },
        {
          title: "Thyroid antibodies",
          text: "Can show whether an autoimmune process is the cause.",
        },
      ],
    },
    treatment: {
      intro: "Hypothyroidism is usually well controlled with treatment.",
      items: [
        {
          title: "Thyroid hormone replacement",
          text: "Daily tablets replace the missing hormone. The dose is set by a doctor and adjusted using blood tests.",
        },
        {
          title: "Regular monitoring",
          text: "Blood tests check that hormone levels stay in the right range, especially after dose changes and during pregnancy.",
        },
      ],
    },
    prevention: {
      intro: "Most cases cannot be prevented, but you can:",
      items: [
        "Use iodised salt — an important public-health measure where iodine deficiency occurs",
        "Be aware of symptoms if you have a family history or another autoimmune condition",
        "Attend follow-up blood tests if you are on treatment",
      ],
    },
    consult: {
      emergency: [
        "Extreme drowsiness, confusion or a very low body temperature in someone with known hypothyroidism",
      ],
      routine: [
        "You have several of the symptoms described above",
        "You notice a swelling in your neck",
        "You have a thyroid condition and are pregnant or planning a pregnancy",
      ],
    },
    myths: [
      {
        statement: "Thyroid problems only affect women.",
        verdict: "myth",
        explanation:
          "Hypothyroidism is more common in women, but men and children can be affected too.",
      },
      {
        statement: "Hypothyroidism can usually be well controlled with treatment.",
        verdict: "fact",
        explanation:
          "With the right dose of hormone replacement and regular blood tests, most people live normally.",
      },
      {
        statement: "Taking extra iodine will fix any thyroid problem.",
        verdict: "myth",
        explanation:
          "Iodine helps only where there is a deficiency. In other thyroid conditions, too much iodine can be harmful. Supplements should be taken only on medical advice.",
      },
    ],
    references: [
      { title: "Underactive thyroid (hypothyroidism)", publisher: NHS, url: "https://www.nhs.uk/conditions/underactive-thyroid-hypothyroidism/" },
      { title: "Hypothyroidism (underactive thyroid)", publisher: "National Institute of Diabetes and Digestive and Kidney Diseases (US NIH)", url: "https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism" },
      { title: "Hypothyroidism", publisher: "American Thyroid Association", url: "https://www.thyroid.org/hypothyroidism/" },
    ],
  },

  /* ── Migraine ─────────────────────────────────────────────────────────── */
  {
    slug: "migraine",
    name: "Migraine",
    category: "neurological",
    icon: "brain",
    summary:
      "A neurological condition causing recurring, often severe headaches, frequently with nausea and sensitivity to light.",
    keywords: ["headache", "head pain", "aura", "neurological", "nausea", "light sensitivity"],
    overview: [
      "Migraine is a common neurological condition. It causes attacks of moderate to severe headache — often a throbbing pain on one side of the head — that can last from a few hours to a few days.",
      "Attacks are often accompanied by nausea, vomiting and sensitivity to light and sound. Some people have an 'aura' beforehand: temporary visual disturbances such as flashing lights or zig-zag lines.",
      "Migraine is more than 'just a headache'. It can significantly affect work, study and family life, but there are effective ways to manage attacks and reduce how often they happen.",
    ],
    understanding: {
      intro: "Research into migraine is ongoing, but much is now understood about how an attack unfolds.",
      steps: [
        {
          title: "A sensitive brain",
          text: "Migraine is linked to changes in how the brain processes signals. People with migraine appear to have a brain that reacts more strongly to certain changes and triggers.",
        },
        {
          title: "Nerve signalling",
          text: "During an attack, the trigeminal nerve system releases signalling chemicals, such as CGRP, around blood vessels in the coverings of the brain, contributing to pain.",
        },
        {
          title: "The phases of an attack",
          text: "An attack may include early warning signs (such as yawning or mood change), an aura in some people, the headache itself, and a 'hangover' phase of tiredness afterwards.",
        },
      ],
    },
    causes: {
      intro: "The exact cause is not fully known. Risk factors and common triggers include:",
      items: [
        "A family history — migraine often runs in families",
        "Being female, and hormonal changes such as periods",
        "Stress, or relaxation after stress",
        "Too little sleep, or changes in sleep pattern",
        "Skipped meals and not drinking enough fluid",
        "Bright or flickering lights, loud noise or strong smells",
        "Alcohol and some foods or drinks, in some people",
      ],
    },
    symptoms: {
      items: [
        "Moderate to severe headache, often throbbing and on one side",
        "Pain that worsens with physical activity",
        "Nausea or vomiting",
        "Sensitivity to light and sound",
        "Visual aura — flashing lights, zig-zag lines or blind spots — in some people",
        "Tingling, numbness or difficulty speaking during aura, in some people",
      ],
    },
    diagnosis: {
      items: [
        {
          title: "Clinical diagnosis",
          text: "Migraine is diagnosed from the pattern of symptoms described to a doctor. There is no single test for it.",
        },
        {
          title: "Headache diary",
          text: "Recording attacks, symptoms and possible triggers helps with diagnosis and treatment.",
        },
        {
          title: "Examination",
          text: "A doctor checks the nervous system to look for signs of other conditions.",
        },
        {
          title: "Brain scans",
          text: "Not usually needed, but may be arranged if there are unusual features.",
        },
      ],
    },
    treatment: {
      intro: "There is no cure, but treatment can reduce the frequency and severity of attacks.",
      items: [
        {
          title: "Treating attacks early",
          text: "Pain-relief medicines, and specific migraine medicines recommended by a doctor, work best when taken early in an attack.",
        },
        {
          title: "Avoiding medication-overuse headache",
          text: "Taking pain relief on many days each month can itself cause frequent headaches. A doctor can advise on safe limits.",
        },
        {
          title: "Preventive treatment",
          text: "If attacks are frequent or disabling, a doctor may recommend a daily preventive treatment.",
        },
        {
          title: "Rest and recovery",
          text: "Many people find it helps to rest in a quiet, dark room during an attack.",
        },
      ],
    },
    prevention: {
      intro: "Attacks may become less frequent if you:",
      items: [
        "Keep a regular sleep pattern",
        "Eat regular meals and drink enough fluids",
        "Find ways to manage stress",
        "Exercise regularly",
        "Keep a diary to identify and reduce personal triggers",
      ],
    },
    consult: {
      emergency: [
        "A sudden, very severe headache that reaches its peak within seconds or minutes",
        "Headache with weakness, numbness, slurred speech, confusion or loss of vision",
        "Headache with fever, a stiff neck or a rash",
        "Headache after a head injury",
      ],
      routine: [
        "Headaches that are frequent or affect your daily life",
        "You use pain relief for headaches on many days each month",
        "Your usual headache pattern changes",
        "New headaches starting after the age of 50",
      ],
    },
    myths: [
      {
        statement: "A migraine is just a bad headache.",
        verdict: "myth",
        explanation:
          "Migraine is a neurological condition. Attacks often include nausea, sensitivity to light and sound, and sometimes aura, and can be disabling.",
      },
      {
        statement: "Taking painkillers very often can make headaches worse.",
        verdict: "fact",
        explanation:
          "Frequent use of pain relief can lead to medication-overuse headache. A doctor can help plan safer treatment.",
      },
      {
        statement: "Everyone with migraine sees an aura first.",
        verdict: "myth",
        explanation:
          "Only some people with migraine have aura. Many have migraine without any aura at all.",
      },
    ],
    references: [
      { title: "Headache disorders — fact sheet", publisher: WHO, url: "https://www.who.int/news-room/fact-sheets/detail/headache-disorders" },
      { title: "Migraine", publisher: NHS, url: "https://www.nhs.uk/conditions/migraine/" },
      { title: "Migraine", publisher: "National Institute of Neurological Disorders and Stroke (US NIH)", url: "https://www.ninds.nih.gov/health-information/disorders/migraine" },
    ],
  },

  /* ── GORD ─────────────────────────────────────────────────────────────── */
  {
    slug: "acid-reflux",
    name: "Acid Reflux (GORD)",
    aka: ["Gastro-oesophageal reflux disease", "GERD", "Heartburn"],
    category: "digestive",
    icon: "reflux",
    summary:
      "Stomach acid repeatedly flowing back into the food pipe, causing heartburn and irritation.",
    keywords: ["acidity", "heartburn", "gerd", "gord", "reflux", "indigestion", "stomach", "burning", "gas"],
    overview: [
      "When we swallow, food passes down the oesophagus (food pipe) into the stomach. A ring of muscle at the bottom of the oesophagus normally closes to stop stomach contents flowing back up.",
      "In gastro-oesophageal reflux disease (GORD, also called GERD), this muscle does not work as well, so stomach acid often flows back into the oesophagus. This causes heartburn and can irritate the oesophagus lining.",
      "Occasional heartburn is common. When reflux happens often or causes complications it is called GORD, and it can usually be improved with lifestyle changes and treatment.",
    ],
    understanding: {
      intro: "A simple valve at the top of the stomach makes all the difference.",
      steps: [
        {
          title: "A one-way valve",
          text: "The lower oesophageal sphincter — a ring of muscle — relaxes to let food into the stomach, then closes again.",
        },
        {
          title: "The valve weakens or relaxes",
          text: "If it relaxes at the wrong time or is weakened — for example by extra pressure on the stomach — stomach contents can flow back up.",
        },
        {
          title: "Acid irritates the food pipe",
          text: "Unlike the stomach, the oesophagus is not built to withstand acid. Repeated exposure causes burning pain and can inflame its lining.",
        },
      ],
    },
    causes: {
      intro: "Reflux is more likely with:",
      items: [
        "Being overweight",
        "Pregnancy",
        "Smoking",
        "Large or fatty meals, and eating late at night",
        "Some foods and drinks — such as alcohol, coffee, chocolate, and spicy or fatty foods — in some people",
        "A hiatus hernia, where part of the stomach moves up into the chest",
        "Some medicines",
        "Stress",
      ],
    },
    symptoms: {
      items: [
        "Heartburn — a burning feeling in the middle of the chest, often after eating",
        "A sour or bitter taste at the back of the mouth",
        "A cough or hiccups that keep coming back",
        "A hoarse voice",
        "Bad breath",
        "Bloating and feeling sick",
      ],
      note: "Symptoms are often worse after eating, when lying down or when bending over.",
    },
    diagnosis: {
      items: [
        {
          title: "Clinical assessment",
          text: "Often diagnosed from typical symptoms described to a doctor.",
        },
        {
          title: "Response to treatment",
          text: "Improvement with lifestyle changes or acid-reducing treatment can support the diagnosis.",
        },
        {
          title: "Endoscopy",
          text: "A thin camera passed into the oesophagus and stomach, used when symptoms are persistent or worrying.",
        },
        {
          title: "pH monitoring",
          text: "Measures acid in the oesophagus over 24 hours or more, in selected cases.",
        },
      ],
    },
    treatment: {
      intro: "Most people improve with simple measures, sometimes alongside medicines.",
      items: [
        {
          title: "Lifestyle changes",
          text: "Smaller meals, not eating late, raising the head of the bed, managing weight and stopping smoking.",
        },
        {
          title: "Medicines",
          text: "Antacids and acid-reducing medicines can relieve symptoms. Long-term use should be reviewed by a doctor.",
        },
        {
          title: "Surgery",
          text: "Rarely, an operation may be considered when other treatments have not helped.",
        },
      ],
    },
    prevention: {
      intro: "You may reduce reflux by:",
      items: [
        "Eating smaller, more frequent meals",
        "Avoiding food for a few hours before going to bed",
        "Raising the head of your bed a little",
        "Keeping to a healthy weight",
        "Stopping smoking",
        "Noticing and reducing foods and drinks that trigger your symptoms",
      ],
    },
    consult: {
      emergency: [
        "Chest pain that could be from the heart — heartburn and heart pain can feel alike, so seek emergency care if in doubt",
        "Vomiting blood, or passing black, tarry stools",
      ],
      routine: [
        "Heartburn on most days for three weeks or more",
        "Difficulty or pain when swallowing, or weight loss without trying — see a doctor promptly",
        "Symptoms that continue despite treatment from a pharmacy",
      ],
    },
    myths: [
      {
        statement: "Heartburn is a problem with the heart.",
        verdict: "myth",
        explanation:
          "Heartburn is caused by acid in the oesophagus, which lies close to the heart. Because the two can feel similar, unexplained chest pain should always be checked.",
      },
      {
        statement: "Lying down soon after a meal can make reflux worse.",
        verdict: "fact",
        explanation:
          "When upright, gravity helps keep stomach contents down. Waiting a few hours after eating before lying down can reduce symptoms.",
      },
      {
        statement: "Frequent heartburn is harmless and never needs checking.",
        verdict: "myth",
        explanation:
          "Persistent reflux can inflame the oesophagus over time. Frequent symptoms, or difficulty swallowing, should be assessed by a doctor.",
      },
    ],
    references: [
      { title: "Heartburn and acid reflux", publisher: NHS, url: "https://www.nhs.uk/conditions/heartburn-and-acid-reflux/" },
      { title: "Acid reflux (GER & GERD) in adults", publisher: "National Institute of Diabetes and Digestive and Kidney Diseases (US NIH)", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults" },
    ],
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export const getCondition = (slug: string) =>
  conditions.find((c) => c.slug === slug);

export const getCategory = (id: CategoryId) =>
  categories.find((c) => c.id === id)!;

/** Featured conditions on the home-page teaser, in order */
export const featuredSlugs = [
  "diabetes",
  "hypertension",
  "asthma",
  "chronic-kidney-disease",
];
