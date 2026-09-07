import type { AnchorHTMLAttributes } from 'react';

type NativeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

/**
 * Internal navigation that deliberately uses the browser instead of the
 * Vinext client router. This keeps navigation reliable on Cloudflare Workers.
 */
export function NativeLink({ href, ...props }: NativeLinkProps) {
  return <a href={href} {...props} />;
}
