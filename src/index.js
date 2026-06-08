import {
  NativeImportLanguageProfiles,
  createSemanticImportSidecar,
  createSwiftSyntaxNativeImporterAdapter,
  createUniversalCapabilityMatrix,
  runNativeImporterAdapter
} from '@shapeshift-labs/frontier-lang-compiler';

export const SwiftSourceLanguage = 'swift';
export const SwiftParser = 'swift-syntax';
export const SwiftParserAstFormat = 'swift-syntax';
export const SwiftSupportedExtensions = Object.freeze(['.swift']);

export const SwiftLanguagePackage = Object.freeze({
  packageName: '@shapeshift-labs/frontier-lang-swift',
  version: '0.1.12',
  sourceLanguage: SwiftSourceLanguage,
  parser: SwiftParser,
  parserAstFormat: SwiftParserAstFormat,
  supportedExtensions: SwiftSupportedExtensions,
  compilerPackage: '@shapeshift-labs/frontier-lang-compiler',
  compilerVersion: '0.2.70'
});

export const SwiftCapabilityLanguageProfiles = Object.freeze(
  NativeImportLanguageProfiles.filter((profile) => profile.language === SwiftSourceLanguage)
);

export { createSwiftSyntaxNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export function createSwiftNativeImporterAdapter(options = {}) {
  return createSwiftSyntaxNativeImporterAdapter(options);
}

export function createSwiftLanguageCapabilityMatrix(options = {}) {
  const languages = options.languages ?? SwiftCapabilityLanguageProfiles;
  const adapters = options.adapters ?? [createSwiftNativeImporterAdapter(options.importerOptions ?? {})];
  return createUniversalCapabilityMatrix({ ...options, languages, adapters });
}

function mergeAdapterOptions(input = {}, options = {}) {
  const adapterOptions = {
    ...(options.adapterOptions ?? {}),
    ...(input.adapterOptions ?? {})
  };
  for (const alias of ['ast', 'nativeAst', 'sourceFile', 'sourceFileSyntax', 'root']) {
    if (Object.prototype.hasOwnProperty.call(input, alias)) {
      adapterOptions[alias] = input[alias];
    }
  }
  return adapterOptions;
}

function pickSidecarOptions(options = {}) {
  if (options.sidecarOptions) {
    return options.sidecarOptions;
  }
  const picked = {};
  for (const key of ['id', 'generatedAt', 'regionPrefix']) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      picked[key] = options[key];
    }
  }
  return picked;
}

export async function importSwiftSource(input = {}, options = {}) {
  const importerOptions = {
    ...(options.importerOptions ?? {}),
    ...(input.importerOptions ?? {})
  };
  const adapter = input.adapter ?? createSwiftNativeImporterAdapter(importerOptions);
  return runNativeImporterAdapter(adapter, {
    sourceText: input.sourceText ?? '',
    sourcePath: input.sourcePath,
    sourceHash: input.sourceHash,
    language: input.language ?? options.language ?? SwiftSourceLanguage,
    parser: input.parser ?? options.parser ?? SwiftParser,
    parserVersion: input.parserVersion ?? options.parserVersion,
    adapterOptions: mergeAdapterOptions(input, options),
    adapterMetadata: {
      packageName: SwiftLanguagePackage.packageName,
      ...(options.adapterMetadata ?? {}),
      ...(input.adapterMetadata ?? {})
    },
    evidence: input.evidence,
    metadata: input.metadata
  });
}

export async function createSwiftSemanticImportSidecar(input = {}, options = {}) {
  const importResult = await importSwiftSource(input, options);
  return createSemanticImportSidecar(importResult, pickSidecarOptions(options));
}
