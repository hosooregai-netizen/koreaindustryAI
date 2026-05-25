import { redirect } from "next/navigation";

export default function LegacySiAiPage() {
  redirect("/v3/products/ai-core");
}
