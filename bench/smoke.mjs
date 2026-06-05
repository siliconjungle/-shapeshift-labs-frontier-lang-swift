import { performance } from 'node:perf_hooks';
import { importSwiftSource } from '../dist/index.js';

const iterations = 100;
const started = performance.now();
let symbols = 0;
for (let i = 0; i < iterations; i += 1) {
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
  symbols += imported.semanticIndex.symbols.length;
}
const elapsedMs = performance.now() - started;
console.log(JSON.stringify({
  package: '@shapeshift-labs/frontier-lang-swift',
  iterations,
  elapsedMs: Number(elapsedMs.toFixed(3)),
  importsPerSecond: Number((iterations / (elapsedMs / 1000)).toFixed(2)),
  symbols
}, null, 2));
