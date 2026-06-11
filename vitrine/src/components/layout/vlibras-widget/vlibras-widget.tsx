import { useEffect, useRef } from "react";

const VLIBRAS_SCRIPT_ID = "vlibras-plugin-script";
const VLIBRAS_SCRIPT_SRC = "https://vlibras.gov.br/app/vlibras-plugin.js";
const VLIBRAS_ROOT = "https://vlibras.gov.br/app";

function initVLibrasWidget() {
  if (window.VLibras) {
    new window.VLibras.Widget(VLIBRAS_ROOT);
  }
}

export function VLibrasWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.childElementCount > 0) {
      return;
    }

    container.innerHTML = `
      <div vw class="enabled">
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    `;

    const existingScript = document.getElementById(VLIBRAS_SCRIPT_ID);
    if (existingScript) {
      initVLibrasWidget();
      return;
    }

    const script = document.createElement("script");
    script.id = VLIBRAS_SCRIPT_ID;
    script.src = VLIBRAS_SCRIPT_SRC;
    script.async = true;
    script.onload = initVLibrasWidget;
    document.body.appendChild(script);
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
