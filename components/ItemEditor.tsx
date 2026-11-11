"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useI18n } from "@/lib/i18n";
import { useAdmin, type Kind, type LibraryItem, type Nutrition } from "@/lib/adminStore";

const TITLE: Record<Kind, string> = {
  foods: "admin.content.foods",
  recipes: "admin.content.recipes",
  exercises: "admin.content.exercises",
  articles: "admin.content.articles",
};

const FOOD_CATEGORIES = [
  "Heart-Healthy Foods",
  "Fruits and Vegetables",
  "Healthy Fats",
  "Whole Grains",
  "Antioxidant-Rich Foods",
  "Hydration",
  "Balanced Nutrition",
];

const EXERCISE_CATEGORIES = [
  "Cardiovascular Exercise",
  "Strength Training",
  "Mobility and Stretching",
  "Pelvic Floor Education",
  "Relaxation Exercises",
];

const RECIPE_CATEGORIES = ["breakfast", "lunch", "dinner", "snack"];

const ARTICLE_MODULES = [
  { id: "sleep", label: "Sleep and Recovery" },
  { id: "stress", label: "Stress and Mindset" },
  { id: "ed", label: "ED Knowledge Center" },
];

type Draft = Omit<LibraryItem, "id" | "kind">;

function blank(kind: Kind): Draft {
  const base: Draft = { slug: "", summary: "", image: null, published: false, clinicalReview: "pending" };
  if (kind === "foods") {
    return {
      ...base,
      name: "",
      category: FOOD_CATEGORIES[0],
      description: "",
      nutrition: {
        serving: "",
        calories: "",
        protein: "",
        carbohydrates: "",
        fat: "",
        fiber: "",
        note: "Approximate values for education.",
      },
      nutrients: "",
      context: "",
      mealIdeas: "",
    };
  }
  if (kind === "recipes") {
    return {
      ...base,
      title: "",
      description: "",
      minutes: 20,
      servings: 2,
      difficulty: "Easy",
      category: "breakfast",
      ingredients: "",
      steps: "",
      nutrition: { calories: "", protein: "", carbohydrates: "", fat: "", note: "Estimated per serving." },
    };
  }
  if (kind === "exercises") {
    return {
      ...base,
      name: "",
      category: EXERCISE_CATEGORIES[0],
      description: "",
      instructions: "",
      duration: "10 minutes",
      repetitions: "As comfortable",
      safety: "Stop if you feel pain, dizziness, or chest discomfort.",
      contraindications: "Skip this if a clinician has limited your activity.",
    };
  }
  return {
    ...base,
    title: "",
    module: "sleep",
    category: "Education",
    body: "",
    minutes: 5,
    sources: "",
  };
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-mist">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-faint">{hint}</span>}
    </label>
  );
}

