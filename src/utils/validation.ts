// Define las reglas de validación que pueden aplicarse a cada campo
type ValidationRule = {
  required?: boolean; // Indica si el campo es obligatorio
  minLength?: number; // Especifica la longitud mínima requerida para el campo
  pattern?: RegExp; // Define un patrón (expresión regular) que el campo debe cumplir
  matchField?: string; // Campo con el que el valor debe coincidir (por ejemplo, confirmación de contraseña)
  customMessage?: string; // Mensaje de error personalizado
};

// Define el esquema de validación como un objeto donde las claves son nombres de campo
// y los valores son reglas de validación
export type ValidationSchema = {
  [field: string]: ValidationRule; // Cada campo tiene sus reglas de validación asociadas
};

// Función para validar un formulario basado en valores de entrada y un esquema de validación
export function validateForm(
  values: { [key: string]: string }, // Objeto con los valores del formulario
  schema: ValidationSchema // Esquema de validación que contiene las reglas para cada campo
): string[] {
  const errors: string[] = []; // Array para almacenar los mensajes de error

  // Itera sobre cada campo definido en el esquema de validación
  for (const field in schema) {
    const value = values[field]; // Valor del campo actual en el formulario
    const rules = schema[field]; // Reglas de validación para este campo

    // Verifica si el campo es obligatorio y está vacío
    if (rules.required && !value.trim()) {
      errors.push(
        // Si el campo está vacío, agrega un mensaje de error
        `The ${field} is required.` || (rules.customMessage as string)
      );
      continue; // Pasa al siguiente campo una vez que encuentra un error
    }

    // Verifica si hay un patrón (regex) definido y si el valor no lo cumple
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(
        // Agrega un mensaje de error si el valor no coincide con el patrón
        `The ${field} is not valid.` || (rules.customMessage as string)
      );
      continue; // Pasa al siguiente campo
    }

    // Verifica si hay una longitud mínima definida y si el valor no la cumple
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(
        // Agrega un mensaje de error si la longitud es menor a la requerida
        `The ${field} must have at least ${rules.minLength} characters.` ||
          (rules.customMessage as string)
      );
      continue; // Pasa al siguiente campo
    }

    // Verifica si el campo debe coincidir con otro y si no lo hace
    if (rules.matchField && value !== values[rules.matchField]) {
      errors.push(
        // Agrega un mensaje de error si los valores no coinciden
        `The ${rules.matchField}s they do not match.` ||
          (rules.customMessage as string)
      );
    }
  }

  // Devuelve un array con todos los errores encontrados
  return errors;
}
