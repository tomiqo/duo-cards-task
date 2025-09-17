import type { Card } from "../model/Card.ts";
import * as React from "react";
import {ignoredWords} from "../config/ignoredWords.ts";

const normalize = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const findMatch = (hint: string, front: string) => {
  const words = front.trim().split(' ')
  const normalizedHint = normalize(hint)

  for (let i = 0; i < words.length; i++) {
    const testedPart = words.slice(i).join(' ')
    const regex = new RegExp(`\\b${normalize(testedPart)}\\w*`, 'i' )
    const match =normalizedHint.match(regex)

    if (match && match.index !== undefined) {
      return {
        match: hint.slice(match.index, match.index + match[0].length),
        index: match.index
      };
    }

    if (!Object.values(ignoredWords).flat().includes(words[i].toLowerCase())) {
      break
    }
  }
}

export const decorateHint = (card: Card): React.ReactElement => {
  if (!card.hint.length || !card.front.length) {
    return <span>{card.hint}</span>
  }

  const result = findMatch(card.hint, card.front)

  if (!result) {
    return <span>{card.hint}</span>;
  }

  return (
    <span>
      {card.hint.slice(0, result.index)}
      <b>{result.match}</b>
      {card.hint.slice(result.index + result.match.length)}
    </span>
  );
}