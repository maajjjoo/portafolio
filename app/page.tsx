import { ViewTransition } from "react";

import RoomCollection from "@/components/room/RoomCollection";
import { RoomBackdrop, RoomFurniture } from "@/components/room/RoomDecor";
import { albums } from "@/data/albums";
import { sortedAlbums } from "@/lib/albums";

export default function ListeningRoomPage() {
  return (
    <ViewTransition
      enter={{ "room-close": "room-return", "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "room-open": "room-dolly", "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <section aria-label="Sala de escucha" className="room">
        <RoomBackdrop />
        <div className="room-scene">
          <RoomFurniture />
          <RoomCollection albums={sortedAlbums(albums)} />
        </div>
      </section>
    </ViewTransition>
  );
}
