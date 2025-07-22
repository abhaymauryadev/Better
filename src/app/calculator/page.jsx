'use client'; // Required for client-side hooks like useState, useCallback
import Footer from '@/components/Footer';
import { useState, useCallback } from 'react';

export default function CalculatePage() {
  const [value, setValue] = useState(30000);
  const [min] = useState(50000);
  const [max] = useState(3000000);
  const step = 100;

  const [zip, setZip] = useState('');
  const [downPayment, setDownPayment] = useState(60000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const getPercentage = useCallback((val) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  const calculateMonthlyPayment = useCallback(
    (homePrice, downPaymentPercent, interestRate, loanTermYears) => {
      const downPayment = homePrice * (downPaymentPercent / 100);
      const loanAmount = homePrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTermYears * 12;

      if (monthlyRate === 0) {
        return loanAmount / numberOfPayments;
      }

      const monthlyPayment =
        loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      return Math.round(monthlyPayment);
    },
    []
  );

  const monthlyPayment = calculateMonthlyPayment(value, downPaymentPercent, interestRate, loanTermYears);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const percentage = getPercentage(value);
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgb(41, 43, 41) ${percentage}%, #c8c9c6 ${percentage}% 100%)`,
  };

  const paymentBreakdown = {
    principal: 1600,
    taxes: 100,
    insurance: 100,
    hoa: 100,
    utilities: 100,
  };

  const total = Object.values(paymentBreakdown).reduce((a, b) => a + b, 0);

  const maxWidth = 400;

  const barWidths = {
    principal: (paymentBreakdown.principal / total) * maxWidth,
    taxes: (paymentBreakdown.taxes / total) * maxWidth,
    insurance: (paymentBreakdown.insurance / total) * maxWidth,
    hoa: (paymentBreakdown.hoa / total) * maxWidth,
    utilities: (paymentBreakdown.utilities / total) * maxWidth,
  };

    return (
        <div>
        {/* <header className="sticky top-0 z-20 transition-all ease-in-out duration-300 bg-white">
            <nav className="m-auto flex max-w-screen-2xl justify-between p-5 md:py-5 md:px-10 xl:p-5">
                <div className="flex flex-row">
                    <div className="invisible -translate-x-full bg-interactiveForegroundInverseTertiary inset-0 overflow-auto overscroll-contain fixed z-10 p-6 shadow-md flex flex-col transition-translate duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]">
                        <div className="flex justify-between items-center">
                            <a className="inline-block px-2 flex-none" href="/">
                                <svg role="img" className="icon icon-LogoBetter2021" width="85px" height="35px" viewBox="0 0 495 133" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <title>Better</title>
                                    <path d="M427.207 129.574H457.274V70.2463C460.072 61.2943 473.189 52.9226 492.108 57.1085V28.0354C476.38 28.0354 462.848 38.3964 457.274 54.9119V30.0247H427.207V129.574ZM378.24 49.7521C387.399 49.7521 391.979 54.7254 391.979 59.5122C391.979 66.4749 386.405 73.4582 355.342 77.0224C355.342 60.6934 365.703 49.7521 378.24 49.7521ZM416.659 120.414V93.9316C406.712 102.303 393.367 106.883 382.613 106.883C371.464 106.883 362.512 100.915 358.119 91.3621C397.532 88.5853 416.845 75.0331 416.845 55.9273C416.845 40.593 401.117 27.6624 379.214 27.6624C350.141 27.6624 326.663 48.9647 326.663 80.0271C326.663 109.287 350.742 130.983 381.017 130.983C393.968 130.962 407.106 127.191 416.659 120.414ZM304.78 98.7184V49.7521H325.275V30.2526L304.78 30.4599V6.56731L247.836 46.7889V11.7478L200.258 47.5763V49.7728H218.183V104.313C218.183 121.637 230.927 130.796 248.251 130.796C255.814 130.796 262.197 129.408 267.957 126.03V105.515C265.16 107.111 261.782 108.313 258.011 108.313C251.649 108.313 247.857 105.122 247.857 99.5473V49.7728H275.127V104.127C275.127 121.637 287.871 130.796 305.381 130.796C313.152 130.796 319.514 129.802 325.689 126.03V105.329C323.099 106.924 319.12 108.313 315.141 108.313C308.759 108.271 304.78 104.894 304.78 98.7184ZM159.664 49.7521C168.823 49.7521 173.402 54.7254 173.402 59.5122C173.402 66.4749 167.828 73.4582 136.766 77.0224C136.766 60.6934 147.106 49.7521 159.664 49.7521ZM198.082 120.414V93.9316C188.136 102.303 174.791 106.883 164.036 106.883C152.888 106.883 143.936 100.915 139.543 91.3621C178.956 88.5853 198.269 75.0331 198.269 55.9273C198.269 40.593 182.541 27.6624 160.638 27.6624C131.564 27.6624 108.086 48.9647 108.086 80.0271C108.086 109.287 132.165 130.983 162.44 130.983C175.392 130.962 188.53 127.191 198.082 120.414ZM53.5459 76.0277C62.8915 76.0277 70.6623 81.8092 70.6623 91.5486C70.6623 100.708 62.8915 106.282 53.5459 106.282H30.8552V76.0277H53.5459ZM51.9502 25.0721C60.9022 25.0721 68.072 30.6464 68.072 39.2046C68.072 48.3638 60.9022 53.938 51.9502 53.938H30.8552V25.0721H51.9502ZM0 1.967V129.574H60.1147C83.1991 129.574 101.331 115.441 101.331 93.9316C101.331 80.1929 92.5655 69.2516 79.8215 64.0711C91.3637 58.8906 99.1345 48.7367 99.1345 36.5936C99.1345 15.685 80.8161 1.94629 57.5245 1.94629H0V1.967Z" fill="currentColor"></path>
                                </svg>
                            </a>
                            <button className="inline-block rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundTertiary bg-transparent hover:bg-interactiveSecondary focus:bg-interactiveSecondary focus:border-transparent focus:shadow-accentBorderSecondary active:bg-interactiveSecondary px-base h-2xl w-auto">
                                <div className="align-center flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x ">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                        <details className="group flex-none">
                            <summary className="flex h-14 cursor-pointer select-none items-center justify-between px-2 [&amp;::-webkit-details-marker]:hidden">
                                Buy
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down ml-2 inline-block group-open:rotate-180 fill-black stroke-none">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </summary>
                            <ul className="m-0 list-none">
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/preapproval/nxt-purchase">Apply now</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/mortgage-rates">Purchase rates</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/how-much-house-can-i-afford">Affordability calculator</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/mortgage-calculator">Mortgage calculator</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/rent-vs-buy-calculator">Rent vs buy calculator</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/find-an-agent">Find an agent</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/va-loan">VA loans</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/content">Learning center</a>
                                </li>
                            </ul>
                        </details>
                        <details className="group flex-none">
                            <summary className="flex h-14 cursor-pointer select-none items-center justify-between px-2 [&amp;::-webkit-details-marker]:hidden">
                                Refinance
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down ml-2 inline-block group-open:rotate-180 fill-black stroke-none">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </summary>
                            <ul className="m-0 list-none">
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/preapproval/nxt-refinance">Apply Now</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/refinance-rates">Refinance rates</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/content/refinance-calculator">Cash-out refinance calculator</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/content">Learning Center</a>
                                </li>
                            </ul>
                        </details>
                        <details className="group flex-none">
                            <summary className="flex h-14 cursor-pointer select-none items-center justify-between px-2 [&amp;::-webkit-details-marker]:hidden">
                                HELOC
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down ml-2 inline-block group-open:rotate-180 fill-black stroke-none">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </summary>
                            <ul className="m-0 list-none">
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/preapproval/nxt-heloc">Apply Now</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/heloc-calculator">Calculate your Cash 💵</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/heloc-vs-cashout-refi-calculator">HELOC vs. Cash-out Refinance</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/content">Learning Center</a>
                                </li>
                            </ul>
                        </details>
                        <details className="group flex-none">
                            <summary className="flex h-14 cursor-pointer select-none items-center justify-between px-2 [&amp;::-webkit-details-marker]:hidden">
                                Rates
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down ml-2 inline-block group-open:rotate-180 fill-black stroke-none">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </summary>
                            <ul className="m-0 list-none">
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/mortgage-rates">Purchase mortgage rates</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/refinance-rates">Refinance rates</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/cash-out-refinance-rates">Refinance cash-out rates</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/heloc-rates">HELOC rates</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/va-loan-rates">Purchase VA rates</a>
                                </li>
                            </ul>
                        </details>
                        <details className="group flex-none">
                            <summary className="flex h-14 cursor-pointer select-none items-center justify-between px-2 [&amp;::-webkit-details-marker]:hidden">
                                Better+
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down ml-2 inline-block group-open:rotate-180 fill-black stroke-none">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </summary>
                            <ul className="m-0 list-none">
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="https://www.bettercover.com/">Get Insurance</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/title">Title and Closing</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/b/attorney-match">Better Attorney Match</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/content">Learning Center</a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/b/better-real-estate-partner-agents">
                                        Better Agent Match<span className="leading-body m-0 p-0 text-left text-sm ml-2 inline-block rounded-full bg-graph4Tertiary px-4 font-bold text-backgroundInversePrimary">For Agents</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center whitespace-nowrap px-7 py-4 hover:rounded-base hover:bg-accentBackground focus:bg-accentBackground" href="/b/duo">
                                        Better Duo<span className="leading-body m-0 p-0 text-left text-sm ml-2 inline-block rounded-full bg-graph4Tertiary px-4 font-bold text-backgroundInversePrimary">For Agents</span>
                                    </a>
                                </li>
                            </ul>
                        </details>
                        <div className="bg-successBackground px-6 py-2 rounded-full flex items-center justify-center">
                            <div className="mr-3">
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5 13.5L18.5 17C18.5 17.55 18.05 18 17.5 18C8.11 18 0.500002 10.39 0.500002 1C0.500002 0.450001 0.950003 0 1.5 0L4.99 0C5.54 0 5.99 0.450001 5.99 1C5.99 2.24 6.19 3.45 6.56 4.57C6.6 4.67 6.61 4.78 6.61 4.88C6.61 5.14 6.51 5.39 6.32 5.59L4.12 7.79C5.57 10.62 7.88 12.94 10.71 14.38L12.91 12.18C13.19 11.9 13.58 11.82 13.93 11.93C15.05 12.3 16.25 12.5 17.5 12.5C18.05 12.5 18.5 12.95 18.5 13.5Z" fill="#292B29"></path>
                                </svg>
                            </div>
                            Call us anytime at<a className="ml-1 underline underline-offset-[3px] hover:text-textHighlight" href="tel:4155238837">(415) 523 88371</a>
                        </div>
                        <div className="flex flex-col gap-4 mt-auto">
                            <a className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold leading-normal disabled:pointer-events-none disabled:opacity-50 transition-all ease-in-out duration-200 bg-backgroundInverseSecondary text-interactiveForegroundPrimary hover:bg-accentPrimary h-16 px-12 py-5 w-auto" href="/start">
                                <p className="leading-body m-0 p-0 text-left text-base flex flex-col items-center text-current font-bold">
                                    <span>Get started</span>
                                    <span className="text-xs font-normal text-interactiveSecondary">3 min | No credit impact</span>
                                </p>
                            </a>
                        </div>
                    </div>
                    <button aria-label="close navigation bar" className="bg-interactiveForegroundInversePrimary fixed inset-0 h-screen w-screen opacity-80 z-1 invisible focus:border transition-translate duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]"></button>
                    <ul className="flex items-center">
                        <li className="mr-2">
                            <a className="font-normal transition-all ease-in-out duration-300 text-textPrimary hover:bg-backgroundSecondary group-hover:bg-backgroundSecondary" href="/">
                                <svg role="img" className="icon icon-LogoBetter2021" width="65px" height="20px" viewBox="0 0 495 133" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <title>Better</title>
                                    <path d="M427.207 129.574H457.274V70.2463C460.072 61.2943 473.189 52.9226 492.108 57.1085V28.0354C476.38 28.0354 462.848 38.3964 457.274 54.9119V30.0247H427.207V129.574ZM378.24 49.7521C387.399 49.7521 391.979 54.7254 391.979 59.5122C391.979 66.4749 386.405 73.4582 355.342 77.0224C355.342 60.6934 365.703 49.7521 378.24 49.7521ZM416.659 120.414V93.9316C406.712 102.303 393.367 106.883 382.613 106.883C371.464 106.883 362.512 100.915 358.119 91.3621C397.532 88.5853 416.845 75.0331 416.845 55.9273C416.845 40.593 401.117 27.6624 379.214 27.6624C350.141 27.6624 326.663 48.9647 326.663 80.0271C326.663 109.287 350.742 130.983 381.017 130.983C393.968 130.962 407.106 127.191 416.659 120.414ZM304.78 98.7184V49.7521H325.275V30.2526L304.78 30.4599V6.56731L247.836 46.7889V11.7478L200.258 47.5763V49.7728H218.183V104.313C218.183 121.637 230.927 130.796 248.251 130.796C255.814 130.796 262.197 129.408 267.957 126.03V105.515C265.16 107.111 261.782 108.313 258.011 108.313C251.649 108.313 247.857 105.122 247.857 99.5473V49.7728H275.127V104.127C275.127 121.637 287.871 130.796 305.381 130.796C313.152 130.796 319.514 129.802 325.689 126.03V105.329C323.099 106.924 319.12 108.313 315.141 108.313C308.759 108.271 304.78 104.894 304.78 98.7184ZM159.664 49.7521C168.823 49.7521 173.402 54.7254 173.402 59.5122C173.402 66.4749 167.828 73.4582 136.766 77.0224C136.766 60.6934 147.106 49.7521 159.664 49.7521ZM198.082 120.414V93.9316C188.136 102.303 174.791 106.883 164.036 106.883C152.888 106.883 143.936 100.915 139.543 91.3621C178.956 88.5853 198.269 75.0331 198.269 55.9273C198.269 40.593 182.541 27.6624 160.638 27.6624C131.564 27.6624 108.086 48.9647 108.086 80.0271C108.086 109.287 132.165 130.983 162.44 130.983C175.392 130.962 188.53 127.191 198.082 120.414ZM53.5459 76.0277C62.8915 76.0277 70.6623 81.8092 70.6623 91.5486C70.6623 100.708 62.8915 106.282 53.5459 106.282H30.8552V76.0277H53.5459ZM51.9502 25.0721C60.9022 25.0721 68.072 30.6464 68.072 39.2046C68.072 48.3638 60.9022 53.938 51.9502 53.938H30.8552V25.0721H51.9502ZM0 1.967V129.574H60.1147C83.1991 129.574 101.331 115.441 101.331 93.9316C101.331 80.1929 92.5655 69.2516 79.8215 64.0711C91.3637 58.8906 99.1345 48.7367 99.1345 36.5936C99.1345 15.685 80.8161 1.94629 57.5245 1.94629H0V1.967Z" fill="currentColor"></path>
                                </svg>
                            </a>
                        </li>
                        <li className="mx-5 hidden xl:block">
                            <div className="group relative">
                                <span className="">
                                    <button className="rounded-full py-1 font-normal transition-all ease-in-out duration-300 h-12 px-4 text-textPrimary hover:bg-backgroundSecondary group-hover:bg-backgroundSecondary">Buy</button>
                                </span>
                                <div className="absolute invisible left-0 right-0 pt-2 group-hover:visible">
                                    <div className="z-10 w-[22rem] rounded-base p-3 bg-white shadow-md">
                                        <div>
                                            <a href="/preapproval/nxt-purchase" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Apply now
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/mortgage-rates" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Purchase rates
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/how-much-house-can-i-afford" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Affordability calculator
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/mortgage-calculator" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Mortgage calculator
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/rent-vs-buy-calculator" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Rent vs buy calculator
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/find-an-agent" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Find an agent
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/va-loan" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                VA loans
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/content" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Learning center
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mx-5 hidden xl:block">
                            <div className="group relative">
                                <span className="">
                                    <button className="rounded-full py-1 font-normal transition-all ease-in-out duration-300 h-12 px-4 text-textPrimary hover:bg-backgroundSecondary group-hover:bg-backgroundSecondary">Refinance</button>
                                </span>
                                <div className="absolute invisible left-0 right-0 pt-2 group-hover:visible">
                                    <div className="z-10 w-[22rem] rounded-base p-3 bg-white shadow-md">
                                        <div>
                                            <a href="/preapproval/nxt-refinance" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Apply Now
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/refinance-rates" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Refinance rates
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/content/refinance-calculator" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Cash-out refinance calculator
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/content" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Learning Center
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mx-5 hidden xl:block">
                            <div className="group relative">
                                <span className="">
                                    <button className="rounded-full py-1 font-normal transition-all ease-in-out duration-300 h-12 px-4 text-textPrimary hover:bg-backgroundSecondary group-hover:bg-backgroundSecondary">HELOC</button>
                                </span>
                                <div className="absolute invisible left-0 right-0 pt-2 group-hover:visible">
                                    <div className="z-10 w-[22rem] rounded-base p-3 bg-white shadow-md">
                                        <div>
                                            <a href="/preapproval/nxt-heloc" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Apply Now
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/heloc-calculator" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Calculate your Cash 💵
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/heloc-vs-cashout-refi-calculator" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                HELOC vs. Cash-out Refinance
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/content" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Learning Center
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mx-5 hidden xl:block">
                            <div className="group relative">
                                <span className="">
                                    <button className="rounded-full py-1 font-normal transition-all ease-in-out duration-300 h-12 px-4 text-textPrimary hover:bg-backgroundSecondary group-hover:bg-backgroundSecondary">Rates</button>
                                </span>
                                <div className="absolute invisible left-0 right-0 pt-2 group-hover:visible">
                                    <div className="z-10 w-[22rem] rounded-base p-3 bg-white shadow-md">
                                        <div>
                                            <a href="/mortgage-rates" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Purchase mortgage rates
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/refinance-rates" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Refinance rates
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/cash-out-refinance-rates" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Refinance cash-out rates
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/heloc-rates" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                HELOC rates
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/va-loan-rates" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Purchase VA rates
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="mx-5 hidden xl:block">
                            <div className="group relative">
                                <span className="">
                                    <button className="rounded-full py-1 font-normal transition-all ease-in-out duration-300 h-12 px-4 text-textPrimary hover:bg-backgroundSecondary group-hover:bg-backgroundSecondary">Better+</button>
                                </span>
                                <div className="absolute invisible left-0 right-0 pt-2 group-hover:visible">
                                    <div className="z-10 w-[22rem] rounded-base p-3 bg-white shadow-md">
                                        <div>
                                            <a href="https://www.bettercover.com/" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Get Insurance
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/title" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Title and Closing
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/b/attorney-match" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Better Attorney Match
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/content" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Learning Center
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/b/better-real-estate-partner-agents" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Better Agent Match<span className="leading-body m-0 p-0 text-left text-sm ml-2 inline-block rounded-full bg-graph4Tertiary px-4 font-bold text-backgroundInversePrimary">For Agents</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="/b/duo" className="px-5 py-3 hover:bg-backgroundSecondary group/sub-menu hover:rounded-base focus:bg-backgroundSecondary flex justify-between ">
                                                Better Duo<span className="leading-body m-0 p-0 text-left text-sm ml-2 inline-block rounded-full bg-graph4Tertiary px-4 font-bold text-backgroundInversePrimary">For Agents</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-transparent group-hover/sub-menu:text-accentPrimary">
                                                    <path d="M5 12h14"></path>
                                                    <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul className="flex items-center gap-3 lg:gap-6">
                    <li className="">
                        <div className="group min-[520px]:relative">
                            <div className="transition-all ease-in-out duration-300 border rounded-full p-2 md:p-3.5 border-strokeBorder group-hover:bg-backgroundSecondary group-hover:border-backgroundSecondary">
                                <svg width="19" height="18" viewBox="0 0 19 18" className="transition-all ease-in-out group-hover:[&amp;_path]:fill-interactiveForegroundInversePrimary h-3 w-3 md:h-4 md:w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5 13.5L18.5 17C18.5 17.55 18.05 18 17.5 18C8.11 18 0.500002 10.39 0.500002 1C0.500002 0.450001 0.950003 0 1.5 0L4.99 0C5.54 0 5.99 0.450001 5.99 1C5.99 2.24 6.19 3.45 6.56 4.57C6.6 4.67 6.61 4.78 6.61 4.88C6.61 5.14 6.51 5.39 6.32 5.59L4.12 7.79C5.57 10.62 7.88 12.94 10.71 14.38L12.91 12.18C13.19 11.9 13.58 11.82 13.93 11.93C15.05 12.3 16.25 12.5 17.5 12.5C18.05 12.5 18.5 12.95 18.5 13.5Z" fill="#292B29"></path>
                                </svg>
                            </div>
                            <div className="absolute invisible left-1 min-[520px]:left-auto right-0 pt-2 group-hover:visible">
                                <div className=" bg-backgroundTertiary px-10 py-7 rounded-base w-80 shadow-md">
                                    Call us anytime at
                                    
                                    <a className="underline hover:text-textHighlight" href="tel:4155238837">415-523-8837</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="transition-all duration-500 ease-in hidden">
                        <a className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold leading-normal disabled:pointer-events-none disabled:opacity-50 transition-all ease-in-out duration-200 bg-backgroundInverseSecondary text-interactiveForegroundPrimary hover:bg-accentPrimary py-3 w-auto h-8 px-4 md:px-6 md:h-12" href="/start">Get started</a>
                    </li>
                    <li>
                        <button className="xl:hidden flex items-center font-normal transition-all ease-in-out duration-300 text-textPrimary hover:bg-backgroundSecondary group-hover:bg-backgroundSecondary" aria-label="open mobile nav bar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu ">
                                <line x1="4" x2="20" y1="12" y2="12"></line>
                                <line x1="4" x2="20" y1="6" y2="6"></line>
                                <line x1="4" x2="20" y1="18" y2="18"></line>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </header> */}
        <section className="bg-[#f0f7f1] min-h-screen flex flex-col items-center justify-center w-full">
<div className="w-full max-w-6xl mx-auto px-4 md:px-14 py-12">
<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 text-left md:text-left">Mortgage Calculator</h1>
<p className="text-lg text-gray-600 mb-8 text-left md:text-left max-w-2xl">Free mortgage calculator to estimate your monthly mortgage payments with annual amortization. Discover how all factors can affect your payment.</p>
<div className="grid  grid-cols-1  md:grid-cols-3 gap-8 mb-8 items-end">
<div>
<label className="block text-gray-700 font-semibold mb-2 text-lg">Home price</label>
<input
  type="text"
  value={`$${formatNumber(value)}`}
  className="text-4xl md:text-5xl font-bold text-gray-900 text-left border border-gray-300 rounded-lg bg-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-700 transition"
  readOnly
/>
</div>

<div className="flex flex-col text-left md:items-end">
<label className="block text-gray-700 font-semibold mb-2 text-lg md:text-right">Monthly payment</label>
<div className="text-4xl md:text-5xl font-bold text-gray-900 text-left md:text-right">${formatNumber(monthlyPayment)}/mo</div>
</div>

<div className=" md:mt-0 md:ml-auto">
  <a
    href="/"
    className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition block w-full md:w-auto text-center mt-4 md:mt-0"
  >
    Get pre-approved
  </a>
</div>

</div>
<input type="range" min={min} max={max} step={step} value={value} onChange={handleChange}
className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700 mb-8" style={backgroundStyle} />
<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
<div>
<label className="block text-xs text-gray-500 mb-1">ZIP code</label>
<input
  className="rounded-lg border border-gray-300 p-4 text-lg bg-white shadow w-full"
  placeholder="ZIP code"
  maxLength={6}
  value={zip}
  onChange={e => setZip(e.target.value.replace(/[^0-9]/g, ''))}
/>
</div>
<div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center">
<div className="w-full md:w-auto flex-1">
  <label className="block text-xs text-gray-500 mb-1">Down payment</label>
  <div className="flex items-center">
    <span className="inline-flex items-center px-2 font-bold text-gray-500">$</span>
    <input
      className="rounded-lg border border-gray-300 p-4 text-lg bg-white shadow w-full"
      placeholder="Down payment"
      value={downPayment}
      onChange={e => setDownPayment(Number(e.target.value.replace(/[^0-9]/g, '')))}
      type="number"
      min={0}
    />
  </div>
</div>
<div className=" md:w-auto flex-1 md:ml-2">
  <label className="block text-xs text-gray-500 mb-1">&nbsp;</label>
  <div className="flex items-center">
    <input
      className="rounded-lg border border-gray-300 p-4 text-lg bg-white shadow w-full"
      placeholder="%"
      value={downPaymentPercent}
      onChange={e => setDownPaymentPercent(Number(e.target.value.replace(/[^0-9.]/g, '')))}
      type="number"
      min={0}
      max={100}
    />
    <span className="inline-flex items-center px-2 font-bold text-gray-500">%</span>
  </div>
</div>
</div>
<div>
<label className="block text-xs text-gray-500 mb-1">Interest rate</label>
<div className="flex items-center">
  <input
    className="rounded-lg border border-gray-300 p-4 text-lg bg-white shadow w-full"
    placeholder="Interest rate"
    value={interestRate}
    onChange={e => setInterestRate(Number(e.target.value.replace(/[^0-9.]/g, '')))}
    type="number"
    min={0}
    step="0.01"
  />
  <span className="inline-flex items-center px-2 font-bold text-gray-500">%</span>
</div>
</div>
<div>
<label className="block text-xs text-gray-500 mb-1">Length of loan</label>
<select
  className="rounded-lg border border-gray-300 p-4 text-lg bg-white shadow w-full"
  value={loanTermYears}
  onChange={e => setLoanTermYears(Number(e.target.value))}
>
  <option value={30}>30 years</option>
  <option value={20}>20 years</option>
  <option value={15}>15 years</option>
</select>
</div>
</div>
</div>
</section>

<section className="bg-[#fffdfa] pt-8 pb-8">
<div className="m-auto max-w-screen-2xl flex flex-col gap-8 px-4 sm:px-6 md:px-14">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/* Left: Title, Amount, Bar */}
<div>
<h4 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-base md:text-lg">
  Monthly payment breakdown
</h4>   
<p className="leading-body m-0 p-0 text-left mt-4 overflow-hidden text-3xl md:text-4xl font-bold text-textPrimary" data-testid="sum">
${formatNumber(monthlyPayment)}/mo
</p>
<div className="mt-8">
  <svg height="60" width="100%" viewBox="0 0 400 60" className="w-full" xmlns="http://www.w3.org/2000/svg">
    <rect data-testid="principalPill" height="60" rx="30" ry="30" className="duration-300 ease-in-out fill-[#017848]" width={barWidths.principal} x="0" y="0"></rect>
    <rect data-testid="taxesPill" height="60" rx="30" ry="30" className="duration-300 ease-in-out fill-[#6e4cf6]" width={barWidths.taxes} x={barWidths.principal} y="0"></rect>
    <rect data-testid="insurancePill" height="60" rx="30" ry="30" className="duration-300 ease-in-out fill-[#8e8eeb]" width={barWidths.insurance} x={barWidths.principal + barWidths.taxes} y="0"></rect>
    <rect data-testid="hoaPill" height="60" rx="30" ry="30" className="duration-300 ease-in-out fill-[#ffd566]" width={barWidths.hoa} x={barWidths.principal + barWidths.taxes + barWidths.insurance} y="0"></rect>
    <rect data-testid="utilitiesPill" height="60" rx="30" ry="30" className="duration-300 ease-in-out fill-[#fe8b72]" width={barWidths.utilities} x={barWidths.principal + barWidths.taxes + barWidths.insurance + barWidths.hoa} y="0"></rect>
  </svg>
</div>
</div>
{/* Right: Breakdown List */}
<div className="flex flex-col gap-4">
<div className="flex justify-between items-center h-12">
  <div className="flex items-center w-1/2">
    <div className="rounded-sm h-4 w-2 mr-2 bg-backgroundInverseSecondary"></div>
    <p className="font-normal text-textPrimary text-base">Principal &amp; interest</p>
  </div>
  <p className="font-bold text-interactiveForegroundSecondary text-base w-1/2 text-right">$600</p>
</div>
<div className="flex justify-between items-center h-12">
  <div className="flex items-center w-1/2">
    <div className="rounded-sm h-4 w-2 mr-2 bg-infoSecondary"></div>
    <label className="font-normal text-textPrimary text-base" htmlFor="input-taxes">Property taxes</label>
  </div>
  <div className="w-1/2 flex justify-end">
    <div className="relative w-full max-w-[160px]">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold">$</span>
      <input
        name="taxes"
        type="number"
        className="text-right pl-7 pr-2 py-2 rounded border border-gray-300 w-full font-bold focus:ring-2 focus:ring-accentBorderSecondary"
        value="265"
        readOnly
      />
    </div>
  </div>
</div>
<div className="flex justify-between items-center h-12">
  <div className="flex items-center w-1/2">
    <div className="rounded-sm h-4 w-2 mr-2 bg-graph2Tertiary"></div>
    <label className="font-normal text-textPrimary text-base" htmlFor="input-insurance">Homeowners insurance</label>
  </div>
  <div className="w-1/2 flex justify-end">
    <div className="relative w-full max-w-[160px]">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold">$</span>
      <input
        name="insurance"
        type="number"
        className="text-right pl-7 pr-2 py-2 rounded border border-gray-300 w-full font-bold focus:ring-2 focus:ring-accentBorderSecondary"
        value="132"
        readOnly
      />
    </div>
  </div>
</div>
<div className="flex justify-between items-center h-12">
  <div className="flex items-center w-1/2">
    <div className="rounded-sm h-4 w-2 mr-2 bg-graph4Tertiary"></div>
    <label className="font-normal text-textPrimary text-base" htmlFor="input-hoa">HOA fees</label>
  </div>
  <div className="w-1/2 flex justify-end">
    <div className="relative w-full max-w-[160px]">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold">$</span>
      <input
        name="hoa"
        type="number"
        className="text-right pl-7 pr-2 py-2 rounded border border-gray-300 w-full font-bold focus:ring-2 focus:ring-accentBorderSecondary"
        value="132"
        readOnly
      />
    </div>
  </div>
</div>
<div className="flex justify-between items-center h-12">
  <div className="flex items-center w-auto">
    <div className="rounded-sm h-4 w-2 mr-2 bg-graph3Tertiary"></div>
    <p className="font-normal text-textPrimary text-base">Utilities</p>
  </div>
  <span className="font-bold text-textPrimary text-base w-[100px] text-right">$100</span>
</div>
<button className="  leading-body  text-center font-bold select-none  transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundSecondary bg-interactiveSecondary  focus:bg-[#dfe0dc] focus:shadow-accentBorderSecondary active:bg-accentSecondary p-[20px] w-[15rem] outline-none hover:border-[#107848] rounded-[12px]">
  Copy estimate link
</button>
</div>
</div>
</div>
</section>
        
        <div className="bg-accentBorderInverseSecondary">
            <section id="seo-section-wrapper" className="gap-x-lg [&amp;&gt;p]:text-[rgb(86, 93, 90)] py-16 md:flex-row [&amp;&gt;h2]:mb-xl [&amp;&gt;h3]:my-lg [&amp;&gt;p]:my-sm m-auto max-w-screen-2xl justify-between px-6 md:px-14">
                <hr className="my-12 border-t border-strokeDivider"/>
                <h2 className="font-bold text-[rgb(86, 93, 90)] leading-heading m-0 p-0 tracking-normal w-auto text-[2rem] mb-[30px] md:text-2xl md:tracking-tight">How does a mortgage calculator help me?</h2>
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">When deciding how much house you can afford, one of the most important pieces to determine is whether a home will fit into your monthly budget. A mortgage calculator helps you understand the monthly cost of a home. And ours will allow you to enter different down payments and interest rates to help determine what is affordable for you.</p>
                <hr className="my-12 border-t border-strokeDivider"/>
                <h2 className="font-bold text-textPrimary leading-heading mb-[20px]  p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">How much monthly mortgage payment can I afford?</h2>
                <p className="font-normal leading-body mb-[12px] p-0 text-left text-textPrimary text-base">
                    Lenders determine how much you can afford on a monthly housing payment by calculating your
                   
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/what-is-a-good-debt-to-income-ratio">debt-to-income ratio (DTI)</a>
                    . The maximum DTI you can have in order to qualify for most mortgage loans is often between 45-50%, with your anticipated housing costs included.
                </p>
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">Your DTI is the balance between your income and your debt. It helps lenders understand how safe or risky it is for them to approve your loan. A DTI ratio represents how much of your gross monthly income is spoken for by creditors, and how much of it is left over to you as disposable income. It's most commonly written as a percentage. For example, if you pay half your monthly income in debt payments, you would have a DTI of 50%.</p>
                <div className="flex flex-col items-center">
                    <div>
                        <p className="font-normal leading-body m-[30px] p-0 text-left text-textPrimary text-base my-sm">Formula for calculating your debt-to-income (DTI) ratio:</p>
                        <img alt="Mortgage calculator | Debt to income ratio (DTI) formula" loading="lazy" width="780" height="153" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="https://media.better.com/better-com/mortgage-calculator/dti-formula.jpg"/>
                        <p className="font-normal leading-body m-[30px] p-0 text-left text-textPrimary text-base my-sm">Here's an example of what calculating your DTI might look like:</p>
                        <img alt="Mortgage calculator | Debt to income ratio (DTI) formula example" loading="lazy" width="780" height="525" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="https://media.better.com/better-com/mortgage-calculator/dti-example.jpg"/>
                    </div>
                </div>
                <hr className="my-12 border-t border-strokeDivider"/>
                <h2 className="font-bold mb-[30px] leading-heading  p-0 tracking-normal w-auto  text-[2rem] md:text-2xl md:tracking-tight">How to calculate monthly mortgage payments?</h2>

                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">Your monthly mortgage payment includes loan principal and interest, property taxes, homeowners insurance, and mortgage insurance (PMI), if applicable. While not typically included in your mortgage payment, homeowners also pay monthly utilities and sometimes pay homeowners association (HOA) fees, so it's a good idea to factor these into your monthly budget. This mortgage calculator factors in all these typical monthly costs so you can really crunch the numbers.</p>
                <h3 className="font-bold text-textPrimary leading-heading mt-[20px] mb-[20px] p-0 tracking-normal w-auto text-lg md:text-xl">Formula for calculating monthly mortgage payments</h3>
                <p className="font-normal leading-body mb-[30px] mt-[12px] p-0 text-left text-textPrimary text-base">The easiest way to calculate your mortgage payment is to use a calculator, but for the curious or mathematically inclined, here's the formula for calculating principal and interest yourself:</p>
                <div className="flex flex-col items-center">
                    <div>
                        <img alt="Mortgage calculator | Monthly mortgage payment formula" loading="lazy" width="780" height="126" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="https://media.better.com/better-com/mortgage-calculator/monthly-mortgage-payments-formula.jpg"/>
                        <div>
                            <p className="font-normal leading-body mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base my-sm">Where:</p>
                            <ul className="ml-xl list-disc">
                                <li>
                                    <p className="font-normal leading-body  mt-[20px] mb-[20px] p-0 text-left text-textPrimary   my-sm">
                                        <b className='mr-[7px]'>M</b> 
                                        is monthly mortgage payments
                                    </p>
                                </li>
                                <li>
                                    <p className="font-normal leading-body  mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base my-sm">
                                        <b className='mr-[7px]'>P</b>
                                        is the principal loan amount (the amount you borrow)
                                    </p>
                                </li>
                                <li>
                                    <p className="font-normal leading-body  mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base my-sm">
                                        <b className='mr-[7px]'>r</b>
                                        is the monthly interest rate<br/>
                                        (annual interest rate divided by 12 and expressed as a decimal)<br/>
                                        <small>
                                            For example:<br/>
                                            if the annual interest rate is <b>5%</b>
                                            ,<br/>
                                            the monthly rate would be <b>0.05/12</b>
                                            = .00417, or
                                            
                                            <b>.417%</b>
                                        </small>
                                    </p>
                                </li>
                                <li>
                                    <p className="font-normal leading-body  mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base my-sm">
                                        <b className='mr-[7px]' >n</b>
                                        is the total number of payments in months<br/>
                                        <small>
                                            For example:<br/>
                                            for a 30-year loan, n = 30×12 = <b>360</b>
                                            months
                                        </small>
                                    </p>
                                </li>
                            </ul>
                            <p className="font-normal leading-body  mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base my-sm">Here's a simple example:</p>
                            <img alt="Mortgage calculator | Monthly mortgage payment formula example" loading="lazy" width="780" height="221" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="https://media.better.com/better-com/mortgage-calculator/monthly-mortgage-payments-example.jpg"/>
                        </div>
                    </div>
                </div>
                <p className="font-normal leading-body  mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base">This formula assumes a fixed-rate mortgage, where the interest rate remains constant throughout the loan term. And remember, you'll still need to add on taxes, insurance, utilities, and HOA fees if applicable.</p>
                <hr className="my-12 border-t border-strokeDivider"/>
                <h3 className="font-bold text-textPrimary leading-heading  mt-[20px] mb-[20px] p-0 tracking-normal w-auto text-lg md:text-xl">How to use this mortgage calculator?</h3>
                <p className="font-normal leading-body mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base">
                    Play around with different home prices, locations,
                   
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/faq/loan-process/down-payment-definition">down payments</a>
                    , interest rates, and mortgage lengths to see how they impact your monthly mortgage payments.
                </p>
                <p className="font-normal leading-body mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base">
                    Increasing your down payment and decreasing your interest rate and mortgage term length will make your monthly payment go down. Taxes, insurance, and HOA fees will vary by location. If you enter a down payment amount that's less than 20% of the home price,
                 
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/what-is-pmi-or-private-mortgage-insurance">private mortgage insurance (PMI)</a>
                   
                    costs will be added to your monthly mortgage payment. As the costs of utilities can vary from county to county, we've included a utilities estimate that you can break down by service. If you're thinking about buying a condo or into a community with a Homeowners Association (HOA), you can add HOA fees.
                </p>
                <p className="font-normal leading-body  mt-[20px] mb-[20px] p-0 text-left text-textPrimary text-base">
                    The only amounts we haven't included are the money you'll need to save for annual home maintenance/repairs or the costs of home improvements. To see how much home you can afford including these costs, take a look at the
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/how-much-house-can-i-afford">Better home affordability calculator</a>
                    .
                </p>
                <p className="font-normal leading-body  mt-[20px] mb-[20px]  p-0 text-left text-textPrimary text-base">
                    Fun fact:
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/how-to-calculate-property-tax-on-a-house">Property tax rates</a>
                 
                    are extremely localized, so two homes of roughly the same size and quality on either side of a municipal border could have very different tax rates. Buying in an area with a lower property tax rate may make it easier for you to afford a higher-priced home.
                </p>
                <h3 className="font-bold text-textPrimary leading-heading  mt-[40px] mb-[40px] p-0 tracking-normal w-auto text-lg md:text-xl">Do you know your property tax rate?</h3>
                <p className="font-normal leading-body  mt-[20px] mb-[80px] p-0 text-left text-textPrimary text-base">
                    While exact property tax rates vary by county, it can be helpful to look at taxes on the state level to get an idea for taxes in your state. Here's a helpful chart from
                
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="https://www.forbes.com/sites/andrewdepietro/2023/09/01/property-taxes-by-state-a-breakdown-of-the-highest-and-lowest-property-taxes-by-state">Forbes</a>
                   
                    breaking down the Census Bureau's 2021 American Community Survey 5-year estimate:
                </p>
                <div className="my-3xl">
                    <div className="relative pointer group w-full h-full overflow-scroll" tabindex="0">
                        <table className="min-w-full border border-[#bfbebb]  table-auto clip-inset-round">
                            <thead className="">
                                <tr>
                                    <th className="border border-[#bfbebb] text-center bg-[#003526] px-2 py-3 md:px-4">
                                        <p className="leading-body m-0 p-0 text-sm text-center text-[#fffdfa] font-bold">State</p>
                                    </th>
                                    <th className="border border-[#bfbebb] text-center bg-[#003526] px-2 py-3 md:px-4">
                                        <p className="leading-body m-0 p-0 text-sm text-center text-[#fffdfa] font-bold">Median Effective Property Tax Rate</p>
                                    </th>
                                    <th className="border border-[#bfbebb] text-center bg-[#003526] px-2 py-3 md:px-4">
                                        <p className="leading-body m-0 p-0 text-sm text-center text-[#fffdfa] font-bold">Mean Effective Property Tax Rate</p>
                                    </th>
                                    <th className="border border-[#bfbebb]  text-center bg-[#003526] px-2 py-3 md:px-4">
                                        <p className="leading-body m-0 p-0 text-sm text-center text-[#fffdfa] font-bold">Median Home Value</p>
                                    </th>
                                    <th className="border border-[#bfbebb]  text-center bg-[#003526] px-2 py-3 md:px-4">
                                        <p className="leading-body m-0 p-0 text-sm text-center text-[#fffdfa] font-bold">Median Property Taxes Paid</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">AL</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center  text-textSecondary">0.41%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">0.40%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$157,100</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$646</p>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="border border-[#bfbebb]  text-center  bg-[#f0f7f1]   px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">AK</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center bg-[#f0f7f1]   px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">1.23%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center  bg-[#f0f7f1]  px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">1.04%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center  bg-[#f0f7f1]  px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$282,800</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center bg-[#f0f7f1]   px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$3,464</p>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">AZ</p>
                                    </td>
                                    <td className="border border-[#bfbebb] text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">0.62%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">0.63%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$265,600</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$1,648</p>
                                    </td>
                                </tr>
                                <tr className="">
                                    <td className="border border-[#bfbebb]  text-center bg-[#f0f7f1]  px-2 py-3 md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">AR</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 bg-[#f0f7f1]  md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">0.62%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 bg-[#f0f7f1]  md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">0.64%</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 bg-[#f0f7f1]  md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$142,100</p>
                                    </td>
                                    <td className="border border-[#bfbebb]  text-center px-2 py-3 bg-[#f0f7f1]  md:px-4">
                                        <p className="font-normal leading-body m-0 p-0 text-sm text-center text-textSecondary">$878</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="hidden md:group-hover:block absolute w-full h-full bg-black opacity-25 top-0 left-0"></div>
                        <button className="rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundSecondary bg-interactiveSecondary hover:bg-accentSecondary focus:bg-accentSecondary focus:shadow-accentBorderSecondary active:bg-accentSecondary px-xl h-3xl w-auto hidden md:group-hover:block left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 absolute text-[black] bg-[#fffdfa]  p-[20px] rounded-[8px] ">See all states</button>
                    </div>
                    <button className="rounded-base leading-body text-base text-center font-bold select-none outline-none transition duration-300 ease-universal focus:shadow-[0_0_0_4px_inset] disabled:text-interactiveForegroundMuted disabled:bg-interactiveMuted disabled:shadow-none text-interactiveForegroundTertiary bg-transparent border border-solid border-strokeBorder hover:text-interactivePrimary hover:border-transparent hover:shadow-[0_0_0_4px_inset] hover:shadow-accentBorderSecondary focus:border-transparent focus:shadow-accentBorderSecondary active:text-interactivePrimary px-xl h-3xl block md:hidden mt-base w-full">See all 
                    
                    states</button>
                </div>
                <hr className="my-12 border-t border-strokeDivider"/>
                <h2 className="font-bold text-textPrimary leading-heading mb-[40px] p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">How is Better's mortgage calculator different?</h2>
                <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">This mortgage calculator shows your payments with taxes and insurance</h3>

                <p className="font-normal leading-body mb-[24px] mt-[24px] p-0 text-left text-textPrimary text-base">The property taxes you contribute are used to finance the services provided by your local government to the community. These services encompass schools, libraries, roads, parks, water treatment, police, and fire departments. Even after your mortgage has been fully paid, you will still need to pay property taxes. If you neglect your property taxes, you run the risk of losing your home to your local tax authority.</p>
                <p className="font-normal leading-body mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">Your lender will usually require you to have homeowners insurance while you &#x27;re settling your mortgage. This is a common practice among lenders because they understand that nobody wants to continue paying a mortgage on a home that &#x27;s been damaged or destroyed.</p>

                <p className="font-normal leading-body mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">Here &#x27;s an interesting fact: Once you fully own your home, the choice to maintain homeowners insurance is entirely up to you. However, to ensure your home is protected against damages caused by fires, lightning strikes, and natural disasters that are common in
                your area, it is highly recommended to keep it. Therefore, always factor in these costs when using a Mortgage Calculator.</p>


                <h3 className="font-bold text-textPrimary leading-heading mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-lg md:text-xl">This  mortgage calculator shows your mortgage costs with PMI</h3>

                <p className="font-normal leading-body mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">PMI, an abbreviation for private mortgage insurance, aids potential homeowners in qualifying for a mortgage without the necessity of a 20% down payment. By opting for a lower down payment and choosing a mortgage with PMI, you can purchase a home sooner, begin accruing equity, and keep cash available for future needs. This can all be calculated using this Mortgage Calculator.</p>
                <p className="font-normal leading-body mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">
                    Choosing a mortgage with PMI is a popular option:
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="https://cdn.nar.realtor/sites/default/files/documents/2021-07-realtors-confidence-index-08-23-2021.pdf">71% of first-time homebuyers</a>
                   
                    had a down payment of less than 20% in July 2021.
                   
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="https://fortune.com/2021/08/31/down-payment-on-a-house-how-much-money-to-put-down">In 2020, the median down payment for first-time homebuyers was just 7%, and it hasn't risen above 10% since 1989.</a>
                </p>
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">PMI is automatically removed from conventional mortgages once your home equity reaches 22%. Alternatively, you can request the removal of PMI once you &#x27;ve accumulated at least 20% home equity.</p>
                <h3 className="font-bold text-textPrimary leading-heading mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-lg md:text-xl">This 
              
                mortgage calculator includes HOA fees</h3>
                <p className="font-normal leading-body mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">Homeowners association ("HOA") fees are typically charged directly by a homeowners association, but as HOA fees come part and parcel with condos, townhomes, and planned housing developments, they're an essential factor to consider when calculating your mortgage costs.</p>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">Homes
               
                that share structural elements, such as roofs and walls, or community amenities like landscaping, pools, or BBQ areas, often require homeowners to pay HOA fees for the maintenance of these shared features. It &#x27;s important to factor in these costs during your budget planning stage, especially considering that HOA fees typically increase annually.
                
                HOAs may also charge additional fees known as 'special assessments' to cover unexpected expenses from time to time.</p>
                <hr className="my-12 border-t border-strokeDivider  mb-[3rem] mt-[3rem]"/>
                <h2 className="font-bold text-textPrimary leading-heading  mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">How to reduce your monthly mortgage payments?</h2>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">The lower the purchase price of the home, the lower your loan amount will be. But if the seller is less than willing to cut you a deal, you have other options.</p>
                <h3 className="font-bold text-textPrimary leading-heading  mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-lg md:text-xl">Extend the length of your mortgage</h3>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">The more time you have to pay off the mortgage, the less each monthly mortgage payment will be. (In lender-speak, 'extending the length of your mortgage' is known as 'increasing your loan term.') This is why people often choose a 30-year fixed rate mortgage over one with a 15- or 20-year term.</p>
                <h3 className="font-bold text-textPrimary leading-heading  mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-lg md:text-xl">Increase your down payment</h3>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">
                    The smaller the amount of your mortgage, the smaller your monthly mortgage payments will be. If you're able to put at least 20% of the home price towards your
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/how-much-should-you-put-down-on-a-house">down payment</a>
                    , you'll be able to avoid PMI (private mortgage insurance). Even if you can't afford a complete 20% down payment, boosting your down payment will help you get PMI removed sooner. In fact, boosting your down payment by 5% can lower your monthly PMI fees.
                </p>
                <h3 className="font-bold text-textPrimary leading-heading  mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-lg md:text-xl">Get a lower interest rate</h3>
                <p className="font-normal leading-body  mb-[12px] mt-[12px]  p-0 text-left text-textPrimary text-base">
                    Increasing your down payment can be one way to help you qualify for a lower interest rate. The amount of your down payment compared to the total amount of the loan is called your
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/3-most-important-numbers-mortgage-application">loan-to-value ratio (LTV)</a>
                    .
                </p>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">
                    Depending on your loan amount, a lower LTV may increase the likelihood of you being offered a low interest rate. If you intend on keeping your home for a while, you could consider buying
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/points-credits-and-how-to-decide-if-theyre-right-for-you">points</a>
                   
                    to reduce your interest rate. Buying points essentially means you agree to pay more upfront costs in exchange for a lower monthly payment.
                </p>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">
                    If you think you may sell or refinance the home in the first 5-10 years of the mortgage, you could consider an
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/so-youre-considering-an-adjustable-rate-mortgage">adjustable-rate mortgage (ARM)</a>
                    . An ARM offers a lower fixed interest rate for a set introductory period—typically 5, 7, or 10 years. Once the set introductory period ends, the interest rate adjusts (interest rate may increase after consummation). The introductory interest rate for ARMs is typically lower than the interest rate for a conventional fixed-rate mortgage which could make it a great way to save on interest if you know you won't keep the mortgage for long.
                </p>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">
                    If you're not planning on buying a home for a while, improving your credit score is a tried and true way of increasing your chances of qualifying for a lower interest rate. By reducing your
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/3-most-important-numbers-mortgage-application">debt-to-income ratio (DTI)</a>
                    , lenders will see that you comfortably afford your mortgage and may be more willing to offer a lower interest rate.
                </p>
                <hr className="my-12 border-t border-strokeDivider  mb-[3rem] mt-[3rem]"/>
                <h2 className="font-bold text-textPrimary leading-heading  mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">How much home can I afford?</h2>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">
                    Once again, the easiest way to do this is with a calculator! To know if a home is in your budget, try out our
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/how-much-house-can-i-afford">home affordability calculator</a>
                    . This calculator will take a few inputs from you, like income and savings, and let you know the maximum amount of home you can afford.
                </p>
                <hr className="my-12 border-t border-strokeDivider  mb-[3rem] mt-[3rem]"/>
                <h2 className="font-bold text-textPrimary leading-heading  mb-[24px] mt-[24px] p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">Next steps to buying a house</h2>
                <p className="font-normal leading-body  p-0 text-left text-textPrimary text-base">
                    There are
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/steps-to-buying-a-house">8 steps to buying a house</a>
                   
                    and by using this calculator you've completed step 2 (calculating your home affordability) and maybe even step 1 (getting your finances in order).
                </p>
                <p className="font-normal leading-body  mb-[12px] mt-[12px] p-0 text-left text-textPrimary text-base">The next step is getting pre-approved. A mortgage pre-approval with Better Mortgage takes as little as 3-minutes and doesn't impact your credit score. It's a free, no-commitment way to see how much home you can buy, the mortgages you qualify for, and the range of interest rates you'll be offered.</p>
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
                    If you're ready to buy a home now, our
                    
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/content/the-definitive-home-buying-checklist">definitive home buying checklist</a>
                    
                    can walk you through everything you need to know to get the home you want. With your Better Mortgage pre-approval letter in hand, you'll be able to show sellers and real estate agents that you mean business—giving you an edge over homebuyers that don't have this kind of proof that they're financially ready to purchase. And by working with an agent from Better Real Estate and funding with Better Mortgage, you'll save $2,000 on closing costs, and save up to $8,200 on average over the life of your loan.**
                </p>
                <hr className="my-12 border-t border-strokeDivider  mb-[3rem] mt-[3rem]"/>
                <section>
                    <div>
                        <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">More resources</h2>
                        <div className="flex flex-col justify-between gap-[48px]  pt-[36px] md:flex-row">
                            <div className="rounded-[8px] px-[24px] py-[24px] border border-strokeDivider flex-1">
                                <img alt="Get pre-approved to see how much you can borrow" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="https://media.better.com/better-com/mortgage-calculator/doc-correct.svg"/>
                                <p className="font-normal leading-body mt-[16px] p-0 text-left mt-base text-[20px] text-interactiveForegroundSecondary">
                                    <span>Get pre-approved to see how much you can borrow</span>
                                </p>
                                <a className="focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary block mt-[16px] mb-[8px] font-bold no-underline hover:underline" href="/preapproval/nxt-purchase?utm_source=website&amp;utm_medium=webpage&amp;utm_campaign=calculator&amp;utm_content=mortgage-calculator  ">Get started →</a>
                                <p className="font-normal leading-body m-0 p-0 text-left text-xs text-textSecondary">Won't impact your credit</p>
                            </div>
                            <div className="rounded-[8px] px-[24px] py-[24px] border border-strokeDivider flex-1">
                                <img alt="See today's rates in your area" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="https://media.better.com/better-com/mortgage-calculator/downtrend.svg"/>
                                <p className="font-normal leading-body mt-[16px] p-0 text-left mt-base text-[20px] text-interactiveForegroundSecondary">
                                    <span>See today's rates in your area</span>
                                </p>
                                <a className="focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary block mt-[16px] mb-[8px] font-bold no-underline hover:underline" href="/mortgage-rates">See rates
                            
                                →</a>
                            </div>
                            <div className="rounded-[8px] px-[24px] py-[24px] border border-strokeDivider flex-1">
                                <img alt="Find out your max homebuying budget" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" style={{ color: 'transparent' }} src="https://media.better.com/better-com/mortgage-calculator/calculator.svg"/>
                                <p className="font-normal leading-body mt-[16px]  p-0 text-left mt-base text-[20px] text-interactiveForegroundSecondary">
                                    <span>Find out your max homebuying budget</span>
                                </p>
                                <a className="focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary block mt-[16px] mb-[8px] font-bold no-underline hover:underline" href="/how-much-house-can-i-afford">Try our mortgage calculator
                               
                                →</a>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="pb-lg m-auto max-w-screen-2xl justify-between px-6 md:px-14">
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-xs">
                    *See
                   
                    <a className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary" href="/faq/rates/whats-the-fine-print-better-real-estate">Better Real Estate discount terms and conditions</a>
                    .
                </p>
                <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-xs">**The average lifetime savings estimate is based on a comparison of the Freddie Mac Primary Mortgage Market Survey's (PMMS) 30-year fixed-rate mortgage product with Better Mortgage's own offered rate for a comparable mortgage product between Jan '20 - Dec '20. PMMS is based on conventional, conforming fully-amortizing home purchase loans for borrowers with a loan-to-value of 80 percent and with excellent credit. Better Mortgage's offered rate is based on pricing output for a 30-year fixed-rate mortgage product with a 30-day lock period for a single-family, owner-occupied residential property and a borrower with excellent (760 FICO) credit and a loan-to-value ratio of 80 percent. Individual savings could vary based on current market rates, property type, loan amount, loan-to-value, credit score, debt-to-income ratio and other variables.</p>
            </section>
        </div>
        <Footer/>
    
</div>
    )
  }
  