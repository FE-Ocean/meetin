"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Phaser from "phaser";
import { MeetsInPhaserScene } from "./phaserScene";
import { phaserConfig } from "./phaserConfig";
import { io } from "socket.io-client";
import { useGetUserInfo } from "@/apis/service/user.service";
import { useAtomValue } from "jotai";
import { isChatFocusedAtom, zoomLevelAtom } from "@/jotai/atom";
import MapZoomButtons from "@/components/button/mapZoom/mapZoomButtons";
import style from "./map.module.scss";

const Map = () => {
    const { roomId } = useParams();
    const { data: user } = useGetUserInfo();
    const isChatFocused = useAtomValue(isChatFocusedAtom);
    const zoomLevel = useAtomValue(zoomLevelAtom);

    const gameRef = useRef<Phaser.Game | null>(null);

    const handleMouseDown = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    useEffect(() => {
        if (!user) return;

        const phaserSocket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/phaser`, {
            query: {
                userName: user.userName,
            },
            autoConnect: true,
            forceNew: true,
        });

        phaserSocket.on("connect", () => {
            gameRef.current = new Phaser.Game({
                ...phaserConfig,
                scene: new MeetsInPhaserScene(roomId, user, phaserSocket),
            });
        });

        phaserSocket.on("error", (error) => {
            console.error("소켓 연결 에러 : ", error);
        });

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
            phaserSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (gameRef.current) {
            const scene = gameRef.current.scene.getScene(
                "MeetsInPhaserScene",
            ) as MeetsInPhaserScene;
            if (scene) {
                scene.setIsChatFocused(isChatFocused);
            }
        }
    }, [isChatFocused]);

    useEffect(() => {
        if (gameRef.current) {
            const scene = gameRef.current.scene.getScene(
                "MeetsInPhaserScene",
            ) as MeetsInPhaserScene;
            if (scene) {
                scene.setZoomLevel(zoomLevel);
            }
        }
    }, [zoomLevel]);

    return (
        <div id="gamediv" className={style.map} onMouseDown={handleMouseDown}>
            <MapZoomButtons />
        </div>
    );
};

export default Map;
