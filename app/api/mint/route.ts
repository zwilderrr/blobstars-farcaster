import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import mintContractData from '../../_contracts/SoulboundFreeTimedMint.json';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    console.error('Message not valid');
    return new NextResponse('Message not valid', { status: 500 });
  }

  const address = message.interactor.verified_accounts[0];

  const data = encodeFunctionData({
    abi: mintContractData.abi,
    functionName: 'mint',
    args: [address, 1],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to: mintContractData.address as `0x${string}`,
      value: parseEther('0.0025').toString(), // 0.0025 ETH
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
