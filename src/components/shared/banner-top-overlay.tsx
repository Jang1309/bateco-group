/** Overlay trắng phía trên banner — menu transparent vẫn đọc được chữ tối */
const BannerTopOverlay = () => {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute inset-x-0 top-0 z-[1] h-[14rem] bg-[linear-gradient(180deg,#fff_0%,#fff_32%,rgba(255,255,255,0.72)_62%,rgba(255,255,255,0)_100%)] xsm:h-[7rem] xsm:bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0)_100%)]'
    />
  )
}

export default BannerTopOverlay
