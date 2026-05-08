#!/usr/bin/env node
/**
 * Refreshes the inlined default `app.toml`, `config.toml`, and `client.toml`
 * blocks inside `content/node/node-operators.mdx` with the unmodified output
 * of `seid init` against a freshly built seid binary.
 *
 * Inputs (env):
 *   SEI_HOME      Directory `seid init` wrote to (default: $HOME/.sei)
 *   SEI_VERSION   Tag of the seid release that was built (e.g. v6.4.4) [required]
 *   SEI_COMMIT    Short commit SHA the binary was built from [optional, unused but kept for compatibility]
 *   OUTPUT_FILE   MDX file to update (default: content/node/node-operators.mdx)
 *
 * The MDX file uses paired marker comments such as
 *   {/* AUTO-GENERATED:APP_TOML:START *\/}
 *   ...replaced content...
 *   {/* AUTO-GENERATED:APP_TOML:END *\/}
 * Everything between START/END (inclusive of newlines) is replaced; everything
 * outside is preserved so docs writers can edit prose without touching the
 * sync script.
 *
 * NOTE: MDX comments ({/* ... *\/}) are required instead of HTML comments
 * (<!-- ... -->) because Nextra/MDX does not accept HTML comments at the
 * top level and will fail to parse the page.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const SEI_HOME = process.env.SEI_HOME || join(homedir(), '.sei');
const SEI_VERSION = process.env.SEI_VERSION;
const OUTPUT_FILE = resolve(REPO_ROOT, process.env.OUTPUT_FILE || 'content/node/node-operators.mdx');

if (!SEI_VERSION) {
	console.error('error: SEI_VERSION env var is required (e.g. v6.4.4)');
	process.exit(2);
}
if (!existsSync(SEI_HOME)) {
	console.error(`error: SEI_HOME does not exist: ${SEI_HOME}`);
	process.exit(2);
}
if (!existsSync(OUTPUT_FILE)) {
	console.error(`error: OUTPUT_FILE does not exist: ${OUTPUT_FILE}`);
	process.exit(2);
}

function readToml(name) {
	const p = join(SEI_HOME, 'config', name);
	if (!existsSync(p)) {
		console.error(`error: expected file not found: ${p}`);
		process.exit(2);
	}
	return readFileSync(p, 'utf8').replace(/\s+$/u, '') + '\n';
}

function escapeRe(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function replaceBlock(source, marker, replacement) {
	const start = `{/* AUTO-GENERATED:${marker}:START */}`;
	const end = `{/* AUTO-GENERATED:${marker}:END */}`;
	const pattern = new RegExp(`${escapeRe(start)}[\\s\\S]*?${escapeRe(end)}`, 'u');
	if (!pattern.test(source)) {
		console.error(`error: missing marker block ${marker} in ${OUTPUT_FILE}`);
		process.exit(2);
	}
	return source.replace(pattern, `${start}\n\n${replacement}\n\n${end}`);
}

const blocks = {
	APP_TOML: '```toml\n' + readToml('app.toml') + '```',
	CONFIG_TOML: '```toml\n' + readToml('config.toml') + '```',
	CLIENT_TOML: '```toml\n' + readToml('client.toml') + '```'
};

let source = readFileSync(OUTPUT_FILE, 'utf8');
for (const [marker, content] of Object.entries(blocks)) {
	source = replaceBlock(source, marker, content);
}

writeFileSync(OUTPUT_FILE, source);
console.log(`wrote ${OUTPUT_FILE} from seid ${SEI_VERSION}`);
