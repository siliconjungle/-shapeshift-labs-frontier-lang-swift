import assert from 'node:assert/strict';
import {
  SwiftLanguagePackage,
  SwiftParserAstFormat,
  SwiftSourceLanguage,
  createSwiftNativeImporterAdapter,
  createSwiftLanguageCapabilityMatrix,
  importSwiftSource,
  createSwiftSemanticImportSidecar
} from '../dist/index.js';

const ast = {
  kind: 'SourceFileSyntax',
  statements: [{
    kind: 'ImportDeclSyntax',
    importPath: [{ name: { text: 'Foundation' } }],
    startLine: 1,
    startColumn: 1
  }, {
    kind: 'StructDeclSyntax',
    identifier: { text: 'Todo' },
    startLine: 2,
    startColumn: 1,
    members: [{
      kind: 'VariableDeclSyntax',
      bindings: [{ kind: 'PatternBindingSyntax', pattern: { identifier: { text: 'title' } } }]
    }, {
      kind: 'FunctionDeclSyntax',
      identifier: { text: 'addTodo' },
      signature: { parameterClause: { parameters: [{ kind: 'FunctionParameterSyntax', firstName: { text: 'title' }, type: { name: 'String' } }] } },
      body: { kind: 'CodeBlockSyntax', statements: [] }
    }]
  }]
};

const adapter = createSwiftNativeImporterAdapter();
assert.equal(adapter.language, SwiftSourceLanguage);
assert.equal(SwiftLanguagePackage.parserAstFormat, SwiftParserAstFormat);
assert.equal(SwiftLanguagePackage.version, '0.1.10');
assert.equal(SwiftLanguagePackage.compilerVersion, '0.2.68');

const imported = await importSwiftSource({
  sourcePath: 'Sources/Todo.swift',
  sourceText: 'import Foundation\nstruct Todo { var title: String\n func addTodo(_ title: String) {} }\n',
  ast
});

assert.equal(imported.adapter.parser, 'swift-syntax');
assert.equal(imported.metadata.astFormat, 'swift-syntax');
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'Foundation' && symbol.kind === 'module'), true);
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'Todo' && symbol.kind === 'struct'), true);
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'title' && symbol.kind === 'property'), true);
assert.equal(imported.semanticIndex.symbols.some((symbol) => symbol.name === 'addTodo' && symbol.kind === 'function'), true);
assert.equal(imported.metadata.nativeImportLossSummary.exactAst, true);

const capability = createSwiftLanguageCapabilityMatrix({ imports: [imported], targets: ['typescript', 'rust'] });
assert.equal(capability.kind, 'frontier.lang.universalCapabilityMatrix');
assert.equal(capability.languages.length, 1);
assert.equal(capability.languages[0].language, SwiftSourceLanguage);
assert.equal(capability.summary.imports, 1);
assert.equal(capability.summary.targetEntries, 2);

const sidecar = await createSwiftSemanticImportSidecar({
  sourcePath: 'Sources/Todo.swift',
  sourceText: 'import Foundation\nstruct Todo { var title: String\n func addTodo(_ title: String) {} }\n',
  ast
}, { id: 'swift-sidecar', regionPrefix: 'swift' });

assert.equal(sidecar.id, 'swift-sidecar');
assert.equal(sidecar.symbols.some((symbol) => symbol.name === 'addTodo'), true);
console.log('@shapeshift-labs/frontier-lang-swift smoke ok');
