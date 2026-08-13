import { useCallback, useEffect, useRef, useState } from "react";

const BASKET_HALF_WIDTH = 9;
const KEY_MOVE_SPEED = 55;

function clamp(x: number) {
  return Math.min(100 - BASKET_HALF_WIDTH, Math.max(BASKET_HALF_WIDTH, x));
}

export function useBasketControl() {
  const [basketX, setBasketX] = useState(50);
  const basketXRef = useRef(50);
  const keysRef = useRef({ left: false, right: false });
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keysRef.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keysRef.current.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keysRef.current.right = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    lastFrameRef.current = performance.now();

    function loop(timestamp: number) {
      const dt = (timestamp - lastFrameRef.current) / 1000;
      lastFrameRef.current = timestamp;

      if (keysRef.current.left || keysRef.current.right) {
        const direction = keysRef.current.left ? -1 : 1;
        const next = clamp(basketXRef.current + direction * KEY_MOVE_SPEED * dt);
        basketXRef.current = next;
        setBasketX(next);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = useCallback((clientX: number, containerRect: DOMRect) => {
    const relative = ((clientX - containerRect.left) / containerRect.width) * 100;
    const next = clamp(relative);
    basketXRef.current = next;
    setBasketX(next);
  }, []);

  return { basketX, basketXRef, handlePointerMove };
}