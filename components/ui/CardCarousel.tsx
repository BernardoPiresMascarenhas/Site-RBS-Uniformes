"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export interface CarouselSlide {
  src: string;
  alt: string;
  href: string;
  /** Nome da peça, usado no rótulo acessível do link e dos indicadores. */
  caption: string;
}

/** Tempo de cada foto na tela antes de passar para a próxima. */
const INTERVALO_MS = 3500;
/** Arrasto mínimo (px) para o toque contar como troca de slide e não clique. */
const LIMIAR_ARRASTO = 40;

/**
 * Primeira posição (a partir de `from`) cuja foto não está em `taken`. Se todas
 * estiverem ocupadas, cai na seguinte, sem pular nada.
 */
function nextFree(list: string[], from: number, taken: Set<string>) {
  for (let step = 0; step < list.length; step++) {
    const index = (from + step) % list.length;
    if (!taken.has(list[index])) return index;
  }
  return from % list.length;
}

interface GroupValue {
  active: number[];
  go: (card: number, index: number) => void;
  setPaused: (card: number, paused: boolean) => void;
}

const GroupContext = createContext<GroupValue | null>(null);

/**
 * Sincroniza vários carrosséis: um relógio só para todos, e a foto que cada um
 * mostra nunca é a mesma de outro no mesmo instante. Uma peça que existe em
 * mais de uma linha continua em todas elas, mas em momentos diferentes.
 *
 * `lists[i]` é a lista de fotos (`src`) do carrossel `i`.
 */
export function CardCarouselGroup({
  lists,
  children,
}: {
  lists: string[][];
  children: ReactNode;
}) {
  const [active, setActive] = useState<number[]>(() => {
    const result: number[] = [];
    const taken = new Set<string>();
    lists.forEach((list) => {
      const index = list.length ? nextFree(list, 0, taken) : 0;
      if (list.length) taken.add(list[index]);
      result.push(index);
    });
    return result;
  });
  const paused = useRef<boolean[]>(lists.map(() => false));
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const next = [...current];
        lists.forEach((list, card) => {
          if (list.length < 2 || paused.current[card]) return;
          // ocupadas: o que os outros mostram agora (os que já andaram neste
          // ciclo contam na nova posição)
          const taken = new Set<string>();
          lists.forEach((other, i) => {
            if (i !== card && other.length) taken.add(other[next[i]]);
          });
          next[card] = nextFree(list, current[card] + 1, taken);
        });
        return next;
      });
    }, INTERVALO_MS);
    return () => window.clearInterval(timer);
  }, [lists, reducedMotion]);

  const go = useCallback((card: number, index: number) => {
    setActive((current) => {
      const next = [...current];
      next[card] = index;
      return next;
    });
  }, []);

  const setPaused = useCallback((card: number, value: boolean) => {
    paused.current[card] = value;
  }, []);

  return (
    <GroupContext.Provider value={{ active, go, setPaused }}>
      {children}
    </GroupContext.Provider>
  );
}

/**
 * Vitrine em carrossel dos cards do catálogo: as fotos deslizam para o lado
 * sozinhas e cada uma leva para a peça correspondente na página da linha.
 *
 * Pausa com o mouse em cima ou com foco do teclado, e não anda sozinho para
 * quem pediu menos movimento no sistema (`prefers-reduced-motion`).
 */
export function CardCarousel({
  slides,
  className,
  group,
}: {
  slides: CarouselSlide[];
  className?: string;
  /** Posição deste carrossel dentro de um `CardCarouselGroup`; sem ela, anda sozinho. */
  group?: number;
}) {
  const shared = useContext(GroupContext);
  const grouped = shared !== null && group !== undefined;
  const [localActive, setLocalActive] = useState(0);
  const [paused, setPausedLocal] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);

  const total = slides.length;
  const active = grouped ? shared.active[group] : localActive;
  const go = useCallback(
    (index: number) => {
      const wrapped = ((index % total) + total) % total;
      if (grouped) shared.go(group, wrapped);
      else setLocalActive(wrapped);
    },
    [total, grouped, shared, group],
  );
  const setPaused = useCallback(
    (value: boolean) => {
      setPausedLocal(value);
      if (grouped) shared.setPaused(group, value);
    },
    [grouped, shared, group],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (grouped || paused || reducedMotion || total < 2) return;
    const timer = window.setTimeout(() => go(active + 1), INTERVALO_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion, total, go, grouped]);

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse") return;
    dragStart.current = event.clientX;
    dragged.current = false;
  }

  function onPointerUp(event: PointerEvent) {
    if (dragStart.current === null) return;
    const delta = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) < LIMIAR_ARRASTO) return;
    dragged.current = true;
    go(delta < 0 ? active + 1 : active - 1);
  }

  const arrowClass =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-heading shadow-md transition-opacity duration-200 hover:bg-white focus-visible:opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100";

  return (
    <div
      className={cn("group/carousel relative overflow-hidden", className)}
      role="region"
      aria-roledescription="carrossel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (dragStart.current = null)}
    >
      <div
        className="flex h-full touch-pan-y transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <Link
              key={slide.src}
              href={slide.href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`Ver ${slide.caption}`}
              draggable={false}
              onClick={(event) => {
                // o toque que arrastou troca de slide, não abre a peça
                if (dragged.current) {
                  event.preventDefault();
                  dragged.current = false;
                }
              }}
              className="relative block h-full w-full shrink-0"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 100vw"
                // acima do padrão (75): o fundo escuro e liso das fotos é onde
                // a compressão vira faixa e mancha visíveis
                quality={90}
                // só a primeira entra no carregamento inicial; as demais vêm sob demanda
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
                className="object-cover transition-transform duration-500 group-hover/carousel:scale-[1.03]"
              />
            </Link>
          );
        })}
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(active - 1)}
            className={cn(arrowClass, "left-3")}
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            className={cn(arrowClass, "right-3")}
            aria-label="Próxima foto"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(index)}
                aria-label={`Mostrar ${slide.caption}`}
                aria-current={index === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === active ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
