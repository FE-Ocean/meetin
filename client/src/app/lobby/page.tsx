import LobbyHeader from "@/components/lobby/lobbyHeader/lobbyHeader";
import LobbyMain from "@/components/lobby/lobbyMain/lobbyMain";
import { QUERY_KEY } from "@/constants/queryKey.const";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getUserRooms } from "../api/repository/room.repository";
import { IRoomModel } from "@/types/room";
import { getToken } from "@/utils/getToken";
import { formatRoomsData } from "../api/service/room.service";

const Lobby = async () => {
    const queryClient = new QueryClient();

    const accessToken = getToken();

    await queryClient.prefetchQuery({
        queryKey: QUERY_KEY.rooms,
        queryFn: () => formatRoomsData(accessToken),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LobbyHeader />
            <LobbyMain />
        </HydrationBoundary>
    );
};

export default Lobby;
