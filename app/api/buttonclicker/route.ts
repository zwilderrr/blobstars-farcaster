import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseGwei } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import ClickTheButtonABI from '../../_contracts/ClickTheButtonAbi';
import { CLICK_THE_BUTTON_CONTRACT_ADDR } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  console.log('Hit endpoint');

  console.log("req", req);
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  
  if (!isValid) {
    console.error('Message not valid');
    return new NextResponse('Message not valid', { status: 500 });
  }

  console.log("body", body);

  const data = encodeFunctionData({
    abi: ClickTheButtonABI,
    functionName: 'clickTheButton',
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${base.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to: CLICK_THE_BUTTON_CONTRACT_ADDR,
      value: parseGwei('10000').toString(), // 0.00001 ETH
    },
  };
  console.log("txData", txData);
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
