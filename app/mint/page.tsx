import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Mint BlobStar',
      target: `${NEXT_PUBLIC_URL}/api/mint`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/blobstars-reel.gif`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/future-after-tx`,
});

export const metadata: Metadata = {
  title: 'BlobStarsNFT',
  description: 'Mint a BlobStar now to show your support for good people doing good things.',
  openGraph: {
    title: 'BlobStarsNFT',
    description: 'Mint a BlobStar now to show your support for good people doing good things.',
    images: [`${NEXT_PUBLIC_URL}/blobstars-reel.gif`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  return (
    <>
      <h1>BlobStars 💙 Farcaster</h1>
    </>
  );
}
