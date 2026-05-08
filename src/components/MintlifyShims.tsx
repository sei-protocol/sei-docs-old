import { Callout } from 'nextra/components';
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import { Tabs as RadixTabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

interface CalloutProps {
	children: ReactNode;
}

export const Note = ({ children }: CalloutProps) => <Callout>{children}</Callout>;

export const Info = ({ children }: CalloutProps) => <Callout type='info'>{children}</Callout>;

export const Warning = ({ children }: CalloutProps) => <Callout type='warning'>{children}</Callout>;

export const Tip = ({ children }: CalloutProps) => <Callout type='info'>{children}</Callout>;

export const Check = ({ children }: CalloutProps) => <Callout type='info'>{children}</Callout>;

export const Danger = ({ children }: CalloutProps) => <Callout type='error'>{children}</Callout>;

interface TabProps {
	title: string;
	children: ReactNode;
}

// Mintlify <Tab> is just a labeled container; the parent <Tabs> reads its
// `title` prop and renders the tab list/panel UI itself.
export const Tab = ({ children }: TabProps) => <>{children}</>;
Tab.displayName = 'MintlifyTab';

interface TabsProps {
	children: ReactNode;
}

// Mintlify <Tabs> wrapping <Tab title="…"> children. We render through the
// existing Radix-based Tabs primitives so the visual style matches the rest
// of the site, while keeping the source MDX portable to Mintlify.
export const Tabs = ({ children }: TabsProps) => {
	const tabs = Children.toArray(children).filter((child): child is ReactElement<TabProps> => {
		if (!isValidElement(child)) return false;
		const type = child.type as { displayName?: string } | string;
		return typeof type !== 'string' && type.displayName === 'MintlifyTab';
	});

	if (tabs.length === 0) return null;

	const defaultValue = tabs[0].props.title;

	return (
		<RadixTabs defaultValue={defaultValue}>
			<TabsList>
				{tabs.map((tab) => (
					<TabsTrigger key={tab.props.title} value={tab.props.title}>
						{tab.props.title}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab) => (
				<TabsContent key={tab.props.title} value={tab.props.title}>
					{tab.props.children}
				</TabsContent>
			))}
		</RadixTabs>
	);
};
