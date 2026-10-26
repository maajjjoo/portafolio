import { formatSemester, type SemesterResult } from "@/lib/semester";

interface SemesterStatusProps {
  result: SemesterResult;
}

/** Muestra el semestre y, si la fecha no está configurada, una nota discreta. */
export default function SemesterStatus({ result }: SemesterStatusProps) {
  return (
    <>
      {formatSemester(result.semester)}
      {result.status !== "calculated" ? (
        <span className="mt-1 block text-xs font-normal text-muted">
          Último semestre confirmado. {result.reason}
        </span>
      ) : null}
    </>
  );
}
