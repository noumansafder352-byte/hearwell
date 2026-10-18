import type { Feature } from "@/data/home";
import { FeatureSpotlightClient, type FeatureSpotlightClientProps } from "./FeatureSpotlightClient";

/**
 * Photo beside a list of icon items (e.g. Tinnitus "Common Causes", Ear Wax
 * "Recognize the Signs"). Server wrapper: renders the Lucide icons here, because
 * component functions can't be passed from a server page to a client component.
 */
export function FeatureSpotlight({
  items,
  ...rest
}: Omit<FeatureSpotlightClientProps, "items"> & { items: Feature[] }) {
  return (
    <FeatureSpotlightClient
      {...rest}
      items={items.map(({ title, description, icon: Icon }) => ({ title, description, icon: <Icon aria-hidden /> }))}
    />
  );
}