export function ItemEditor({ kind, itemId }: { kind: Kind; itemId: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const { ready, library, createItem, saveItem, deleteItem } = useAdmin();
  const adding = itemId === "new";

  const existing = adding ? null : library.find((i) => i.id === itemId);
  const [draft, setDraft] = useState<Draft | null>(adding ? blank(kind) : null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (existing && !draft) setDraft({ ...existing });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existing]);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  }

  function setNutrition(patch: Nutrition) {
    setDraft((d) => (d ? { ...d, nutrition: { ...(d.nutrition ?? {}), ...patch } } : d));
  }

  function upload(file: File) {
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result));
    reader.onerror = () => setMessage(t("admin.library.uploadFailed"));
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    if (adding) {
      const created = createItem(kind, draft);
      router.push(`/admin/content/${kind}/${created.id}`);
      return;
    }
    saveItem(itemId, draft);
    setMessage(t("admin.library.saved"));
  }

  function remove() {
    if (!window.confirm(t("admin.library.deleteConfirm"))) return;
    deleteItem(itemId);
    router.push(`/admin/content/${kind}`);
  }

  const heading = adding
    ? t("admin.library.newIn", { name: t(TITLE[kind]) })
    : t("admin.library.edit", { name: draft?.name || draft?.title || "" });

  return (
    <AdminShell>
      <div className="space-y-4">
        <Link href={`/admin/content/${kind}`} className="text-sm text-cyan">
          {t(TITLE[kind])}
        </Link>
        <h1 className="font-display text-3xl">{heading}</h1>

        {!draft && ready && <p className="text-sm text-mist">{t("admin.loading")}</p>}

        {draft && (
          <section className="app-card p-5">
            <form className="space-y-3" onSubmit={submit}>
              {(kind === "foods" || kind === "exercises") && (
                <Field label={t("admin.field.name")}>
                  <input
                    className="app-input"
                    value={draft.name ?? ""}
                    onChange={(e) => set("name", e.target.value)}
                    required
                  />
                </Field>
              )}

              {(kind === "articles" || kind === "recipes") && (
                <Field label={t("admin.field.title")}>
                  <input
                    className="app-input"
                    value={draft.title ?? ""}
                    onChange={(e) => set("title", e.target.value)}
                    required
                  />
                </Field>
              )}

              <Field label={t("admin.field.summary")}>
                <textarea
                  className="app-input min-h-20 py-3"
                  value={draft.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  required
                />
              </Field>

              {kind === "foods" && (
                <Field label={t("admin.field.category")}>
                  <select
                    className="app-input"
                    value={draft.category ?? FOOD_CATEGORIES[0]}
                    onChange={(e) => set("category", e.target.value)}
                  >
                    {FOOD_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {kind === "exercises" && (
                <Field label={t("admin.field.category")}>
                  <select
                    className="app-input"
                    value={draft.category ?? EXERCISE_CATEGORIES[0]}
                    onChange={(e) => set("category", e.target.value)}
                  >
                    {EXERCISE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {kind === "recipes" && (
                <Field label={t("admin.field.category")}>
                  <select
                    className="app-input"
                    value={draft.category ?? "breakfast"}
                    onChange={(e) => set("category", e.target.value)}
                  >
                    {RECIPE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {kind === "articles" && (
                <>
                  <Field label={t("admin.field.topic")}>
                    <select
                      className="app-input"
                      value={draft.module ?? "sleep"}
                      onChange={(e) => set("module", e.target.value)}
                    >
                      {ARTICLE_MODULES.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t("admin.field.category")}>
                    <input
                      className="app-input"
                      value={draft.category ?? ""}
                      onChange={(e) => set("category", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label={t("admin.field.minutes")}>
                    <input
                      className="app-input"
                      type="number"
                      min={1}
                      value={Number(draft.minutes ?? 5)}
                      onChange={(e) => set("minutes", Number(e.target.value))}
                    />
                  </Field>
                </>
              )}

              {(kind === "foods" || kind === "recipes" || kind === "articles") && (
                <Field label={t("admin.field.body")}>
                  <textarea
                    className="app-input min-h-40 py-3"
                    value={(kind === "articles" ? draft.body : draft.description) ?? ""}
                    onChange={(e) =>
                      set(kind === "articles" ? "body" : "description", e.target.value)
                    }
                    required
                  />
                </Field>
              )}

              {kind === "exercises" && (
                <Field label={t("admin.field.description")}>
                  <textarea
                    className="app-input min-h-28 py-3"
                    value={draft.description ?? ""}
                    onChange={(e) => set("description", e.target.value)}
                    required
                  />
                </Field>
              )}

              <Field label={t("admin.field.image")} hint={t("admin.field.imageHint")}>
                <input
                  className="text-sm"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) upload(file);
                  }}
                />
                {draft.image && <span className="mt-2 block text-xs text-faint">{t("admin.field.imageAttached")}</span>}
              </Field>

              {kind === "recipes" && (
                <>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field label={t("admin.field.minutes")}>
                      <input
                        className="app-input"
                        type="number"
                        min={1}
                        value={Number(draft.minutes ?? 15)}
                        onChange={(e) => set("minutes", Number(e.target.value))}
                      />
                    </Field>
                    <Field label={t("admin.field.servings")}>
                      <input
                        className="app-input"
                        type="number"
                        min={1}
                        value={Number(draft.servings ?? 2)}
                        onChange={(e) => set("servings", Number(e.target.value))}
                      />
                    </Field>
                    <Field label={t("admin.field.difficulty")}>
                      <select
                        className="app-input"
                        value={draft.difficulty ?? "Easy"}
                        onChange={(e) => set("difficulty", e.target.value)}
                      >
                        <option value="Easy">{t("admin.field.easy")}</option>
                        <option value="Moderate">{t("admin.field.moderate")}</option>
                      </select>
                    </Field>
                  </div>

                  <Field label={t("admin.field.ingredients")} hint={t("admin.field.ingredientsHint")}>
                    <textarea
                      className="app-input min-h-28 py-3"
                      value={draft.ingredients ?? ""}
                      onChange={(e) => set("ingredients", e.target.value)}
                    />
                  </Field>

                  <Field label={t("admin.field.steps")} hint={t("admin.field.onePerLine")}>
                    <textarea
                      className="app-input min-h-28 py-3"
                      value={draft.steps ?? ""}
                      onChange={(e) => set("steps", e.target.value)}
                    />
                  </Field>
                </>
              )}

              {kind === "foods" && (
                <>
                  <NutritionGrid value={draft.nutrition ?? {}} onChange={setNutrition} fiber />
                  <Field label={t("admin.field.nutrients")} hint={t("admin.field.onePerLine")}>
                    <textarea
                      className="app-input min-h-20 py-3"
                      value={draft.nutrients ?? ""}
                      onChange={(e) => set("nutrients", e.target.value)}
                    />
                  </Field>
                  <Field label={t("admin.field.context")}>
                    <textarea
                      className="app-input min-h-24 py-3"
                      value={draft.context ?? ""}
                      onChange={(e) => set("context", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label={t("admin.field.mealIdeas")} hint={t("admin.field.onePerLine")}>
                    <textarea
                      className="app-input min-h-20 py-3"
                      value={draft.mealIdeas ?? ""}
                      onChange={(e) => set("mealIdeas", e.target.value)}
                    />
                  </Field>
                </>
              )}

              {kind === "recipes" && <NutritionGrid value={draft.nutrition ?? {}} onChange={setNutrition} />}

              {kind === "exercises" && (
                <>
                  <Field label={t("admin.field.steps")} hint={t("admin.field.onePerLine")}>
                    <textarea
                      className="app-input min-h-24 py-3"
                      value={draft.instructions ?? ""}
                      onChange={(e) => set("instructions", e.target.value)}
                    />
                  </Field>
                  <Field label={t("admin.field.duration")}>
                    <input
                      className="app-input"
                      value={draft.duration ?? ""}
                      onChange={(e) => set("duration", e.target.value)}
                    />
                  </Field>
                  <Field label={t("admin.field.repetitions")}>
                    <input
                      className="app-input"
                      value={draft.repetitions ?? ""}
                      onChange={(e) => set("repetitions", e.target.value)}
                    />
                  </Field>
                  <Field label={t("admin.field.safety")}>
                    <textarea
                      className="app-input min-h-20 py-3"
                      value={draft.safety ?? ""}
                      onChange={(e) => set("safety", e.target.value)}
                      required
                    />
                  </Field>
                  <Field label={t("admin.field.skip")}>
                    <textarea
                      className="app-input min-h-20 py-3"
                      value={draft.contraindications ?? ""}
                      onChange={(e) => set("contraindications", e.target.value)}
                      required
                    />
                  </Field>
                </>
              )}

              {kind === "articles" && (
                <Field label={t("admin.field.sources")} hint={t("admin.field.sourcesHint")}>
                  <textarea
                    className="app-input min-h-20 py-3"
                    value={draft.sources ?? ""}
                    onChange={(e) => set("sources", e.target.value)}
                  />
                </Field>
              )}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={(e) => set("published", e.target.checked)}
                />
                {t("admin.field.published")}
              </label>

              <Field label={t("admin.field.review")}>
                <select
                  className="app-input"
                  value={draft.clinicalReview}
                  onChange={(e) => set("clinicalReview", e.target.value as "pending" | "approved")}
                >
                  <option value="pending">{t("admin.option.pending")}</option>
                  <option value="approved">{t("admin.option.approved")}</option>
                </select>
              </Field>

              {message && (
                <p className="text-sm text-mist" role="status">
                  {message}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                <button type="submit" className="app-btn w-auto">
                  {t("admin.save")}
                </button>
                {!adding && (
                  <button type="button" onClick={remove} className="app-btn-danger">
                    {t("admin.library.delete")}
                  </button>
                )}
              </div>
            </form>
          </section>
        )}
      </div>
    </AdminShell>
  );
}

function NutritionGrid({
  value,
  onChange,
  fiber = false,
}: {
  value: Nutrition;
  onChange: (patch: Nutrition) => void;
  fiber?: boolean;
}) {
  const { t } = useI18n();
  const keys: { key: keyof Nutrition; label: string }[] = fiber
    ? [
        { key: "serving", label: t("admin.field.nutritionServing") },
        { key: "calories", label: t("admin.field.nutritionCalories") },
        { key: "protein", label: t("admin.field.nutritionProtein") },
        { key: "carbohydrates", label: t("admin.field.nutritionCarbs") },
        { key: "fat", label: t("admin.field.nutritionFat") },
        { key: "fiber", label: t("admin.field.nutritionFiber") },
        { key: "note", label: t("admin.field.nutritionNote") },
      ]
    : [
        { key: "calories", label: t("admin.field.nutritionCalories") },
        { key: "protein", label: t("admin.field.nutritionProtein") },
        { key: "carbohydrates", label: t("admin.field.nutritionCarbs") },
        { key: "fat", label: t("admin.field.nutritionFat") },
        { key: "note", label: t("admin.field.nutritionNote") },
      ];

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {keys.map((row) => (
        <Field key={row.key} label={row.label}>
          <input
            className="app-input"
            value={value[row.key] ?? ""}
            onChange={(e) => onChange({ [row.key]: e.target.value } as Nutrition)}
          />
        </Field>
      ))}
    </div>
  );
}
