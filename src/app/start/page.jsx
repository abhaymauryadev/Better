import Footer from "@/components/Footer"

export default function StartPage() {
    return (
        <>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <div id="preappForm" data-testid="preappForm" className="css-8y1shf">
              <div className="css-2pxuwt m-auto w-auto">
                <div className="css-1qktycg bg-[#fffdfa] sticky top-0 z-[1] w-auto">
                  <div className="css-u7e8rj relative w-screen ml-[-50vw] left-1/2">
                    <div className="css-u1srki grid mx-auto w-auto max-w-[1440px] grid-cols-[repeat(25,1fr)] grid-rows-1 gap-0">
                      <div className="css-funbuh w-auto col-start-[3] col-end-[24] ">
                        <nav style={{ width: '100%', margin: '0 auto', padding: '2rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='md:flex'>
                          <div style={{ width: '100%', maxWidth: '1400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                            {/* Left: Logo and Title */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <span style={{ fontWeight: 'bold', color: '#017848', fontSize: '2rem', lineHeight: 1 }}>Better</span>
                              <span style={{ color: '#555', fontSize: '1.1rem', marginTop: '-0.3rem', letterSpacing: '0.01em' }}>Mortgage</span>
                            </div>
                            {/* Right: Help/Phone */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ background: '#d6f5e6', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg fill="none" height="21" viewBox="0 0 20 21" width="20" xmlns="http://www.w3.org/2000/svg">
                                  <title>Phone</title>
                                  <path clipRule="evenodd" d="M1.1116 0.0151367H5.00049C5.6116 0.0151367 6.1116 0.516439 6.1116 1.12914C6.1116 2.52165 6.33382 3.85845 6.74493 5.10614C6.86715 5.49604 6.77827 5.9305 6.46715 6.24242L4.02271 8.69323C5.62271 11.8459 8.20049 14.4192 11.3449 16.0345L13.7894 13.5837C14.0116 13.3721 14.2894 13.2607 14.5783 13.2607C14.6894 13.2607 14.8116 13.2718 14.9227 13.3164C16.1672 13.7285 17.5116 13.9513 18.8894 13.9513C19.5005 13.9513 20.0005 14.4526 20.0005 15.0653V18.9532C20.0005 19.5659 19.5005 20.0672 18.8894 20.0672C8.45604 20.0672 0.000488281 11.5896 0.000488281 1.12914C0.000488281 0.516439 0.500488 0.0151367 1.1116 0.0151367ZM3.93382 2.24315C4.00049 3.23461 4.16715 4.20379 4.43382 5.12842L3.10049 6.46522C2.64493 5.12842 2.35604 3.71363 2.25604 2.24315H3.93382ZM14.8894 15.6335C15.8338 15.9008 16.8005 16.0679 17.7783 16.1348V17.7947C16.3116 17.6944 14.9005 17.4047 13.556 16.9591L14.8894 15.6335Z" fill="#017848" fillRule="evenodd"></path>
                                </svg>
                              </span>
                              <span style={{ color: '#222', fontWeight: 500, fontSize: '1.15rem' }}>
                                Need help? <span style={{ fontWeight: 600 }}>Call 415–523–8837</span>
                              </span>
                            </div>
                          </div>
                          {/* Center: Home Icon with Glow */}
                          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '100%', height: '6px', background: '#f1f3f1', position: 'relative', borderRadius: '3px' }}>
                              <div style={{ position: 'absolute', left: '50%', top: '-22px', transform: 'translateX(-50%)', zIndex: 2 }}>
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'radial-gradient(circle, #00e676 60%, #017848 100%)', boxShadow: '0 0 16px 4px #00e67655' }}>
                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" fill="none" />
                                    <path d="M12 3L3 12h3v7h4v-4h4v4h4v-7h3L12 3z" fill="#017848" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Responsive styles */}
                          <style>{`
                            @media (max-width: 700px) {
                              nav > div:first-child { flex-direction: column; align-items: flex-start !important; gap: 1.2rem; padding: 0 1rem !important; }
                              nav > div:first-child > div:last-child { align-items: flex-start !important; }
                              nav span[style*='font-size: 2rem'] { font-size: 1.4rem !important; }
                              nav span[style*='font-size: 1.15rem'] { font-size: 1rem !important; }
                              nav > div:nth-child(2) { margin-top: 1.2rem !important; margin-bottom: 1rem !important; }
                              nav > div:nth-child(2) > div { height: 4px !important; }
                              nav > div:nth-child(2) svg { width: 36px !important; height: 36px !important; }
                              nav > div:nth-child(2) span[style*='width: 56px'] { width: 40px !important; height: 40px !important; }
                            }
                          `}</style>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="css-1wdzcj0 grid pt-10 pb-20 w-auto grid-cols-[repeat(25,_1fr)] grid-rows-1 gap-0">
                    <div className="css-10yj98m flex justify-center w-auto col-start-[3] col-end-[24]">
                      <div className="css-tk107b flex flex-col items-center justify-center text-center w-auto max-w-[629px]" >
                        <h1 className="css-1gc6stq text-[#292b29] mb-4 w-auto font-bold text-[24px] leading-[1.2] tracking-[0]">
                          <span className="css-jbfrph w-auto whitespace-normal">Hi, I'm Betsy!</span><br />
                          What can I help you with?
                        </h1>
                        <div className="css-2z3qr4 flex flex-col items-center justify-center text-center w-full max-w-[720px] mb-6">
                          <div aria-label="funnel" data-qa="funnel" role="radiogroup" id="radiogroup2048" data-testid="radiogroup2048" className="css-1tlib9g grid w-auto appearance-none border-none gap-4 grid-cols-1">
                            <button aria-checked="false" data-qa="purchase" role="radio" tabIndex="0" className="css-1dtpzmd flex items-center 
                            justify-start px-6 h-16 text-left text-[#292b29] bg-transparent border border-[#a4a8a4] rounded-lg cursor-pointer font-bold text-lg transition-colors duration-300 ease-[cubic-bezier(0.4,0.8,0.6,1)] hover:text-[#017848] 
                            hover:shadow-[inset_0_0_0_4px_#017848] focus-within:text-[#017848] focus-within:shadow-[inset_0_0_0_4px_#017848] active:text-[#017848] active:shadow-[inset_0_0_0_4px_#017848]">
                              <div data-qa="icon-purchase" className="css-19ftrx9 self-center flex justify-center mr-3 w-auto min-w-[auto]">
                                <svg height="36" stroke="none" viewBox="0 0 36 36" width="36" aria-hidden="true" fill="#017848" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                  <title id="start-purchase-icon">Start Purchase</title>
                                  <path d="M35.579 13.748 18.703.247a1.124 1.124 0 0 0-1.406 0L.42 13.747a1.125 1.125 0 0 0 .698 2.003h2.25v19.126A1.126 1.126 0 0 0 4.494 36h27.001a1.125 1.125 0 0 0 1.125-1.125V15.75h2.25a1.125 1.125 0 0 0 .709-2.002Zm-4.084-.248a1.125 1.125 0 0 0-1.125 1.125V33.75H5.619V14.625A1.126 1.126 0 0 0 4.494 13.5h-.169l13.67-10.936L31.662 13.5h-.168Z" fill="#017848"></path>
                                  <path d="M16.8 13v2.374h-1.2a3.607 3.607 0 0 0-3.118 1.78 3.527 3.527 0 0 0 0 3.56 3.607 3.607 0 0 0 3.118 1.78h4.8c.429 0 .825.227 1.04.594.214.367.214.82 0 1.187-.215.367-.611.593-1.04.593h-4.8c-.318 0-.624-.125-.849-.347a1.18 1.18 0 0 1-.351-.84H12c0 .945.38 1.85 1.054 2.518a3.622 3.622 0 0 0 2.546 1.043h1.2v2.373h2.4v-2.373h1.2a3.607 3.607 0 0 0 3.118-1.78 3.526 3.526 0 0 0 0-3.56A3.607 3.607 0 0 0 20.4 20.12h-4.8c-.429 0-.825-.226-1.04-.593a1.176 1.176 0 0 1 0-1.187c.215-.367.611-.594 1.04-.594h4.8c.318 0 .624.125.849.348.225.222.351.524.351.84H24c0-.945-.38-1.85-1.054-2.519a3.621 3.621 0 0 0-2.546-1.042h-1.2V13h-2.4Z" fill="#017848"></path>
                                </svg>
                              </div>
                              <span className="css-8y1shf max-w-none w-auto">Buying a home</span>
                              <span className="css-1lzs3qd flex items-center justify-end ml-auto mr-0 w-0 opacity-0 transition-[opacity,width] duration-[300ms] ease-[cubic-bezier(0.4,0.8,0.6,1)]">
                                <svg height="18px" width="18px" className="icon icon-check" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.35588 16.0296L3.61455 11.2882L2 12.8914L8.35588 19.2473L22 5.60318L20.3968 4L8.35588 16.0296Z"></path>
                                </svg>
                              </span>
                            </button>
                            <button aria-checked="false" data-qa="refinance" role="radio" tabIndex="-1" className="css-1dtpzmd flex items-center justify-start flex-row 
             h-16 px-6 text-left w-auto 
             rounded-lg border border-[#a4a8a4] 
             bg-transparent text-[#292b29] 
             font-[Better Sans,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif] 
             text-[18px] font-bold 
             cursor-pointer 
             transition-[background-color,border-color,color,box-shadow] 
             duration-[300ms] 
             ease-[cubic-bezier(0.4,0.8,0.6,1)] 
             outline-none no-underline">
                              <div data-qa="icon-refinance" className="css-19ftrx9 self-center flex justify-center mr-3 w-auto min-w-0">
                                <svg height="36" stroke="none" viewBox="0 0 36 36" width="36" aria-hidden="true" fill="#017848" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                  <title id="start-refinance-icon">Start Refinance</title>
                                  <path d="M35.579 13.748 18.703.247a1.124 1.124 0 0 0-1.406 0L.42 13.747a1.125 1.125 0 0 0 .698 2.003h2.25v19.126A1.126 1.126 0 0 0 4.494 36h27.001a1.125 1.125 0 0 0 1.125-1.125V15.75h2.25a1.125 1.125 0 0 0 .709-2.002Zm-4.084-.248a1.125 1.125 0 0 0-1.125 1.125V33.75H5.619V14.625A1.126 1.126 0 0 0 4.494 13.5h-.169l13.67-10.936L31.662 13.5h-.168Z" fill="#017848"></path>
                                  <path d="M17.6 15v1.768h-.9c-.965 0-1.856.505-2.338 1.326a2.61 2.61 0 0 0 0 2.651 2.709 2.709 0 0 0 2.338 1.326h3.6c.322 0 .619.169.78.442a.87.87 0 0 1 0 .884.903.903 0 0 1-.78.442h-3.6a.908.908 0 0 1-.636-.259.876.876 0 0 1-.264-.625H14c0 .704.284 1.378.79 1.876a2.725 2.725 0 0 0 1.91.776h.9v1.768h1.8v-1.768h.9c.965 0 1.856-.505 2.338-1.326a2.61 2.61 0 0 0 0-2.651 2.709 2.709 0 0 0-2.338-1.326h-3.6c-.322 0-.619-.169-.78-.442a.87.87 0 0 1 0-.884.903.903 0 0 1 .78-.442h3.6c.239 0 .468.093.636.259.17.165.264.39.264.625H23c0-.704-.285-1.378-.79-1.876a2.725 2.725 0 0 0-1.91-.776h-.9V15h-1.8Z" fill="#017848"></path>
                                <path d="M18.456 10C12.5 10 7.67 14.83 7.67 20.785H6l2.869 4.782 2.865-4.782h-1.667a8.383 8.383 0 0 1 8.389-8.388 8.383 8.383 0 0 1 8.389 8.388 8.383 8.383 0 0 1-8.39 8.389 8.32 8.32 0 0 1-5.919-2.469l-1.702 1.702a10.73 10.73 0 0 0 7.622 3.164c5.956 0 10.785-4.83 10.785-10.786C29.241 14.83 24.411 10 18.456 10Z" fill="#017848"></path>
                              </svg>
                            </div>
                            <span className="css-8y1shf max-w-none">Refinancing my mortgage</span>
                            <span className="css-1lzs3qd flex items-center justify-end ml-auto mr-0 w-0 opacity-0 transition-[opacity,width] duration-[300ms] ease-[cubic-bezier(0.4,0.8,0.6,1)]">
                              <svg height="18px" width="18px" className="icon icon-check" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.35588 16.0296L3.61455 11.2882L2 12.8914L8.35588 19.2473L22 5.60318L20.3968 4L8.35588 16.0296Z"></path>
                              </svg>
                            </span>
                          </button>
                          <button aria-checked="false" data-qa="heloc" role="radio" tabIndex="-1" className="css-1dtpzmd flex items-center justify-start flex-row h-16 px-2 text-left w-auto bg-transparent border border-[#a4a8a4] rounded-md text-[#292b29] cursor-pointer font-bold text-[18px] ">
                            <div data-qa="icon-heloc" className="css-19ftrx9 flex items-center justify-start flex-row h-16 px-6 border-none  text-left w-auto bg-transparent border border-[#a4a8a4] rounded-md text-[#292b29] cursor-pointer font-bold text-[18px] transition-[background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0.8,0.6,1)]" >
                              <svg height="36" stroke="none" viewBox="0 0 36 36" width="36" aria-hidden="true" fill="#017848" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title id="start-cashout-refinance-icon">Start Heloc</title>
                                <path d="M2.25 18a15.75 15.75 0 0 1 31.5 0H36a18 18 0 1 0-18 18v-2.25A15.75 15.75 0 0 1 2.25 18Z" fill="#017848"></path>
                                <path d="M23.143 20.204c0-.877-.352-1.718-.98-2.338a3.363 3.363 0 0 0-2.363-.968h-4.457c-.398 0-.766-.21-.965-.551a1.092 1.092 0 0 1 0-1.102c.199-.341.567-.551.965-.551H19.8c.296 0 .579.116.788.323.209.206.326.487.326.779h2.229c0-.877-.352-1.718-.98-2.338a3.363 3.363 0 0 0-2.363-.968h-1.114v-2.204h-2.229v2.204h-1.114a3.35 3.35 0 0 0-2.895 1.653 3.275 3.275 0 0 0 0 3.306 3.35 3.35 0 0 0 2.895 1.653H19.8c.398 0 .766.21.965.551.199.341.199.761 0 1.102-.199.341-.567.551-.965.551h-4.457a1.12 1.12 0 0 1-.788-.323 1.096 1.096 0 0 1-.326-.779H12c0 .877.352 1.718.979 2.338.627.62 1.477.968 2.364.968h1.114v2.204h2.229V23.51H19.8c.887 0 1.737-.348 2.364-.968.627-.62.979-1.461.979-2.338ZM29.852 19.97a1.13 1.13 0 0 0-1.429 0l-5.714 4.653a1.17 1.17 0 0 0-.423.907v9.307c0 .308.12.604.334.822.215.218.506.341.809.341h11.428c.303 0 .594-.123.808-.34.215-.219.335-.515.335-.823V25.53a1.171 1.171 0 0 0-.434-.907l-5.714-4.654Zm3.862 13.703H31.43v-3.49c0-.308-.12-.604-.335-.822a1.133 1.133 0 0 0-.808-.34H28c-.303 0-.594.122-.808.34a1.174 1.174 0 0 0-.335.822v3.49h-2.285V26.09l4.571-3.723 4.571 3.723v7.584Z" fill="#017848"></path>
                              </svg>
                            </div>
                            <span className="css-8y1shf max-w-none">Get cash from my home</span>
                            <span className="css-1lzs3qd">
                              {/* <svg height="18px" width="18px" className="icon icon-check" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.35588 16.0296L3.61455 11.2882L2 12.8914L8.35588 19.2473L22 5.60318L20.3968 4L8.35588 16.0296Z"></path>
                              </svg> */}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="css-1vxz416 flex flex-row justify-between mb-6 w-full">
                        <div className="css-1y1re9h flex flex-col w-auto">
                          <p className="css-dou93 text-[#292b29] m-0 p-0 text-center w-auto font-[Better_Sans] font-bold leading-[1.5] text-[32px]">$100B</p>
                          <p className="css-1874ra6 text-[#565d5a] mt-3 m-0 p-0 text-center
                           w-auto font-[400] leading-[1.5] text-[14px]">home loans funded entirely online</p>
                        </div>
                        <div className="css-1y1re9h flex flex-col w-auto">
                          <p className="css-dou93 text-[#292b29] m-0 p-0 text-center w-auto font-[Better_Sans] font-bold leading-[1.5] text-[32px]">400K</p>
                          <p className="css-1874ra6 text-[#565d5a] mt-3 m-0 p-0 text-center
                           w-auto font-[400] leading-[1.5] text-[14px]">Customers who chose a Better Mortgage</p>
                        </div>
                      </div>
                      <div style={{ background: '#f0f7f1', borderRadius: '14px', maxWidth: '480px', margin: '0 auto', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: 'none' }}>
                        <p style={{ color: '#565d5a', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 500 }}>
                          After a few questions, you'll unlock:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
                          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem', fontSize: '1.15rem', color: '#2a4730' }}>
                            <svg width="24" height="24" fill="#017848" style={{ marginRight: '1rem' }} viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#e6f4ea"/><text x="50%" y="60%" textAnchor="middle" fontSize="15" fill="#017848" fontWeight="bold" dy=".3em">%</text></svg>
                            Custom mortgage rates
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem', fontSize: '1.15rem', color: '#2a4730' }}>
                            <svg width="24" height="24" fill="#017848" style={{ marginRight: '1rem' }} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e6f4ea"/><text x="50%" y="60%" textAnchor="middle" fontSize="15" fill="#017848" fontWeight="bold" dy=".3em">$</text></svg>
                            Exclusive offers
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.15rem', color: '#2a4730' }}>
                            <svg width="24" height="24" fill="#017848" style={{ marginRight: '1rem' }} viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="#e6f4ea"/><rect x="9" y="17" width="6" height="2" rx="1" fill="#017848"/><rect x="7" y="5" width="10" height="10" rx="2" fill="#017848"/></svg>
                            A personalized dashboard
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
          </div> 
        </div>
        <Footer/>
        </>
    )
  }
  