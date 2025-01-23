import { Length, Matches } from "class-validator";

export class CreateRoomDto {
    @Length(1, 20, {
        message: "roomName의 글자수는 1-20자 입니다.",
    })
    @Matches(/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9._-\s]*$/, {
        message: "한글, 영문, 숫자, ., -, _, 띄어쓰기가 가능합니다.",
    })
    readonly roomName: string;
}
