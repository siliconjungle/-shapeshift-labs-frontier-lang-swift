import {
  SwiftLanguagePackage,
  createSwiftNativeImporterAdapter,
  createSwiftLanguageCapabilityMatrix,
  importSwiftSource,
  createSwiftSemanticImportSidecar
} from '../src/index.js';
import type {
  SwiftLanguageCapabilityMatrixOptions,
  SwiftSourceImportInput,
  SwiftSourceImportOptions,
  SwiftSemanticImportSidecarOptions
} from '../src/index.js';
import type { NativeImporterAdapter, UniversalCapabilityMatrix } from '@shapeshift-labs/frontier-lang-compiler';

const adapter: NativeImporterAdapter = createSwiftNativeImporterAdapter();
const input: SwiftSourceImportInput = { sourceText: '', ast: {} };
const options: SwiftSourceImportOptions = { adapterOptions: {} };
const capabilityOptions: SwiftLanguageCapabilityMatrixOptions = { targets: ['typescript'] };
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
const capability: UniversalCapabilityMatrix = createSwiftLanguageCapabilityMatrix(capabilityOptions);

void adapter;
void input;
void options;
void capabilityOptions;
void capability;
void sidecarOptions;
void packageName;
void importSwiftSource(input, options);
void createSwiftSemanticImportSidecar(input, sidecarOptions);
