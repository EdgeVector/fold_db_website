#!/usr/bin/env node
// Fails when a colour or a font family is set outside public/site.css.
// public/site.css is the one place the palette and the type live; every other
// file reads its variables. Run by .lastgit/ci.sh.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src', 'public/explore'];          // fixed, shallow trees
const EXTS = new Set(['.css', '.jsx', '.js', '.html']);
const ALLOW_LINE = [/name="theme-color"/];        // a meta tag cannot read a CSS variable

const HEX6 = /(?<![&\w])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6})\b/;
// A 3-digit hex counts only in a value position, so prose like "PR #201" is ignored.
const HEX3 = /(?<=["'=:]\s?)#[0-9a-fA-F]{3}\b/;
const FUNC = /\b(?:rgb|rgba|hsl|hsla)\(/;
const FONT = /font-family\s*[:=]\s*["']?(?!\s*(?:var\(|inherit))/;

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (EXTS.has(extname(p))) yield p;
  }
}

const problems = [];
for (const root of ROOTS) {
  for (const file of files(root)) {
    const css = extname(file) === '.css';
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      if (ALLOW_LINE.some((re) => re.test(line))) return;
      const hit = HEX6.exec(line) || HEX3.exec(line) || FUNC.exec(line) || (css && FONT.exec(line));
      if (hit) problems.push(`${file}:${i + 1}: ${hit[0].trim()}`);
    });
  }
}

if (problems.length) {
  console.error('Colours and fonts belong in public/site.css. Use a var(--token) here:');
  for (const p of problems.slice(0, 40)) console.error('  ' + p);
  if (problems.length > 40) console.error(`  ... and ${problems.length - 40} more`);
  process.exit(1);
}
console.log('colour check passed: no colour or font is set outside public/site.css');
