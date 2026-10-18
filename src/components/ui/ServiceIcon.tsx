import { AudioLines, AudioWaveform, Ear, Stethoscope, type LucideProps } from "lucide-react";
import type { ServiceLink } from "@/data/navigation";

const map = {
  audio: AudioLines,
  hearingAid: Ear,
  tinnitus: AudioWaveform,
  ear: Stethoscope,
} satisfies Record<ServiceLink["icon"], unknown>;

export function ServiceIcon({ name, ...props }: { name: ServiceLink["icon"] } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden {...props} />;
}
