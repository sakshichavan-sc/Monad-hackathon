import { createFileRoute, Link, useHydrated } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { keccak256, toBytes, type Hex } from 'viem';
import { ArrowLeft, ArrowUpRight, Check, Clock3, Database, RefreshCw, Send, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/components/app-shell';
import { useContractConfig } from '@/components/bounties';
import { canClaim, canRefund, errorMessage, mon, readBounty, readSubmissions, safeURI, short, type Submission } from '@/lib/contract';

export const Route = createFileRoute('/bounty/$id')({
  component: BountyPage,
  head: ({ params }) => ({ meta: [
    { title: `Bounty #${params.id} — DataForge` },
    { name: 'description', content: 'Review bounty details, submit annotations, and manage on-chain MON rewards on Monad Testnet.' },
    { property: 'og:title', content: `Bounty #${params.id} — DataForge` },
    { property: 'og:description', content: 'An on-chain data-labeling bounty on Monad Testnet.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
});

const STATUS = ['Open', 'Pending review', 'Approved', 'Rejected', 'Paid'];

function BountyPage() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const { account, write, busy } = useWallet();
  const config = useContractConfig();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<bigint[]>([]);
  const [error, setError] = useState('');
  const valid = /^\d+$/.test(id);
  const bounty = useQuery({ queryKey: ['bounty', id], queryFn: () => readBounty(BigInt(id)), enabled: hydrated && valid, retry: 1, refetchInterval: 20000 });
  const subs = useQuery({ queryKey: ['subs', id, page, bounty.data?.itemCount.toString()], queryFn: () => { if (!bounty.data?.exists) throw new Error('Bounty is unavailable.'); return readSubmissions(bounty.data, page); }, enabled: !!bounty.data?.exists, retry: 1 });

  if (!valid || (bounty.data && !bounty.data.exists)) return <div className="empty-state mt-12"><h3>Bounty not found</h3><Button asChild><Link to="/">Back to bounties</Link></Button></div>;
  if (bounty.isError) return <div className="empty-state mt-12"><h3>Could not load this bounty</h3><p>{errorMessage(bounty.error)}</p><Button onClick={() => void bounty.refetch()}><RefreshCw />Try again</Button></div>;
  if (!bounty.data) return <div className="skeleton mt-12 h-64" />;

  const b = bounty.data;
  const now = config.data?.timestamp;
  const isCreator = account?.toLowerCase() === b.creator.toLowerCase();
  const open = now !== undefined && b.deadline > now && b.funds > 0n;
  const pages = Math.ceil(Number(b.itemCount) / 50);
  const maxBatch = Number(config.data?.maxBatch ?? 50n);

  const run = async (fn: () => Promise<boolean>) => { setError(''); try { await fn(); } catch (e) { setError(errorMessage(e)); } };
  const submit = (itemId: bigint) => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const uri = String(new FormData(form).get('uri')).trim();
    const content = String(new FormData(form).get('content') ?? '');
    await run(async () => {
      if (!safeURI(uri)) throw new Error('Annotation needs an HTTP, HTTPS, or IPFS URI.');
      if (!content.trim()) throw new Error('Enter the exact annotation content to calculate its hash.');
      const hash: Hex = keccak256(toBytes(content));
      const ok = await write('submitLabel', [b.id, itemId, uri, hash]);
      if (ok) form.reset();
      return ok;
    });
  };
  const toggle = (itemId: bigint) => setSelected(s => s.includes(itemId) ? s.filter(x => x !== itemId) : s.length >= maxBatch ? s : [...s, itemId]);

  return <>
    <Link to="/" className="text-xs text-muted-foreground inline-flex items-center gap-2 mt-7"><ArrowLeft size={13} />Back to bounties</Link>
    <div className="page-heading">
      <span className="eyebrow"><Database size={12} />Bounty #{id} · {open ? 'Open' : 'Closed'}</span>
      <h1 className="mt-3">{b.title}</h1>
      <p>{b.description || 'Data annotation bounty'}</p>
    </div>
    <div className="stats-band">
      {[['Reward per item', `${mon(b.rewardPerItem)} MON`], ['Items', String(b.itemCount)], ['Remaining escrow', `${mon(b.funds)} MON`], ['Pending review', String(b.pendingCount)]].map(([l, v]) => <div className="stat" key={l}><div className="stat-label">{l}</div><div className="stat-value">{v}</div></div>)}
    </div>
    <div className="flex flex-wrap gap-3 my-6 text-xs">
      {safeURI(b.instructionsURI) && <Button variant="outline" asChild><a href={safeURI(b.instructionsURI)} target="_blank" rel="noreferrer">Instructions<ArrowUpRight /></a></Button>}
      {safeURI(b.datasetURI) && <Button variant="outline" asChild><a href={safeURI(b.datasetURI)} target="_blank" rel="noreferrer">Dataset<ArrowUpRight /></a></Button>}
      <span className="network-label"><Clock3 size={12} />Deadline {new Date(Number(b.deadline) * 1000).toLocaleString()}</span>
      <span className="network-label">Creator {short(b.creator)}{isCreator && ' (you)'}</span>
    </div>
    {error && <div role="alert" className="notice error mb-5">{error}</div>}
    {isCreator && <div className="notice mb-6 flex flex-wrap items-center gap-3">
      <ShieldCheck size={17} className="text-primary" />
      <span>You created this bounty. Select pending items to approve and pay in one transaction (max {maxBatch}).</span>
      <Button size="sm" disabled={busy || selected.length === 0} onClick={() => run(async () => { const ok = await write('batchApproveAndPay', [b.id, selected]); if (ok) setSelected([]); return ok; })}><Check />Approve & pay {selected.length || ''}</Button>
      {now !== undefined && canRefund(b, account, now) && <Button size="sm" variant="outline" disabled={busy} onClick={() => run(() => write('refundUnusedFunds', [b.id]))}>Refund {mon(b.funds)} MON</Button>}
    </div>}
    <div className="table-scroll">
      <table className="data-table">
        <thead><tr>{isCreator && <th />}<th>Item</th><th>Status</th><th>Contributor</th><th>Annotation</th><th>Action</th></tr></thead>
        <tbody>
          {subs.isPending && <tr><td colSpan={6}>Loading items…</td></tr>}
          {subs.isError && <tr><td colSpan={6}><div role="alert" className="notice error">Could not read submissions. <Button size="sm" variant="outline" onClick={() => void subs.refetch()}>Retry</Button></div></td></tr>}
          {subs.data?.map((s: Submission) => <tr key={String(s.itemId)}>
            {isCreator && <td>{s.status === 1 && <input type="checkbox" aria-label={`Select item ${s.itemId}`} checked={selected.includes(s.itemId)} onChange={() => toggle(s.itemId)} />}</td>}
            <td>#{String(s.itemId)}</td>
            <td><span className={`status ${s.status === 3 ? 'closed' : ''}`}>{STATUS[s.status] ?? `Status ${s.status}`}</span></td>
            <td>{s.status ? short(s.contributor) : '—'}</td>
            <td>{s.annotationURI && safeURI(s.annotationURI) ? <a className="text-primary" href={safeURI(s.annotationURI)} target="_blank" rel="noreferrer">View<ArrowUpRight size={11} className="inline" /></a> : '—'}</td>
            <td>
              {(s.status === 0 || s.status === 3) && open && account && !isCreator && <form onSubmit={submit(s.itemId)} className="flex gap-2"><input name="uri" required aria-label="Annotation URI" placeholder="https://… or ipfs://…" className="min-w-40" /><input name="content" required aria-label="Exact annotation content" placeholder="Exact annotation content" className="min-w-32" /><Button size="sm" type="submit" disabled={busy}><Send />Submit</Button></form>}
              {s.status === 1 && isCreator && <div className="flex gap-2"><Button size="sm" variant="outline" disabled={busy} onClick={() => run(() => write('approveLabel', [b.id, s.itemId]))}><Check />Approve</Button><Button size="sm" variant="outline" disabled={busy} onClick={() => { const reason = (window.prompt('Reason for rejection?') ?? '').trim(); if (reason) void run(() => write('rejectLabel', [b.id, s.itemId, reason])); }}><X />Reject</Button></div>}
              {now !== undefined && config.data && canClaim(s, account, now, config.data.period) && <Button size="sm" disabled={busy} onClick={() => run(() => write('claimTimeoutReward', [b.id, s.itemId]))}>Claim reward</Button>}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
    {pages > 1 && <div className="flex justify-center gap-3 mt-5"><Button variant="outline" disabled={page === 0} onClick={() => { setSelected([]); setPage(p => p - 1); }}>Previous</Button><span className="text-xs self-center">Page {page + 1} / {pages}</span><Button variant="outline" disabled={page + 1 >= pages} onClick={() => { setSelected([]); setPage(p => p + 1); }}>Next</Button></div>}
    {!account && <p className="text-xs text-muted-foreground mt-5">Connect your wallet to submit annotations or manage this bounty.</p>}
  </>;
}
