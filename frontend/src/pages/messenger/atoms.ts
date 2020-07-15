import {atom} from "recoil";

type CreateConversationStatus = "idle" | "pending";

export const createConversationStatusAtom = atom<CreateConversationStatus>({
  key: 'createConversationStatus',
  default: "pending"
})