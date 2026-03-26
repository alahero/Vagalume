import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };

type State = { error: Error | null };

/**
 * Muestra un fallo de React en pantalla (útil si WebGL o un módulo rompe el árbol).
 */
export default class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Vagalume:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            padding: "2rem",
            background: "#0a0a0a",
            color: "#e8e2d0",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1rem", letterSpacing: "0.2em" }}>ERROR AL CARGAR LA APP</h1>
          <pre
            style={{
              marginTop: "1rem",
              whiteSpace: "pre-wrap",
              fontSize: "0.85rem",
              opacity: 0.85,
            }}
          >
            {this.state.error.message}
          </pre>
          <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.7 }}>
            Revisa la consola del navegador (F12). Si el error menciona WebGL, prueba otro navegador o
            actualiza drivers.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
