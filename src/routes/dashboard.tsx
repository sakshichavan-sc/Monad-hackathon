import { createFileRoute, Link, useHydrated } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Plus, Wallet, RefreshCw, ArrowUpRight } from 'lucide-react';
import { BountyCard, Stats, useContractConfig } from '@/components/bounties';
import { useWallet } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { mon, readWalletActivity } from '@/lib/contract';
export const Route=createFileRoute('/dashboard')({component:Dashboard,head:()=>({meta:[{title:'My dashboard — DataForge'},{name:'description',content:'Manage your data-labeling bounties, submissions, deadlines, and MON rewards on Monad Testnet.'},{property:'og:title',content:'My dashboard — DataForge'},{property:'og:description',content:'Your real on-chain bounty and contribution workspace.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]})});
function Dashboard(){
 const {account,connect}=useWallet(); const hydrated=useHydrated(); const config=useContractConfig();
 const query=useQuery({queryKey:['wallet-activity',account],enabled:hydrated&&Boolean(account),queryFn:()=>{if(!account)throw new Error('Connect a wallet first.');return readWalletActivity(account);},retry:1,staleTime:30000});
 const rows=(query.data?.rows??[]).filter(b=>b.creator.toLowerCase()===account?.toLowerCase());
 return <><div className="page-heading flex flex-wrap justify-between gap-5 items-center"><div><span className="eyebrow"><Wallet size={12}/>Your on-chain workspace</span><h1 className="mt-3">My dashboard</h1><p>Your bounties, submissions, and rewards.</p></div><Button asChild><Link to="/create"><Plus/>Create bounty</Link></Button></div>
 {!account?<div className="empty-state"><Wallet className="text-primary"/><h3>Connect your wallet</h3><Button onClick={connect}>Connect wallet</Button></div>:<>
 <Stats rows={rows} loading={query.isPending||query.isError} timestamp={config.data?.timestamp}/>
 <div className="section-heading"><h2 className="section-title">Created by me</h2><Button title="Refresh dashboard" aria-label="Refresh dashboard" variant="outline" size="icon" disabled={query.isFetching} onClick={()=>void query.refetch()}><RefreshCw className={query.isFetching?'animate-spin':''}/></Button></div>
 {query.isPending?<div className="notice" role="status">Reading your bounties and submissions from Monad…</div>:query.isError?<div className="notice error" role="alert">Could not load wallet activity. <Button variant="outline" size="sm" onClick={()=>void query.refetch()}>Retry</Button></div>:<>
 {rows.length?<div className="bounty-grid">{rows.map(b=><BountyCard key={String(b.id)} b={b} timestamp={config.data?.timestamp}/>)}</div>:<div className="empty-state"><h3>No bounties created yet</h3><Button asChild variant="outline"><Link to="/create">Create bounty<Plus/></Link></Button></div>}
 <h2 className="section-title mt-10 mb-5">My submissions</h2>
 {query.data?.contributions.length?<div className="table-scroll"><table className="data-table"><thead><tr><th>Bounty / item</th><th>Status code</th><th>Reward per item</th><th>Deadline</th><th>Remaining escrow</th></tr></thead><tbody>{query.data.contributions.map(({bounty:b,submission:s})=><tr key={`${b.id}-${s.itemId}`}><td><Link className="text-primary" to="/bounty/$id" params={{id:String(b.id)}}>{b.title} / #{String(s.itemId)}<ArrowUpRight size={12} className="inline"/></Link></td><td>{s.status}</td><td>{mon(b.rewardPerItem)} MON</td><td>{new Date(Number(b.deadline)*1000).toLocaleString()}</td><td>{mon(b.funds)} MON</td></tr>)}</tbody></table></div>:<div className="empty-state"><h3>No submissions yet</h3><Button asChild variant="outline"><Link to="/">Browse bounties<ArrowUpRight/></Link></Button></div>}
 </>}</>}
 </>;
}
