import assert from 'node:assert/strict';
import { importSwiftSource, createSwiftSemanticImportSidecar } from '../dist/index.js';

for (let i = 0; i < 40; i += 1) {
  const ast = {
    kind: 'SourceFileSyntax',
    statements: [{
      kind: 'StructDeclSyntax',
      identifier: { text: `Todo${i}` },
      members: [{
        kind: 'VariableDeclSyntax',
        bindings: [{ kind: 'PatternBindingSyntax', pattern: { identifier: { text: 'title' } } }]
      }, {
        kind: 'FunctionDeclSyntax',
        identifier: { text: `addTodo${i}` },
        body: { kind: 'CodeBlockSyntax', statements: [] }
      }]
    }]
  };
  const imported = await importSwiftSource({
    sourcePath: `Sources/Todo${i}.swift`,
    sourceText: `struct Todo${i} { var title: String\n func addTodo${i}() {} }\n`,
    ast
  });
  assert.equal(imported.metadata.astFormat, 'swift-syntax');
  assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === `Todo${i}`), true);
  assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === `addTodo${i}`), true);
  const sidecar = await createSwiftSemanticImportSidecar({
    sourcePath: `Sources/Todo${i}.swift`,
    sourceText: `struct Todo${i} { var title: String\n func addTodo${i}() {} }\n`,
    ast
  }, { id: `swift-fuzz-${i}` });
  assert.equal(sidecar.imports.length, 1);
}

console.log('@shapeshift-labs/frontier-lang-swift fuzz ok');
