import styles from './mobile-redirect.module.scss';

import Footer from '../../components/footer/footer';

const MobileRedirect = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Desktop Only</h1>
          <p className='my-12'>
            Panorama is currently optimized for desktop viewing. Please access our platform from a desktop or laptop computer for the best experience.
          </p>

          <span className='my-6 text-white py-2 px-1 w-full'>Our Portfolio</span>

          <hr className='my-4 h-0.5 bg-blue-200 w-[160px] mx-auto' />

          <div className="flex flex-col gap-4 my-8">

            <div className='flex flex-col gap-2'>
              <img src="/temp/image1.png" alt="" />
              <span className='text-zinc-300'>Bitcoin</span>
            </div>

            <div className='flex flex-col gap-2'>
              <img src="/temp/image2.png" alt="" />
              <span className='text-zinc-300'>ICP</span>
            </div>

            <div className='flex flex-col gap-2'>
              <img src="/temp/image3.png" alt="" />
              <span className='text-zinc-300'>Solana</span>
            </div>

            <div className='flex flex-col gap-2'>
              <img src="/temp/image4.png" alt="" />
              <span className='text-zinc-300'>XRPL</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MobileRedirect;
