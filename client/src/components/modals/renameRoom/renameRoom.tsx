import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { accessTokenAtom, roomIdAtom } from "@/jotai/atom";
import { useGetRoomData, usePatchRoomData } from "@/app/api/service/room.service";
import { BaseModal } from "@/components/modal/baseModal/baseModal";
import Button from "@/components/common/button/button";
import style from "./renameRoom.module.scss";

interface IModal {
    onClose: () => void;
}

const RenameRoom = ({ onClose }: IModal) => {
    const accessToken = useAtomValue(accessTokenAtom);
    const roomId = useAtomValue(roomIdAtom);
    const roomNameRef = useRef<HTMLInputElement>({} as HTMLInputElement);

    const { data } = useGetRoomData(roomId, accessToken);

    useEffect(() => {
        if (data) {
            roomNameRef.current.value = data.roomName;
        }
    }, [data]);

    const { mutate } = usePatchRoomData();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({ roomName: roomNameRef.current.value, roomId, accessToken });
        onClose();
    };

    return (
        <BaseModal onClose={onClose}>
            <form onSubmit={handleSubmit} className={style.modal_container}>
                <button type="button" onClick={onClose} className={style.close_icon} />
                <h2 className={style.title}>Rename Room</h2>
                <input
                    type="text"
                    maxLength={20}
                    className={style.room_name}
                    ref={roomNameRef}
                    placeholder="방 이름을 입력하세요 (최대 20자)"
                />
                <div className={style.buttons}>
                    <Button type="button" onClick={onClose} look="ghost" width={100} text="닫기" />
                    <Button type="submit" look="solid" width={100} text="변경하기" />
                </div>
            </form>
        </BaseModal>
    );
};
export default RenameRoom;
