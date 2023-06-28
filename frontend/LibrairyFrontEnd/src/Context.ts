import { createContext } from "react";
import { OpinionType } from "./Type";

export const OpinionContext = createContext<OpinionType >({
  bookId:0,
  id:0,
  view:"initialView",
  like:0,
  userName:""
});