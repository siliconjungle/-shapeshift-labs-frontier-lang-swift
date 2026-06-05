import {
  SwiftLanguagePackage,
  createSwiftNativeImporterAdapter,
  importSwiftSource,
  createSwiftSemanticImportSidecar
} from '../src/index.js';
import type {
  SwiftSourceImportInput,
  SwiftSourceImportOptions,
  SwiftSemanticImportSidecarOptions
} from '../src/index.js';
import type { NativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

const adapter: NativeImporterAdapter = createSwiftNativeImporterAdapter();
const input: SwiftSourceImportInput = { sourceText: '', ast: {} };
const options: SwiftSourceImportOptions = { adapterOptions: {} };
const sidecarOptions: SwiftSemanticImportSidecarOptions = {
  id: 'sidecar',
  generatedAt: 1710000000000,
  regionPrefix: 'src',
  sidecarOptions: {
    id: 'nested-sidecar',
    generatedAt: 1710000000001
  }
};
const packageName: '@shapeshift-labs/frontier-lang-swift' = SwiftLanguagePackage.packageName;

void adapter;
void input;
void options;
void sidecarOptions;
void packageName;
void importSwiftSource(input, options);
void createSwiftSemanticImportSidecar(input, sidecarOptions);
