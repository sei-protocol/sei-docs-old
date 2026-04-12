import { Callout } from 'nextra/components';
import type { ReactNode } from 'react';

interface CalloutProps {
	children: ReactNode;
}

export const Note = ({ children }: CalloutProps) => <Callout>{children}</Callout>;

export const Info = ({ children }: CalloutProps) => <Callout type='info'>{children}</Callout>;

export const Warning = ({ children }: CalloutProps) => <Callout type='warning'>{children}</Callout>;

export const Tip = ({ children }: CalloutProps) => <Callout type='info'>{children}</Callout>;

export const Check = ({ children }: CalloutProps) => <Callout type='info'>{children}</Callout>;

export const Danger = ({ children }: CalloutProps) => <Callout type='error'>{children}</Callout>;
