import { formatSemester, type SemesterResult } from "@/lib/semester";

interface SemesterStatusProps {
  result: SemesterResult;
}

/**
 * Muestra el semestre y, si no se pudo calcular, una nota discreta.
 * `result.reason` es para quien mantiene el sitio (ver lib/academic.ts), no para los visitantes.
 */
export default function SemesterStatus({ result }: SemesterStatusProps) {
  return (
    <>
      {formatSemester(result.semester)}
      {result.status !== "calculated" ? (
        <span className="mt-1 block text-xs font-normal text-muted">Último semestre confirmado.</span>
      ) : null}
    </>
  );
}
