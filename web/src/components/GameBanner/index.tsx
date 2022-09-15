import React from 'react';

interface GameBannerProps {
  title: string;
  bannerUrl: string;
  adsCount: number;
};

const GameBanner: React.FC<GameBannerProps> = ({title, bannerUrl, adsCount}) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <span className="font-bold text-white block">{title}</span>

        <span className="text-zinc-300 text-sm">{`${adsCount} anúncios`}</span>
      </div>
  </a>
  );
}

export default GameBanner;
