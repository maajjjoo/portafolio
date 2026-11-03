import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/Icons";
import RollText from "@/components/ui/RollText";

/** Enlace visible para volver al estante desde cualquier álbum. */
export default function BackToLibrary() {
  return (
    <Link
      href="/"
      transitionTypes={["room-close"]}
      className="label glass inline-flex min-h-11 items-center gap-2 rounded-full px-4 transition-colors hover:border-ink"
    >
      <ArrowRightIcon width={16} height={16} className="rotate-180" />
      <RollText>Volver a la sala</RollText>
    </Link>
  );
}
