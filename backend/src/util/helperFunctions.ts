import { Ref } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";

export const convertToStrArr = (list: Ref<any, ObjectID>): string[] => {
  return list.map((item) => {
    return item.toString();
  })
}