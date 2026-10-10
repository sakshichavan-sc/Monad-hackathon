<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use the supplied source-controlled ABI with viem for all blockchain reads and simulated wallet-signed writes; never substitute mock transactions.
- Keep contract I/O in browser-enabled query hooks and event handlers so wallet globals and RPC initialization never run during SSR module evaluation.
- Discover bounties by paginated nextBountyId enumeration and recent creation events; paginate item reads to avoid assuming a list-all function exists.
- Use externally hosted HTTP/IPFS dataset and annotation URIs, with locally calculated keccak256 content hashes; this deployment has no off-chain upload service.
- Use one shared wallet provider and application shell in the root route, with independent explore, dashboard, create, and bounty-detail leaf routes.
