#!/usr/bin/env node
/**
 * Regenerates content/node/default-configs.mdx with the unmodified output of
 * `seid init` against a freshly built seid binary.
 *
 * Inputs (env):
 *   SEI_HOME      Directory `seid init` wrote to (default: $HOME/.sei)
 *   SEI_VERSION   Tag of the seid release that was built (e.g. v6.4.4) [required]
 *   SEI_COMMIT    Short commit SHA the binary was built from [optional]
 *   OUTPUT_FILE   MDX file to update (default: content/node/default-configs.mdx)
 *
 * The MDX file uses paired marker comments such as
 *   <!-- AUTO-GENERATED:APP_TOML:START -->
 *   ...replaced content...
 *   <!-- AUTO-GENERATED:APP_TOML:END -->
 * Everything between START/END (inclusive of newlines) is replaced; everything
 * outside is preserved so docs writers can edit prose without touching the
 * sync script.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const SEI_HOME = process.env.SEI_HOME || join(homedir(), '.sei');
const SEI_VERSION = process.env.SEI_VERSION;
const SEI_COMMIT = process.env.SEI_COMMIT || '';
const OUTPUT_FILE = resolve(REPO_ROOT, process.env.OUTPUT_FILE || 'content/node/default-configs.mdx');

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

function buildTree() {
	try {
		const out = execSync(`tree -L 3 --noreport --charset=ascii "${SEI_HOME}"`, {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe']
		});
		return out
			.replace(new RegExp(SEI_HOME.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'), 'g'), '$HOME/.sei')
			.replace(/\s+$/u, '');
	} catch (err) {
		console.warn('warn: `tree` not available, falling back to find-based listing:', err.message);
		const out = execSync(`find "${SEI_HOME}" -maxdepth 3 | sort`, { encoding: 'utf8' });
		return out
			.split('\n')
			.filter(Boolean)
			.map((line) => line.replace(SEI_HOME, '$HOME/.sei'))
			.join('\n');
	}
}

function replaceBlock(source, marker, replacement) {
	const start = `<!-- AUTO-GENERATED:${marker}:START -->`;
	const end = `<!-- AUTO-GENERATED:${marker}:END -->`;
	const pattern = new RegExp(`${escapeRe(start)}[\\s\\S]*?${escapeRe(end)}`, 'u');
	if (!pattern.test(source)) {
		console.error(`error: missing marker block ${marker} in ${OUTPUT_FILE}`);
		process.exit(2);
	}
	return source.replace(pattern, `${start}\n\n${replacement}\n\n${end}`);
}

function escapeRe(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

const today = new Date().toISOString().slice(0, 10);

const metadataBlock =
	`> **Generated from** \`seid ${SEI_VERSION}\`` +
	(SEI_COMMIT ? ` (commit \`${SEI_COMMIT}\`)` : '') +
	` — produced by \`seid init docs-example --chain-id pacific-1\` on ${today}.\n` +
	`> Source repo: [sei-protocol/sei-chain @ ${SEI_VERSION}](https://github.com/sei-protocol/sei-chain/releases/tag/${SEI_VERSION}).`;

const treeBlock = '```text\n' + buildTree() + '\n```';
const appBlock = '```toml\n' + readToml('app.toml') + '```';
const configBlock = '```toml\n' + readToml('config.toml') + '```';
const clientBlock = '```toml\n' + readToml('client.toml') + '```';

let source = readFileSync(OUTPUT_FILE, 'utf8');
source = replaceBlock(source, 'METADATA', metadataBlock);
source = replaceBlock(source, 'TREE', treeBlock);
source = replaceBlock(source, 'APP_TOML', appBlock);
source = replaceBlock(source, 'CONFIG_TOML', configBlock);
source = replaceBlock(source, 'CLIENT_TOML', clientBlock);

writeFileSync(OUTPUT_FILE, source);
console.log(`wrote ${OUTPUT_FILE} from seid ${SEI_VERSION}`);
