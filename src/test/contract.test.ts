import { describe, it, expect } from 'vitest';
import { funding, canClaim, canRefund, CONTRACT, monad, type Bounty, type Submission } from '@/lib/contract';
describe('DataForge contract rules', () => {
 it('targets only the supplied deployed Monad testnet contract', () => { expect(CONTRACT).toBe('0xbb6972aa4d393a8142afe67151ffe86d2d21cb9b'); expect(monad.id).toBe(10143); });
 it('funds exactly item count multiplied by MON in wei', () => { expect(funding('0.125','8')).toBe(1000000000000000000n); expect(() => funding('0','8')).toThrow(); });
 it('restricts timeout claims to pending contributor submissions after review period', () => { const s = { status: 1, contributor: '0xabc', submittedAt: 100n } as unknown as Submission; expect(canClaim(s,'0xabc',259299n,259200n)).toBe(false); expect(canClaim(s,'0xabc',259300n,259200n)).toBe(true); expect(canClaim(s,'0xdef',259300n,259200n)).toBe(false); expect(canClaim({...s,status:3},'0xabc',259300n,259200n)).toBe(false); });
 it('allows refunds only to creator after deadline with no pending items and funds', () => { const b = {creator:'0xabc',deadline:100n,pendingCount:0n,funds:10n} as unknown as Bounty; expect(canRefund(b,'0xabc',100n)).toBe(true); expect(canRefund(b,'0xabc',99n)).toBe(false); expect(canRefund({...b,pendingCount:1n},'0xabc',100n)).toBe(false); expect(canRefund(b,'0xdef',100n)).toBe(false); });
});
