import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useVagalumeMtEvents } from "../context/VagalumeMtEventsContext";

const BOOKING_URL = "https://mandalatickets.com/en/tulum/disco/Vagalume";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfLocalDay(y: number, m: number, d: number) {
  const t = new Date(y, m, d);
  t.setHours(0, 0, 0, 0);
  return t;
}

function todayStart() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

function isPastDay(y: number, m: number, d: number) {
  return startOfLocalDay(y, m, d) < todayStart();
}

function isToday(y: number, m: number, d: number) {
  const t = todayStart();
  return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
}

function localDateKey(y: number, monthIndex: number, d: number) {
  const mo = String(monthIndex + 1).padStart(2, "0");
  const day = String(d).padStart(2, "0");
  return `${y}-${mo}-${day}`;
}

function openBookingPage() {
  const a = document.createElement("a");
  a.href = BOOKING_URL;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

type DayCell =
  | { kind: "empty" }
  | {
      kind: "day";
      day: number;
      past: boolean;
      hasEvent: boolean;
      eventUrl: string | null;
      today: boolean;
    };

function buildDayCells(
  year: number,
  month: number,
  dayToEventUrl: Map<string, string>,
): DayCell[] {
  const first = new Date(year, month, 1);
  const pad = first.getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const cells: DayCell[] = [];
  for (let i = 0; i < pad; i++) cells.push({ kind: "empty" });
  for (let d = 1; d <= lastDay; d++) {
    const key = localDateKey(year, month, d);
    const eventUrl = dayToEventUrl.get(key) ?? null;
    const past = isPastDay(year, month, d);
    cells.push({
      kind: "day",
      day: d,
      past,
      hasEvent: Boolean(eventUrl),
      eventUrl,
      today: isToday(year, month, d),
    });
  }
  return cells;
}

/**
 * FAB de reserva con popover: resalta días con evento (API MT) y envía a la ficha en MandalaTickets.
 * Sin evento en un día futuro: abre reserva genérica (comportamiento previo).
 */
export default function FabCalendar() {
  const { dayToEventUrl } = useVagalumeMtEvents();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const now = new Date();
  const [view, setView] = useState(() => ({
    year: now.getFullYear(),
    month: now.getMonth(),
  }));
  const { year: viewYear, month: viewMonth } = view;

  const cells = useMemo(
    () => buildDayCells(viewYear, viewMonth, dayToEventUrl),
    [viewYear, viewMonth, dayToEventUrl],
  );

  const yearOptions = useMemo(() => {
    const nowY = new Date().getFullYear();
    const minY = Math.min(viewYear, nowY - 5);
    const maxY = Math.max(viewYear, nowY + 8);
    const opts: number[] = [];
    for (let y = minY; y <= maxY; y++) opts.push(y);
    return opts;
  }, [viewYear]);

  const shiftMonth = useCallback((delta: number) => {
    setView(({ year, month }) => {
      let m = month + delta;
      let y = year;
      if (m > 11) {
        m = 0;
        y += 1;
      }
      if (m < 0) {
        m = 11;
        y -= 1;
      }
      return { year: y, month: m };
    });
  }, []);

  const goToday = useCallback(() => {
    const t = new Date();
    setView({ year: t.getFullYear(), month: t.getMonth() });
  }, []);

  useEffect(() => {
    const onDocClick = (ev: MouseEvent) => {
      if (!open) return;
      const el = rootRef.current;
      if (el && !el.contains(ev.target as Node)) setOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onDayClick = (past: boolean, eventUrl: string | null) => {
    if (past) return;
    setOpen(false);
    if (eventUrl) {
      window.location.assign(eventUrl);
      return;
    }
    openBookingPage();
  };

  return (
    <div className="vl-fab-root" ref={rootRef}>
      <div
        className={"vl-cal-pop" + (open ? " vl-cal-pop--open" : "")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vl-cal-title"
        aria-hidden={!open}
      >
        <div className="vl-cal-pop__head">
          <div className="vl-cal-pop__head-inner">
            <div className="vl-cal-pop__nav">
              <button
                type="button"
                className="vl-cal-pop__icon-btn"
                aria-label="Mes anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  shiftMonth(-1);
                }}
              >
                <span className="material-symbols-outlined" aria-hidden>
                  chevron_left
                </span>
              </button>
              <h2 id="vl-cal-title" className="vl-cal-pop__title">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <button
                type="button"
                className="vl-cal-pop__icon-btn"
                aria-label="Mes siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  shiftMonth(1);
                }}
              >
                <span className="material-symbols-outlined" aria-hidden>
                  chevron_right
                </span>
              </button>
            </div>
            <div className="vl-cal-pop__year-row">
              <label htmlFor="vl-cal-year" className="vl-cal-pop__year-label">
                Year
              </label>
              <select
                id="vl-cal-year"
                className="vl-cal-pop__year-select"
                value={viewYear}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  setView((v) => ({ ...v, year: Number(e.target.value) }))
                }
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            className="vl-cal-pop__close"
            aria-label="Cerrar calendario"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            ×
          </button>
        </div>
        <div className="vl-cal-pop__dow" aria-hidden>
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>
        <div className="vl-cal-pop__days">
          {cells.map((cell, i) => {
            if (cell.kind === "empty") {
              return <div key={`e-${i}`} className="vl-cal-pop__cell" />;
            }
            const { day, past, hasEvent, eventUrl, today: isTo } = cell;
            let cls = "vl-cal-pop__day";
            if (past) {
              if (hasEvent) cls += " vl-cal-pop__day--past-event";
              else cls += " vl-cal-pop__day--past";
            } else if (hasEvent) {
              cls += " vl-cal-pop__day--event";
            } else {
              cls += " vl-cal-pop__day--ok";
            }
            if (isTo && !past) cls += " vl-cal-pop__day--today";

            const label =
              `${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}` +
              (past ? " (not available)" : "") +
              (hasEvent ? " · event at Vagalume" : "") +
              (!past && !hasEvent ? " · book on Mandala Tickets" : "");

            return (
              <button
                key={day}
                type="button"
                className={cls}
                disabled={past}
                aria-label={label}
                onClick={(e) => {
                  e.stopPropagation();
                  onDayClick(past, eventUrl);
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="vl-cal-pop__today"
          onClick={(e) => {
            e.stopPropagation();
            goToday();
          }}
        >
          Go to today
        </button>
      </div>
      <button
        type="button"
        className="vl-fab-btn"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Reserve a table"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <span className="material-symbols-outlined" aria-hidden>
          calendar_month
        </span>
        <span className="vl-fab-btn__hint">RESERVE A TABLE</span>
      </button>
    </div>
  );
}
