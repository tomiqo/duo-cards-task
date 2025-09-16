import type { Card } from "../model/Card.ts";
import * as React from "react";

const IGNORED_PREFIXES = ["the", "to", "a", "an"];

export const decorateHint = (card: Card): React.ReactElement => {
  if (!card.hint.length || !card.front.length) {
    return <span>{card.hint}</span>
  }

  let cleanFront = card.front
    .trim()
    .toLowerCase()

  for (const prefix of IGNORED_PREFIXES) {
    if (cleanFront.startsWith(prefix + ' ')) {
      cleanFront = cleanFront.substring(prefix.length + 1).trim();
      break;
    }
  }

  console.log(cleanFront);
  cleanFront = cleanFront.replace(/[^\w\s-]/g, '');
  console.log(cleanFront);


  if (!cleanFront.length) {
    return <span>{card.hint}</span>;
  }


  const regex = new RegExp(`\\b${cleanFront}\\w*`, "gi");

  const parts = card.hint.split(regex);
  const matches = card.hint.match(regex) ?? [];


  const decorated: (string | React.ReactElement)[] = [];
  parts.forEach((part, i) => {
    decorated.push(part);
    if (matches[i]) {
      decorated.push(<b key={i}>{matches[i]}</b>);
    }
  });

  return <span>{decorated}</span>;
}