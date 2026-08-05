import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const inventoryPath = path.join(
  rootDir,
  "docs/fase-4/etapa-3/ETAPA_3_INITIAL_INVENTORY.json",
);
const outputDir =
  process.env.ETAPA3_INVENTORY_OUTPUT ||
  path.join(rootDir, "artifacts/fase-4-etapa-3-inventory");

const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const expected = {
  commitBase: "b8faffae63a875a542d6f6f29e5401ea41f471ab",
  production: "https://bdf-navy.vercel.app",
  filesScanned: 98,
  cases: 51,
  visibleTextNodes: 2902,
  below12pxOccurrences: 915,
  functionalBelow14pxOccurrences: 693,
  arbitraryUtilities: 136,
  fontResourceRequests: 0,
  registeredFontFaces: 0,
};

const actual = {
  commitBase: inventory.commitBase,
  production: inventory.production,
  filesScanned: inventory.source?.filesScanned,
  cases: inventory.rendered?.cases,
  visibleTextNodes: inventory.rendered?.visibleTextNodes,
  below12pxOccurrences: inventory.rendered?.below12pxOccurrences,
  functionalBelow14pxOccurrences:
    inventory.rendered?.functionalBelow14pxOccurrences,
  arbitraryUtilities: inventory.source?.arbitraryUtilities,
  fontResourceRequests: inventory.rendered?.fontResourceRequests,
  registeredFontFaces: inventory.rendered?.registeredFontFaces,
};

const mismatches = Object.entries(expected)
  .filter(([key, value]) => actual[key] !== value)
  .map(
    ([key, value]) =>
      `${key}: esperado ${JSON.stringify(value)}, encontrado ${JSON.stringify(actual[key])}`,
  );

if (mismatches.length) {
  console.error(
    [
      "O inventário inicial autoritativo foi alterado ou ficou inconsistente.",
      ...mismatches,
    ].join("\n"),
  );
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(
  inventoryPath,
  path.join(outputDir, "ETAPA_3_INITIAL_INVENTORY.json"),
);
fs.writeFileSync(
  path.join(outputDir, "inventory-verification.json"),
  `${JSON.stringify(
    {
      verifiedAt: new Date().toISOString(),
      source: "docs/fase-4/etapa-3/ETAPA_3_INITIAL_INVENTORY.json",
      status: "verified",
      expected,
      actual,
      note:
        "O inventário inicial é um registro histórico congelado. A implementação atual é medida separadamente pelo workflow de validação da Etapa 3.",
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      status: "verified",
      ...actual,
    },
    null,
    2,
  ),
);
