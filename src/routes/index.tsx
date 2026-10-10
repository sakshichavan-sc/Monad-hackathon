import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BountyBrowser, Stats, useBounties, useContractConfig } from "@/components/bounties";
import lattice from "@/assets/data-lattice.jpg";
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [
    { title: "Explore bounties — DataForge" },
    { name: "description", content: "Discover data-labeling bounties, contribute quality annotations, and earn MON on Monad Testnet." },
    { property: "og:title", content: "Explore bounties — DataForge" },
    { property: "og:description", content: "Good data. Fair rewards. Browse real on-chain annotation tasks on Monad Testnet." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});
function Index() {
  const query = useBounties(); const config = useContractConfig();
  return <><section className="hero"><img className="hero-image" src={lattice} width={1536} height={1024} alt="An interconnected lattice of emerald and lime data blocks"/><div className="hero-copy"><span className="eyebrow"><Zap size={12}/>Label · Verify · Earn</span><h1 className="hero-title">Data<span className="text-primary">Forge</span></h1><p className="hero-sub">Put human intelligence to work. Create data-labeling bounties, contribute quality annotations, and get rewarded in MON.</p><div className="hero-actions"><Button size="lg" asChild><Link to="/create"><Plus/>Create a bounty</Link></Button><Button size="lg" variant="outline" asChild><Link to="/dashboard">My dashboard<ArrowUpRight/></Link></Button></div><div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground"><ShieldCheck size={13} className="text-success"/>On-chain escrow<span className="mx-1">·</span>Powered by Monad</div></div></section><Stats rows={query.data?.rows??[]} loading={query.isPending||query.isError} timestamp={config.data?.timestamp}/><BountyBrowser/></>;
}
