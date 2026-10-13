// Shared, allocation-free pointer state for the 3D scene.
// Canvas sits behind the hero copy, so we listen on window instead of
// relying on canvas pointer events.
export const pointer = { x: 0, y: 0, active: false };

let listening = 0;

function onMove(e: PointerEvent) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  pointer.active = true;
}

function onLeave() {
  pointer.active = false;
}

export function listenPointer(): () => void {
  if (listening++ === 0) {
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
  }
  return () => {
    if (--listening === 0) {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    }
  };
}
