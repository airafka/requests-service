import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const processTokens = () => {
  const tokensPath = join(__dirname, "tokens.json");
  const tokensRaw = JSON.parse(readFileSync(tokensPath, "utf-8"));

  const primitives = {};
  if (tokensRaw["Primities/Mode 1"]) {
    const collectPrimitives = (obj, path = []) => {
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object") {
          if ("value" in value && "type" in value) {
            const fullPath = [...path, key].join(".");
            primitives[fullPath] = value.value;
          } else {
            collectPrimitives(value, [...path, key]);
          }
        }
      }
    };
    collectPrimitives(tokensRaw["Primities/Mode 1"]);
  }

  console.log(`✅ Загружено примитивов: ${Object.keys(primitives).length}`);

  const unresolvedRefs = new Set();

  const resolveRefs = (obj, currentPath = []) => {
    if (Array.isArray(obj)) {
      return obj.map((item, idx) => resolveRefs(item, [...currentPath, idx]));
    }
    if (obj && typeof obj === "object") {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (
          key === "value" &&
          typeof value === "string" &&
          value.startsWith("{") &&
          value.endsWith("}")
        ) {
          const refName = value.slice(1, -1);
          if (primitives[refName]) {
            result[key] = primitives[refName];
          } else {
            unresolvedRefs.add(refName);
            result[key] = value;
          }
        } else {
          result[key] = resolveRefs(value, [...currentPath, key]);
        }
      }
      return result;
    }
    return obj;
  };

  const resolved = resolveRefs(tokensRaw);

  if (unresolvedRefs.size > 0) {
    console.warn(`⚠️  Неразрешённые ссылки (${unresolvedRefs.size}):`);
    Array.from(unresolvedRefs)
      .slice(0, 10)
      .forEach((ref) => {
        console.warn(`   - {${ref}}`);
      });
    if (unresolvedRefs.size > 10) {
      console.warn(`   ... и ещё ${unresolvedRefs.size - 10}`);
    }
  }

  return resolved;
};

const processedTokens = processTokens();

export default {
  tokens: processedTokens,

  hooks: {
    formats: {
      "custom/structured-tokens": ({ dictionary }) => {
        const allTokens = dictionary.allTokens || [];

        const buildStructure = () => {
          const structure = {};

          allTokens.forEach((token) => {
            const path = token.path || [];

            if (path[0] === "$themes" || path[0] === "$metadata") {
              return;
            }

            let relevantPath = path;

            if (path[0] === "Primities/Mode 1") {
              relevantPath = path.slice(1);

              if (!structure.primitives) {
                structure.primitives = {};
              }

              let current = structure.primitives;
              for (let i = 0; i < relevantPath.length - 1; i++) {
                const key = relevantPath[i];
                if (!current[key]) {
                  current[key] = {};
                }
                current = current[key];
              }

              const lastKey = relevantPath[relevantPath.length - 1];
              current[lastKey] = token.value;
              return;
            }

            if (path[0] === "Tokens/Value") {
              relevantPath = path.slice(1);
            }

            if (relevantPath.length === 0) return;

            let current = structure;

            for (let i = 0; i < relevantPath.length - 1; i++) {
              const key = relevantPath[i];
              const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);

              if (!current[normalizedKey]) {
                current[normalizedKey] = {};
              }
              current = current[normalizedKey];
            }

            const lastKey = relevantPath[relevantPath.length - 1];
            const normalizedLastKey = /^[\d_]/.test(lastKey)
              ? lastKey
              : lastKey.charAt(0).toLowerCase() + lastKey.slice(1);

            current[normalizedLastKey] = token.value;
          });

          return structure;
        };

        const generateTSCode = (obj, indent = 2) => {
          const spaces = " ".repeat(indent);
          const lines = [];

          for (const [key, value] of Object.entries(obj)) {
            if (
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value)
            ) {
              lines.push(
                `${spaces}${key}: {\n${generateTSCode(value, indent + 2)}\n${spaces}}`
              );
            } else {
              const quotedKey = /^[\d_]/.test(key) ? `"${key}"` : key;
              lines.push(`${spaces}${quotedKey}: ${JSON.stringify(value)}`);
            }
          }

          return lines.join(",\n");
        };

        const structure = buildStructure();

        return `/**
 * Design Tokens
 * 
 * @generated - НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ!
 * Генерируется автоматически из tokens/tokens.json
 * Команда для пересборки: npm run tokens:build
 * 
 * Структура:
 * - primitives: базовые примитивы из "Primities/Mode 1" (цвета, шрифты и т.д.)
 * - остальное: семантические токены из "Tokens/Value" (button_text, badge и т.д.)
 * 
 * Все ссылки вида {blue.800} автоматически резолвятся в конкретные значения
 */

export const tokens = {
${generateTSCode(structure)}
};

export type TokensType = typeof tokens;
`;
      },
    },
  },

  platforms: {
    ts: {
      transformGroup: "js",
      buildPath: "src/theme/",
      files: [
        {
          destination: "tokens.ts",
          format: "custom/structured-tokens",
        },
      ],
    },
  },
};
