import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MtNormalizedEvent, MtVenuesApiResponse } from "../lib/mtEventsHelpers";
import { eventUrlsByLocalDay, filterUpcomingSorted } from "../lib/mtEventsHelpers";

type VagalumeMtEventsContextValue = {
  loading: boolean;
  /** true si el fetch falló o respondió no-ok (el sitio puede usar datos estáticos). */
  fetchFailed: boolean;
  events: MtNormalizedEvent[];
  /** Próximos eventos ordenados (fecha >= hoy local). */
  upcomingSorted: MtNormalizedEvent[];
  /** Map YYYY-MM-DD local → URL evento en (prioridad si hay colisión). */
  dayToEventUrl: Map<string, string>;
  refetch: () => void;
};

const defaultValue: VagalumeMtEventsContextValue = {
  loading: true,
  fetchFailed: false,
  events: [],
  upcomingSorted: [],
  dayToEventUrl: new Map(),
  refetch: () => {},
};

const VagalumeMtEventsContext = createContext<VagalumeMtEventsContextValue>(defaultValue);

/**
 * Carga una vez los eventos de Vagalume vía /api/mt-venues (sin API key en el cliente).
 */
export function VagalumeMtEventsProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [events, setEvents] = useState<MtNormalizedEvent[]>([]);

  const load = useCallback(() => {
    setLoading(true);
    setFetchFailed(false);
    void fetch("/api/mt-venues")
      .then((r) => {
        if (!r.ok) throw new Error("mt-venues not ok");
        return r.json() as Promise<MtVenuesApiResponse>;
      })
      .then((data) => {
        setEvents(Array.isArray(data.events) ? data.events : []);
      })
      .catch(() => {
        setFetchFailed(true);
        setEvents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const upcomingSorted = useMemo(() => filterUpcomingSorted(events), [events]);
  const dayToEventUrl = useMemo(() => eventUrlsByLocalDay(events), [events]);

  const value = useMemo<VagalumeMtEventsContextValue>(
    () => ({
      loading,
      fetchFailed,
      events,
      upcomingSorted,
      dayToEventUrl,
      refetch: load,
    }),
    [loading, fetchFailed, events, upcomingSorted, dayToEventUrl, load],
  );

  return (
    <VagalumeMtEventsContext.Provider value={value}>{children}</VagalumeMtEventsContext.Provider>
  );
}

export function useVagalumeMtEvents() {
  return useContext(VagalumeMtEventsContext);
}

/** Atajo: los N próximos para la home (ya filtrados por fecha). */
export function useNearestMtEvents(n: number) {
  const { upcomingSorted, loading, fetchFailed } = useVagalumeMtEvents();
  return {
    nearest: useMemo(
      () => upcomingSorted.slice(0, Math.max(0, n)),
      [upcomingSorted, n],
    ),
    loading,
    fetchFailed,
  };
}
