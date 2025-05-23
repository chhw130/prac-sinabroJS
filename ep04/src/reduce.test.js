import { describe, it, expect } from 'vitest';
import { shows } from './data';

describe('reduce method', () => {
  it('calculates the total of an array', () => {
    const numbers = [1, 2, 3, 4, 5];

    // TODO: do something here
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    expect(sum).toBe(15);
  });

  it('groups by genre', () => {
    // TODO: do something with `shows` here
    const groupedShows = shows.reduce((acc, cur) => {
      if (acc[cur.genre]) {
        acc[cur.genre].push(cur.title);
        return acc;
      }
      acc[cur.genre] = [cur.title];
      return acc;
    }, {});
    expect(groupedShows).toEqual({
      Comedy: ["Don't Look Up"],
      Drama: ['Stranger Things', 'Our Blues', 'Inventing Anna'],
      Mistery: ["Dirk Gently's Holistic Detective Agency"],
      Mystery: ['Little Women'],
    });
  });

  it('groups by key (2)', () => {
    // TODO: do something with `shows` here
    const groupedShows = shows.reduce((acc, cur) => {
      const idx = acc.findIndex((result) => result.genre === cur.genre);

      if (idx === -1) {
        acc.push({
          genre: cur.genre,
          titles: [cur.title],
        });
        return acc;
      }
      acc[idx].titles.push(cur.title);
      return acc;
    }, []);
    expect(groupedShows).toEqual([
      {
        genre: 'Drama',
        titles: ['Stranger Things', 'Our Blues', 'Inventing Anna'],
      },
      {
        genre: 'Mystery',
        titles: ['Little Women'],
      },
      {
        genre: 'Comedy',
        titles: ["Don't Look Up"],
      },
      {
        genre: 'Mistery',
        titles: ["Dirk Gently's Holistic Detective Agency"],
      },
    ]);
  });

  it('flattens array', () => {
    const nestedArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    // TODO: do something here
    const flatArray = nestedArray.reduce((acc, cur) => acc.concat(...cur), []);
    expect(flatArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('extracts writer names', () => {
    // TODO: do something with `shows` here
    const writerNames = shows.reduce((acc, show) => {
      const writers = show.writers;
      acc = [...new Set(acc.concat(...writers))];
      return acc;
    }, []);
    expect(writerNames).toEqual([
      'Matt Duffer',
      'Ross Duffer',
      'Jessie Nickson-Lopez',
      'Kate Trefry',
      'Justin Doble',
      'Alison Tatlock',
      'Paul Dichter',
      'Jessica Mecklenburg',
      'Seo-Gyeong Jeong',
      'Hee-kyung Noh',
      'Shonda Rhimes',
      'Carolyn Ingber',
      'Jessica Pressler',
      'Nicholas Nardini',
      'Adam McKay',
      'Max Landis',
      'Douglas Adams',
    ]);
  });
});
