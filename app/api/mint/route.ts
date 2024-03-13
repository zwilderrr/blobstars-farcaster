import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseGwei } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import mintContractData from '../../_contracts/BlobStarsNFT.json';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  console.log('Hit endpoint');

  console.log('req', req);
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    console.error('Message not valid');
    return new NextResponse('Message not valid', { status: 500 });
  }

  console.log('body', body);

  const data = encodeFunctionData({
    abi: mintContractData.abi,
    functionName: 'mint',
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to: '0x09ce1abaf8a4250337d26982805aa6527c4e9540',
      value: '3000000000000000', // 0.003 ETH
    },
  };
  console.log('txData', txData);
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
