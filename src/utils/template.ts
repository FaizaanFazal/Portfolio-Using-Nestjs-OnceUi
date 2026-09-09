// Fills `{{token}}` placeholders in JSON content strings so the JSON files
// stay editable in isolation while still being able to reference shared
// values like the person's name (single source of truth in person.json).
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => values[key] ?? match);
}
