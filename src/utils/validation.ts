type ValidationRule = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  matchField?: string;
  customMessage?: string;
};

export type ValidationSchema = {
  [field: string]: ValidationRule;
};

export function validateForm(
  values: { [key: string]: string },
  schema: ValidationSchema
): string[] {
  const errors: string[] = [];

  for (const field in schema) {
    const value = values[field];
    const rules = schema[field];

    // Solo se agrega el primer error encontrado y se pasa al siguiente campo

    // Verificación de campo requerido
    if (rules.required && !value.trim()) {
      errors.push(
        `El ${field} es requerido.` || (rules.customMessage as string)
      );
      continue;
    }

    // Verificación de patrón (regex) solo si el valor no está vacío
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(
        `El ${field} no es válido.` || (rules.customMessage as string)
      );
      continue;
    }

    // Verificación de longitud mínima
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(
        `El ${field} debe tener al menos ${rules.minLength} caracteres.` ||
          (rules.customMessage as string)
      );
      continue;
    }

    // Verificación de coincidencia de campo
    if (rules.matchField && value !== values[rules.matchField]) {
      errors.push(
        `Los ${rules.matchField}s no coinciden .` ||
          (rules.customMessage as string)
      );
    }
  }

  return errors;
}
