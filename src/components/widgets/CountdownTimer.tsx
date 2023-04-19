import { animate, motion, useMotionValue, useTransform, ValueAnimationTransition } from 'framer-motion';
import { DateTime } from 'luxon';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { useCountdown } from '~/hooks/useCountdown';

export const CountdownTimer = ({ to = '2023-08-11' }: DateTime): ReactNode => {
  if (to === undefined) {
    throw new Error('`to` prop is required');
  }

  const { years, months, days, hours, minutes, seconds, isLoading } = useCountdown(to);
	const expired = days + hours + minutes + seconds === 0;
	const displayTo = DateTime.fromISO(to).toLocaleString(DateTime.DATE_MED);
  // const motionValues = {
  // 	years: useMotionValue(0),
  // 	months: useMotionValue(0),
  // 	days: useMotionValue(0),
  // 	hours: useMotionValue(0),
  // 	minutes: useMotionValue(0),
  // 	seconds: useMotionValue(0),
  // }

  // const transformedValues = {
  // 	years: useTransform(motionValues.years, (value) => Math.round(value)),
  // 	months: useTransform(motionValues.months, (value) => Math.round(value)),
  // 	days: useTransform(motionValues.days, (value) => Math.round(value)),
  // 	hours: useTransform(motionValues.hours, (value) => Math.round(value)),
  // 	minutes: useTransform(motionValues.minutes, (value) => Math.round(value)),
  // 	seconds: useTransform(motionValues.seconds, (value) => Math.round(value)),
  // }

  useEffect(() => {
    if (expired) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const secondsEl = document.querySelector('[data-countdown="seconds"]') as HTMLElement;
    const minutesEl = document.querySelector('[data-countdown="minutes"]') as HTMLElement;
    const hoursEl = document.querySelector('[data-countdown="hours"]') as HTMLElement;
    const daysEl = document.querySelector('[data-countdown="days"]') as HTMLElement;
    const monthsEl = document.querySelector('[data-countdown="months"]') as HTMLElement;

    if (secondsEl !== null && minutesEl !== null && hoursEl !== null && daysEl !== null && monthsEl !== null) {
      secondsEl.style.setProperty('--value', seconds.toString());
      minutesEl.style.setProperty('--value', minutes.toString());
      hoursEl.style.setProperty('--value', hours.toString());
      daysEl.style.setProperty('--value', days.toString());
      monthsEl.style.setProperty('--value', months.toString());
    }
    // console.log({isLoading, expired, years, months, days, hours, minutes, seconds});

    // const yearsControls = animate(motionValues.years, years)
    // const monthsControls = animate(motionValues.months, months)
    // const daysControls = animate(motionValues.days, days)
    // const hoursControls = animate(motionValues.hours, hours)
    // const minutesControls = animate(motionValues.minutes, minutes)
    // const secondsControls = animate(motionValues.seconds, seconds, {
    // 	duration: 1,
    // 	type: 'spring',
    // })

    // return () => {
    // 	yearsControls.stop()
    // 	monthsControls.stop()
    // 	daysControls.stop()
    // 	hoursControls.stop()
    // 	minutesControls.stop()
    // 	secondsControls.stop()
    // }
  }, [expired, years, months, days, hours, minutes, seconds]);

  return (
		<div className="countdown-timer flex flex-col items-center justify-center text-6xl font-bold mb-16">
			{/* <h4 className="text-lg font-normal leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">The countdown has begun!<br /> <span className="inline-flex uppercase text-off-white font-bold text-2xl -translate-y-2">{displayTo}</span></h4> */}
      {expired ? (
        <div>Game on!!</div>
      ) : (
        <>
          <motion.div
            className="countdown-timer__counter pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__months">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="months" />
              </span>
              <span>Months</span>
            </div>
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__days">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="days" />
              </span>
              <span>Days</span>
            </div>
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__hours">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="hours" />
              </span>
              <span>Hours</span>
            </div>
            {/* <div className="counter__item__divider">:</div> */}
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__minutes">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="minutes" />
              </span>
              <span>Minutes</span>
            </div>
            {/* <div className="counter__item__divider">:</div> */}
            <div className="countdown-timer__counter__item">
              <span className="countdown counter__item__seconds">
                <span style={{ '--value': 0 } as CSSProperties} data-countdown="seconds" />
              </span>
              <span>Seconds</span>
            </div>
          </motion.div>
          <p className="countdown-timer__counter--a11y sr-only">
            <span className="countdown-timer__counter__item">
              <span className="countdown counter__item__months">
                <span>{months}</span>
              </span>
              <span>Months</span>
            </span>
            <span className="countdown-timer__counter__item">
              <span className="countdown counter__item__days">
                <span>{days}</span>
              </span>
              <span>Days</span>
            </span>
            <span className="countdown-timer__counter__item">
              <span className="countdown counter__item__hours">
                <span>{hours}</span>
              </span>
              <span>Hours</span>
            </span>
            <span className="countdown-timer__counter__item">
              <span className="countdown counter__item__minutes">
                <span>{minutes}</span>
              </span>
              <span>Minutes</span>
            </span>
            <span className="countdown-timer__counter__item">
              <span className="countdown counter__item__seconds">
                <span>{seconds}</span>
              </span>
              <span>Seconds</span>
            </span>
          </p>
        </>
      )}
    </div>
  );
};
