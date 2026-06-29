import type {
  NativeImporterAdapter,
  NativeImporterAdapterImportResult,
  NativeImportLanguageProfile,
  SemanticImportSidecar,
  SemanticImportSidecarOptions,
  SwiftSyntaxNativeImporterAdapterOptions,
  UniversalCapabilityMatrix,
  UniversalCapabilityMatrixOptions
} from '@shapeshift-labs/frontier-lang-compiler';

export declare const SwiftSourceLanguage: 'swift';
export declare const SwiftParser: 'swift-syntax';
export declare const SwiftParserAstFormat: 'swift-syntax';
export declare const SwiftSupportedExtensions: readonly string[];

export interface SwiftLanguagePackageMetadata {
  readonly packageName: '@shapeshift-labs/frontier-lang-swift';
  readonly version: '0.1.18';
  readonly sourceLanguage: 'swift';
  readonly parser: 'swift-syntax';
  readonly parserAstFormat: 'swift-syntax';
  readonly supportedExtensions: readonly string[];
  readonly compilerPackage: '@shapeshift-labs/frontier-lang-compiler';
  readonly compilerVersion: '0.2.244';
}

export declare const SwiftLanguagePackage: SwiftLanguagePackageMetadata;
export declare const SwiftCapabilityLanguageProfiles: readonly NativeImportLanguageProfile[];

export { createSwiftSyntaxNativeImporterAdapter } from '@shapeshift-labs/frontier-lang-compiler';

export interface SwiftSourceImportInput {
  readonly sourceText?: string;
  readonly sourcePath?: string;
  readonly sourceHash?: string;
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly adapter?: NativeImporterAdapter;
  readonly importerOptions?: SwiftSyntaxNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
  readonly evidence?: readonly unknown[];
  readonly metadata?: Record<string, unknown>;
  readonly ast?: unknown;
  readonly nativeAst?: unknown;
  readonly sourceFile?: unknown;
  readonly sourceFileSyntax?: unknown;
  readonly root?: unknown;
}

export interface SwiftSourceImportOptions {
  readonly language?: string;
  readonly parser?: string;
  readonly parserVersion?: string;
  readonly importerOptions?: SwiftSyntaxNativeImporterAdapterOptions;
  readonly adapterOptions?: Record<string, unknown>;
  readonly adapterMetadata?: Record<string, unknown>;
}

export interface SwiftSemanticImportSidecarOptions extends SwiftSourceImportOptions {
  readonly sidecarOptions?: SemanticImportSidecarOptions;
  readonly id?: string;
  readonly generatedAt?: number;
  readonly regionPrefix?: string;
}

export interface SwiftLanguageCapabilityMatrixOptions extends UniversalCapabilityMatrixOptions {
  readonly importerOptions?: SwiftSyntaxNativeImporterAdapterOptions;
}

export declare function createSwiftNativeImporterAdapter(options?: SwiftSyntaxNativeImporterAdapterOptions): NativeImporterAdapter;
export declare function createSwiftLanguageCapabilityMatrix(options?: SwiftLanguageCapabilityMatrixOptions): UniversalCapabilityMatrix;
export declare function importSwiftSource(input?: SwiftSourceImportInput, options?: SwiftSourceImportOptions): Promise<NativeImporterAdapterImportResult>;
export declare function createSwiftSemanticImportSidecar(input?: SwiftSourceImportInput, options?: SwiftSemanticImportSidecarOptions): Promise<SemanticImportSidecar>;
