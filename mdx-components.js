import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { Check, Danger, Info, Note, Tip, Warning } from './src/components/MintlifyShims';

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
	return {
		...themeComponents,
		Note,
		Info,
		Warning,
		Tip,
		Check,
		Danger,
		...components
	};
}
