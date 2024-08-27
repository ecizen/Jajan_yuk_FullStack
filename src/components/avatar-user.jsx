import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AvatarProfile(
    {src, className}
) {
  return (
    <Avatar>
      <AvatarImage src={src} className={className} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
