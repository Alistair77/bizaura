declare module "ogl" {
  export class Renderer {
    constructor(options?: {
      alpha?: boolean;
      antialias?: boolean;
      canvas?: HTMLCanvasElement;
      [key: string]: unknown;
    });
    gl: WebGLRenderingContext;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    render(scene: unknown, camera?: unknown): void;
  }
  export class Geometry {
    constructor(gl: WebGLRenderingContext, attributes?: Record<string, unknown>);
  }
  export class Program {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms: Record<string, { value: unknown }>;
      },
    );
    uniforms: Record<string, { value: unknown }>;
  }
  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: { geometry: unknown; program: Program });
  }
  export class Triangle extends Geometry {
    constructor(gl: WebGLRenderingContext);
  }
}
